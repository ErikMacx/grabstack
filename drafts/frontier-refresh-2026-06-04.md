# Frontier Refresh — 2026-06-04 (weekly)

**Period:** May 28 – June 4, 2026
**Cadence:** Weekly (Steps 1, 2, 4, 5 — category briefs skipped)
**Status:** DRAFT — pending editorial sign-off. Nothing auto-publishes.

---

## 1. Headlines

1. **Anthropic ships Opus 4.8 and files for IPO.** SWE-bench Pro jumps to 69.2 %; dynamic workflows enable hundreds of parallel subagents in Claude Code. Anthropic filed a confidential S-1 on June 1 at a reported ~$965 B valuation. (Anthropic newsroom, May 28; CBS News, June 1)
2. **Microsoft Build drops seven MAI models and Scout.** MAI-Thinking-1 is Microsoft's first in-house reasoning model (no OpenAI data); MAI-Code-1 now powers GitHub Copilot; Scout is an always-on personal agent across M365. Marks a decisive break from OpenAI dependency. (Microsoft AI, June 2)
3. **Cognition raises $1 B at $26 B, kills the Windsurf brand.** Windsurf becomes "Devin Desktop" (OTA update June 2), with Devin Local rewritten in Rust and Agent Client Protocol (ACP) support. ARR hit $492 M (1,230 % YoY). (Cognition blog, June 2; TechCrunch, May 29)
4. **Suno raises $400 M at $5.4 B; ElevenLabs crosses $500 M ARR.** The AI music arms race intensifies — and so do the copyright lawsuits. Record labels allege 61,000+ additional songs in Suno's training set. (TechCrunch, June 4; ElevenLabs blog, May 6)
5. **Ideogram 4.0 goes open-weight.** 9.3 B-param diffusion transformer released on Hugging Face (Apache 2.0 code, non-commercial model license). Tops the open-weight DesignArena leaderboard. (Ideogram, June 3)

---

## 2. Per-Category Updates

---

### Frontier Models

| Entry | Status | Update |
|---|---|---|
| **Claude Opus 4.8** (Anthropic) | flagship | **May 28:** Opus 4.8 released. SWE-bench Verified 88.6 %, SWE-bench Pro 69.2 %. Leads Artificial Analysis Intelligence Index at 61.4. Dynamic workflows (parallel subagents), effort controls, fast mode at 2.5× speed / 3× cheaper. Pricing steady $5/$25 per 1 M tokens. Anthropic filed confidential S-1 on June 1 (~$965 B valuation, ~$47 B annualised revenue). Partial outage June 2. (Anthropic newsroom; CBS News; Axios) |
| **GPT-5.5** (OpenAI) | everyday-default | **Late May:** GPT-5.5 Instant update rolled out — cleaner formatting, reduced bullet-heavy output, memory/personalisation expanding to Plus/Pro. GPT-4.5 sunset announced for June 27. A Codex log briefly referenced "gpt-5.6" before being scrubbed — not confirmed. (OpenAI blog; BleepingComputer; WaveSpeed) |
| **Gemini 3.1 Pro** (Google) | top-ranked | No material model change. Legacy preview endpoints (gemini-3.1-flash-image-preview, gemini-3-pro-image-preview) shutting down June 25. Gemini 3.5 Pro (2 M context, Deep Think) expected late June but not yet GA. (Google AI changelog) |
| **Grok 4 / 4.20** (xAI) | active | **May 28:** Grok Build 0.1 entered public API beta — dedicated coding model, 256 K context. Grok Connectors launched (SharePoint, Outlook, Google Workspace, Notion, GitHub, Linear, custom MCP). Quality Mode added to Grok Imagine API. xAI–Cloudflare partnership confirmed June 4. (Axios; xAI docs; CIO Dive) |
| **DeepSeek V4** (DeepSeek) | open-weight | No material change. V4-Pro/Flash remain in preview. Legacy aliases (deepseek-chat, deepseek-reasoner) retire July 24. (DeepSeek API docs) |
| **Llama 4.1** (Meta) | open-weight | **⚠ CORRECTION:** "Llama 4.1" does not exist. Meta's frontier model is now **Muse Spark** (launched Apr 8, proprietary — not open-weight). Llama 4 family (Scout, Maverick) is April 2025 vintage. **Proposal:** Rename entry to "Muse Spark (Meta)", change status from open-weight to active, update claim. (VentureBeat; Meta AI blog) |
| **Qwen 3.5** (Alibaba) | open-weight | **⚠ SUPERSEDED:** Qwen 3.7-Plus launched June 2 on Bailian — multimodal (image + video), deep reasoning, 1 M context, 60 % cheaper than prior Qwen3.7-Max. It is **proprietary** (API-only). Alibaba stock surged 6 %+. **Proposal:** Update entry to "Qwen 3.7-Plus (Alibaba)", flag shift from open-weight to proprietary. (MarkTechPost; VentureBeat) |
| **GLM-5.1** (Zhipu) | open-weight | No material change since March 27 launch / April 8 open-source release. (Pandaily) |
| **Kimi K2.6** (Moonshot) | open-weight | No material change since April 20 GA. Agent Swarm / 300 sub-agents claim stable. (MarkTechPost; Artificial Analysis) |

