import { useState, useMemo } from "react";

const SUGGEST_URL =
  "mailto:hello@grabstack.com?subject=Suggest%20a%20tool";

interface Tool {
  id: string;
  name: string;
  maker: string;
  category: string;
  status: string;
  claim: string;
  metrics: string[];
  updated: string;
  reviewed: string;
  source: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "coding-agents": "Coding Agents",
  "computer-use": "Computer Use",
  "frontier-models": "Frontier Models",
  hardware: "Hardware",
  "image-generation": "Image Generation",
  "meeting-productivity": "Meeting & Productivity",
  "personal-agents": "Personal Agents",
  "search-research": "Search & Research",
  "video-generation": "Video Generation",
  "voice-music": "Voice & Music",
  "work-agents": "Work Agents",
};

const STATUS_LABELS: Record<string, string> = {
  flagship: "Flagship",
  "top-ranked": "Top Ranked",
  "category-leader": "Category Leader",
  "everyday-default": "Everyday Default",
  "open-weight": "Open Weight",
  active: "Active",
  beta: "Beta",
  unreleased: "Unreleased",
  deprecated: "Deprecated",
  acquired: "Acquired",
};

const STATUS_TOOLTIPS: Record<string, string> = {
  flagship: "The maker's headline product — the one they stake their reputation on.",
  "top-ranked": "Consistently at the top of independent benchmarks or expert rankings.",
  "category-leader": "The default choice in its category — the one most people reach for first.",
  "everyday-default": "Settled, stable, widely adopted — disappears into your workflow.",
  "open-weight": "Model weights are publicly available for download and self-hosting.",
  active: "Actively developed and shipping updates, but not yet a category leader.",
  beta: "Publicly accessible but still in testing — expect rough edges.",
  unreleased: "Announced or leaked but not yet available to the public.",
  deprecated: "The maker has officially ended development or shut down the service.",
  acquired: "Bought by another company — may be absorbed, rebranded, or left to wither.",
};

const STATUS_COLORS: Record<string, string> = {
  flagship: "border-2 border-accent text-accent font-bold",
  "top-ranked": "border border-accent text-accent",
  "category-leader": "border border-accent/70 text-accent",
  "everyday-default": "border border-emerald-400 text-emerald-400",
  "open-weight": "border border-sky-400 text-sky-400",
  active: "bg-white/10 text-paper",
  beta: "border border-amber-400 text-amber-400",
  unreleased: "bg-white/10 text-paper/70",
  deprecated: "bg-white/10 text-muted line-through",
  acquired: "bg-white/10 text-muted",
};

function appendRef(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("ref", "grabstack");
    return u.toString();
  } catch {
    return url;
  }
}

function isDueForReview(reviewed: string): boolean {
  try {
    return new Date(reviewed) < new Date();
  } catch {
    return false;
  }
}

export default function ToolMap({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => [...new Set(tools.map((t) => t.category))].sort(),
    [tools],
  );
  const statuses = useMemo(
    () => [...new Set(tools.map((t) => t.status))].sort(),
    [tools],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return tools.filter((t) => {
      if (q && !t.name.toLowerCase().includes(q) && !t.maker.toLowerCase().includes(q) && !t.claim.toLowerCase().includes(q)) return false;
      if (activeCategories.size && !activeCategories.has(t.category)) return false;
      if (activeStatuses.size && !activeStatuses.has(t.status)) return false;
      return true;
    });
  }, [tools, query, activeCategories, activeStatuses]);

  function toggleSet<T>(set: Set<T>, value: T): Set<T> {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  }

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          placeholder="Search tools, makers, claims…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-surface py-2.5 pl-10 pr-4 text-sm text-paper placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 space-y-3">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategories(toggleSet(activeCategories, cat))}
              className={`font-mono rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategories.has(cat)
                  ? "bg-accent text-ink"
                  : "bg-white/10 text-paper/70 hover:bg-white/15"
              }`}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
          {activeCategories.size > 0 && (
            <button
              onClick={() => setActiveCategories(new Set())}
              className="font-mono rounded-full px-3 py-1 text-xs text-muted hover:text-paper"
            >
              Clear
            </button>
          )}
        </div>

        {/* Statuses */}
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatuses(toggleSet(activeStatuses, s))}
              className={`font-mono rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeStatuses.has(s)
                  ? "bg-accent text-ink"
                  : "bg-white/10 text-paper/70 hover:bg-white/15"
              }`}
            >
              {STATUS_LABELS[s] ?? s}
            </button>
          ))}
          {activeStatuses.size > 0 && (
            <button
              onClick={() => setActiveStatuses(new Set())}
              className="font-mono rounded-full px-3 py-1 text-xs text-muted hover:text-paper"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mt-4 font-mono text-sm text-muted">
        {filtered.length} tool{filtered.length !== 1 && "s"}
        {(activeCategories.size > 0 || activeStatuses.size > 0 || query) && " matching"}
      </p>

      {/* Cards */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const isOpen = expanded.has(tool.id);
          const due = isDueForReview(tool.reviewed);
          return (
            <div
              key={tool.id}
              onClick={() => setExpanded(toggleSet(expanded, tool.id))}
              className="cursor-pointer rounded-lg border border-white/10 bg-surface p-4 text-left transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-heading text-sm font-semibold text-paper">{tool.name}</h3>
                  <p className="font-mono text-xs text-muted">{tool.maker}</p>
                </div>
                <a
                  href={`/about#methodology`}
                  title={STATUS_TOOLTIPS[tool.status] ?? tool.status}
                  onClick={(e) => e.stopPropagation()}
                  className={`status-tooltip shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-semibold leading-tight no-underline ${STATUS_COLORS[tool.status] ?? "bg-white/10 text-paper"}`}
                  data-tooltip={STATUS_TOOLTIPS[tool.status] ?? ""}
                >
                  {STATUS_LABELS[tool.status] ?? tool.status}
                </a>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-paper/80">{tool.claim}</p>

              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <span>Updated {tool.updated}</span>
                <span>·</span>
                <span>Review by {tool.reviewed}</span>
                {due && (
                  <span className="rounded-full bg-amber-800/40 px-1.5 py-0.5 text-amber-400">
                    Due for review
                  </span>
                )}
              </div>

              {isOpen && (
                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="font-mono text-xs uppercase tracking-wide text-muted">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </p>
                  {tool.metrics.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {tool.metrics.map((m, i) => (
                        <li key={i} className="font-mono text-xs text-paper/70">
                          • {m}
                        </li>
                      ))}
                    </ul>
                  )}
                  {tool.source && (
                    <a
                      href={appendRef(tool.source)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-2 inline-block text-xs text-accent hover:underline"
                    >
                      Source →
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty search suggest */}
      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">
          No match for &ldquo;{query || "your filters"}&rdquo; yet — GrabStack tracks the tools we judge worth tracking, not the whole internet. Think it belongs?{" "}
          <a
            href={SUGGEST_URL}
            className="text-accent hover:underline"
          >
            Suggest it →
          </a>
        </p>
      )}
    </div>
  );
}
