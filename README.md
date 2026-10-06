# GrabStack

_Last updated 6 October 2026_

Source for **https://grabstack.com**, the honest, always-current field guide to AI tools, models, agents and stacks. Built with Astro and hosted on Cloudflare Pages.

- Content: `src/content/` (tools, Wire news, stacks, glossary), `src/data/ai-landscape.json` (the Landscape) and `src/data/learning.json` (Learning article dates).
- Every page shows when it was last updated, and "review overdue" once its review-by date has passed.
- Kept current automatically by GitHub Actions: a daily Wire run and a weekly review, each published only when the build passes. See `docs/OPERATIONS.md`.
- `CLAUDE.md` is the maintenance guide the automatic runs follow.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local preview at `localhost:4321` |
| `npm run build` | Build to `dist/`, then check every page is dated |
| `npm run freshness` | List what is past its review-by date |
| `npm run deploy` | Manual build and deploy (the fallback; normally the workflows deploy) |
