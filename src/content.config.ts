import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const tools = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/tools" }),
  schema: z.object({
    name: z.string(),
    maker: z.string(),
    category: z.enum([
      "coding-agents",
      "computer-use",
      "frontier-models",
      "hardware",
      "image-generation",
      "meeting-productivity",
      "personal-agents",
      "search-research",
      "video-generation",
      "voice-music",
      "work-agents",
    ]),
    status: z.enum([
      "flagship",
      "top-ranked",
      "category-leader",
      "everyday-default",
      "open-weight",
      "active",
      "beta",
      "unreleased",
      "deprecated",
      "acquired",
    ]),
    claim: z.string(),
    metrics: z.array(z.string()).default([]),
    source: z.string().default(""),
    updated: z.string(),
    reviewed: z.string(),
  }),
});

const updates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/updates" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    reviewBy: z.string(),
    summary: z.string(),
    tools: z.array(z.string()).default([]),
  }),
});

const stateOf = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/state-of" }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    claim: z.string(),
    updated: z.string(),
    reviewed: z.string(),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/glossary" }),
  schema: z.object({
    term: z.string(),
    definition: z.string(),
    tools: z.array(z.string()).default([]),
    updated: z.string(),
  }),
});

const stacks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/stacks" }),
  schema: z.object({
    title: z.string(),
    profession: z.string(),
    summary: z.string(),
    tools: z.array(z.string()).default([]),
    updated: z.string(),
    reviewed: z.string(),
  }),
});

export const collections = { tools, updates, "state-of": stateOf, glossary, stacks };