**New Candidate — Frontier Models:**

| Candidate | What it does | Dynamite Test | Proposed stub |
|---|---|---|---|
| **MiniMax M3** | Open-weight model (released June 1) combining frontier-level coding, 1 M context, and native multimodality. Novel Sparse Attention architecture — 20× less per-token compute at 1 M context. 59.0 % SWE-Bench Pro (beats GPT-5.5, approaches Opus 4.7). $0.30/$1.20 per 1 M tokens. | ✓ New capability (open-weight + 1 M + multimodal unique combo). ✓ Game-changing for open-weight builders. ✓ Contested (benchmarks run on own infra, independent verification pending). ✓ Opportunity + risk. ✓ Moving. ✓ Matters. | Category: frontier-models. Status: open-weight. (VentureBeat; Pandaily; SCMP) |
| **MAI-Thinking-1** (Microsoft) | Microsoft's first in-house reasoning model (June 2, Build). 35 B active / ~1 T MoE, 256 K context. Trained from scratch, zero distillation, no OpenAI data. 97.0 % AIME 2025, 94.5 % AIME 2026. Private preview on Foundry. | ✓ New capability (genuine Microsoft-native reasoning). ✓ Game-changing (proves Microsoft can build independently). ✓ Highly contested (Microsoft–OpenAI rivalry). ✓ Opportunity + risk. ✓ Moving. ✓ Matters. | Category: frontier-models. Status: beta. (Microsoft AI; CNBC; Neowin) |

---

### Coding Agents

