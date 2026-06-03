# GrabStack — Sections & IA (source of truth)

*Updated 3 June 2026. Canonical. **SIX top-level headers.** Frontier is the hero; Landscape is its macro companion — distinct, not merged. Supersedes all prior versions, including the live seven-item nav.*

**Tagline:** Signal, not noise — the living guide to AI tools, agents and stacks.

**Vision:** To be the clearest vantage point on the AI world — a refined, structured, current view, because it's hard to see otherwise.

**Mission:** GrabStack helps you work the AI coalface *and* read the forces shaping it — so you can choose the right tools, build the right stacks, and pilot great teams of agents.

---

## The six headers (this is the rule)

In priority order, news mid-pack, with each subheading saying exactly what's behind the click:

| Header | Subheading |
|---|---|
| **Frontier** | The leading edge, explained — the apps, models and software at the cutting edge, and how to find the gold. |
| **Landscape** | The forces shaping AI — the trends, debates and challenges, ranked and re-rankable by lens. |
| **The Wire** | Dated AI news — what just launched, shipped, or shut down. |
| **Apps** | The full, searchable list of every major AI application. |
| **Stacks** | Tool combinations that work together — curated by profession and industry. |
| **Learning** | What to learn, and in what order — courses, programmes and concepts mapped to the competency you need. |

**Nav:** `Frontier · Landscape · The Wire · Apps · Stacks · Learning` — with **About** and **Glossary** in the corner, plus the status-views (**Capitals**, **Cemetery**) reachable from the footer. Never more than six in the top nav.

---

## The spine — why this exists

Two kinds of knowledge make you good at AI, and you need **both**:

- **The coalface — Frontier (the hero).** Which tools, today, and how to find the gold.
- **The seismograph — Landscape.** Which way the macro forces blow.

You read the headwinds (Landscape) *so that* you can sail the clipper (Frontier). Building or piloting a great team of agents needs both at once — the through-line into the C-suite-agents work.

---

## The clean trio (no blur between the three "current" surfaces)

- **The Wire** reports the event — *"X shipped."*
- **Frontier** shows the coalface — *"here's X, what it does, how to find the gold."*
- **Landscape** synthesises the forces — *"here's the shift X is part of, and why it matters."*

---

## The sections

**1. Frontier — THE HERO.** The coalface: the cutting-edge apps, models and software where the action is, daily — and how to find the gold (~56 spearhead tools). A filterable, leading-edge view of the `tools` collection. *(Renamed from the live "The Map".)*

**2. Landscape — the macro seismograph.** The forces shaping AI as a **STEEPLE** scan of the live debates, ranked and re-rankable by lens. *Already built — leave it intact.*

**3. The Wire — news.** Dated flashes: what launched, shipped, or shut down.

**4. Apps — the full catalogue.** Every major AI application, searchable — the full `tools` collection. *(Renamed from the live "The List".)*

**5. Stacks — by profession.** Tool combinations that work together, curated by profession and industry.

**6. Learning — by competency.** What to learn and in what order: courses, programmes and concepts mapped to the competency you need. **Home of the Agent Taxonomy** (cornerstone page), cross-linked from Frontier (where people first meet agents) and Stacks (where you compose teams by role). *(Absorbs the live "Routes"; the live "Terrain" retires — its kinds-of-models explainer moves here / to Frontier, and its label clashed with "Landscape".)*

**Corner / footer:** **About** (who's behind GrabStack — Eric McLean — and how we judge; renamed from "Method"), **Glossary**, and the status-views (**Capitals**, **Cemetery**).

---

## The Landscape, in detail

A **STEEPLE** scan of AI's live debates — the complete macro frame, so nothing's missing:

| Letter | Dimension | Covers |
|---|---|---|
| **S** | Social | jobs, AI companions / youth, everyday life |
| **T** | Technological | scaling, architecture, reasoning, AGI timelines |
| **E** | Economic | the bubble, the ROI paradox, moats, the capital bet |
| **E** | Environmental | energy demand, the power wall, the data-centre footprint |
| **P** | Political | US–China, export controls, the geopolitics of open weights |
| **L** | Legal | regulation, the EU AI Act, liability, copyright — **standalone** |
| **E** | Ethical | safety, misuse, existential risk, protection of vulnerable users |

**The mechanic:** the same debates re-rank under audience **lenses** (Overall, Business Imperative, Building Agents, …); a chip shows how far each climbs or falls vs Overall. Battlegrounds answer *what kind of force*; lenses answer *whose eyes*.

**Discipline:** editorial weightings (0–100 per lens), dated "as of", sourced, with a review-by. The most perishable thing on the site — refresh on cadence.

---

## Principles

- Everything dated, with a review-by. Mark what's stale; never quietly rewrite history.
- Judgment over listing — a view, not a neutral directory.
- A named, accountable author.
- Outbound links carry `?ref=grabstack`.
- Built to be cited: answer-first, self-contained, dated.
- *Signal, not noise* governs the whole experience — including a six-header menu, never more.

## Design & readability (the rulebook)

The site is a clear view of a noisy world, so it must be a pleasure to read. These are rules, not preferences.

**Contrast — WCAG AA, measured:**
- Body text ≥ 4.5:1 against its background; aim 7:1 (AAA) on long-form prose.
- Dark-surface tokens (page bg `#1A1C22`): primary text `#ECE8E0` (~14:1), secondary/labels `#B7B2A8` (~8:1). Never set body text fainter than ~`#9A958C`. Accent `#FF5A36` is for emphasis only, never running prose.
- Raised surfaces (cards, the Landscape info box): `#23262F` — a shade lighter than the page. **Elevation, never inversion. No black→white flips.**

**Type:**
- Prose in a readable body face. Monospace is an accent — labels, data, specs, code only. Never set sentences in mono.
- Scale: body 16px, line-height ~1.6, measure 60–75 characters; labels 13–14px; nothing below 12px; two–three weights max.
- One type system, applied site-wide via tokens in `global.css`.

**Layout & feel:**
- Stage complexity: overview first, detail on demand (the Landscape's operating model).
- Whitespace and restraint: small palette, orange sparingly, room to breathe.
- Gentle, purposeful motion; honour `prefers-reduced-motion`. No jarring transitions.
- Six headers in the top nav, never more.

**Verify before every deploy:**
- Lighthouse (Accessibility + Performance) and the WebAIM contrast checker — no AA failure ships.
- Felt check: read a full Landscape debate on a phone, at night; squint test for hierarchy.

## Parked (later)

- **C-suite AI agents** — interim C-suites assembled by competency; a conjoined sister site. The destination both the coalface and the seismograph serve.
- **Standing-query pages with live cadence badges** — once the engine runs reliably.
