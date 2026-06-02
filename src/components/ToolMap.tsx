import { useState, useMemo } from "react";

interface Tool {
  id: string;
  name: string;
  maker: string;
  category: string;
  status: string;
  claim: string;
  metrics: string[];
  updated: string;
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

const STATUS_COLORS: Record<string, string> = {
  flagship: "bg-[#FF5A36] text-white",
  "top-ranked": "bg-[#FF5A36]/80 text-white",
  "category-leader": "bg-[#FF5A36]/60 text-white",
  "everyday-default": "bg-emerald-600 text-white",
  "open-weight": "bg-sky-600 text-white",
  active: "bg-white/15 text-[#F7F4EE]",
  beta: "bg-amber-600 text-white",
  unreleased: "bg-white/10 text-[#F7F4EE]/70",
  deprecated: "bg-white/10 text-[#9CA3AF] line-through",
  acquired: "bg-white/10 text-[#9CA3AF]",
};

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
        <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          type="text"
          placeholder="Search tools, makers, claims…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-[#22242B] py-2.5 pl-10 pr-4 text-sm text-[#F7F4EE] placeholder:text-[#9CA3AF] focus:border-[#FF5A36] focus:outline-none focus:ring-1 focus:ring-[#FF5A36]"
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
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategories.has(cat)
                  ? "bg-[#FF5A36] text-white"
                  : "bg-white/10 text-[#F7F4EE]/70 hover:bg-white/15"
              }`}
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
          {activeCategories.size > 0 && (
            <button
              onClick={() => setActiveCategories(new Set())}
              className="rounded-full px-3 py-1 text-xs text-[#9CA3AF] hover:text-[#F7F4EE]"
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
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeStatuses.has(s)
                  ? "bg-[#FF5A36] text-white"
                  : "bg-white/10 text-[#F7F4EE]/70 hover:bg-white/15"
              }`}
            >
              {STATUS_LABELS[s] ?? s}
            </button>
          ))}
          {activeStatuses.size > 0 && (
            <button
              onClick={() => setActiveStatuses(new Set())}
              className="rounded-full px-3 py-1 text-xs text-[#9CA3AF] hover:text-[#F7F4EE]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mt-4 text-sm text-[#9CA3AF]">
        {filtered.length} tool{filtered.length !== 1 && "s"}
        {(activeCategories.size > 0 || activeStatuses.size > 0 || query) && " matching"}
      </p>

      {/* Cards */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => {
          const isOpen = expanded.has(tool.id);
          return (
            <button
              key={tool.id}
              onClick={() => setExpanded(toggleSet(expanded, tool.id))}
              className="cursor-pointer rounded-lg border border-white/10 bg-[#22242B] p-4 text-left transition-colors hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#F7F4EE]">{tool.name}</h3>
                  <p className="text-xs text-[#9CA3AF]">{tool.maker}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold leading-tight ${STATUS_COLORS[tool.status] ?? "bg-white/10 text-[#F7F4EE]"}`}>
                  {STATUS_LABELS[tool.status] ?? tool.status}
                </span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-[#F7F4EE]/80">{tool.claim}</p>

              {isOpen && (
                <div className="mt-3 border-t border-white/10 pt-3">
                  <p className="text-[10px] uppercase tracking-wide text-[#9CA3AF]">
                    {CATEGORY_LABELS[tool.category] ?? tool.category}
                  </p>
                  {tool.metrics.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {tool.metrics.map((m, i) => (
                        <li key={i} className="text-xs text-[#F7F4EE]/70">
                          • {m}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2 text-[10px] text-[#9CA3AF]">
                    Updated {tool.updated}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-[#9CA3AF]">
          No tools match your filters.
        </p>
      )}
    </div>
  );
}
