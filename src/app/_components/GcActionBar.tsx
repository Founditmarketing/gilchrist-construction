"use client";

import { useEffect, useState } from "react";
import { Briefcase, Phone } from "@phosphor-icons/react";
import { PHONE_HREF } from "../site";

/** Mobile-only sticky action bar — the owner's two thumb-reachable doors: Call
 *  the office, or Request a bid. Revealed once the hero scrolls past so it never
 *  competes with it. Careers lives in the menu + as a section CTA, not here. */
export default function GcActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`gc-material gc-safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-[var(--gc-line-strong)] px-3 py-2.5 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ boxShadow: "0 -8px 24px -12px rgba(0,0,0,0.7)" }}
    >
      <div className="flex gap-2.5">
        <a href={PHONE_HREF} className="gc-btn gc-btn-steel gc-focus flex-1 !py-3.5 text-[0.92rem]">
          <Phone size={18} weight="fill" aria-hidden="true" />
          Call
        </a>
        <a href="/contact" className="gc-btn gc-btn-primary gc-focus flex-[1.4] !py-3.5 text-[0.92rem]">
          <Briefcase size={18} weight="fill" aria-hidden="true" />
          Request a bid
        </a>
      </div>
    </div>
  );
}
