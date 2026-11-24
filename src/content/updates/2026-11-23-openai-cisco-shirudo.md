---
title: "OpenAI and Cisco release Shirudo, an open-source Linux patch-protection runtime"
date: "2026-11-23"
reviewBy: "2027-11-23"
summary: "Shirudo uses eBPF to apply temporary, operator-approved protections to running Linux systems while patches are tested and rolled out."
tools: [openai-codex]
---

OpenAI and Cisco announced Shirudo on 23 November. It applies temporary protections, called "shields", to running Linux systems using eBPF. In one controlled test, a Codex-generated shield blocked a Java4Shell exploit attempt against a running Elasticsearch service without a restart. Shields are signed and verified before loading, and the source is on GitHub under BSD 2-Clause. The announcement describes this test only; it gives no wider results.

Source: https://openai.com/index/introducing-shirudo/
