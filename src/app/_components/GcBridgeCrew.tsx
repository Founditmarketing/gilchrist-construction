"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { FIGURES } from "../site";
import { Reveal } from "./Reveal";

/** "380 years on one crew" — the company's single best human asset, made the
 *  emotional peak it deserves. A full-bleed cinematic bed: a backlit bridge crew
 *  in silhouette (faces hidden by design). The still is the poster + reduced-motion
 *  fallback; the loop plays over it when motion is allowed, and is lazy (preload
 *  none) so it only loads when the section scrolls into view. AI-illustrative
 *  footage — swap for real Gilchrist footage before the live launch. */
export default function GcBridgeCrew() {
  const reduce = useReducedMotion();

  return (
    <section id="bridges" className="relative isolate overflow-hidden">
      {/* Full-bleed cinematic bed — z-0 above the page background (a negative
          z-index would be painted over by the .gc-scope gradient). */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/gilchrist/raw/crew-silhouette.jpg"
          alt="A heavy-civil bridge crew in silhouette guiding a steel load on a half-built bridge at golden hour"
          fill
          sizes="100vw"
          className="gc-img object-cover object-center"
        />
        {!reduce && (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/gilchrist/raw/crew-silhouette.jpg"
            aria-hidden="true"
          >
            <source src="/gilchrist/crew-silhouette.mp4" type="video/mp4" />
          </video>
        )}
        {/* Vertical grade keeps the headline legible top + the page seam clean bottom. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,10,0.84) 0%, rgba(8,9,10,0.4) 40%, rgba(8,9,10,0.7) 78%, rgba(8,9,10,0.95) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Left grade — anchors the type column against the bright backlit center. */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(8,9,10,0.82) 0%, rgba(8,9,10,0.32) 46%, transparent 76%)" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36 lg:py-44">
        <Reveal className="max-w-3xl">
          <p className="gc-station mb-6">STA 16+50 — THE BRIDGE CREW</p>
          <h2 aria-label="380 years, one crew" className="flex items-end gap-4">
            <span className="gc-display text-[clamp(4.5rem,14vw,9rem)] leading-[0.8] text-[var(--gc-hi)]">
              380
            </span>
            <span className="gc-display text-[clamp(1.4rem,4vw,2.4rem)] leading-none text-[var(--gc-text)] pb-2">
              YEARS,<br />ONE&nbsp;CREW.
            </span>
          </h2>
          <p className="gc-body-lg mt-8 max-w-xl text-[var(--gc-text)]">
            Gilchrist's bridge-structures team runs {FIGURES.crewMembers.display}{" "}
            members with more than 380 years of combined experience — among the
            most experienced in Louisiana. Pile driving, prefabricated
            foundations, steel, and moveable bridges. The kind of knowledge you
            can't buy, only build.
          </p>

          <dl className="mt-9 grid max-w-xl grid-cols-3 gap-5 border-t border-[var(--gc-line-strong)] pt-7">
            {[
              { v: FIGURES.crewMembers.display, l: "Team members" },
              { v: "Pile→Deck", l: "Self-performed" },
              { v: "Fixed & Moveable", l: "Structure types" },
            ].map((x) => (
              <div key={x.l}>
                <dt className="gc-display text-[clamp(1.1rem,2.4vw,1.7rem)] leading-none text-[var(--gc-text)]">{x.v}</dt>
                <dd className="mt-2 text-[0.78rem] leading-snug text-[var(--gc-text-muted)]">{x.l}</dd>
              </div>
            ))}
          </dl>

          <a href="/careers" className="gc-btn gc-btn-primary gc-focus mt-10 !py-[1.05rem] sm:!px-7">
            View open roles
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
