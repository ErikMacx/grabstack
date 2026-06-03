import { useState, useMemo, useRef, useLayoutEffect, useCallback } from "react";
import data from "../data/ai-landscape.json";

/* ------------------------------------------------------------------ */
/*  Types (match the JSON shape exactly)                               */
/* ------------------------------------------------------------------ */

interface Camp {
  label: string;
  text: string;
}

interface Scores {
  overall: number;
  business: number;
  agents: number;
  economy: number;
  geo: number;
  safety: number;
  climate: number;
  society: number;
}

interface Debate {
  id: number;
  bg: string;
  heat: "hot" | "steady" | "cool";
  title: string;
  tension: string;
  bull: Camp;
  bear: Camp;
  matters: string;
  signal: string;
  reality: string;
  also: string;
  scores: Scores;
}

interface LensDef {
  id: string;
  label: string;
  gloss: string;
}

interface Meta {
  title: string;
  section: string;
  subtitle: string;
  asOf: string;
  tagline: string;
  howItWorks: string;
  sources: string;
}

type Lens = keyof Scores;

const meta: Meta = data.meta;
const battlegrounds: Record<string, string> = data.battlegrounds;
const lenses: LensDef[] = data.lenses;
const debates: Debate[] = data.debates;

const HEAT: Record<string, { dot: string; label: string }> = {
  hot: { dot: "bg-accent", label: "Hot" },
  steady: { dot: "bg-amber-500", label: "Steady" },
  cool: { dot: "bg-sky-500", label: "Cool" },
};

/* ------------------------------------------------------------------ */
/*  FLIP animation                                                     */
/* ------------------------------------------------------------------ */

