# GrabStack — Build Blueprint

> **GrabStack** — the honest, always-current field guide to AI tools, agents and stacks.
> For builders, operators and founders (and a Learn track for students, coders and researchers).
> Snapshot-dated, citable, filterable. *Signal, not noise.*

This document is both your plan and the context file Claude Code should read before building.

---

## 1. Priorities — the rules every page obeys

**Your three (non-negotiable):**

1. **Fresh, honest updates.** Everything carries a date and a "last reviewed". The *Updates* feed is the engine that keeps people (and crawlers) coming back. Honesty is the moat — **no affiliate capture, ever.** We will say what's overhyped, what died, and what to skip.
2. **Citable "statements".** Every page emits original, dated, declarative claims — the kind an AI quotes. Be the *origin* of a fact, not the tenth site to restate it. (e.g. *"As of June 2026, X% of the tools we tracked a year ago are dead."*)
3. **Clean, filterable, structured answers.** Answer-first, drill-down, scannable. Show the shape; let people open only what they need. This is the cure for AI-era TLDR.

**The other priorities that make it work:**

4. **One source of truth.** A single maintained `tools` data layer. Stacks, Learn, the Map and the Graveyard are all *views* that reference tool IDs. When a tool changes or dies, every view updates. **This is what stops the site rotting** — the failure mode of every directory.
5. **Speed + clean semantic HTML + accessibility.** Fast, well-structured pages serve readers *and* crawlers at once. (The tech choice below is built for this.)
6. **Mobile-first, effortless navigation.** The #1 UX rule you set. Persistent search, shallow menus, generous type.
7. **A named identity.** A real About page, a named editor, a published methodology ("how we test & rate"). Models cite sources they can name and trust.
8. **Owned distribution.** Newsletter capture from day one + an RSS feed. Don't rent your audience from an algorithm.
9. **Discoverability hygiene.** `sitemap.xml`, `robots.txt` that *allows* GPTBot / ClaudeBot / PerplexityBot, schema.org markup, and an `llms.txt`.
10. **A sustainable update workflow.** Publishing must be near-frictionless (edit one markdown file → commit → live) or freshness dies. This is the real make-or-break.

---

## 2. Site structure — pages & what they do

**Top navigation:** Map · Updates · Stacks · Learn · State of AI · About  — with persistent search.

