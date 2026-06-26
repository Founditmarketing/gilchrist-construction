"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { CAPABILITIES } from "../site";
import { Reveal } from "./Reveal";

/** What we self-perform, as a live capabilities readout. The disciplines are a
 *  focusable list; hovering or focusing a row cross-fades that discipline's
 *  photo into the left panel and slides a green indicator to the row. Resting
 *  state is calm (no row lit, image shows the first discipline). The image panel
 *  is desktop-only (md/lg) so phones keep the clean, tight list — and it's
 *  absolutely stacked, so nothing reflows. Imagery is illustrative, to be
 *  swapped for real Gilchrist footage before launch. */
export default function GcCapabilitiesReadout() {
  const [active, setActive] = useState(-1);
  const shown = active < 0 ? 0 : active;

  return (
    <section id="capabilities" className="relative border-b border-[var(--gc-line)] bg-[var(--gc-ground)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mb-10 max-w-2xl sm:mb-12">
          <p className="gc-station mb-5">STA 4+20 · WHAT WE SELF-PERFORM</p>
          <h2 className="gc-display-lg text-[var(--gc-text)]">
            One company.<br /><span className="gc-hot">The whole job.</span>
          </h2>
          <p className="gc-body-lg mt-5 text-[var(--gc-text-muted)]">
            Asphalt, concrete, bridges, earthwork, and design-build: production and crews under one roof, so the
            standard is ours to hold from base course to bridge deck.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          {/* Image panel — desktop only; cross-fades to the active discipline */}
          <Reveal className="relative hidden aspect-[4/3] overflow-hidden rounded-[3px] border border-[var(--gc-line-strong)] lg:block">
            {CAPABILITIES.map((c, i) => (
              <Image
                key={c.key}
                src={c.img}
                alt=""
                fill
                sizes="45vw"
                className="gc-cap-img object-cover transition-[opacity,transform] duration-500 ease-out"
                style={{ opacity: shown === i ? 1 : 0, transform: shown === i ? "scale(1)" : "scale(1.05)" }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,14,15,0.92) 100%)" }} aria-hidden="true" />
            <h3 className="pointer-events-none absolute bottom-9 left-5 right-5 gc-display text-[1.5rem] leading-none text-[var(--gc-text)]">{CAPABILITIES[shown].name}</h3>
            <p className="pointer-events-none absolute bottom-4 left-5 gc-mono text-[0.5rem] tracking-[0.2em] text-[var(--gc-text-faint)]">ILLUSTRATIVE · FOOTAGE TO COME</p>
          </Reveal>

          {/* Interactive discipline list */}
          <Reveal delay={0.08}>
            <ul className="border-t border-[var(--gc-line)]">
              {CAPABILITIES.map((c, i) => {
                const on = active === i;
                return (
                  <li key={c.key} className="relative">
                    <Link
                      href={`/what-we-build/${c.key}`}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(-1)}
                      onFocus={() => setActive(i)}
                      onBlur={() => setActive(-1)}
                      className="gc-focus group flex items-center gap-4 border-b border-[var(--gc-line)] py-5"
                    >
                      {on && <motion.span layoutId="gc-cap-ind" className="absolute left-0 top-0 h-full w-0.5 bg-[var(--gc-hi)]" transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} />}
                      <span className={`gc-mono w-6 shrink-0 text-[0.7rem] tabular-nums transition-colors duration-300 ${on ? "text-[var(--gc-hi)]" : "text-[var(--gc-text-faint)]"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`gc-display text-[1.5rem] leading-none transition-[color,transform] duration-300 ${on ? "translate-x-1 text-[var(--gc-hi)]" : "text-[var(--gc-text)]"}`}>{c.name}</span>
                      <span className={`ml-auto hidden max-w-[12rem] gc-mono text-right text-[0.64rem] leading-snug tracking-[0.06em] text-[var(--gc-text-faint)] transition-opacity duration-300 sm:block ${on ? "opacity-100" : "opacity-0"}`}>{c.proof}</span>
                      <ArrowRight size={16} weight="bold" className={`shrink-0 transition-all duration-300 ${on ? "translate-x-0.5 text-[var(--gc-hi)] opacity-100" : "text-[var(--gc-text-faint)] opacity-0"}`} aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <Link href="/what-we-build" className="gc-btn gc-btn-ghost gc-focus !py-[0.95rem] sm:!px-6">
            See what we self-perform
            <ArrowRight size={17} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