| Entry | Status | Update |
|---|---|---|
| **Claude Code** (Anthropic) | top-ranked | **May 28:** Powered by Opus 4.8 — SWE-bench Pro 69.2 %, Verified 88.6 %. Dynamic workflows, parallel subagents. Fast mode 3× cheaper. Auto mode on Bedrock/Vertex/Foundry. New billing overhaul June 15: agent SDK / headless / GH Actions move to separate credit pool ($20 Pro / $100 Max 5× / $200 Max 20×) at full API rates. (Anthropic; Simon Willison; GitHub releases) |
| **Cursor** (Cursor) | category-leader | **June 3:** Enterprise multi-team management GA (separate security/governance/budgets). New pricing: Standard $32/seat/mo, Premium $96/seat/mo (annual). **Pending:** SpaceX plans $60 B acquisition post-IPO (expected close July). (Cursor changelog; The Next Web) |
| **Devin 2.0** (Cognition) | active | **May 27–28:** $1 B+ Series D at $26 B valuation (Lux Capital, General Catalyst, 8VC). ARR $492 M (1,230 % YoY). Enterprise customers: Goldman Sachs, Citi, Mercedes-Benz, NASA. (TechCrunch) |
| **Windsurf** (Cognition) | active | **June 2: Rebranded to Devin Desktop** (OTA update). Devin Local (Rust rewrite, 30 % more token-efficient, subagents). Agent Command Center (Kanban). Spaces (shared context). Agent Client Protocol (ACP) support — adopted by JetBrains, Google, GitHub, 25+ agents. **Proposal:** Rename file to `devin-desktop.md`, update name/claim. (Cognition blog) |
| **GitHub Copilot** (GitHub) | active | **June 1:** Usage-based billing live — all plans on GitHub AI Credits. Opus models removed from $10 Pro. **June 3:** VS Code Agents window in Stable (preview), `/chronicle` command for standups. MAI-Code-1 now rolling out as a model option. (GitHub changelog) |
| **Cline / Aider / OpenHands** | open-weight | **May 15:** Roo Code archived (read-only), recommending Cline as migration path. OpenHands added sub-agent delegation and inline verification UI. Aider added Gemini 2.5 support. Cline stable at ~62 K GitHub stars. (Nerova; OpenHands blog) |
| **OpenAI Codex** (OpenAI) | active | **Late May:** Persisted `/goal` workflows, MultiAgentV2 config. **Codex Sites launched (preview):** deploy web apps directly from Codex. 6 new business plugins (sales, data, creative, design, equity, IB). Codex expanding into ChatGPT app "in the next few weeks." (OpenAI Codex changelog; 9to5Mac) |
| **Google Antigravity 2.0** (Google) | active | No new changes. **Upcoming deadline:** Gemini CLI retirement June 18 — must migrate to Antigravity CLI. (Google Developers Blog) |

**New Candidate — Coding Agents:**

| Candidate | What it does | Dynamite Test | Proposed stub |
|---|---|---|---|
| **Grok Build** (xAI) | CLI coding agent ($300/mo) with up to 8 parallel sub-agents and "Arena Mode." Local-first (no source code transmitted). Launched May 14 beta, expanded May 25 to SuperGrok/X Premium+. | ✓ New capability (xAI entering CLI agents). ✓ Positions xAI as third major CLI agent player alongside Anthropic and OpenAI. ✓ Contested (pricing, trust). ✓ Moving. ✓ Matters. | Category: coding-agents. Status: beta. (eWeek; Engadget) |

---

### Image Generation

| Entry | Status | Update |
|---|---|---|
| **Midjourney v8.1** | category-leader | **May 27:** Web platform update added "Rerun as HD" for v8.1 and improved conversational/voice mode. No new model version. (Midjourney updates) |
| **Nano Banana Pro** (Google) | top-ranked | **May 29:** Nano Banana Pro and Nano Banana 2 reached GA via Gemini Enterprise Agent Platform. Nano Banana 2 gained video-file-as-input. **Deadline:** Google shuts legacy Imagen models June 24. (Google Cloud Blog) |
| **GPT Image 2** (OpenAI) | active | No material change. Stable since April launch. (OpenAI changelog) |
| **FLUX.2** (Black Forest Labs) | open-weight | No material change. (VentureBeat) |
| **Recraft V4** | active | **⚠ UPDATE:** Recraft V4.1 shipped May 14 (cleaner photorealism, better object understanding, 3D rendering). **May 30:** V4.1 Utility Pro announced as highest-ranked text-to-image model outside Google and OpenAI on Artificial Analysis. **Proposal:** Update entry name to "Recraft V4.1". (Recraft blog) |
| **Ideogram 3.0** | active | **⚠ MAJOR:** Ideogram 4.0 released June 3 with **open weights** (9.3 B params) on Hugging Face. Single-stream Diffusion Transformer + Qwen3-VL-8B encoder. Native 2K, transparent backgrounds, bounding-box layout, structured JSON captions. Apache 2.0 code / non-commercial model license. Tops open-weight DesignArena leaderboard. **Proposal:** Update entry to "Ideogram 4.0", status to open-weight. (Ideogram; The Decoder; GitHub) |
| **Adobe Firefly** | active | No material change. Incremental Photoshop updates only. (Adobe Firefly changelog) |

