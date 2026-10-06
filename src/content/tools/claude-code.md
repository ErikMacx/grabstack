---
name: Claude Code
maker: Anthropic
category: coding-agents
status: top-ranked
claim: Anthropic's coding agent now defaults to Claude Opus 5.5 on Pro, Max, Team, Enterprise and the API; v2.1.287 (1 Oct 2026) added mods, TypeScript plugins that reshape its behaviour.
metrics:
- Default model Opus 5.5
- Terminal-Bench 4.0 66.4% (Opus 5.5)
- Pro from $20/mo
source: https://code.claude.com/docs/en/model-config
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Claude Code is Anthropic's agentic coding tool, running in the terminal, desktop and mobile apps, the web, VS Code and JetBrains, and Slack. Since June its default model has moved from Opus 4.8 to Claude Opus 5.5 (released 22 September 2026), with a `fable` alias for Claude Fable 5.1 when you want the most capable model for long, hard tasks. Version 2.1.287 on 1 October added mods: small TypeScript functions, shipped in plugins, that can rewrite prompts, block or approve tool calls, redact output and redraw the interface; they run unsandboxed with full machine access, so install only ones you trust. The billing change announced for 15 June, which would have moved Agent SDK and `claude -p` usage onto a separate monthly credit, was paused, so that usage still draws on your plan's limits.
