"use client";

import { motion, useReducedMotion } from "motion/react";
import { STATS } from "../site";
import { Reveal } from "./Reveal";
import { GC_EASE } from "./motion";

/** The proof band — verified numbers up front, shown STATICALLY (no count-up).
 *  A count-up flashed misleading intermediate values (e.g. "$77M", "234") that
 *  read as real-but-wrong figures to an engineer audience, so the value is
 *  rendered from first paint. Only the survey furniture is kinetic: the green
 *  rule above each figure plots left→right in sequence, like marks on a strip.
 *  The number itself never animates. */
export default function GcProof() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-[var(--gc-line)] bg-[var(--gc-inset)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal>
          <p className="gc-station-quiet mb-12 flex items-center gap-2.5 sm:mb-16">
            <span className="inline-block h-[0.45rem] w-[0.45rem] shrink-0 bg-[var(--gc-hi)] [box-shadow:0_0_10px_var(--gc-hi-glow)]" aria-hidden="true" />
            Louisiana DOTD prime · self-performing asphalt, concrete, bridges &amp; earthwork
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-end">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative">
                <motion.span
                  className="mb-4 block h-[2px] w-9 origin-left bg-[var(--gc-hi)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, ease: GC_EASE, delay: 0.12 + i * 0.08 }}
                />
                <div className={`gc-display tabular-nums leading-none text-[var(--gc-text)] ${i === 0 ? "text-[clamp(3.2rem,7vw,5rem)]" : "text-[clamp(2.2rem,4.4vw,3.2rem)]"}`}>
                  {s.display}
                </div>
                <p className="mt-3 max-w-[22ch] text-[0.78rem] leading-snug text-[var(--gc-text-muted)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-[0.8rem]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