**New Candidates — Image Generation:**

| Candidate | What it does | Dynamite Test | Proposed stub |
|---|---|---|---|
| **MAI-Image-2.5** (Microsoft) | Debuted June 2 at Build, entered #3 on Artificial Analysis Text-to-Image Arena (Elo 1,254). First MAI-Image model to support editing alongside generation. Live in PowerPoint Copilot. | Moderate pass — significant as part of Microsoft's independence push. Could be folded into the Microsoft 365 Copilot entry as context rather than standalone. | Category: image-generation. Status: active. (Microsoft AI; Neowin) |
| **NVIDIA Cosmos3-Super** | 64 B open-source text-to-image model (~June 3). #4 on Artificial Analysis arena (Elo 1,239). Leading open-source image model. | Moderate pass — important for open-source image generation but early. | Category: image-generation. Status: open-weight. (NVIDIA blog; Hugging Face) |

---

### Video Generation

| Entry | Status | Update |
|---|---|---|
| **Veo 3.1** (Google) | category-leader | New "Ingredients to Video" feature (generate from reference images, native vertical output). Veo 3.1 Lite at $0.05/sec (< 50 % of Veo 3.1 Fast). Free generation for all Google accounts. (Google Blog) |
| **Seedance 2.0** (ByteDance) | top-ranked | **May 28:** Now available via Runway API (text-to-video, image-to-video, video-to-video, keyframe control, 4–15 s). (Runway release notes) |
| **HappyHorse** (Alibaba) | top-ranked | No material change. Still leads Artificial Analysis Text-to-Video Arena with audio (Elo 1,213). Promo pricing (40–60 % off) through June 30. (Artificial Analysis) |
| **Kling 3.0** (Kuaishou) | active | No model update. **May 12:** Board evaluating restructuring plan for KLING AI assets (potential spin-off/partial sale). (Kuaishou IR) |
| **Runway Gen-4.5** | active | No material change. Noteworthy: Runway now distributes third-party models (Seedance 2.0 added). Gen-4.5 no longer #1 on Artificial Analysis text-to-video. (Runway) |
| **Sora 2** (OpenAI) | deprecated | No change. API shutdown Sep 24 on schedule. |
| **Pika / Luma Ray3 / Hailuo** | active | No material change. Pika 2.5, Luma Ray3.14, Hailuo 2.3 current. |
| **HeyGen / Synthesia** | active | No material change. HeyGen Avatar V (15 s clones, 175+ languages) from May stable. |

**New Candidate — Video Generation:**

| Candidate | What it does | Dynamite Test | Proposed stub |
|---|---|---|---|
| **Grok Imagine Video 1.5** (xAI) | #1 on Artificial Analysis Image-to-Video Arena (Elo 1,404, May 31). Native synced audio, 720p/24fps, 6–15 s, $0.08/sec. Claims #1 across all three DesignArena video categories. | ✓ New capability (xAI entering video gen at #1). ✓ Game-changing for image-to-video. ✓ Contested (new entrant at the top). ✓ Moving. ✓ Matters. | Category: video-generation. Status: active. (xAI docs; Basenor) |

---

### Voice and Audio

| Entry | Status | Update |
|---|---|---|
| **ElevenLabs / Eleven Music** | active | **June 2:** Music v2 model — better vocals/instrumentation, inpainting, API pricing cut up to 50 %. Crossed $500 M ARR (announced May 6). Series D extension adds BlackRock, NVIDIA, Wellington, Santander. Warsaw hub expansion. Stan Lee voice licensed for Iconic Marketplace. (ElevenLabs blog; Variety; Bloomberg) |
| **Suno (v5)** | category-leader | **June 4:** $400 M Series D at **$5.4 B valuation** (up from $2.45 B). Suno v5.5 (Mar 26) is current — voice cloning, Studio DAW. CarPlay/Android Auto launched May 13. **Legal:** Record labels allege 61,000+ additional unlicensed songs. **Proposal:** Update valuation to $5.4 B and note v5.5 as current. (TechCrunch; Music Business Worldwide) |
| **Udio** | active | **Warner Music Group settlement completed** (following Universal). Licensed platform launching 2026. Also struck Kobalt deal. **Admitted scraping YouTube audio** for training in Sony lawsuit filing. No new model version. (Hollywood Reporter; Music Business Worldwide) |
| **Play.ht / Resemble AI / Descript** | active | **⚠ CORRECTION: Play.ht permanently shut down Dec 31, 2025.** All endpoints dead. Resemble AI added Speech-to-Speech and deepfake detection. Descript launched API in open beta (May), Underlord now uses reasoning models, AI video gen from text prompts. **Proposal:** Remove Play.ht, update entry to "Resemble AI / Descript". (Descript; Newsfilecorp) |

