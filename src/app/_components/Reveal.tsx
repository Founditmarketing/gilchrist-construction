"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GC_EASE } from "./motion";

/**
 * A gentle upward settle on scroll-in. Content is ALWAYS visible (opacity stays
 * 1) so a missed in-view trigger can never leave a blank gap — the reveal is
 * only a small translate. Polymorphic via `as`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { y }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: GC_EASE }}
    >
      {children}
    </M>
  );
}
