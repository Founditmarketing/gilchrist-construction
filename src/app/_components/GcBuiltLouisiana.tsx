"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, ArrowUpRight, ArrowRight, MagnifyingGlassMinus } from "@phosphor-icons/react";
import { PROJECTS, CORRIDORS, DISCIPLINES, type Discipline } from "../site";
import { Reveal } from "./Reveal";
import { GC_EASE } from "./motion";

// A recognizable stylized Louisiana: straight Arkansas border up top, the
// Mississippi River bowing down the east, the Florida-parishes step out to the
// Pearl, the delta's bird-foot spike into the Gulf, the bayou coast, and the
// near-straight Sabine/Texas line up the west. Coordinates 0-100 (x = west→east,
// y = north→south); pin x/y in site.ts are placed against this same frame.
const LA_PATH =
  "M6 9 L56 7 C61 21 60 37 57 49 L84 49 L87 51 L88 66 L84 70 L80 71 L86 77 L97 95 L82 79 L73 80 L66 84 L57 81 L50 84 L43 81 L33 83 L22 81 L13 82 L7 80 L8 56 L6 32 Z";

function corridorPath(pts: [number, number][]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ");
}

type Filter = "All" | Discipline;

const ZOOM = 2.3;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(v, hi));

const panelV = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const itemV = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: GC_EASE } } };