---

### Search and Research

| Entry | Status | Update |
|---|---|---|
| **Perplexity** | category-leader | **June 2:** Hybrid AI computing platform announced (with Intel) — auto-distributes between on-device and cloud models, rollout July. CEO says Perplexity tripled annualised revenue since start of year. Comet browser iOS update (phone actions, iPad sidebar, Finance Deep Dive). Comet now on all platforms + Samsung Internet; Enterprise via MDM. (Bloomberg; CNBC; 9to5Mac) |
| **ChatGPT Deep Research** (OpenAI) | active | Slack connector now supports Deep Research. MCP integration added (connect to any MCP server, restrict searches to trusted sites, real-time progress). GPT-5.5 Instant is new default (52.5 % fewer hallucinations). (OpenAI Help Center) |
| **Gemini Deep Research Max** (Google) | active | Deep Research and Deep Research Max now in **public preview** via paid Gemini API tiers. MCP support and native visualisations added. (Google Blog) |
| **Grok DeepSearch** (xAI) | active | Connectors launched in Grok Web — SharePoint, Outlook, Google Workspace, Notion, GitHub, Linear, custom MCP. Enables end-to-end workflows. Custom Skills added for reusable automation. (xAI; Basenor) |

---

### Work Agents and Automation

| Entry | Status | Update |
|---|---|---|
| **Claude Cowork** (Anthropic) | flagship | Opus 4.8 upgrades flow through. **Claude for Small Business launched:** 15 agentic workflows (finance, ops, sales, marketing, HR, CS). Effort control added. KPMG partnership (Cowork + Managed Agents in KPMG Digital Gateway). Outage June 2 (restored same day). (Anthropic; The Register) |
| **ChatGPT Workspace Agents** (OpenAI) | beta | Free period extended to **July 6** (credit-based pricing starts then). Codex expanding into ChatGPT app everywhere. 6 new business plugins. Codex Sites preview. (OpenAI; 9to5Mac) |
| **Microsoft 365 Copilot / Copilot Cowork** | active | Cowork now on **iOS and Android**. Claude Opus 4.8 available as model choice in M365 Copilot. Skills system and custom plugins launched. Agent 365 integration for governance. (Microsoft 365 Blog) |
| **Manus** | active | **China blocked Meta's $2 B acquisition** (May), citing national security. Deal status unresolved. No product update this week. (TechRadar) |
| **Genspark** | active | No change this week. Microsoft partnership (Apr 29) embedding Genspark agents in M365/Agent 365 is live. $250 M ARR; Series B expanded to $385 M. (BusinessWire) |
| **Beam AI / Hebbia** | active | **Hebbia:** SS&C Intralinks DealCentre AI integration announced May 26. Expanded Projects, finance-specific Skills/Agents. Beam AI: no change. (Hebbia blog) |

**New Candidate — Work Agents:**

| Candidate | What it does | Dynamite Test | Proposed stub |
|---|---|---|---|
| **Microsoft Scout** | Always-on personal agent ("Autopilot") across M365, built on OpenClaw + Work IQ. Proactive meeting prep, scheduling, routine tasks. Requires Frontier enrollment + Intune + Copilot license. Launched June 2 at Build. | ✓ New capability (autonomous personal agent in enterprise). ✓ Game-changing for M365 users. ✓ Contested (privacy, autonomy, lock-in). ✓ Opportunity + risk. ✓ Moving. ✓ Matters. | Category: work-agents. Status: beta. (Microsoft 365 Blog; Thurrott; TechCrunch) |