| Page | Path | What it does | Serves |
|---|---|---|---|
| **Landing** | `/` | The hook. One-line promise, the live "latest updates" feed, entry into the Map and Stacks, newsletter signup. Effortless routing to everything. | 1,2,3,6,8 |
| **The Map** | `/map` | The filterable landscape — *what exists, by job*. Search + category + status filters. The structured, drill-down surface. | 3,4 |
| **Updates** | `/updates`, `/updates/[slug]` | The dated changelog of the field. Terse, honest, "what changed and why it matters." The recurring engine + newsletter source. | 1,2 |
| **Stacks** | `/stacks`, `/stacks/[profession]` | AI stacks by profession (estate agent, marketing office, …) + a *build-your-stack* tool. High-intent, citation-shaped. | 2,3,4 |
| **Learn** | `/learn`, `/learn/[track]` | Learning stacks — students, coders, researchers. What to learn, with what, kept current. | 2,3,4 |
| **State of AI** | `/state-of/[topic]` | Cornerstone reference pages ("The State of AI Tooling / Agents / Video"). Mirror how people ask → maximum citability. | 2 |
| **The Graveyard** | `/graveyard` | Deprecated, shut-down and acquired tools, with *where they went*. Honesty signal + citation magnet. | 1,2,4 |
| **Glossary** | `/glossary`, `/glossary/[term]` | Living glossary (agent, MCP, RAG, context window…), each linked to the tools that use it. | 2,3 |
| **About** | `/about` | Identity, named editor, methodology, update cadence. Trust + entity authority for citation. | 1,7 |
| *Utility* | `/search`, `/rss.xml`, `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Findability + owned distribution plumbing. | 8,9 |

**Footer:** Graveyard · Glossary · Methodology · RSS · Newsletter · About.

**Page template (every Stack / Update / State-of page shares this shape, for scannability):**
> Dated headline claim → 2-line summary → the filterable detail → "last reviewed" + source links.

---

## 3. Tech stack — recommendation

**Use [Astro](https://astro.build).** Why it fits all three priorities precisely:

- **Content Collections** = your single source of truth. Tools, updates, stacks, learn tracks and glossary all live as typed markdown files → easy to maintain, trivially dated, and Claude-Code-friendly.
- **Ships near-zero JavaScript** → very fast, clean HTML → great for readers, Core Web Vitals, and AI crawlers.
- **Interactive "islands"** (drop in React/Svelte) for the two things that need it: the filterable **Map** and the **Stack Builder**.
- **Built-in `sitemap` + `RSS`**, MDX support, and simple file-based routing.

**Interactivity:** React islands for `ToolMap` and `StackBuilder`. Everything else is static HTML.
**Styling:** Tailwind (fast, consistent) — optional but recommended.
**Hosting:** GitHub repo → **Cloudflare Pages** (generous free tier, fast edge; Vercel or Netlify are equally fine). Point `grabstack.com` DNS at it.
**Fallback:** only move to Next.js if GrabStack later becomes a heavy, logged-in web app.

---

## 4. File structure (your Mac and GitHub are the *same* tree)

Your Mac holds a local clone of the GitHub repo. One structure, version-controlled.

```
grabstack/
├── README.md
├── CLAUDE.md                  # context for Claude Code (paste §1 + §3 here)
├── docs/
│   └── BLUEPRINT.md           # this file
├── astro.config.mjs
├── package.json
├── public/
│   ├── grabstack-logo.svg
│   ├── grabstack-icon.svg     # also export favicon.ico / og-image.png
│   ├── robots.txt             # ALLOW GPTBot, ClaudeBot, PerplexityBot, Google-Extended
│   └── llms.txt
└── src/
    ├── content/
    │   ├── config.ts          # typed schemas for every collection
    │   ├── tools/             # ⭐ SINGLE SOURCE OF TRUTH — one .md per tool
    │   ├── updates/           # the changelog — one .md per dated update
    │   ├── stacks/            # one .md per profession (lists tool IDs)
    │   ├── learn/             # one .md per track (lists tool IDs)
    │   ├── state-of/          # cornerstone pages
    │   └── glossary/          # one .md per term (links tool IDs)
    ├── components/
    │   ├── ToolMap.tsx        # filterable map (React island)
    │   ├── StackBuilder.tsx   # build-your-stack (React island)
    │   ├── ToolCard.astro
    │   ├── UpdateCard.astro
    │   ├── Nav.astro
    │   └── Footer.astro
    ├── layouts/
    │   └── Base.astro         # <head>, schema.org JSON-LD, nav/footer, dates
    ├── pages/
    │   ├── index.astro
    │   ├── map.astro
    │   ├── updates/index.astro      ·  updates/[slug].astro
    │   ├── stacks/index.astro       ·  stacks/[profession].astro
    │   ├── learn/index.astro        ·  learn/[track].astro
    │   ├── state-of/[topic].astro
    │   ├── graveyard.astro
    │   ├── glossary/index.astro     ·  glossary/[term].astro
    │   ├── about.astro
    │   └── rss.xml.ts
    └── styles/global.css
```

**The key idea:** `content/tools/` is canonical. A "stack" is just a list of tool IDs + workflow notes; the Map and Graveyard are filtered views of the same data. Update the tool once → it's correct everywhere. No rot.

A tool entry (`src/content/tools/claude-code.md`) looks like:
```yaml
---
name: Claude Code
maker: Anthropic
category: coding-agents
status: top-ranked          # flagship | top-ranked | leader | open | beta | deprecated | acquired
claim: "Ranks #1 on SWE-bench Verified at ~80.9% as of June 2026."   # ← a citable statement
metrics: ["~80.9% SWE-bench Verified", "terminal / IDE / browser"]
updated: 2026-06-02
reviewed: 2026-06-02
source: https://...
---
Short, honest prose: what it's for, where it wins, where it doesn't.
```

---

## 5. Get GrabStack onto GitHub (run on your Mac)

**Prerequisites** (one-time):
```bash
xcode-select --install                 # git + build tools
# install Homebrew if needed: https://brew.sh
brew install node gh                   # Node.js (LTS) + GitHub CLI
```

**Install Claude Code** — the native installer is now Anthropic's recommended, dependency-free method (see the official docs for the exact command). The npm route also works and needs Node 18+:
```bash
npm install -g @anthropic-ai/claude-code@latest   # do NOT use sudo
claude --version                                  # verify
claude                                            # first run → sign in via browser (OAuth)
```
Docs: https://docs.claude.com/en/docs/claude-code/overview

**Scaffold + push:**
```bash
# 1. create the Astro project
npm create astro@latest grabstack       # choose: Empty, TypeScript (Strict)
cd grabstack

