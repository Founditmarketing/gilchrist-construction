"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis momentum smooth-scroll, scoped to /gilchrist (mounted in the route
 *  layout, destroyed on unmount so it never leaks into the Chill app or the
 *  other showcase routes). Anchor clicks are routed through Lenis for a smooth
 *  glide to each STA section. Fully disabled under prefers-reduced-motion. */
export default function GcSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor jumps (header nav, station rail, CTAs) through Lenis,
    // clearing the sticky header.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.2 });
      } else if (a.getAttribute("href") === "#top") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