function useFLIP(deps: unknown[]) {
  const rectsRef = useRef<Map<number, DOMRect>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  const snapshot = useCallback(() => {
    const map = new Map<number, DOMRect>();
    if (!containerRef.current) return;
    containerRef.current
      .querySelectorAll<HTMLElement>("[data-did]")
      .forEach((el) => map.set(Number(el.dataset.did), el.getBoundingClientRect()));
    rectsRef.current = map;
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    containerRef.current
      .querySelectorAll<HTMLElement>("[data-did]")
      .forEach((el) => {
        const prev = rectsRef.current.get(Number(el.dataset.did));
        if (!prev) return;
        const dy = prev.top - el.getBoundingClientRect().top;
        if (Math.abs(dy) < 1) return;
        if (prefersReduced) return;
        el.style.transform = `translateY(${dy}px)`;
        el.style.transition = "none";
        el.offsetHeight; // reflow
        el.style.transition = "transform 420ms cubic-bezier(.2,0,0,1)";
        el.style.transform = "";
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef, snapshot };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AILandscape() {
  const [activeLens, setActiveLens] = useState<Lens>("overall");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const activeLensDef = lenses.find((l) => l.id === activeLens)!;

  /* Overall ranks (stable) */
  const overallRanks = useMemo(() => {
    const sorted = [...debates].sort((a, b) => b.scores.overall - a.scores.overall);
    const map = new Map<number, number>();
    sorted.forEach((d, i) => map.set(d.id, i + 1));
    return map;
  }, []);

  /* Sorted by active lens */
  const { containerRef, snapshot } = useFLIP([activeLens]);
  const sorted = useMemo(
    () => [...debates].sort((a, b) => b.scores[activeLens] - a.scores[activeLens]),
    [activeLens],
  );

  function switchLens(lens: Lens) {
    snapshot();
    setActiveLens(lens);
  }

  return (
    <div>
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="mb-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[.2em] text-muted">
          {meta.tagline}
        </p>
        <h1 className="font-sans mt-1 text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
          {meta.section}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-paper/80">
          {meta.subtitle}
        </p>
      </header>

      {/* ── Lens pills ───────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {lenses.map((l) => (
          <button
            key={l.id}
            onClick={() => switchLens(l.id as Lens)}
            className={`font-mono rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeLens === l.id
                ? "bg-accent text-ink"
                : "bg-white/10 text-paper/70 hover:bg-white/15 hover:text-paper"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Active lens gloss */}
      <p className="mt-3 text-sm text-muted">
        <span className="text-accent font-semibold">{activeLensDef.label}</span>
        {" — "}
        {activeLensDef.gloss}
      </p>

      {/* ── Table ────────────────────────────────────────────────── */}
      <div ref={containerRef} className="mt-5 space-y-2">
        {sorted.map((d, idx) => {
          const rank = idx + 1;
          const overallRank = overallRanks.get(d.id)!;
          const shift = overallRank - rank; // positive = climbed
          const score = d.scores[activeLens];
          const heat = HEAT[d.heat];
          const open = expandedId === d.id;

          return (
            <div
              key={d.id}
              data-did={d.id}
              onClick={() => setExpandedId(open ? null : d.id)}
              className="cursor-pointer rounded-lg border border-white/[.08] bg-surface px-4 py-3 transition-colors hover:border-white/20"
            >
              {/* ── Row ───────────────────────────────────────── */}
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Rank */}
                <span className="text-accent font-sans text-[28px] font-extrabold leading-none tabular-nums min-w-[2ch] text-right select-none">
                  {rank}
                </span>

                <div className="min-w-0 flex-1">
                  {/* Title line */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 className="font-sans text-base font-bold text-paper leading-snug">
                      {d.title}
                    </h2>
                    <span className="font-mono rounded bg-white/[.08] px-1.5 py-[1px] text-xs font-medium text-muted">
                      {battlegrounds[d.bg]}
                    </span>
                    <span className="font-mono flex items-center gap-1 text-xs text-muted">
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${heat.dot}`} />
                      {heat.label}
                    </span>
                    {/* Shift chip */}
                    {activeLens !== "overall" && shift !== 0 && (
                      <span
                        className={`font-mono rounded-full px-1.5 py-[1px] text-xs font-semibold tabular-nums ${
                          shift > 0
                            ? "bg-accent/15 text-accent"
                            : "bg-white/[.06] text-muted"
                        }`}
                      >
                        {shift > 0 ? `▲${shift}` : `▼${Math.abs(shift)}`}
                      </span>
                    )}
                  </div>

                  {/* Tension / subtitle */}
                  <p className="mt-1 text-sm leading-relaxed text-paper/70 line-clamp-2">
                    {d.tension}
                  </p>

                  {/* Score bar */}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-[5px] flex-1 rounded-full bg-white/[.08] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-400"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="font-mono text-accent text-sm font-bold tabular-nums w-7 text-right">
                      {score}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Expanded detail (raised info box) ─────────── */}
              {open && (
                <div className="mt-4 rounded-lg border border-white/10 bg-[#2A2D36] p-5 space-y-5">
                  {/* Title + lead question */}
                  <div>
                    <h3 className="font-sans text-base font-bold text-paper">
                      {d.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/80">
                      {d.tension}
                    </p>
                  </div>

                  {/* Bull vs Bear — two columns */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-md border border-white/[.06] bg-white/[.03] p-3">
                      <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1.5">
                        {d.bull.label}
                      </p>
                      <p className="text-sm leading-relaxed text-paper/80">{d.bull.text}</p>
                    </div>
                    <div className="rounded-md border border-white/[.06] bg-white/[.03] p-3">
                      <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1.5">
                        {d.bear.label}
                      </p>
                      <p className="text-sm leading-relaxed text-paper/80">{d.bear.text}</p>
                    </div>
                  </div>

                  {/* Why it matters — bordered highlight */}
                  <div className="rounded-md border border-accent/20 bg-accent/[.04] p-3">
                    <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-accent mb-1.5">
                      Why it matters
                    </p>
                    <p className="text-sm leading-relaxed text-paper/80">{d.matters}</p>
                  </div>

                  {/* Signal + Reality check */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1.5">
                        Signal to watch
                      </p>
                      <p className="text-sm leading-relaxed text-paper/80">{d.signal}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1.5">
                        Reality check
                      </p>
                      <p className="text-sm font-medium leading-relaxed text-paper">{d.reality}</p>
                    </div>
                  </div>

                  {/* Also note */}
                  {d.also && (
                    <div>
                      <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1.5">
                        Also
                      </p>
                      <p className="text-sm leading-relaxed text-paper/80">{d.also}</p>
                    </div>
                  )}

                  {/* All-lens breakdown — full labels, no truncation */}
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-3">
                      All lenses
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {lenses.map((l) => {
                        const lid = l.id as Lens;
                        const active = lid === activeLens;
                        return (
                          <div key={lid} className="flex items-center gap-2">
                            <span
                              className={`font-mono text-xs shrink-0 ${
                                active ? "text-accent font-semibold" : "text-muted"
                              }`}
                              style={{ minWidth: "8rem" }}
                            >
                              {l.label}
                            </span>
                            <div className="h-1.5 flex-1 rounded-full bg-white/[.08] overflow-hidden">
                              <div
                                className={`h-full rounded-full ${active ? "bg-accent" : "bg-white/25"}`}
                                style={{ width: `${d.scores[lid]}%` }}
                              />
                            </div>
                            <span
                              className={`font-mono text-xs tabular-nums w-6 text-right ${
                                active ? "text-accent font-bold" : "text-muted"
                              }`}
                            >
                              {d.scores[lid]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── How it works / Sources ────────────────────────────────── */}
      <footer className="mt-10 border-t border-white/[.08] pt-6 space-y-4 text-sm leading-relaxed text-paper/70">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1">
            How it works
          </p>
          <p>{meta.howItWorks}</p>
        </div>
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[.1em] text-muted mb-1">
            Sources
          </p>
          <p>{meta.sources}</p>
        </div>
        <p className="font-mono text-xs text-muted">
          As of {meta.asOf} · {meta.tagline}
        </p>
      </footer>
    </div>
  );
}
