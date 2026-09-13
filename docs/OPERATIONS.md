# GrabStack operations

How the site stays current, and what to do when it doesn't.

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

## The loop

```
trawl (weekly)  ->  PR  ->  you merge  ->  GitHub Actions builds + deploys
                                                      |
                                      freshness gate reports staleness
                                                      |
                              social generator draws ONLY from fresh content
                                                      |
                                  queue  ->  veto window  ->  auto-publish
```

## Commands

| Command | What it does |
|---|---|
| `npm run freshness` | What is past its review date, worst first |
| `npm run freshness:strict` | Same, exits 1 if anything is overdue (used by CI) |
| `npm run trawl` | Research pass, applies content edits, opens a PR |
| `npm run deploy` | Manual build and deploy (the fallback path) |
| `npm run social:generate` | Top up `social/queue.json` from fresh content |
| `npm run social:preview` | Show every queued post as each platform will render it |
| `npm run social:publish` | Publish what is past its veto window |
| `npm run social:pause` | Stop all publishing, immediately |
| `npm run social:resume` | Allow publishing again |

## Freshness policy

Each entry carries a `reviewed:` date. Once it passes, the entry is making an
unverified claim on a site whose entire promise is honesty. Review intervals:
tools 30 days, stacks 90, glossary 180.

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

## Setup still required

1. **Repository secrets** for auto-deploy (Settings > Secrets > Actions):
   `CLOUDFLARE_API_TOKEN` (needs the "Cloudflare Pages: Edit" permission) and
   `CLOUDFLARE_ACCOUNT_ID` = `efba1784f17b3aba846d602160003746`.
2. **`~/.env.anthropic`** containing `ANTHROPIC_API_KEY=...` so the trawl can
   run unattended. Headless Claude cannot use the keychain under cron.
3. **Social accounts and credentials** — see `social/credentials.example`.
   Then `npm run social:resume`.

## Known weakness

The trawl and publisher run from local crontab, so they need this Mac awake and
online. That is the wrong host for anything that must happen reliably. The
better home is a Cloudflare Worker on a cron trigger (there is an unfinished
skeleton in `worker/frontier-refresh/`), which is always on and has no keychain
problem. Worth doing once the loop has proved itself.
