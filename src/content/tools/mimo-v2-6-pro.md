---
name: MiMo-V2.6-Pro
maker: Xiaomi
category: frontier-models
status: open-weight
claim: Xiaomi's MIT-licensed 1.02T-parameter MoE (42B active) taking text, image, video and audio, with a 1M-token context and 89.9 on Terminal-Bench 2.1 by Xiaomi's own figures.
metrics:
- Terminal-Bench 2.1 89.9
- DeepSWE v1.1 71.9
- MIT licence
source: https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL
updated: '2026-10-06'
reviewed: '2026-11-05'
---

MiMo-V2.6-Pro, released in late September 2026, is the flagship of Xiaomi's open MiMo line: a sparse mixture-of-experts with 1.02T total and 42B active parameters, built-in vision and audio encoders and a 1M-token context. Xiaomi's own results (89.9 on Terminal-Bench 2.1, 71.9 on DeepSWE v1.1) sit in the same range as those Moonshot and DeepSeek report for Kimi K3 and DeepSeek V4.1-Flash. It shipped with a smaller 311B Flash sibling and a 9B distilled model, all on Hugging Face, and is also served through Xiaomi's MiMo API platform. The MIT licence and native audio input make it one of the most permissive omni-modal open models available.
