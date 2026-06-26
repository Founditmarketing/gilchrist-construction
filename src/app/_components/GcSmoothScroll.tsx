"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Lenis momentum smooth-scroll for the whole site (mounted once in GcShell).
 *  Anchor clicks glide to their STA section; on every route change we snap the
 *  scroll back to the top, because Lenis keeps its own virtual scroll position
 *  and would otherwise drop you mid-page (or at the bottom of a shorter page)
 *  on navigation. Fully disabled under prefers-reduced-motion. */
export default function GcSmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  // Snap to the top of every newly navigated page (Lenis otherwise retains the
  // prior page's scroll offset). Runs on mount too, which is a harmless no-op.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
