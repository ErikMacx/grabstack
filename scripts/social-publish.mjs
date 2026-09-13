#!/usr/bin/env node
/**
 * GrabStack social publisher.
 *
 * Reads social/queue.json and publishes posts whose veto window has elapsed.
 * Deliberately boring and dependency-free (no tweepy to go missing again).
 *
 * Control model — "queue, auto-publish on delay":
 *   - the generator stamps each post with createdAt
 *   - nothing publishes until DELAY_HOURS have passed (default 12)
 *   - so there is always a window to edit or delete a post before it goes out
 *   - `social/PAUSED` (or SOCIAL_PAUSED=1) stops everything, immediately
 *
 * Credentials live in ~/.env.grabstack-social, never in the repo. A platform
 * with no credentials is skipped silently, so this runs safely before every
 * account exists.
 *
 * Usage:
 *   node scripts/social-publish.mjs --dry-run    # show what would go, send nothing
 *   node scripts/social-publish.mjs              # publish what is due
 *   node scripts/social-publish.mjs --max 1
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { createHmac, randomBytes } from "node:crypto";
import { homedir } from "node:os";
import { join } from "node:path";

const QUEUE = new URL("../social/queue.json", import.meta.url).pathname;
const PAUSE_FILE = new URL("../social/PAUSED", import.meta.url).pathname;

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const MAX = Number(args[args.indexOf("--max") + 1]) || 3;
const DELAY_HOURS = Number(process.env.SOCIAL_DELAY_HOURS ?? 12);

// --- kill switch, checked before anything else ----------------------------
if (existsSync(PAUSE_FILE) || process.env.SOCIAL_PAUSED === "1") {
  console.log("PAUSED — social/PAUSED exists (or SOCIAL_PAUSED=1). Nothing published.");
  process.exit(0);
}

// --- credentials ----------------------------------------------------------
const envFile = join(homedir(), ".env.grabstack-social");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

const have = (...keys) => keys.every((k) => process.env[k]);
const PLATFORMS = {
  bluesky: have("BLUESKY_HANDLE", "BLUESKY_APP_PASSWORD"),
  mastodon: have("MASTODON_INSTANCE", "MASTODON_TOKEN"),
  x: have("X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_TOKEN_SECRET"),
};

// --- Bluesky (AT Protocol) ------------------------------------------------
/** Bluesky needs explicit facets or URLs render as dead text. */
function linkFacets(text) {
  const facets = [];
  const bytes = Buffer.from(text, "utf8");
  const re = /https?:\/\/[^\s]+/g;
  let m;
  while ((m = re.exec(text))) {
    facets.push({
      index: {
        byteStart: Buffer.from(text.slice(0, m.index), "utf8").length,
        byteEnd: Buffer.from(text.slice(0, m.index + m[0].length), "utf8").length,
      },
      features: [{ $type: "app.bsky.richtext.facet#link", uri: m[0] }],
    });
  }
  void bytes;
  return facets;
}

async function postBluesky(text) {
  const service = process.env.BLUESKY_SERVICE || "https://bsky.social";

  const session = await fetch(`${service}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      identifier: process.env.BLUESKY_HANDLE,
      password: process.env.BLUESKY_APP_PASSWORD,
    }),
  });
  if (!session.ok) throw new Error(`bluesky auth ${session.status}: ${await session.text()}`);
  const { accessJwt, did } = await session.json();

  const res = await fetch(`${service}/xrpc/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${accessJwt}` },
    body: JSON.stringify({
      repo: did,
      collection: "app.bsky.feed.post",
      record: {
        $type: "app.bsky.feed.post",
        text,
        facets: linkFacets(text),
        createdAt: new Date().toISOString(),
      },
    }),
  });
  if (!res.ok) throw new Error(`bluesky post ${res.status}: ${await res.text()}`);
  const { uri } = await res.json();
  return uri;
}

// --- Mastodon -------------------------------------------------------------
async function postMastodon(text) {
  const instance = process.env.MASTODON_INSTANCE.replace(/\/$/, "");
  const res = await fetch(`${instance}/api/v1/statuses`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.MASTODON_TOKEN}`,
      // Guards against a retry double-posting the same item.
      "idempotency-key": `grabstack-${Buffer.from(text).toString("base64").slice(0, 32)}`,
    },
    body: JSON.stringify({ status: text, visibility: "public" }),
  });
  if (!res.ok) throw new Error(`mastodon ${res.status}: ${await res.text()}`);
  return (await res.json()).url;
}

