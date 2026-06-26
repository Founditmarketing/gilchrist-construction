"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";

/** The service-page media plate — a full-bleed cinematic band right after the
 *  type-first hero. Plays the discipline clip where we have real footage
 *  (bridges, design-build); otherwise the still photo. Honest: the ILLUSTRATIVE
 *  caption stays, and under prefers-reduced-motion we render the poster image
 *  instead of the autoplaying loop. */
export default function GcMediaPlate({ img, video, alt }: { img: string; video?: string; alt: string }) {
  const reduce = useReducedMotion();
  const showVideo = !!video && !reduce;

  return (
    <div className="relative h-[42vh] min-h-[300px] w-full overflow-hidden border-y border-[var(--gc-line)] sm:h-[52vh] sm:min-h-[380px]">
      {showVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={img}
          aria-hidden="true"
          className="gc-cap-img absolute inset-0 h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <Image src={img} alt={alt} fill sizes="100vw" className="gc-cap-img object-cover" priority />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,9,10,0.32) 0%, transparent 28%, transparent 66%, rgba(8,9,10,0.6) 100%)" }}
        aria-hidden="true"
      />
      <p className="absolute bottom-3 left-5 gc-mono text-[0.54rem] tracking-[0.2em] text-[var(--gc-text-faint)] sm:left-8">ILLUSTRATIVE</p>
      <p className="absolute bottom-3 right-5 gc-mono text-[0.54rem] tracking-[0.2em] text-[var(--gc-text-faint)] sm:right-8">STA 0+50</p>
    </div>
  );
}
