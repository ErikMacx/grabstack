#!/usr/bin/env node
/**
 * GrabStack freshness gate.
 *
 * Every tool and stack entry carries a `reviewed:` date — the date by which a
 * human said the claim should be looked at again. Once that date passes, the
 * entry is making an unverified claim on a site whose whole promise is honesty.
 *
 * This script is the thing that was missing: it makes staleness visible and
 * machine-readable, so the trawl knows what to work on and the social queue
 * knows what it must never post.
 *
 * Usage:
 *   node scripts/freshness.mjs            # human report
 *   node scripts/freshness.mjs --json     # machine-readable, for other scripts
 *   node scripts/freshness.mjs --strict   # exit 1 if anything is overdue
 */

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// How long a claim stays trustworthy without a fresh look, by collection.
// Tools move fast; stacks are workflow advice and drift more slowly.
const REVIEW_DAYS = { tools: 30, stacks: 90, glossary: 180, updates: 365 };

const ROOT = new URL("../src/content/", import.meta.url).pathname;
const TODAY = process.env.GRABSTACK_TODAY || new Date().toISOString().slice(0, 10);

/** Pull a single-line YAML scalar out of front-matter without a yaml dep. */
function field(frontmatter, key) {
  const m = frontmatter.match(new RegExp(`^${key}:[ \\t]*(.*)$`, "m"));
  if (!m) return null;
  return m[1].trim().replace(/^['"]|['"]$/g, "") || null;
}

function daysBetween(a, b) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

async function readCollection(name) {
  let files;
  try {
    files = (await readdir(join(ROOT, name))).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }

  const entries = [];
  for (const file of files) {
    const raw = await readFile(join(ROOT, name, file), "utf8");
    const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const front = fm[1];

    const updated = field(front, "updated");
    let reviewed = field(front, "reviewed");

    // Collections without an explicit reviewed date inherit one from `updated`
    // plus the collection's review interval.
    if (!reviewed && updated) {
      const d = new Date(Date.parse(updated) + REVIEW_DAYS[name] * 86400000);
      reviewed = d.toISOString().slice(0, 10);
    }

    entries.push({
      collection: name,
      slug: file.replace(/\.mdx?$/, ""),
      title: field(front, "name") || field(front, "title") || field(front, "term") || file,
      status: field(front, "status"),
      updated,
      reviewed,
      overdueDays: reviewed ? daysBetween(reviewed, TODAY) : null,
    });
  }
  return entries;
}

const all = (await Promise.all(Object.keys(REVIEW_DAYS).map(readCollection))).flat();
const overdue = all
  .filter((e) => e.overdueDays !== null && e.overdueDays > 0)
  .sort((a, b) => b.overdueDays - a.overdueDays);

// `fresh` is what the social queue is allowed to draw from.
const fresh = all.filter((e) => e.overdueDays !== null && e.overdueDays <= 0);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ today: TODAY, total: all.length, overdue, fresh }, null, 2));
} else {
  console.log(`GrabStack freshness — ${TODAY}\n`);
  for (const name of Object.keys(REVIEW_DAYS)) {
    const inCollection = all.filter((e) => e.collection === name);
    if (!inCollection.length) continue;
    const bad = overdue.filter((e) => e.collection === name);
    const flag = bad.length ? "STALE" : "ok";
    console.log(
      `  ${name.padEnd(9)} ${String(bad.length).padStart(3)}/${String(inCollection.length).padEnd(4)} overdue  [${flag}]`
    );
  }
  if (overdue.length) {
    console.log(`\nWorst offenders:`);
    for (const e of overdue.slice(0, 12)) {
      console.log(`  ${String(e.overdueDays).padStart(4)}d  ${e.collection}/${e.slug}  (due ${e.reviewed})`);
    }
    if (overdue.length > 12) console.log(`  ... and ${overdue.length - 12} more`);
  }
  console.log(`\n${fresh.length} of ${all.length} entries are in review. ${overdue.length} need a look.`);
}

if (process.argv.includes("--strict") && overdue.length) process.exit(1);
