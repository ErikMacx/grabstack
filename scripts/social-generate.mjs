#!/usr/bin/env node
/**
 * GrabStack social generator.
 *
 * Turns committed site content into a queue of posts. Two rules make this safe
 * to run unattended:
 *
 *   1. It is a FORMATTER, not an author. Every post is composed from fields
 *      already in src/content/** (claim, metrics, summary, definition). It
 *      cannot invent a claim, because it has no capacity to write one.
 *   2. It only draws from entries that are IN REVIEW. An entry past its
 *      `reviewed` date is excluded, so the freshness gate that protects the
 *      site also protects the feed. Had this existed in June, nothing would
 *      have gone out claiming "Opus 4.8, top-ranked" for three months.
 *
 * Output is social/queue.json — committed on purpose, so the queue is
 * reviewable in git and in a PR before anything reaches the public.
 *
 * Usage:
 *   node scripts/social-generate.mjs                 # top up the queue
 *   node scripts/social-generate.mjs --count 20
 *   node scripts/social-generate.mjs --dry-run       # print, write nothing
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://grabstack.com";
const CONTENT = new URL("../src/content/", import.meta.url).pathname;
const QUEUE = new URL("../social/queue.json", import.meta.url).pathname;
const TODAY = process.env.GRABSTACK_TODAY || new Date().toISOString().slice(0, 10);

const args = process.argv.slice(2);
const COUNT = Number(args[args.indexOf("--count") + 1]) || 12;
const DRY = args.includes("--dry-run");

// Platform ceilings. Bluesky counts graphemes, X counts weighted chars; both
// are close enough to code points for plain English that this is safe.
const LIMITS = { x: 280, bluesky: 300, mastodon: 500 };

/** House style: no em dashes (matches the TCEL newsletter standard). */
function houseStyle(s) {
  return String(s)
    .replace(/\s*[—–]\s*/g, ". ")   // em/en dash becomes a full stop
    .replace(/\s+/g, " ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

function field(front, key) {
  const m = front.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"));
  if (!m) return null;
  let v = m[1].trim();
  // Folded/quoted multi-line scalars: pull the continuation lines in.
  if (v === "" || v === ">" || v === "|" || /^['"]$/.test(v)) v = "";
  if (/^'[^']*$/.test(v) || /^"[^"]*$/.test(v)) {
    const rest = front.slice(front.indexOf(m[0]) + m[0].length);
    const cont = rest.split(/\n(?=\S)/)[0];
    v = (v + " " + cont).trim();
  }
  return v.replace(/^['"]|['"]$/g, "").trim() || null;
}

function yamlList(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*\\n((?:[ \\t]*-[^\\n]*\\n?)+)`, "m"));
  if (!m) return [];
  return m[1]
    .split("\n")
    .map((l) => l.replace(/^[ \t]*-[ \t]*/, "").trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

async function load(collection) {
  const dir = join(CONTENT, collection);
  let files;
  try {
    files = (await readdir(dir)).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }
  const out = [];
  for (const file of files) {
    const raw = await readFile(join(dir, file), "utf8");
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    out.push({ collection, slug: file.replace(/\.mdx?$/, ""), front: fm[1] });
  }
  return out;
}

/** Reuse the freshness gate rather than reimplementing its policy. */
const REVIEW_DAYS = { tools: 30, stacks: 90, glossary: 180 };
function inReview(e) {
  const updated = field(e.front, "updated");
  let reviewed = field(e.front, "reviewed");
  if (!reviewed && updated) {
    reviewed = new Date(Date.parse(updated) + REVIEW_DAYS[e.collection] * 86400000)
      .toISOString()
      .slice(0, 10);
  }
  return reviewed ? reviewed >= TODAY : false;
}

/** Compose a post from fields that already exist. No authoring. */
function compose(e) {
  if (e.collection === "tools") {
    const name = field(e.front, "name");
    const maker = field(e.front, "maker");
    const claim = field(e.front, "claim");
    if (!name || !claim) return null;
    return {
      id: `tools/${e.slug}`,
      kind: "tool",
      text: houseStyle(`${name}${maker ? ` (${maker})` : ""}: ${claim}`),
      url: `${SITE}/tools/${e.slug}`,
      tags: ["#AI", "#AItools"],
    };
  }
  if (e.collection === "stacks") {
    const title = field(e.front, "title");
    const summary = field(e.front, "summary");
    const profession = field(e.front, "profession");
    if (!title || !summary) return null;
    return {
      id: `stacks/${e.slug}`,
      kind: "stack",
      text: houseStyle(`${title}${profession ? ` (${profession})` : ""}: ${summary}`),
      url: `${SITE}/stacks/${e.slug}`,
      tags: ["#AI", "#AIstack"],
    };
  }
  if (e.collection === "glossary") {
    const term = field(e.front, "term");
    const def = field(e.front, "definition");
    if (!term || !def) return null;
    return {
      id: `glossary/${e.slug}`,
      kind: "glossary",
      text: houseStyle(`${term}: ${def}`),
      url: `${SITE}/glossary/${e.slug}`,
      tags: ["#AI", "#AIglossary"],
    };
  }
  return null;
}

/** Fit text + url (+ tags if they fit) under a platform's ceiling. */
function render(post, platform) {
  const limit = LIMITS[platform];
  const tail = ` ${post.url}`;
  const tags = ` ${post.tags.join(" ")}`;

  let body = post.text;
  const withTags = body.length + tail.length + tags.length <= limit;
  const budget = limit - tail.length - (withTags ? tags.length : 0);

  if (body.length > budget) {
    body = body.slice(0, budget - 1).replace(/[\s,;:.]+\S*$/, "") + "…";
  }
  return body + tail + (withTags ? tags : "");
}

// --- build ----------------------------------------------------------------
const entries = (await Promise.all(["tools", "stacks", "glossary"].map(load))).flat();
const eligible = entries.filter(inReview);
const excluded = entries.length - eligible.length;

const existing = existsSync(QUEUE)
  ? JSON.parse(readFileSync(QUEUE, "utf8"))
  : { generated: null, posts: [] };

// Never queue something already queued or already sent. Gives the rotation
// the same "cover the catalogue, don't repeat" behaviour as pentagon_tweets.
const seen = new Set(existing.posts.map((p) => p.id));
const history = new Set((existing.history || []).map((h) => h.id));

const candidates = eligible
  .map(compose)
  .filter(Boolean)
  .filter((p) => !seen.has(p.id) && !history.has(p.id))
  // Least-recently-covered first: stacks and glossary are evergreen and get
  // crowded out by the much larger tools collection otherwise.
  .sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));

// A full timestamp, not a date. A date-only value parses as midnight UTC,
// which made the publisher's veto window fake (posts stamped "today" already
// looked 12 hours old by lunchtime).
const NOW = new Date().toISOString();

const fresh = candidates.slice(0, COUNT).map((p) => ({
  ...p,
  status: "queued",
  createdAt: NOW,
  variants: {
    x: render(p, "x"),
    bluesky: render(p, "bluesky"),
    mastodon: render(p, "mastodon"),
  },
}));

const queue = {
  generated: TODAY,
  note: "Generated from committed, in-review site content only. Edit or delete any entry before it publishes.",
  eligible: eligible.length,
  excludedAsStale: excluded,
  posts: [...existing.posts, ...fresh],
  history: existing.history || [],
};

console.log(`GrabStack social generator — ${TODAY}`);
console.log(`  ${eligible.length} entries in review, ${excluded} excluded as stale`);
console.log(`  ${candidates.length} uncovered candidates, queued ${fresh.length}`);
console.log(`  queue now holds ${queue.posts.filter((p) => p.status === "queued").length} unsent posts\n`);

for (const p of fresh) {
  console.log(`  [${p.kind}] ${p.id}`);
  console.log(`    x(${p.variants.x.length}): ${p.variants.x}`);
}

if (excluded && !fresh.length) {
  console.log(`\nNothing queued. ${excluded} entries are past review — the content needs a trawl before it can be posted about.`);
}

if (!DRY) {
  await writeFile(QUEUE, JSON.stringify(queue, null, 2) + "\n");
  console.log(`\nWrote ${QUEUE}`);
} else {
  console.log(`\n--dry-run: nothing written`);
}
