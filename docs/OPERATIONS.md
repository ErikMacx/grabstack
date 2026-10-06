# GrabStack operations

_Last updated 6 October 2026_

How the site stays current, and what to do when it doesn't. `CLAUDE.md` holds the step-by-step procedures the automatic runs follow.

## Why it stagnated (June to September 2026)

Worth recording, because three of the four faults were invisible.

1. **No deploy path existed.** The Cloudflare Pages project `grabstack` was not
   connected to GitHub and there was no `deploy` script. Deploys only happened
   when someone ran `wrangler pages deploy` by hand. Production sat on commit
   `f3d4ba5` while `main` moved two commits ahead, so a completed Frontier
   Refresh was committed, pushed, and never seen by a visitor.
2. **The trawl produced drafts, not content.** It wrote a report into `drafts/`
   for a human to hand-apply to `src/content/**`. Nobody ever did.
3. **Cron could not run it.** `node` and `claude` live in `/usr/local/bin`,
   absent from cron's minimal PATH (`env: node: No such file or directory`,
   22 June to 6 July). Once that was resolved it hit `Not logged in`, because a
   cron process cannot read OAuth credentials from the login keychain.
4. **It reported success anyway.** `frontier-refresh.py` printed
   "Committed and pushed." after both failure modes. Three months of green
   lights over an empty pipeline.

Every mechanism below exists to make one of those four impossible.

## The loop (since 6 October 2026)

Everything runs on GitHub Actions, so nothing depends on the Mac being awake.

```
daily 06:07 UTC   Daily Wire: today's AI news, affected tool entries, and a
                  rolling re-check of the most overdue page or entry
weekly Mon 06:37  Weekly review: up to 25 overdue tools, stacks, Frontier gaps,
                  the Landscape, and the Learning pages when due
                        |
         guard (only content paths changed) -> build (incl. date check)
                        |
          commit to main -> deploy to Cloudflare Pages (project grabstack)
```

- Each run publishes only if the build passes and it touched nothing outside its allowed paths. Otherwise nothing is published and GitHub emails the failure.
- Every page shows its date, and "review overdue" once its review-by date has passed. `npm run build` fails if a page has no date.
- `freshness.yml` reports what is overdue; it no longer fails the build.
- The weekly review can be run by hand with a focus: `gh workflow run weekly-review.yml -f focus="..."`.
- The old local trawl (`npm run trawl`, `drafts/`) is superseded.

## Commands

| Command | What it does |
|---|---|
| `npm run freshness` | What is past its review date, worst first (tools, stacks, glossary, Wire, and the Landscape and Learning pages) |
| `npm run freshness:strict` | Same, exits 1 if anything is overdue |
| `npm run trawl` | Old local research pass (superseded by the daily and weekly runs) |
| `npm run build` | Build, then check every page is dated |
| `npm run deploy` | Manual build and deploy (the fallback path) |
| `npm run social:generate` | Top up `social/queue.json` from fresh content |
| `npm run social:preview` | Show every queued post as each platform will render it |
| `npm run social:publish` | Publish what is past its veto window |
| `npm run social:pause` | Stop all publishing, immediately |
| `npm run social:resume` | Allow publishing again |

## Freshness policy

Each entry carries a `reviewed:` date. Once it passes, the entry is making an
unverified claim on a site whose entire promise is honesty. Review intervals:
tools 30 days, stacks 90, glossary 180. The Landscape is due 14 days after its last check, and each Learning article has its own `reviewBy` in `src/data/learning.json`.

The freshness data does double duty: it tells the trawl what to prioritise, and
it tells the social generator what it may not talk about.

## Social model

The generator is a **formatter, not an author**. Every post is composed from
fields already committed in `src/content/**` (`claim`, `metrics`, `summary`,
`definition`). It cannot invent a claim because it has no capacity to write one.

It also only draws from entries that are **in review**. This is the important
safeguard: had auto-posting been running this summer, it would have spent three
months broadcasting "Claude Code, top-ranked, Opus 4.8" to the public. Now stale
content is simply ineligible.

Control chain, tightest first:

- `social/PAUSED` present, or `SOCIAL_PAUSED=1` — nothing publishes, full stop.
- No credentials in `~/.env.grabstack-social` — that platform is skipped.
- Veto window (`SOCIAL_DELAY_HOURS`, default 12) — nothing publishes until it
  has sat in the committed queue that long, so there is always time to edit or
  delete it.
- `--max N` — caps how many go out per run.

`social/queue.json` is committed deliberately, so the queue is reviewable in
git and in a PR before anything reaches the public.

## Setup

Done (October 2026): the repository secrets `CLAUDE_CODE_OAUTH_TOKEN`, `CLOUDFLARE_API_TOKEN` (with "Cloudflare Pages: Edit") and `CLOUDFLARE_ACCOUNT_ID` = `efba1784f17b3aba846d602160003746`.

Still to do, only if social posting is wanted:

1. **Social accounts and credentials** — see `social/credentials.example`.
   Then `npm run social:resume`.

## Known weakness

The social publisher, if scheduled, still runs from local crontab, so it needs the Mac awake and online. Moving it to GitHub Actions, like the content runs, would remove that dependency.
