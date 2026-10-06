#!/usr/bin/env node
// Every page on GrabStack shows when it was last updated. This runs after `astro build`
// and fails the build if any built page has no page date (redirect stubs and the 404 page excepted).
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;

async function* pages(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* pages(p);
    else if (e.name.endsWith(".html")) yield p;
  }
}

const missing = [];
let n = 0;
for await (const p of pages(DIST)) {
  const html = await readFile(p, "utf8");
  if (/http-equiv="refresh"/i.test(html) || /(^|\/)404(\/index)?\.html$/.test(p)) continue;
  n++;
  const m = html.match(/class="[^"]*page-date[^"]*"[^>]*data-dated="([^"]+)"|data-dated="([^"]+)"[^>]*class="[^"]*page-date/);
  if (!m) missing.push(relative(DIST, p));
}
if (missing.length) {
  console.error(`check-dates: ${missing.length} page(s) show no date:\n  ` + missing.join("\n  "));
  console.error('Pass `updated` (and, where it has one, `reviewBy`) to <Base> on each of these pages.');
  process.exit(1);
}
console.log(`check-dates: all ${n} pages are dated`);
