"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { GC_EASE } from "./motion";

/**
 * A count-up that runs once when scrolled into view. For year values (1981) it
 * counts from a near floor so it doesn't sweep from zero; for tallies it sweeps
 * from zero. Honors prefers-reduced-motion by snapping to the final value.
 * Renders the provided `display` string's separators by formatting the live
 * number, falling back to `display` once settled so "2,400+" reads exactly.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  display,
  isYear = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  display: string;
  isYear?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(isYear ? Math.max(value - 28, 0) : 0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setDone(true); return; }
    const from = isYear ? Math.max(value - 28, 0) : 0;
    const dur = 1500;
    let raf = 0;
    let start = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-out, matches GC_EASE feel
    void GC_EASE;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.round(from + (value - from) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDone(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, isYear]);

  const live = isYear ? String(n) : n.toLocaleString("en-US");
  return (
    <span ref={ref} className="gc-mono tabular-nums">
      {done ? display : `${prefix}${live}${suffix}`}
    </span>
  );
}