// --- X (OAuth 1.0a, signed by hand so there is no dependency to break) ----
function pct(s) {
  return encodeURIComponent(s).replace(/[!'()*]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
}

function oauthHeader(method, url) {
  const params = {
    oauth_consumer_key: process.env.X_API_KEY,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: process.env.X_ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  // A JSON body is not part of an OAuth 1.0a signature base string.
  const paramString = Object.keys(params)
    .sort()
    .map((k) => `${pct(k)}=${pct(params[k])}`)
    .join("&");

  const base = [method.toUpperCase(), pct(url), pct(paramString)].join("&");
  const key = `${pct(process.env.X_API_SECRET)}&${pct(process.env.X_ACCESS_TOKEN_SECRET)}`;
  params.oauth_signature = createHmac("sha1", key).update(base).digest("base64");

  return (
    "OAuth " +
    Object.keys(params)
      .sort()
      .map((k) => `${pct(k)}="${pct(params[k])}"`)
      .join(", ")
  );
}

async function postX(text) {
  const url = "https://api.twitter.com/2/tweets";
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: oauthHeader("POST", url) },
    body: JSON.stringify({ text }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`x ${res.status}: ${body}`);
  const id = JSON.parse(body)?.data?.id;
  return id ? `https://x.com/i/web/status/${id}` : "posted";
}

const SENDERS = { bluesky: postBluesky, mastodon: postMastodon, x: postX };

// --- run ------------------------------------------------------------------
const queue = JSON.parse(await readFile(QUEUE, "utf8"));
queue.history ||= [];

const enabled = Object.entries(PLATFORMS).filter(([, on]) => on).map(([p]) => p);
console.log(`GrabStack publisher — ${new Date().toISOString()}`);
console.log(`  platforms configured: ${enabled.length ? enabled.join(", ") : "NONE"}`);
console.log(`  veto window: ${DELAY_HOURS}h · max this run: ${MAX}${DRY ? " · DRY RUN" : ""}`);

if (!enabled.length && !DRY) {
  console.log("\nNo credentials in ~/.env.grabstack-social. Nothing to do.");
  process.exit(0);
}

const cutoff = Date.now() - DELAY_HOURS * 3600_000;
const due = queue.posts
  .filter((p) => p.status === "queued")
  .filter((p) => Date.parse(p.publishAt || p.createdAt) <= cutoff)
  .slice(0, MAX);

const waiting = queue.posts.filter((p) => p.status === "queued").length - due.length;
console.log(`  ${due.length} due, ${waiting} still inside the veto window\n`);

let sent = 0;
// In a dry run with nothing configured yet, preview every platform's
// rendering — that is precisely when a human most wants to read the queue.
const targets = enabled.length ? enabled : DRY ? Object.keys(SENDERS) : [];

for (const post of due) {
  post.results ||= {};
  let anySuccess = false;

  for (const platform of targets) {
    const text = post.variants[platform];
    if (!text) continue;

    if (DRY) {
      console.log(`  [dry] ${platform} (${text.length}) ${post.id}\n        ${text}`);
      anySuccess = true;
      continue;
    }

    try {
      const url = await SENDERS[platform](text);
      post.results[platform] = { ok: true, url, at: new Date().toISOString() };
      console.log(`  sent ${platform}: ${post.id} -> ${url}`);
      anySuccess = true;
    } catch (err) {
      post.results[platform] = { ok: false, error: String(err.message), at: new Date().toISOString() };
      console.error(`  FAILED ${platform}: ${post.id} — ${err.message}`);
    }
  }

  if (!DRY && anySuccess) {
    post.status = "posted";
    post.postedAt = new Date().toISOString();
    sent++;
  }
}

if (!DRY) {
  // Posted items move to history so the generator never re-queues them.
  const posted = queue.posts.filter((p) => p.status === "posted");
  queue.history.push(...posted.map((p) => ({ id: p.id, postedAt: p.postedAt, results: p.results })));
  queue.posts = queue.posts.filter((p) => p.status !== "posted");
  await writeFile(QUEUE, JSON.stringify(queue, null, 2) + "\n");
  console.log(`\n${sent} published. ${queue.posts.filter((p) => p.status === "queued").length} left queued.`);
} else {
  console.log(`\n--dry-run: nothing sent.`);
}
