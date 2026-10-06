---
name: NanoClaw / ZeroClaw / IronClaw / Hermes / NemoClaw / HiClaw
maker: ecosystem
category: personal-agents
status: open-weight
claim: 'OpenClaw''s orbit: container-isolated NanoClaw, Rust-built ZeroClaw and IronClaw,
  Nous Research''s self-improving Hermes Agent, NVIDIA''s NemoClaw sandbox stack and
  Alibaba''s multi-agent HiClaw.'
metrics:
- Hermes Agent ~250k GitHub stars (Oct 2026)
- NemoClaw still alpha, Apache 2.0
source: https://github.com/NousResearch/hermes-agent
updated: '2026-10-06'
reviewed: '2026-11-05'
---

Hermes Agent from Nous Research is now a peer of OpenClaw rather than a side project: MIT-licensed, around 250,000 GitHub stars, a desktop app, and a learning loop that writes and refines its own skills and keeps memory across sessions; its July v0.19 release cut first-token latency by about 80%. NVIDIA's NemoClaw has become a reference stack for running OpenClaw, Hermes and LangChain Deep Agents inside OpenShell sandboxes with network policies and approval flows, though it is still labelled alpha. NanoClaw (Docker-isolated agents on the Claude Agent SDK), ZeroClaw (a single Rust binary) and IronClaw (Rust, WASM-sandboxed tools, credentials never exposed to tool code) remain the lighter or harder-shelled options, while Alibaba's HiClaw runs manager and worker agents in Matrix chat rooms that humans can watch and step into. For builders, the choice between them is now mostly about isolation model and how far you want the agent to rewrite itself.
