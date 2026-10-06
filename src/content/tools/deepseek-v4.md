---
name: DeepSeek V4.1-Flash / V4-Pro
maker: DeepSeek
category: frontier-models
status: open-weight
claim: MIT-licensed open-weight line with 1M-token context; the new 552B multimodal V4.1-Flash needs a quarter of the KV-cache memory and DeepSeek says it outperforms the 1.6T V4-Pro.
metrics:
- V4.1-Flash Terminal-Bench 2.1 90.6
- V4.1-Flash DeepSWE v1.1 74.2
- V4-Pro SWE-bench Verified 80.6
- $0.30/$1.20 per 1M tokens (V4.1-Flash, peak)
source: https://api-docs.deepseek.com/news/news260910
updated: '2026-10-06'
reviewed: '2026-11-05'
---

DeepSeek's V4 line reached its API on 24 April 2026; V4-Pro (1.6T parameters, 49B active) went generally available on 13 August with low, high and max thinking effort and half-price off-peak hours. On 10 September DeepSeek released V4.1-Flash, a 552B mixture-of-experts model with native image input and a new encoder-decoder design that needs a quarter of the HBM for its KV cache, and DeepSeek says tests by multiple parties put it ahead of V4-Pro on performance, cost and speed. Both models have 1M-token contexts and MIT-licensed weights on Hugging Face, and V4.1-Flash now answers to the `deepseek-flash` API name at $0.30/$1.20 per million tokens at peak. For builders this is one of the cheapest near-frontier options, and it can be self-hosted.
