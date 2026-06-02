export const SUGGEST_URL =
  "mailto:hello@grabstack.com?subject=Suggest%20a%20tool";

export const STATUS_DEFINITIONS: Record<
  string,
  { label: string; definition: string }
> = {
  flagship: {
    label: "Flagship",
    definition:
      "The maker's headline product — the one they stake their reputation on. <!-- TODO: Eric to refine -->",
  },
  "top-ranked": {
    label: "Top Ranked",
    definition:
      "Consistently at the top of independent benchmarks or expert rankings. <!-- TODO: Eric to refine -->",
  },
  "category-leader": {
    label: "Category Leader",
    definition:
      "The default choice in its category — the one most people reach for first. <!-- TODO: Eric to refine -->",
  },
  "everyday-default": {
    label: "Everyday Default",
    definition:
      "Settled, stable, widely adopted — the kind of tool that disappears into your workflow. <!-- TODO: Eric to refine -->",
  },
  "open-weight": {
    label: "Open Weight",
    definition:
      "Model weights are publicly available for download and self-hosting. <!-- TODO: Eric to refine -->",
  },
  active: {
    label: "Active",
    definition:
      "Actively developed and shipping updates, but not yet a category leader. <!-- TODO: Eric to refine -->",
  },
  beta: {
    label: "Beta",
    definition:
      "Publicly accessible but still in testing — expect rough edges. <!-- TODO: Eric to refine -->",
  },
  unreleased: {
    label: "Unreleased",
    definition:
      "Announced or leaked but not yet available to the public. <!-- TODO: Eric to refine -->",
  },
  deprecated: {
    label: "Deprecated",
    definition:
      "The maker has officially ended development or shut down the service. <!-- TODO: Eric to refine -->",
  },
  acquired: {
    label: "Acquired",
    definition:
      "Bought by another company — may be absorbed, rebranded, or left to wither. <!-- TODO: Eric to refine -->",
  },
};

/** Statuses that belong to each region (filtered view of tools). */
export const REGION_STATUSES = {
  capitals: ["flagship", "top-ranked"],
  cemetery: ["deprecated", "acquired"],
  outskirts: ["beta", "unreleased"],
} as const;

export const ACCESS_LADDER = [
  {
    slug: "chat",
    term: "Chat",
    definition:
      "You type, it replies. The simplest interface — a conversation with a model. <!-- TODO: Eric to refine -->",
  },
  {
    slug: "assistant",
    term: "Assistant",
    definition:
      "A chat that can use tools — search the web, read files, call APIs — when you ask it to. <!-- TODO: Eric to refine -->",
  },
  {
    slug: "agent",
    term: "Agent",
    definition:
      "Given a goal, it plans and executes multiple steps on its own, deciding which tools to use. <!-- TODO: Eric to refine -->",
  },
  {
    slug: "autonomous",
    term: "Autonomous",
    definition:
      "Runs in the background with minimal supervision — monitors, decides, and acts over time. <!-- TODO: Eric to refine -->",
  },
  {
    slug: "computer-use",
    term: "Computer Use",
    definition:
      "Controls a real screen, keyboard, and mouse — interacts with software the way a human would. <!-- TODO: Eric to refine -->",
  },
  {
    slug: "personal",
    term: "Personal",
    definition:
      "Always-on, context-aware AI that knows your schedule, habits, and preferences. <!-- TODO: Eric to refine -->",
  },
];

export function appendRef(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("ref", "grabstack");
    return u.toString();
  } catch {
    return url;
  }
}
