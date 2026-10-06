---
name: GLM-5.3
maker: Zhipu (Z.ai)
category: frontier-models
status: open-weight
claim: Z.ai's flagship for agentic coding and cyber defence, post-trained on the GLM-5.2 base to 84.5% on CyberGym and 48.2% on AutomationBench, with a 1M-token context.
metrics:
- CyberGym 84.5%
- AutomationBench v1.0.6 48.2%
- DeepSWE v1.1 66.9
- 1M context, 128K output
source: https://docs.z.ai/guides/llm/glm-5.3
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Z.ai has moved from GLM-5.1 to GLM-5.2 (16 June 2026), which added a 1M-token context, and then to GLM-5.3 (18 August), which keeps the GLM-5.2 base and gets all its gains from post-training. Z.ai reports a 50% gain over GLM-5.2 on its in-house coding benchmark and much stronger cyber-defence results, with CyberGym up from 77.2% to 84.5%. GLM-5.3 takes text only and always reasons; a smaller GLM-5.3-Flash with vision followed on 26 August. Weights are on Hugging Face under Z.ai's own GLM-5.3 licence, and the API speaks OpenAI and Anthropic formats, so it drops into most coding agents.