export default function GcBuiltLouisiana() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const flagship = Math.max(PROJECTS.findIndex((p) => p.signature && !p.hq), 0);
  const SIGNATURE = PROJECTS.filter((p) => p.signature && !p.hq); // flagship jobs for the mobile swipe deck
  const [selected, setSelected] = useState(flagship);
  const [zoom, setZoom] = useState<number | null>(null); // index of the pin we've zoomed to
  const sel = PROJECTS[selected];

  // Pan/zoom the map by tweening the SVG viewBox (React-controlled state) toward
  // a tapped pin and back. `vbRef` mirrors the live value so a new tween starts
  // from wherever the last one left off (no jump when re-targeting).
  const [vb, setVb] = useState<[number, number, number, number]>([0, 0, 100, 100]);
  const vbRef = useRef(vb);
  vbRef.current = vb;
  const rafRef = useRef(0);
  useEffect(() => {
    const from = vbRef.current.slice() as [number, number, number, number];
    let to: [number, number, number, number] = [0, 0, 100, 100];
    if (zoom != null) {
      const p = PROJECTS[zoom];
      const w = 100 / ZOOM, h = 100 / ZOOM;
      to = [clamp(p.x - w / 2, 0, 100 - w), clamp(p.y - h / 2, 0, 100 - h), w, h];
    }
    if (reduce) { setVb(to); return; }
    cancelAnimationFrame(rafRef.current);
    const start = performance.now(), dur = 720;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-out
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1), e = ease(t);
      setVb(from.map((f, i) => f + (to[i] - f) * e) as [number, number, number, number]);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    // Guarantee the final state even if rAF is throttled (e.g. a hidden tab),
    // so the map never gets stuck mid-zoom.
    const settle = setTimeout(() => setVb(to), dur + 90);
    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(settle); };
  }, [zoom, reduce]);

  const matches = (i: number) => filter === "All" || PROJECTS[i].discipline === filter;
  const litCount = PROJECTS.filter((_, i) => matches(i) && !PROJECTS[i].hq).length;

  function pickFilter(f: Filter) {
    setFilter(f);
    setZoom(null);
    if (f !== "All") {
      const first = PROJECTS.findIndex((p) => p.discipline === f && !p.hq);
      if (first >= 0) setSelected(first);
    }
  }
  // hover/focus only previews the panel; tap/Enter zooms the map to the pin.
  const preview = (i: number) => setSelected(i);
  const activate = (i: number) => { setSelected(i); setZoom((z) => (z === i ? null : i)); };

  return (
    <section id="map" className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-ground)]">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal className="mb-10 max-w-3xl">
          <p className="gc-station mb-5">STA 8+10 — THE FOOTPRINT</p>
          <h2 className="gc-display-lg text-[var(--gc-text)]">
            Every pin is a road<br /><span className="gc-hot">Louisiana drives on.</span>
          </h2>
          <p className="gc-body-lg mt-5 max-w-lg">
            From the southwest corner to the New Orleans metro: interchanges,
            bridges, and interstate corridors.
          </p>
        </Reveal>

        {/* Discipline filter — desktop only (touch users browse the swipe deck) */}
        <div className="mb-6 hidden flex-wrap gap-2 md:flex">
          {(["All", ...DISCIPLINES] as Filter[]).map((f) => {
            const on = filter === f;
            return (
              <button
                key={f}
                onClick={() => pickFilter(f)}
                aria-pressed={on}
                style={on ? { borderColor: "var(--gc-hi)", background: "rgba(67,174,42,0.12)", color: "var(--gc-hi)" } : undefined}
                className={`gc-focus rounded-[3px] border px-3.5 py-1.5 text-[0.82rem] transition-colors ${
                  on ? "" : "border-[var(--gc-line-strong)] text-[var(--gc-text-muted)] hover:border-[var(--gc-text-faint)] hover:text-[var(--gc-text)]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* The one quiet live stat — feel the footprint number once. litCount
            already excludes HQ and reacts to the discipline filter. */}
        <div className="mb-7 flex items-baseline gap-3 border-t border-[var(--gc-line)] pt-5">
          <span className="gc-display text-[clamp(2rem,5vw,3.2rem)] leading-none text-[var(--gc-hi)] tabular-nums">
            {String(litCount).padStart(2, "0")}
          </span>
          <span className="gc-mono max-w-[16rem] text-[0.7rem] leading-snug tracking-[0.1em] text-[var(--gc-text-muted)]">
            {filter === "All" ? "DOTD PROJECTS ON THE MAP" : `${filter.toUpperCase()} JOBS SHOWN`}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.8fr] lg:items-stretch">
          {/* ── The map ── */}
          <div className="relative">
            <div className="gc-map-frame gc-card relative overflow-hidden gc-grid-lines p-4 sm:p-6">
              <svg viewBox={vb.join(" ")} className="block w-full" role="img" aria-label="Map of Gilchrist DOTD projects across Louisiana" style={{ aspectRatio: "100 / 92" }}>
                <defs>
                  <radialGradient id="gcState" cx="50%" cy="38%" r="75%">
                    <stop offset="0%" stopColor="#20242a" />
                    <stop offset="100%" stopColor="#181c20" />
                  </radialGradient>
                  <filter id="gcPinGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="1.4" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                <motion.path
                  d={LA_PATH} fill="url(#gcState)" stroke="rgba(67,174,42,0.6)" strokeWidth="0.9" strokeLinejoin="round"
                  initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                />

                {CORRIDORS.map((c) => (
                  <motion.path
                    key={c.name} d={corridorPath(c.pts)} fill="none" stroke="var(--gc-hi)" strokeWidth="0.7" strokeLinecap="round" strokeDasharray="1.5 2" opacity={0.3}
                    initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut" }}
                  />
                ))}

                {PROJECTS.map((p, i) => {
                  const lit = matches(i);
                  const active = i === selected;
                  const dim = !lit;
                  return (
                    <g
                      key={p.name} transform={`translate(${p.x} ${p.y})`}
                      role="button" tabIndex={lit ? 0 : -1} aria-hidden={dim || undefined}
                      aria-label={`${p.name}, ${p.place}${p.value ? `, ${p.value}` : ""}`} aria-pressed={zoom === i}
                      className="gc-pin"
                      onClick={() => lit && activate(i)} onMouseEnter={() => lit && preview(i)} onFocus={() => lit && preview(i)}
                      onKeyDown={(e) => { if (lit && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); activate(i); } }}
                      style={{ cursor: lit ? "pointer" : "default", pointerEvents: dim ? "none" : "auto", opacity: dim ? 0.28 : 1, transition: "opacity 0.3s ease" }}
                    >
                      {/* enlarged transparent hit area — easier to tap/click */}
                      <circle r={5.2} fill="transparent" />
                      <circle className="gc-pin-ring" r={4.4} fill="none" stroke="var(--gc-hi-bright)" strokeWidth={0.7} />
                      {lit && !p.hq && (
                        <motion.circle
                          r={active ? 4.6 : 3.2} fill="var(--gc-hi)" opacity={active ? 0.22 : 0.12}
                          animate={reduce ? {} : { r: active ? [4.2, 5.4, 4.2] : 3.2 }}
                          transition={{ duration: 2.2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
                        />
                      )}
                      {p.hq ? (
                        <g>
                          <circle r="2.6" fill="none" stroke="var(--gc-hi)" strokeWidth="0.6" opacity="0.8" />
                          <circle r="1" fill="var(--gc-hi)" filter="url(#gcPinGlow)" />
                        </g>
                      ) : p.signature ? (
                        <rect x={-1.5} y={-1.5} width={3} height={3} transform="rotate(45)" fill="var(--gc-hi)" stroke={active ? "#fff" : "transparent"} strokeWidth="0.4" filter="url(#gcPinGlow)" />
                      ) : (
                        <circle r={1.6} fill="var(--gc-hi)" stroke={active ? "#fff" : "transparent"} strokeWidth="0.4" filter="url(#gcPinGlow)" />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* reset-view control — appears only when zoomed in */}
              {zoom != null && (
                <button
                  onClick={() => setZoom(null)}
                  className="gc-focus gc-mono absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(10,12,13,0.72)] px-2.5 py-1.5 text-[0.6rem] tracking-[0.12em] text-[var(--gc-text-muted)] backdrop-blur-sm transition-colors hover:text-[var(--gc-hi)]"
                >
                  <MagnifyingGlassMinus size={13} weight="bold" aria-hidden="true" /> RESET VIEW
                </button>
              )}

              {/* Quiet zoom-state HUD chip — faint so amber stays reserved for pins */}
              {zoom != null && (
                <div className="gc-mono pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(10,12,13,0.72)] px-2.5 py-1.5 text-[0.6rem] tracking-[0.12em] text-[var(--gc-text-faint)] backdrop-blur-sm">
                  ZOOMED · {PROJECTS[zoom].parish.toUpperCase()}
                </div>
              )}

              <div className="pointer-events-none absolute bottom-4 left-4 z-10">
                <span className="gc-mono rounded-[3px] bg-[rgba(10,12,13,0.55)] px-2 py-1 text-[0.56rem] tracking-[0.14em] text-[var(--gc-text-faint)] backdrop-blur-sm">
                  ILLUSTRATIVE MAP
                </span>
              </div>
            </div>
          </div>

          {/* ── Selected project panel — desktop only (driven by the interactive pins) ── */}
          <div className="hidden flex-col gap-4 md:flex">
            <div className="gc-card flex-1 p-6 sm:p-7">
              <motion.div key={selected} variants={panelV} initial={reduce ? false : "hidden"} animate="show">
                <motion.div variants={itemV} className="flex items-center gap-2.5">
                  <span className="text-[var(--gc-hi)]"><MapPin size={20} weight="fill" aria-hidden="true" /></span>
                  <span className="gc-mono text-[0.62rem] tracking-[0.16em] text-[var(--gc-text-muted)]">
                    {sel.discipline.toUpperCase()} · {sel.parish.toUpperCase()} PARISH
                  </span>
                </motion.div>
                <motion.h3 variants={itemV} className="gc-display-md mt-3 text-[var(--gc-text)]">{sel.name}</motion.h3>
                <motion.p variants={itemV} className="gc-mono mt-2 text-[0.78rem] text-[var(--gc-text-muted)]">
                  {sel.owner}{sel.year ? ` · ${sel.year}` : ""}
                </motion.p>
                {sel.value && (
                  <motion.p variants={itemV} className="gc-display mt-4 text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[var(--gc-hi)]">{sel.value}</motion.p>
                )}
                <motion.p variants={itemV} className="mt-4 text-[0.92rem] leading-relaxed text-[var(--gc-text-muted)]">{sel.blurb}</motion.p>
                <motion.div variants={itemV} className="mt-5 flex items-center gap-3">
                  <span className="inline-flex rounded-[3px] border border-[var(--gc-line-strong)] bg-[var(--gc-panel-2)] px-3 py-1.5 text-[0.76rem] text-[var(--gc-text-muted)]">{sel.type}</span>
                  {!sel.hq && (
                    <a href={sel.source} target="_blank" rel="noopener noreferrer" className="gc-focus inline-flex items-center gap-1 text-[0.78rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                      Source <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </div>

            <a href="/contact" className="gc-btn gc-btn-primary gc-focus !py-[1rem]">
              Put your project on this map
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
            <a href="#projects" className="gc-focus inline-flex w-fit items-center gap-1.5 text-[0.82rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
              See the full project list
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ── Mobile: a touch-native swipe deck of the flagship jobs + the doors.
            No pin-hunting — the map above is a static proof visual on phone. ── */}
        <div className="md:hidden">
          <p className="gc-mono mb-3 mt-8 text-[0.6rem] tracking-[0.2em] text-[var(--gc-text-faint)]">FLAGSHIP WORK</p>
          <div className="gc-noscroll -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {SIGNATURE.map((p) => (
              <article key={p.name} className="gc-card w-[84%] shrink-0 snap-center overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.img} alt={`${p.discipline} work, ${p.name}`} fill sizes="84vw" className="gc-img object-cover" />
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(12,14,15,0.92) 100%)" }} aria-hidden="true" />
                  {p.value && <span className="absolute bottom-3 left-4 gc-display text-[1.5rem] leading-none text-[var(--gc-hi)]">{p.value}</span>}
                </div>
                <div className="p-5">
                  <p className="gc-mono text-[0.58rem] tracking-[0.14em] text-[var(--gc-text-muted)]">{p.discipline.toUpperCase()} · {p.parish.toUpperCase()} PARISH{p.year ? ` · ${p.year}` : ""}</p>
                  <h3 className="gc-display mt-2 text-[1.18rem] leading-tight text-[var(--gc-text)]">{p.name}</h3>
                  <p className="mt-2 line-clamp-3 text-[0.86rem] leading-relaxed text-[var(--gc-text-muted)]">{p.blurb}</p>
                  <a href={p.source} target="_blank" rel="noopener noreferrer" className="gc-focus mt-3 inline-flex items-center gap-1 text-[0.76rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                    Source <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-7 flex flex-col gap-3">
            <a href="/contact" className="gc-btn gc-btn-primary gc-focus !py-[1.05rem]">
              Put your project on this map
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
            <a href="#projects" className="gc-focus inline-flex items-center gap-1.5 self-start text-[0.84rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
              View full project record
              <ArrowRight size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
