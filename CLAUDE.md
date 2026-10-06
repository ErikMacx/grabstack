# GrabStack: maintenance guide for Claude

GrabStack (grabstack.com) is the honest, always-current field guide to AI tools, models and agents. Its promise is honesty: **an invented or stale claim is worse than silence.** This file tells Claude how to keep it current. The automatic runs in `.github/workflows/` follow it.

- Astro site. Content lives in `src/content/`:
  - `tools/*.md`: one file per tool or model line. These feed **Frontier**, **Apps**, **Capitals** and **Cemetery**.
  - `updates/*.md`: dated news items for **The Wire**.
  - `stacks/*.md`: tool combinations by profession.
  - `glossary/*.md`: glossary terms.
- `npm run build` builds the site into `dist/` and validates every file's frontmatter against `src/content.config.ts`.
- `npm run freshness` lists entries past their review-by date.
- `docs/SECTIONS.md` and `docs/GrabStack-Blueprint.md` explain the sections. `prompts/prompt.txt` has the "Dynamite Test" for what belongs on Frontier.

## Editorial rules (non-negotiable)

1. **Evidence or nothing.**
   - Use WebSearch and WebFetch. Prefer primary sources: the maker's blog, release notes, docs and pricing page.
   - Never invent a version number, benchmark, price, date or URL.
   - If you can't confirm something, leave it out.
   - Benchmarks are the maker's own unless stated otherwise, so say so when comparing makers.
2. **Every tool entry has a `source` URL** that you actually opened.
3. **Keep file names (slugs).** Other pages link to them. When a product moves to a new version, update `name` and the text but keep the file name.
4. **Plain, short sentences in British English.** No hype, no affiliate language, and nothing promotional.
5. **Status:**
   - Shut down or withdrawn: `deprecated`, with when and why. Bought: `acquired`, with by whom.
   - Use `flagship`, `top-ranked` and `category-leader` only where the evidence supports it.
6. **Dates:**
   - Tools: `updated` is the day you checked it, and `reviewed` is the review-by date, 30 days later.
   - Wire items: `date` is when the event happened, and `reviewBy` is a year later.

### Tool frontmatter

```yaml
name: string
maker: string
category: coding-agents | computer-use | frontier-models | hardware | image-generation | meeting-productivity | personal-agents | search-research | video-generation | voice-music | work-agents
status: flagship | top-ranked | category-leader | everyday-default | open-weight | active | beta | unreleased | deprecated | acquired
claim: one sentence, at most about 200 characters
metrics: [short strings]
source: URL
updated: 'YYYY-MM-DD'
reviewed: 'YYYY-MM-DD'
```

The body is 2–4 plain sentences: what it is now, what changed, and why it matters to someone building with AI.

### Wire item frontmatter

```yaml
title: "plain, factual headline"
date: "YYYY-MM-DD"
reviewBy: "YYYY-MM-DD"
summary: "one or two sentences"
tools: [existing tool slugs only]
```

The body is 2–4 sentences ending with `Source: <url>`. Name the file `YYYY-MM-DD-short-slug.md`.

## Daily Wire procedure

Run this when the daily workflow fires, or when asked to "add today's AI news".

1. **Window:** from the date of the newest item in `src/content/updates/` (normally the last 24–48 hours) up to now.
2. **Research what happened in AI in that window:**
   - model launches;
   - agent and developer-tool releases;
   - shutdowns;
   - acquisitions and major funding rounds;
   - important regulation and lawsuits.
   Cover the US, European and Chinese labs. Verify each item against a primary or reputable source.
3. **Add one Wire item per real event.** Usually 0–6 a day. Don't pad: a quiet day gets no items.
4. **Update affected tool entries.** If an event changes a tool entry (a new version, a price change, a shutdown, an acquisition), update that file in the same run, with a new `source`, `updated` and `reviewed`.
5. **New products:** create a tool file only for a major new product that clearly passes the Dynamite Test, at most one a day.
6. **Build:** run `npm run build` and fix anything that fails.
7. **Notes:** overwrite `WIRE_NOTES.md` with 3–6 bullets: what was added or changed, and anything you could not verify.

## Weekly review procedure

Run this when the weekly workflow fires, or when asked to "review GrabStack".

1. Run `node scripts/freshness.mjs --json` to get the entries past their review-by date, worst first.
2. **Re-check up to 25 overdue tool entries**, then any overdue stacks, against current sources.
   - Update each one under the rules above.
   - If you found no change after a real check, keep the claim. Still set `updated` and `reviewed`, and add "No material change found since <previous updated date>." to the body.
3. **Look for gaps in Frontier.** Add at most 3 new tool files for major products that pass the Dynamite Test and are missing.
   - Mark as `deprecated` anything that has shut down.
4. **Refresh the Landscape** (`src/data/ai-landscape.json`, the ranked debates on the home page):
   - Set `meta.asOf` and the "As of …" wording in `meta.subtitle` to this month.
   - Re-check each debate against the past few weeks' events. Update its text and its `heat` (real-world momentum) where the evidence moved it, and change lens scores only where a debate has clearly become more or less central.
   - Add a debate only if a major new one has emerged, and keep the same keys and structure.
   - Update `meta.sources` to name what you used.
5. **First Monday of the month only:** re-check the Learning pages (`src/pages/learning/*.astro`) for out-of-date facts, figures, model names and dates. Change only the text and data inside them, never the page structure or imports.
6. **Build:** run `npm run build` and fix anything that fails.
7. **Notes:** overwrite `REVIEW_NOTES.md` with what was re-checked, what changed, what was added, and anything you could not verify.

## Publishing

The workflows publish automatically.
- They commit to `main` and deploy to Cloudflare Pages, but only when the build passes and the run touched nothing outside what it is allowed to touch:
  - daily: `src/content/` and `WIRE_NOTES.md`;
  - weekly: those plus `src/data/ai-landscape.json` and `src/pages/learning/`.
- If anything fails, nothing is published and GitHub emails the failure.
- **Never commit or push yourself** during an automatic run.
