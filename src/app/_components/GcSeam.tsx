"use client";

import { motion, useReducedMotion } from "motion/react";
import { GC_EASE } from "./motion";

/** A surveyed section seam. The faint vertical centerline DRAWS itself downward
 *  as it enters view and the green station tick sweeps out from the line, so the
 *  whole page reads as one continuous alignment rather than disconnected stubs.
 *  Under prefers-reduced-motion every part renders at its final state (initial
 *  false), so a divider can never look broken. Pure transform, aria-hidden. */
const VP = { once: true, amount: 0.4 } as const;

export default function GcSeam({ sta, tone = "default" }: { sta?: string; tone?: "default" | "quiet" }) {
  const reduce = useReducedMotion();
  const tickOpacity = tone === "quiet" ? 0.32 : 0.5;

  return (
    <div className="relative h-16 sm:h-20" aria-hidden="true">
      {/* vertical centerline — wrapper positions, inner span scales (no transform clash) */}
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2">
        <motion.span
          className="block h-full w-px origin-top bg-[var(--gc-line)]"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: GC_EASE }}
        />
      </span>

      {/* station tick — sweeps right out of the line */}
      <span className="absolute left-1/2 top-1/2 -translate-y-1/2">
        <motion.span
          className="block h-0.5 w-[22px] origin-left bg-[var(--gc-hi)]"
          style={{ opacity: tickOpacity }}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VP}
          transition={{ duration: 0.4, ease: GC_EASE, delay: 0.22 }}
        />
      </span>

      {sta && (
        <motion.span
          className="gc-mono absolute left-[calc(50%_+_22px)] top-1/2 -translate-y-1/2 pl-3 text-[0.54rem] tracking-[0.22em] text-[var(--gc-text-faint)]"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.3, ease: GC_EASE, delay: 0.38 }}
        >
          STA {sta}
        </motion.span>
      )}
    </div>
  );
}
