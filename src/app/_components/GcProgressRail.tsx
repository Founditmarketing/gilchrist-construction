"use client";

import { useEffect, useState } from "react";

/** The Centerline, made functional — a fixed station-marker rail that tracks
 *  scroll progress and the active section, lets you jump between them, AND reads
 *  out a LIVE surveyor station that interpolates with scroll (STA 0+00 → 34+80),
 *  with a glowing cursor riding the painted center-line. Desktop-only (xl+).  */
const SECTIONS = [
  { id: "top", sta: "0+00", label: "Start" },
  { id: "capabilities", sta: "4+20", label: "What we build" },
  { id: "map", sta: "8+10", label: "Built Louisiana" },
  { id: "careers", sta: "20+00", label: "Careers" },
  { id: "start", sta: "34+80", label: "Start here" },
];

// The final station (34+80) = 34.80 station-units; the live readout maps scroll
// progress across this range, the way a survey chain runs the length of a job.
const MAX_STA = 34.8;

export default function GcProgressRail() {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // The rail only renders at xl+. Don't run the IntersectionObserver + scroll
    // handler on smaller screens — that's wasted work on the field phones the
    // rail is hidden on. Re-sync if the viewport crosses the xl breakpoint.
    const mq = window.matchMedia("(min-width: 1280px)");
    let cleanup: (() => void) | null = null;

    const start = () => {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
      );
      SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });

      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const h = document.documentElement;
          const max = h.scrollHeight - h.clientHeight;
          setProgress(max > 0 ? Math.min(h.scrollTop / max, 1) : 0);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanup = () => { obs.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
    };

    const sync = () => { cleanup?.(); cleanup = null; if (mq.matches) start(); };
    sync();
    mq.addEventListener("change", sync);
    return () => { cleanup?.(); mq.removeEventListener("change", sync); };
  }, []);

  // Live interpolated station: e.g. progress 0.5 → "STA 17+40".
  const staVal = progress * MAX_STA;
  const whole = Math.floor(staVal);
  const feet = Math.min(99, Math.round((staVal - whole) * 100));
  const liveSta = `${whole}+${String(feet).padStart(2, "0")}`;

  return (
    <nav aria-label="Section progress" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-end">
        {/* Live station readout — counts with scroll */}
        <div className="mb-4 flex items-center justify-end gap-2 text-right" aria-hidden="true">
          <div>
            <span className="gc-mono block text-[0.48rem] tracking-[0.34em] text-[var(--gc-text-faint)]">STATION</span>
            <span className="gc-mono block text-[0.98rem] font-medium tabular-nums tracking-tight text-[var(--gc-hi)]">
              STA {liveSta}
            </span>
          </div>
          <span className="h-2 w-2 shrink-0 bg-[var(--gc-hi)]" style={{ boxShadow: "0 0 12px var(--gc-hi-glow)" }} />
        </div>

        <div className="relative flex flex-col gap-5 pl-4">
          {/* center-line + painted progress fill */}
          <span className="pointer-events-none absolute right-[3px] top-1 bottom-1 w-px bg-[var(--gc-line-strong)]" aria-hidden="true" />
          <span
            className="pointer-events-none absolute right-[3px] top-1 w-px origin-top bg-[var(--gc-hi)]"
            style={{ height: `calc((100% - 8px) * ${progress})`, opacity: 0.75 }}
            aria-hidden="true"
          />
          {/* glowing cursor riding the painted line */}
          <span
            className="pointer-events-none absolute z-10 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gc-hi)]"
            style={{ right: "3.5px", top: `calc(4px + (100% - 8px) * ${progress})`, boxShadow: "0 0 9px var(--gc-hi-glow)" }}
            aria-hidden="true"
          />

          {SECTIONS.map((s) => {
            const on = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} aria-current={on ? "true" : undefined} className="gc-focus group flex items-center justify-end gap-3">
                <span
                  className={`gc-mono whitespace-nowrap text-[0.6rem] tracking-[0.12em] transition-all duration-300 ${
                    on ? "text-[var(--gc-hi)] opacity-100" : "text-[var(--gc-text-faint)] opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
                  }`}
                >
                  <span className="text-[var(--gc-text-faint)]">STA {s.sta}</span> · {s.label}
                </span>
                <span
                  className={`block h-[7px] w-[7px] shrink-0 rounded-full border transition-all duration-300 ${
                    on ? "scale-125 border-[var(--gc-hi)] bg-[var(--gc-hi)]" : "border-[var(--gc-text-faint)] bg-[var(--gc-ground)] group-hover:border-[var(--gc-text)] group-focus-visible:border-[var(--gc-text)]"
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
