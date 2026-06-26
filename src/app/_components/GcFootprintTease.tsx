"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, MapTrifold } from "@phosphor-icons/react";
import { PROJECTS } from "../site";
import { Reveal } from "./Reveal";

const DOCUMENTED = PROJECTS.filter((p) => !p.hq).length;
// Real parishes only (deduped from PROJECTS) — the marquee never invents a place.
const PARISHES = [...new Set(PROJECTS.filter((p) => !p.hq).map((p) => p.parish))];

/** Built-across-Louisiana teaser. A slow scroll parallax on the field bed makes
 *  the band breathe like aerial footage (this is the page's ONLY useScroll
 *  listener), and a marquee of the real parishes teases the statewide footprint
 *  the interactive map carries on /projects. Reduced-motion: bed static, marquee
 *  static (handled in gilchrist.css). */
export default function GcFootprintTease() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section ref={ref} id="map" className="relative isolate overflow-hidden border-b border-[var(--gc-line)]">
      <motion.div className="absolute inset-[-8%] -z-10" style={{ y }}>
        <Image src="/gilchrist/raw/field-4.jpg" alt="" fill sizes="100vw" className="gc-img object-cover opacity-[0.22]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--gc-ground)_0%,rgba(12,14,15,0.82)_55%,var(--gc-ground)_100%)]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="max-w-2xl">
          <p className="gc-station mb-5">STA 8+10 · THE FOOTPRINT</p>
          <h2 className="gc-display-lg text-[var(--gc-text)]">
            Every pin is a road<br /><span className="gc-hot">Louisiana drives on.</span>
          </h2>
          <p className="gc-body-lg mt-6 max-w-lg text-[var(--gc-text-muted)]">
            {DOCUMENTED} documented DOTD interchanges, bridges, and interstate corridors across the state, including
            Louisiana&apos;s first diverging diamond interchange.
          </p>
          <Link href="/projects" className="gc-btn gc-btn-primary gc-focus mt-8 !py-[1rem] sm:!px-7">
            <MapTrifold size={18} weight="fill" aria-hidden="true" />
            Explore where we build
          </Link>
        </Reveal>
      </div>

      <Link
        href="/projects"
        aria-label="Explore projects across Louisiana"
        className="gc-marquee-mask group relative block overflow-hidden border-t border-[var(--gc-line)] py-3.5"
      >
        <div className="gc-marquee flex w-max items-center gc-mono text-[0.66rem] tracking-[0.22em] text-[var(--gc-text-faint)] transition-colors group-hover:text-[var(--gc-text-muted)]">
          {[...PARISHES, ...PARISHES].map((p, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-5">{p.toUpperCase()} PARISH</span>
              <span className="h-1 w-1 shrink-0 bg-[var(--gc-hi)] opacity-60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </Link>
    </section>
  );
}
