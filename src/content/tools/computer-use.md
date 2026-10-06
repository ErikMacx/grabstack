---
name: Computer Use
maker: Anthropic
category: computer-use
status: active
claim: Claude's screen-driving tool is now generally available on the Claude API with no beta header; Opus 5.5 scores 81.8% on OSWorld 2.1, and Claude in Chrome is in beta on all paid plans.
metrics:
- OSWorld 2.1 81.8% partial (Opus 5.5)
- OSWorld 2.1 80.1% partial (Sonnet 5.5)
source: https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Computer use lets Claude operate a desktop through screenshots and mouse and keyboard actions. It has left beta on the Claude API: the current `computer_toolset_20260801` needs no beta header, turns on a zoom action by default, and is the only version Claude 5.5 models accept on the Claude API and Google Cloud, while Amazon Bedrock, Microsoft Foundry and Claude Platform on AWS still list it as beta. Anthropic reports Opus 5.5 at 81.8% and Sonnet 5.5 at 80.1% on OSWorld 2.1 (scores marked "partial" in its tables), up from 74.0% for Opus 5. For browser tasks, the Claude in Chrome extension, which navigates sites, fills forms and runs scheduled daily or weekly workflows using your existing logins, is in beta for all paid subscribers.
