"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, HardHat } from "@phosphor-icons/react";
import { FOUNDED } from "../site";
import { Magnetic } from "./Magnetic";
import { GC_EASE } from "./motion";

/** A line that rises out of an overflow clip. */
function Line({ children, delay, reduce }: { children: ReactNode; delay: number; reduce: boolean | null }) {
  return (
    <span className="block overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.04em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.0, ease: GC_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function GcHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden px-5 pb-24 pt-[calc(96px+env(safe-area-inset-top))] sm:min-h-[100dvh] sm:px-8 sm:pb-28 sm:pt-[calc(120px+env(safe-area-inset-top))] lg:pb-36"
    >
      {/* Cinematic photo bed — the live site's own dusk-centerline highway.
          z-0 (not negative) so it sits ABOVE the .gc-scope page background, which
          would otherwise paint over a negatively-stacked layer. */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: GC_EASE }}
        >
          {/* Hero: an aerial of a steel-girder interchange under construction. The
              still (hero-interchange.jpg) is the LCP image + poster + reduced-motion
              fallback; the cropped video layers over it when motion is allowed. Both
              are AI-generated / illustrative pitch assets — swap for real Gilchrist
              footage + photo before the live client launch. */}
          <Image
            src="/gilchrist/raw/hero-aerial.jpg"
            alt="Drone view over a Louisiana highway interchange under construction — curving flyover ramps, crawler cranes, and interstate traffic below at golden hour"
            fill
            sizes="100vw"
            className="object-cover object-[50%_42%]"
            priority
          />
          {!reduce && (
            <video
              className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/gilchrist/raw/hero-aerial.jpg"
              aria-hidden="true"
            >
              <source src="/gilchrist/hero-aerial.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
        {/* Asphalt scrim — keeps text AA-legible and grades the bright sky down. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,9,10,0.9) 0%, rgba(8,9,10,0.58) 28%, rgba(8,9,10,0.52) 50%, rgba(8,9,10,0.82) 78%, rgba(8,9,10,0.99) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(8,9,10,0.9) 0%, rgba(8,9,10,0.55) 38%, rgba(8,9,10,0.15) 64%, transparent 80%)" }}
          aria-hidden="true"
        />
        {/* One vignette layer — graded corners turn the dusk highway into a single
            framed image instead of photo-with-text; focus sits on the road's vanishing point. */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 95% at 50% 40%, transparent 36%, rgba(8,9,10,0.62) 100%)" }}
          aria-hidden="true"
        />
      </div>
      <div className="gc-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Station eyebrow — the surveyor's mark that opens the page. */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="gc-station">STA 0+00</p>
          <p className="gc-station-quiet mt-2.5">ALEXANDRIA, LOUISIANA · EST. {FOUNDED}</p>
        </motion.div>

        <h1 className="gc-display-xl max-w-[15ch] text-[var(--gc-text)] [text-shadow:0_2px_30px_rgba(8,9,10,0.55)]">
          <Line delay={0.05} reduce={reduce}>We build</Line>
          <Line delay={0.17} reduce={reduce}>what Louisiana</Line>
          <Line delay={0.29} reduce={reduce}>
            <span className="gc-hot">runs on.</span>
          </Line>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7, ease: GC_EASE }}
          className="gc-body-lg mt-8 max-w-xl text-balance sm:mt-10"
        >
          Heavy-civil construction, self-performed from the ground up — built
          from Alexandria across Louisiana since {FOUNDED}.
        </motion.p>

        {/* Two front doors — owners convert, operators apply. The audience split
            lives at the contact section; here the buttons speak for themselves. */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.74, duration: 0.7, ease: GC_EASE }}
          className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:gap-5"
        >
          <Magnetic className="w-full sm:w-auto" strength={0.34}>
            <a href="/contact" className="gc-btn gc-btn-primary gc-focus w-full !py-[1.05rem] text-base sm:w-auto sm:!px-8">
              Request a bid
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </Magnetic>
          <a href="/careers" className="gc-btn gc-btn-steel gc-focus w-full !py-[1.05rem] sm:w-auto sm:!px-7">
            <HardHat size={19} weight="fill" aria-hidden="true" />
            View open roles
          </a>
        </motion.div>
      </div>
    </section>
  );
}
