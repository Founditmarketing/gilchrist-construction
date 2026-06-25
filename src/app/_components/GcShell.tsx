"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GcHeader from "./GcHeader";
import GcFooter from "./GcFooter";
import GcActionBar from "./GcActionBar";
import GcProgressRail from "./GcProgressRail";
import GcTotalStation from "./GcTotalStation";
import GcSmoothScroll from "./GcSmoothScroll";

/** Wraps the route children with the production chrome (header, footer, rail,
 *  HUD cursor, smooth-scroll) — EXCEPT on the `/gilchrist/showcase` awards cut,
 *  which is a full-bleed immersive experience that ships none of it. */
export default function GcShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/gilchrist/showcase")) return <>{children}</>;

  return (
    <>
      <GcSmoothScroll />
      <a href="#gc-main" className="gc-skip">Skip to content</a>
      <GcHeader />
      <main id="gc-main" tabIndex={-1} className="flex-1">{children}</main>
      <GcFooter />
      <GcActionBar />
      <GcProgressRail />
      <GcTotalStation />
    </>
  );
}
