---
name: Hy4 Preview
maker: Tencent
category: frontier-models
status: open-weight
claim: Tencent's Apache 2.0 open-weight MoE, 770B parameters with 49B active and a 1M-token context, scoring 65.7 on SWE-bench Pro and 92.3 on GPQA Diamond by Tencent's own figures.
metrics:
- SWE-bench Pro 65.7
- GPQA Diamond 92.3
- Terminal-Bench 2.1 85.4
- Apache 2.0
source: https://huggingface.co/tencent/Hy4-preview
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Hy4 Preview is a preview of the next flagship from Tencent's Hy (Hunyuan) team: a 770B-parameter mixture-of-experts model with 49B active per token, 256 routed experts and a 1M-token context using a gated form of DeepSeek's sparse attention. Tencent's own tests put it at 65.7 on SWE-bench Pro and 85.4 on Terminal-Bench 2.1, and it reports a blind side-by-side review in which 163 internal experts compared it with GLM-5.3 and Kimi K3. What sets it apart is the licence: plain Apache 2.0, where Kimi K3, Qwen3.8-Max and GLM-5.3 each ship under their maker's own custom licence. It is still a preview, so expect changes before a final release.
