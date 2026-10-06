---
name: MiniMax M3
maker: MiniMax
category: frontier-models
status: open-weight
claim: Open-weight model combining frontier-level coding, a 1M-token context and native image and video input, with per-token compute at 1M context cut to 1/20 of MiniMax's previous generation.
metrics:
- SWE-bench Pro 59.0%
- Terminal-Bench 2.1 66.0%
- $0.30/$1.20 per 1M tokens
source: https://www.minimax.io/blog/minimax-m3
updated: '2026-10-06'
reviewed: '2026-11-05'
---

MiniMax M3, released on 1 June 2026, is still MiniMax's flagship language model, and its weights (about 428B parameters, 23B active) are now on Hugging Face under MiniMax's community licence. The only newer text model is MiniMax-M3.1-Flash-Preview, which adds tunable thinking depth but is limited to MiniMax's M Plan and MiniMax Code; July's MiniMax H3 is an open omni-modal generation model aimed at video, not a replacement for M3. API pricing is unchanged at $0.30/$1.20 per million tokens for prompts up to 512K tokens. Newer Chinese open-weight models now post higher coding scores, but M3 remains one of the cheapest ways to get 1M-token context with vision.
