---
name: Qwen3.8-Max
maker: Alibaba
category: frontier-models
status: open-weight
claim: Alibaba's largest and most capable model, a 2.4T-parameter MoE (95B active) with 1M context and image and video input; a text-only checkpoint has open weights under a custom licence.
metrics:
- SWE-bench Pro 67.7
- Terminal-Bench 2.1 86.6
- 1M context, 128K output
- $2/$6 per 1M tokens
source: https://www.alibabacloud.com/help/en/model-studio/qwen3-8-max
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Qwen3.8-Max launched on 3 August 2026 and replaces Qwen3.7-Plus as Alibaba's flagship; a qwen3.8-max-0902 snapshot in September improved long-horizon coding. Through Alibaba Cloud Model Studio it takes text, images and video with a 1M-token context and costs $2/$6 per million tokens. Alibaba also published the underlying model as Qwen3.8-2.4T-A95B on Hugging Face, but that release is text-only, always reasons and has a 262K native context, and its licence requires a separate deal for model-hosting or AI work-assistant businesses earning over $50M a year. On Qwen's own table it scores 67.7 on SWE-bench Pro against 69.2 for Claude Opus 4.8, which puts it close to the closed frontier of early summer at a far lower price.
