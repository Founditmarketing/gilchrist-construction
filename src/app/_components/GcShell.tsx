"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import GcHeader from "./GcHeader";
import GcFooter from "./GcFooter";
import GcActionBar from "./GcActionBar";
import GcProgressRail from "./GcProgressRail";
import GcTotalStation from "./GcTotalStation";
import GcSmoothScroll from "./GcSmoothScroll";

/** Wraps every route with the production chrome (header, footer, action bar,
 *  HUD cursor, smooth-scroll). The station progress rail is a home-page
 *  signature — its sections only exist on "/", so it's gated to the home. */
export default function GcShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <GcSmoothScroll />
      <a href="#gc-main" className="gc-skip">Skip to content</a>
      <GcHeader />
      <main id="gc-main" tabIndex={-1} className="flex-1">{children}</main>
      <GcFooter />
      <GcActionBar />
      {isHome && <GcProgressRail />}
      <GcTotalStation />
    </>
  );
}