---

### Computer Use

| Entry | Status | Update |
|---|---|---|
| **Computer Use** (Anthropic) | active | **May 28:** Opus 4.8 lifts benchmarks — 84 % Online-Mind2Web, 83.4 % agentic computer use. Self-hosted sandboxes (public beta), MCP tunnels (research preview). (Anthropic) |
| **Operator** (OpenAI) | active | **⚠ CORRECTION:** Operator was sunsetted as a standalone product (merged into ChatGPT "agent mode" and the Atlas browser in July 2025). OSWorld 38.1 %. **Proposal:** Update claim to reflect it now lives inside ChatGPT, not as a separate product. (OpenAI) |
| **Project Mariner** (Google) | active | **⚠ SHUT DOWN May 4.** Visual-processing approach was compute-heavy and error-prone. Tech folded into Gemini Agent and Chrome auto-browse. **Proposal:** Move to Cemetery. (Android Headlines; Digital Trends) |
| **BrowserOS / Simular** | beta | BrowserOS v0.44.0 shipped AI-driven multi-tab operation, SOUL.md for agent personality, local long-term memory. Simular accepted into Microsoft's Windows 365 for Agents programme. (BrowserOS; TechCrunch) |
| **Manus Desktop** | active | No change. Current since March 16 launch. |

---

### Hardware

| Entry | Status | Update |
|---|---|---|
| **Ray-Ban Meta** (Meta) | active | **May 30:** Leaked internal memo reveals 4 new glasses models (Modelo as early as June; Luna and RBM2 Refresh in autumn; Mojito VIP in December) plus an **AI pendant**, targeting 10 M wearable units. "Wearables for Work" business subscription planned. (TechCrunch; Android Headlines) |
| **Brilliant Labs Halo** | active | No material change. |
| **Even Realities G2** | active | **May 13:** Partnership with IO Interactive — G2 appears as in-game gadget in *007 First Light* (shipped May 27). Terminal Mode (v2.2.0 Apr) lets devs monitor coding agents from glasses. (The Gadgeteer; Phandroid) |
| **Apple Glasses N50** | unreleased | **May 31:** Multiple leakers confirm launch pushed to **late 2027** (from early 2027). Siri readiness (needs iOS 27) cited as key blocker. Tim Cook reportedly treating it as top priority before handing CEO to John Ternus in September. (AppleInsider; 9to5Mac; Gizmodo) |
| **Omi** | active | No product change. Meta's pendant announcement raises competitive pressure. |
| **Plaud Note Pro** | active | No change. NotePin S and App 3.0 current. |
| **Galaxy Ring / Ultrahuman / Muse / Oura** | active | **May 28:** Oura Ring 5 pre-orders open, shipping June 4 ($399–$499). Health Radar, GLP-1 tracking. Oura filed confidentially for IPO May 21 (~$11 B valuation). Ultrahuman Ring Pro launched in US ($479). Samsung Galaxy Ring 2 reportedly delayed to early 2027. Muse Ring One 2.0 announced (blood-pressure, NFC payments). (Memeburn; StreetInsider; TheWearify) |
| **Limitless / Bee** | acquired | Limitless (Meta): pendants supported "at least another year," no new sales. Meta developing own pendant (spring 2027 target). **May 24:** Amazon's Bee hands-on — 4 major updates including "Actions" (voice-to-email/calendar). (TechCrunch) |

---

### Personal Agents

