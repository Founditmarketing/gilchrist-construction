"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { STATS, FIGURES } from "../site";
import { GC_EASE } from "./motion";

// 380+ combined years lives in STATS (verified); pulled here so the beat never
// hard-codes a figure. SWAP NOTE: crew-silhouette.mp4 + its poster are
// illustrative pitch assets — replace with real Gilchrist footage before launch.
const YEARS = STATS.find((s) => s.num === 380)?.display ?? "380+";
const POSTER = "/gilchrist/raw/crew-silhouette.jpg";
const CREW_ALT = "A heavy-civil bridge crew in silhouette guiding a steel load at golden hour";

/** One compact cinematic beat — the page's second visual peak. The silhouette
 *  clip on desktop (still poster on phones for data/perf, and under
 *  reduced-motion), an oversized 380+ rising out of the dark, and the real crew
 *  figures. No scroll listener here (the Louisiana band owns the only one). */
export default function GcCrewBeat() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[60svh] items-center overflow-hidden border-y border-[var(--gc-line)] sm:min-h-[64svh]">
      {reduce ? (
        <Image src={POSTER} alt={CREW_ALT} fill sizes="100vw" className="-z-10 gc-img object-cover" />
      ) : (
        <>
          <video
            className="absolute inset-0 -z-10 hidden h-full w-full object-cover sm:block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            aria-hidden="true"
          >
            <source src="/gilchrist/crew-silhouette.mp4" type="video/mp4" />
          </video>
          <Image src={POSTER} alt={CREW_ALT} fill sizes="100vw" className="-z-10 gc-img object-cover sm:hidden" />
        </>
      )}

      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, rgba(8,9,10,0.72) 0%, rgba(8,9,10,0.42) 46%, rgba(8,9,10,0.86) 100%)" }} aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <p className="gc-station-quiet mb-6">STA 16+50 · THE BRIDGE CREW</p>
        <div className="overflow-hidden pb-1">
          <motion.p
            className="gc-display-xl leading-[0.82] text-[var(--gc-hi)]"
            initial={reduce ? false : { y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: GC_EASE }}
          >
            {YEARS}
          </motion.p>
        </div>
        <motion.span
          className="mt-5 block h-px w-40 max-w-full origin-left bg-[var(--gc-hi)]"
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: GC_EASE, delay: 0.3 }}
        />
        <p className="gc-mono mt-5 text-[0.72rem] leading-relaxed tracking-[0.14em] text-[var(--gc-text-muted)]">
          YEARS COMBINED ON THE BRIDGE CREW · {FIGURES.crewMembers.display} MEMBERS · PILE TO DECK
        </p>
        <Link href="/what-we-build/bridges" className="gc-focus group mt-7 inline-flex items-center gap-1.5 gc-mono text-[0.78rem] tracking-[0.06em] text-[var(--gc-text)] transition-colors hover:text-[var(--gc-hi)]">
          Meet the bridge crew
          <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