# 2. add what we need
npx astro add react sitemap mdx tailwind

# 3. first commit
git add -A
git commit -m "Initial GrabStack scaffold"

# 4. create the GitHub repo + push in one go
gh auth login                           # if not already authenticated
gh repo create grabstack --private --source=. --remote=origin --push

# 5. drop in brand + context files, then:
git add -A && git commit -m "Add brand, blueprint, crawler config" && git push
```

**Deploy:** in Cloudflare Pages, *Connect to Git* → pick `grabstack` → framework preset **Astro**, build `npm run build`, output `dist`. Add the custom domain `grabstack.com` and update DNS. Every `git push` now redeploys automatically.

---

## 6. When to use Claude Code (and when not)

**Rule of thumb:** Claude Code builds and maintains the **machine** (the code). *You* own the **filter** (judgment + editorial content).

| Use Claude Code for | Do it yourself / use chat-Claude for |
|---|---|
| Scaffolding, config, integrations | Strategy & positioning (this conversation) |
| The collection schemas (`config.ts`) | Deciding what's true, what to rate, what to list |
| Components: `ToolMap`, `StackBuilder`, templates, layouts | Writing the editorial voice & the "statements" (chat-Claude can *draft*; you decide) |
| RSS / sitemap / schema.org / `llms.txt` wiring | Brand & design direction |
| Refactors, bulk changes, new sections, debugging | Quick one-off content edits (you don't need an agent to fix a typo or add one update) |
| Setting up Cloudflare/Vercel deploy config | Approving anything before it ships |

**Best first prompts for Claude Code** (point it at this file):
1. "Read `docs/BLUEPRINT.md`. Set up the Astro content collections in §4 with typed schemas in `src/content/config.ts`."
2. "Build the `Base.astro` layout with schema.org JSON-LD and dated metadata."
3. "Build the `ToolMap` React island: search + category + status filters over the `tools` collection."
4. "Generate the page routes and templates from §2; stub one profession stack and one Update."

---

## 7. Brand & logo

**Personality:** honest, current, sharp, insider. An analyst, not a hype-merchant. *Signal, not noise.*
**Name logic:** **grab** (select / lift) + **stack** (layers).
**The mark:** square brackets *grabbing* a three-layer stack; the top, freshest layer is lifted and accent-coloured. Encodes grab + stack + freshness, and the bracket reads as code/technical.
**The wordmark:** `GrabStack.` — the accent **period** is deliberate: it signals *we make declarative statements*. ("Grab" lighter weight, "Stack" bold.)

**Palette:**
| Role | Hex | Use |
|---|---|---|
| Ink | `#1A1C22` | Text, the mark |
| Signal accent | `#FF5A36` | The grabbed layer, the period, links/CTAs (use sparingly) |
| Paper | `#F7F4EE` | Warm off-white background |

Deliberately **not** the AI-cliché purple-gradient-on-white.

**Voice in copy:** declarative, dated, plain. *"As of June 2026, …"* Lead every page with the claim.

**Files delivered:** `grabstack-logo.svg` (lockup) and `grabstack-icon.svg` (mark). Drop both in `/public`. On dark backgrounds, recolour the ink to paper; the accent stays. The wordmark uses a placeholder system font — pick a final brand typeface and outline it for production. From the icon, export a `favicon.ico` and a 1200×630 `og-image.png`.

---

*Build the machine with Claude Code. Keep the judgment human. Date everything. Make statements.*