| Entry | Status | Update |
|---|---|---|
| **OpenClaw** | open-weight | **June 1:** Alpha 2026.6.1 — NVIDIA Skill Cards (trust artifacts), SkillSpector (AI risk scanner), stronger ClawHub verification. Earlier: File Transfer Plugin with default-deny paths. **Security concern:** March audit found 341 malicious skills / 2,857 on ClawHub (~12 % malware rate), 9 CVEs in 4 days. (Releasebot; Medium) |
| **NanoClaw / ZeroClaw / IronClaw / Hermes / NemoClaw / HiClaw** | open-weight | **Hermes Agent** (Nous Research) overtook OpenClaw on OpenRouter daily rankings (224 B tokens/day vs 186 B). Zero CVEs. "Curator" auto-refactoring. 0 to 110 K GitHub stars in 10 weeks — fastest-growing agent framework of 2026. NemoClaw enterprise production expected end of 2026. (Lushbinary; innfactory) |
| **Vellum** | active | No change. |
| **Perplexity Personal Computer** | beta | **May 7:** Exited waitlist — now available to **all Mac users** (Perplexity Max, $200/mo). Runs 24/7 on Mac mini, controllable from iPhone. **Proposal:** Update status from beta to active. (TechCrunch) |

---

### Meeting Productivity

| Entry | Status | Update |
|---|---|---|
| **Granola** | category-leader | No change this week. |
| **Fathom** | active | **June 2026:** Ask Fathom models upgraded (user identity awareness). Botless video recording in Zoom beta. Earlier: Fathom 3.0 (Apr 15) with bot-free mode, live summaries, MCP server. (Fathom; TechCrunch) |
| **Fireflies** | active | **May 21:** Chrome extension v6.3.1. No major feature change. |
| **Otter** | active | No product change. Privacy lawsuit hearing scheduled May 20. (UC Today) |
| **Microsoft Copilot / Zoom AI Companion** | active | **Copilot:** Call delegation for Teams Phone rolling to Frontier in June; Claude Opus 4.8 as model choice; organizers can delete meeting recordings. **Zoom (June 1):** Launched **ZoomMate** — agentic AI work surface with AI-generated presentations, automated execution in Salesforce/Jira/Slack/ServiceNow. Meeting notes now work across Google Meet, Teams, and WebEx. (Microsoft; Zoom) |
| **Notion AI / ChatGPT Record** | active | No change this week. |

---

## 3. Stale List

Entries last updated June 2 with **no material development found** and no clear near-term catalyst:

| Entry | Last Updated | Note |
|---|---|---|
| Adobe Firefly | 2026-06-02 | Incremental Photoshop integrations only. No new model. |
| BrowserOS / Simular | 2026-06-02 | Minor version bump. Category may be consolidating. |
| Manus Desktop | 2026-06-02 | No update since March launch. Acquisition blocked. |
| Notion AI / ChatGPT Record | 2026-06-02 | No significant move in meeting-notes space. |
| Vellum | 2026-06-02 | Quiet. No recent announcements. |

---

## 4. Dead Links / Corrections

| Entry | Issue | Action |
|---|---|---|
| **Project Mariner** (Google) | **Shut down May 4, 2026.** Tech folded into Gemini Agent / Chrome auto-browse. | Move to Cemetery. |
| **Operator** (OpenAI) | Standalone product sunsetted (merged into ChatGPT agent mode, July 2025). | Update claim; consider renaming to "ChatGPT Agent Mode". |
| **Play.ht** | **Permanently shut down Dec 31, 2025.** All endpoints dead. | Remove from entry "Play.ht / Resemble AI / Descript". |
| **Llama 4.1** (Meta) | Does not exist. Meta's frontier model is Muse Spark (proprietary). | Rename entry. |
| **Qwen 3.5** (Alibaba) | Two generations behind (3.5 → 3.6 → 3.7). Current is Qwen 3.7-Plus (proprietary). | Update entry. |
| **Sora 2** (OpenAI) | Already marked deprecated. API shutdown Sep 24 on schedule. | No action needed beyond tracking shutdown date. |

---

## 5. Proposed Verdicts (for editorial sign-off)

### Renames / Corrections

