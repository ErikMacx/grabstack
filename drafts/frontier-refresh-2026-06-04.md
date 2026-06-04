# Frontier Refresh — 2026-06-04 (weekly)

## Headlines

1. **Microsoft Build drops seven in-house MAI models** — MAI-Thinking-1 (reasoning, 35B active params, matches Opus 4.6 on coding) and MAI-Code-1-Flash (5B, rolling into Copilot) headline the batch. Microsoft is openly diversifying away from OpenAI dependency. (CNBC, 2 Jun; microsoft.ai, 2 Jun) ⚡ DYNAMITE
2. **Windsurf is dead, long live Devin Desktop** — Cognition retired the Windsurf brand on 2 Jun; OTA update made the Agent Command Center the default surface with ACP (Agent Client Protocol) support. Cascade replaced by Devin Local (Rust rewrite, 30% more token-efficient). (devin.ai blog, 2 Jun) ⚡ DYNAMITE
3. **GitHub Copilot flips to usage-based billing** — Flex billing live 1 Jun. New Copilot Max tier at $100/mo (20K credits). Early reports of developers burning through allotments faster than expected. (GitHub Blog, 1 Jun) ⚡ DYNAMITE
4. **MiniMax M3 ships as first open-weight frontier coder with 1M context + native multimodality** — Tops open-weight SWE-Bench Pro at 59.0%; claims to match GPT-5.5 at 5–10% of the cost. Open weights due in ~10 days. (VentureBeat, 1 Jun; minimax.io blog, 1 Jun) ⚡ DYNAMITE
5. **Claude Opus 4.8 lands** — Released 28 May; modest gains over 4.7 in agentic coding, reasoning, honesty. 84% on Online-Mind2Web (strongest computer-use score tested). New Claude Code "dynamic workflows" feature. Same pricing. (Anthropic, 28 May)
6. **Meta leaks aggressive wearable roadmap** — Four new smart glasses models (Modelo as early as June, Luna + RBM2 Refresh in autumn, Mojito VIP in December) plus an AI pendant built on acquired Limitless tech. Target: 10M units in H2 2026. (Engadget, 1 Jun; Android Headlines, 2 Jun) ⚡ DYNAMITE
7. **Perplexity publishes DRACO benchmark** — Open-source deep-research evaluation across 10 domains; Perplexity's own Deep Research tops all domains tested, notably Law (89.4%) and Academic (82.4%). (research.perplexity.ai; Hugging Face, late May)
8. **ElevenLabs Music v2 launches** — Genre-switching mid-track, section-by-section composition, inpainting. Pricing cut 40–50%. ElevenLabs at $500M ARR. (Memeburn, late May; PYMNTS, May)

---

## Per-Category Findings

### Frontier Models (LLMs)

| What | Who | When | Source |
|---|---|---|---|
| Claude Opus 4.8 released — agentic coding + honesty gains, dynamic workflows in Claude Code | Anthropic | 28 May | anthropic.com |
| MAI-Thinking-1 — 35B reasoning model, 97% AIME 2025, preferred over Sonnet 4.6 in blind evals; trained from scratch on licensed data | Microsoft | 2 Jun | microsoft.ai |
| MiniMax M3 — open-weight, 1M context, frontier coding (SWE-Bench Pro 59.0%), native multimodality | MiniMax | 1 Jun | VentureBeat |
| Qwen3-Coder-Next released | Alibaba/Qwen | 3 Jun | llm-stats.com |
| MiniMax M2.5 Highspeed, M2.7 Highspeed, M2.7 released | MiniMax | 3 Jun | llm-stats.com |

**Update lines:**
- `claude-opus-4-8.md` — Add: "84% Online-Mind2Web (best computer-use score tested); dynamic workflows in Claude Code." Updated 28 May.
- `gpt-5-5.md` — No change this week.
- `gemini-3-1-pro.md` — No change this week.

**New candidate:** MiniMax M3 — first open-weight model combining frontier coding + 1M context + multimodality. Merits its own entry if benchmarks hold after independent verification.

---

### Coding Agents

| What | Who | When | Source |
|---|---|---|---|
| Windsurf rebranded to Devin Desktop; Agent Command Center default, ACP support, Devin Local replaces Cascade (Rust rewrite) | Cognition | 2 Jun | devin.ai |
| GitHub Copilot flex billing live; new Max tier $100/mo with 20K credits | GitHub | 1 Jun | github.blog |
| MAI-Code-1-Flash (5B params) rolling into Copilot model picker in VS Code | Microsoft | 2 Jun | microsoft.ai |
| Microsoft cancels internal Claude Code licenses, pushes engineers to Copilot CLI | Microsoft | late May | opentools.ai |

