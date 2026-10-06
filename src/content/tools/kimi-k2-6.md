---
name: Kimi K3
maker: Moonshot
category: frontier-models
status: open-weight
claim: Moonshot's 2.8T-parameter open-weight MoE with a 1M-token context and native vision; on Moonshot's figures it beats Claude Opus 4.8 on GPQA Diamond, Terminal-Bench 2.1 and BrowseComp.
metrics:
- GPQA Diamond 93.5
- Terminal-Bench 2.1 88.3
- BrowseComp 91.2
- $3/$15 per 1M tokens
source: https://huggingface.co/moonshotai/Kimi-K3
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Kimi K3, released in July 2026, replaces K2.6 as Moonshot's flagship: a 2.8T-parameter mixture-of-experts model (104B active, 16 of 896 experts per token) that understands text, images and video and has a 1M-token context. Its weights are on Hugging Face under Moonshot's own Kimi K3 licence. It is much pricier than the K2 line at $3/$15 per million tokens on Moonshot's API, against $0.95/$4 for K2.6, which stays available alongside a coding-tuned K2.7. For builders it is one of the largest open-weight models you can download, though running it yourself takes data-centre hardware.