| # | Current Entry | Proposed Change | Rationale |
|---|---|---|---|
| 1 | Llama 4.1 (Meta) — open-weight | **Rename to Muse Spark (Meta)** — status: active (not open-weight) | Meta's frontier model is proprietary Muse Spark. "Llama 4.1" does not exist. |
| 2 | Qwen 3.5 (Alibaba) — open-weight | **Update to Qwen 3.7-Plus (Alibaba)** — status: active (not open-weight) | Two generations behind. Qwen 3.7-Plus is proprietary. |
| 3 | Windsurf (Cognition) | **Rename to Devin Desktop (Cognition)** | Brand killed June 2. OTA update to all users. |
| 4 | Ideogram 3.0 — active | **Update to Ideogram 4.0** — status: open-weight | Major open-weight release June 3. |
| 5 | Recraft V4 — active | **Update to Recraft V4.1** | V4.1 shipped May 14. |
| 6 | Play.ht / Resemble AI / Descript | **Remove Play.ht** (dead). Update to "Resemble AI / Descript" | Play.ht shut down Dec 31, 2025. |
| 7 | Suno (v5) | **Update to Suno (v5.5)**, valuation to $5.4 B | v5.5 is current; $400 M raise at $5.4 B on June 4. |
| 8 | Operator (OpenAI) | **Update claim** to reflect merger into ChatGPT agent mode | Standalone product no longer exists. |

### Graduations / Cemetery

| # | Entry | Proposed Action | Rationale |
|---|---|---|---|
| 9 | Project Mariner (Google) | **Move to Cemetery** | Shut down May 4, 2026. |

### New Entries (pending sign-off)

| # | Candidate | Category | Status | Why |
|---|---|---|---|---|
| 10 | MiniMax M3 | frontier-models | open-weight | First open-weight model with frontier coding + 1 M context + multimodality. |
| 11 | MAI-Thinking-1 (Microsoft) | frontier-models | beta | Microsoft's first in-house reasoning model; no OpenAI data. |
| 12 | Microsoft Scout | work-agents | beta | Always-on personal agent across M365; Build 2026 centrepiece. |
| 13 | Grok Build (xAI) | coding-agents | beta | xAI's CLI coding agent; third major entrant after Anthropic and OpenAI. |
| 14 | Grok Imagine Video 1.5 (xAI) | video-generation | active | #1 on image-to-video arena at launch (Elo 1,404). |
| 15 | Figma AI / Figma Make | design (new category) | beta | Design-to-code with PR creation; genuinely new workflow. |
| 16 | Google Stitch | design (new category) | active | Free AI-native UI design with code export in 7 frameworks; direct Figma challenger. |

### Status Changes

| # | Entry | Current Status | Proposed Status | Rationale |
|---|---|---|---|---|
| 17 | Perplexity Personal Computer | beta | active | Exited waitlist May 7; available to all Mac users. |

---

## Regulatory Context (not Frontier entries, but relevant)

- **June 30, 2026:** Colorado AI Act takes effect — first major US state-level AI discrimination law (risk management, impact assessments, notices). Most relevant to practitioners.
- **June 2, 2026:** White House EO "Promoting Advanced AI Innovation and Security" — pro-innovation, prioritises criminal enforcement against misuse.
- EU AI Act enforcement gaining independent expert support.

---

## Summary

- **69 entries reviewed**, **17 proposed verdicts** for sign-off
- **7 new candidates** surfaced (MiniMax M3, MAI-Thinking-1, Microsoft Scout, Grok Build, Grok Imagine Video 1.5, Figma AI, Google Stitch)
- **1 Cemetery move** (Project Mariner)
- **2 entries need renaming** due to brand death (Windsurf → Devin Desktop) or non-existence (Llama 4.1 → Muse Spark)
- **2 entries stale** on model version (Qwen 3.5 → 3.7-Plus, Ideogram 3.0 → 4.0)
- **1 dead product** to remove (Play.ht)
- **1 new category proposed:** Design (Figma AI + Google Stitch)

**Next refresh:** 2026-06-11 (weekly) or 2026-07-01 (monthly, with category briefs).

---

*Report generated by Claude Opus 4.8. All claims sourced. Verdicts are proposals — editor approves or edits. Nothing auto-publishes.*