**Update lines:**
- `windsurf.md` — ⚠️ STALE: Windsurf brand no longer exists. Rename entry to "Devin Desktop" or merge with `devin-2-0.md`. Update claim: "Formerly Windsurf. Agent Command Center as default surface, ACP support, Devin Local (Rust rewrite replacing Cascade)."
- `devin-2-0.md` — Update to reflect Devin Desktop merger; Devin is now both cloud agent + desktop IDE.
- `github-copilot.md` — Update: "Flex billing live 1 Jun; new Max tier $100/mo (20K credits). MAI-Code-1-Flash rolling into model picker."
- `cursor.md` — No change this week.

---

### Image Generation

| What | Who | When | Source |
|---|---|---|---|
| No major new model releases this week | — | — | — |
| Flux 2 Pro seeing broader platform adoption (presets, easier self-hosting) | Black Forest Labs | ongoing | aiflashreport.com |

**Update lines:**
- `midjourney-v8-1.md` — No change.
- `flux-2.md` — No change.
- `ideogram-3-0.md` — No change.
- `gpt-image-2.md` — No change.

---

### Video Generation

| What | Who | When | Source |
|---|---|---|---|
| No new launches this week; Kling 3.0 leads text-to-video arena (score 2127) | Kling | ongoing | llm-stats.com |
| Sora API deprecation remains on track for 24 Sep | OpenAI | confirmed | openai.com |

**Update lines:**
- `sora-2.md` — No change (already marked deprecated).
- `kling-3-0.md` — Add arena score 2127 if not already noted.
- `veo-3-1.md` — No change.

---

### Voice & Music

| What | Who | When | Source |
|---|---|---|---|
| ElevenLabs Music v2 — genre-switching, section-by-section, inpainting; pricing cut 40–50% | ElevenLabs | late May | Memeburn |
| ElevenLabs hits $500M ARR | ElevenLabs | Apr 2026 | PYMNTS |
| Sony Music still litigating against Suno and Udio; pivotal fair-use ruling expected this summer | Sony/Suno/Udio | ongoing | Decrypt |

**Update lines:**
- `elevenlabs-eleven-music.md` — Update: "Music v2: genre-switching mid-track, section-by-section composition, inpainting. Pricing cut 40–50%. $500M ARR."
- `suno-v5.md` — No change.

---

### Search & Research

| What | Who | When | Source |
|---|---|---|---|
| Perplexity publishes DRACO benchmark (open-source, 10 domains, 100 tasks) | Perplexity | late May | research.perplexity.ai |
| Deep Research upgraded for Max users; Pro rollout next | Perplexity | late May | gadgetbond.com |
| Google information agents (autonomous background monitoring) confirmed for summer 2026 with AI Pro+ | Google | 19 May (I/O) | blog.google |

**Update lines:**
- `perplexity.md` — Update: "Published DRACO benchmark; Deep Research upgraded (tops all 10 domains tested). 170M monthly visits (Apr)."
- `chatgpt-deep-research.md` — No change.
- `gemini-deep-research-max.md` — No change.

---

### Work Agents / Computer Use

| What | Who | When | Source |
|---|---|---|---|
| Microsoft Build introduces "Autopilots" — always-on agents with their own Entra ID | Microsoft | 2 Jun | blogs.microsoft.com |
| Microsoft IQ stack: Work IQ (GA 16 Jun), Web IQ, Foundry IQ, Fabric IQ Ontology | Microsoft | 2 Jun | news.microsoft.com |
| ChatGPT Workspace Agents: credit-based pricing live since 6 May, EKM support since 7 May | OpenAI | May | openai.com |

**Update lines:**
- `chatgpt-workspace-agents.md` — No change (credit pricing already noted).
- `operator.md` — No change.
- `manus-desktop.md` — No change. Note: China blocked Meta acquisition (Apr 2026); ownership uncertain.

**New candidate:** Microsoft Autopilots — new category of always-on agents with governed identity. Watch for GA timeline.

---

### Assistants & Wearables

