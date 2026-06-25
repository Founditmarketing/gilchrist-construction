"use client";

import { useEffect, useRef, useState } from "react";

/** "Total Station" HUD cursor — the surveying instrument made literal. Thin
 *  crosshair lines project to the viewport edges from a reticle at the pointer,
 *  with live telemetry (STA from x, elevation from y) recomputing as you move.
 *  Pure DOM transforms updated on pointermove (no rAF, no WebGL) so it's smooth
 *  and free even on weak hardware. Desktop/fine-pointer + lg+ only; fully off
 *  under reduced-motion. pointer-events:none — never blocks a click. */
export default function GcTotalStation() {
  const [on, setOn] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const vline = useRef<HTMLDivElement>(null);
  const hline = useRef<HTMLDivElement>(null);
  const reticle = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const staEl = useRef<HTMLSpanElement>(null);
  const elEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);

    let shown = false;
    const onMove = (e: PointerEvent) => {
      if (!shown && wrap.current) { wrap.current.style.opacity = "1"; shown = true; }
      const x = e.clientX, y = e.clientY, w = window.innerWidth, h = window.innerHeight;
      if (vline.current) vline.current.style.transform = `translate3d(${x}px,0,0)`;
      if (hline.current) hline.current.style.transform = `translate3d(0,${y}px,0)`;
      if (reticle.current) reticle.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (tag.current) tag.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      // Stylized survey telemetry: STA runs 0+00→34+80 across the width; the
      // "elevation" runs ~44'→220' up the height. Approximate, like the map.
      const s = (x / w) * 34.8;
      if (staEl.current) staEl.current.textContent = `STA ${Math.floor(s)}+${String(Math.round((s % 1) * 100)).padStart(2, "0")}`;
      if (elEl.current) elEl.current.textContent = `EL +${(220 - (y / h) * 176).toFixed(1)}'`;
    };
    const onLeave = () => { if (wrap.current) { wrap.current.style.opacity = "0"; shown = false; } };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => { window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, []);

  if (!on) return null;

  const lineColor = "rgba(67,174,42,0.16)";
  return (
    <div ref={wrap} className="gc-ts pointer-events-none fixed inset-0 z-[55] hidden opacity-0 lg:block" aria-hidden="true">
      {/* vertical + horizontal survey lines */}
      <div ref={vline} className="absolute left-0 top-0 h-full w-px will-change-transform" style={{ background: lineColor }} />
      <div ref={hline} className="absolute left-0 top-0 h-px w-full will-change-transform" style={{ background: lineColor }} />
      {/* reticle target */}
      <div ref={reticle} className="absolute left-0 top-0 will-change-transform">
        <div className="-ml-[9px] -mt-[9px] h-[18px] w-[18px] rounded-full border border-[var(--gc-hi)]/55" />
        <div className="absolute left-[-1px] top-[-1px] h-px w-px" />
      </div>
      {/* live telemetry chip */}
      <div ref={tag} className="absolute left-0 top-0 will-change-transform">
        <div className="gc-mono ml-4 mt-3.5 flex flex-col gap-0.5 rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(10,12,13,0.66)] px-2 py-1 text-[0.56rem] leading-tight tracking-[0.1em] text-[var(--gc-hi)] backdrop-blur-sm">
          <span ref={staEl}>STA 0+00</span>
          <span ref={elEl} className="text-[var(--gc-text-faint)]">EL +220.0&apos;</span>
        </div>
      </div>
    </div>
  );
}