| What | Who | When | Source |
|---|---|---|---|
| Meta leaks 4 new smart glasses models + AI pendant (Limitless-based) | Meta | 1–2 Jun | Engadget, Android Headlines |
| iFlytek AI Glasses launched at BEYOND Expo 2026 — real-time translation, lip-movement noise reduction | iFlytek | early Jun | biometricupdate.com |
| Apple AI glasses delayed to late 2027; Vision Air to 2029 | Apple | 1 Jun | explosion.com |

**Update lines:**
- `limitless-bee.md` — Update: "Meta pendant (based on Limitless tech) entering testing; four smart glasses models planned for H2."
- `ray-ban-meta.md` — Flag: Modelo as early as June; broader lineup coming.
- `even-realities-g2.md` — No change.
- `apple-glasses-n50.md` — Update if not already noted: delayed to late 2027.

---

### Writing & Content

No major tool launches this week. Steady-state for Notion AI, Jasper, ChatGPT Record.

---

### Design

| What | Who | When | Source |
|---|---|---|---|
| Figma embeds AI assistant directly in design canvas (natural language layout generation, batch variations) | Figma | late May/early Jun | yourstory.com |

**Update lines:**
- No existing Figma entry to update. Consider adding if the embedded AI agent proves durable.

---

### Data & Analytics

No category-moving launches this week. Microsoft Discovery GA'd at Build (enterprise agentic AI for science workflows).

---

### Developer Tools

| What | Who | When | Source |
|---|---|---|---|
| Microsoft Build: Work IQ APIs (GA 16 Jun), Web IQ (MCP-native web grounding), DGX Station for Windows (Q4) | Microsoft | 2 Jun | news.microsoft.com |
| Microsoft Discovery GA — enterprise agentic AI for full science workflow | Microsoft | 2 Jun | news.microsoft.com |
| Anthropic Claude Agent SDK — TS + Python toolchain for MCP servers + sub-agents | Anthropic | recent | devflokers.com |

**Update lines:**
- No direct entries to update. Microsoft Build announcements largely hit work-agents and coding-agents categories.

---

## New Candidates for Frontier

| Candidate | Category | Why it matters | Watch for |
|---|---|---|---|
| **MiniMax M3** | frontier-models | First open-weight frontier coder + 1M context + multimodality; claims parity with GPT-5.5 at 5–10% cost | Independent benchmark verification; open-weight release (~10 days) |
| **MAI-Thinking-1** | frontier-models | Microsoft's first from-scratch reasoning model; 35B params, matches Opus 4.6 on coding, 97% AIME 2025 | Enterprise adoption via Azure/Foundry; how it performs vs Claude/Gemini in real-world agentic tasks |
| **MAI-Code-1-Flash** | coding-agents | 5B coding model rolling into Copilot; competes with Haiku on cost | Whether it actually improves Copilot completions in practice |
| **Microsoft Autopilots** | work-agents | Always-on agents with governed Entra identity; new category at Build | GA date; real-world deployment patterns |
| **Devin Desktop (ex-Windsurf)** | coding-agents | Merged brand now covers both cloud agent + local IDE; ACP protocol | Community reaction; whether ACP gains traction as an open standard |
| **iFlytek AI Glasses** | hardware | Chinese competitor with real-time translation + lip-movement noise reduction | Availability outside China |

---

## Stale Flags

| Entry | Issue | Action |
|---|---|---|
| `windsurf.md` | ⚠️ Brand no longer exists — rebranded to Devin Desktop on 2 Jun | Rename to `devin-desktop.md` or merge into `devin-2-0.md` |
| `devin-2-0.md` | Now encompasses both cloud Devin + desktop IDE (ex-Windsurf) | Update to reflect unified Devin brand |
| `github-copilot.md` | Metrics show "$10/mo" — now variable with flex billing; Max tier at $100/mo | Update pricing and billing model |
| `perplexity.md` | ARR listed as ~$450M — ElevenLabs (different company) at $500M ARR; Perplexity's traffic is 170M visits/mo (Apr) | Verify current ARR figure |
| `elevenlabs-eleven-music.md` | Music v2 shipped; pricing cut 40–50%; $500M ARR not reflected | Update |
| `manus-desktop.md` | Maker listed as "Manus" — Meta acquisition blocked by China (Apr 2026); ownership uncertain | Update maker/status to reflect blocked acquisition |

---

*Every claim above is sourced and dated. No updates were invented. Refresh window: 28 May – 4 Jun 2026.*
