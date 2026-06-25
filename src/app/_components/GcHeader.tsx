"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Phone, List, X, ArrowRight, HardHat } from "@phosphor-icons/react";
import { PHONE_DISPLAY, PHONE_HREF, WORK_WITH_US_HREF } from "../site";

const NAV = [
  { label: "What we build", href: "#capabilities" },
  { label: "Built Louisiana", href: "#map" },
  { label: "Projects", href: "#projects" },
  { label: "Bridges", href: "#bridges" },
  { label: "Careers", href: "#careers" },
];

export default function GcHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll, close on Escape, and move focus into the panel on open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 gc-safe-top transition-colors duration-300 ${
        scrolled || open ? "gc-material border-b border-[var(--gc-line)]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand logo — the real Gilchrist mark (silver G-badge + white wordmark,
            built for a dark header). */}
        <a href="#top" onClick={() => setOpen(false)} className="gc-focus flex items-center" aria-label="Gilchrist Construction Company — home">
          <Image
            src="/gilchrist/brand/main-logo.png"
            alt="Gilchrist Construction Company"
            width={350}
            height={100}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="gc-focus text-[0.9rem] font-medium text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-text)]">
              {n.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <a href={PHONE_HREF} className="gc-focus hidden items-center gap-2 text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-text)] lg:inline-flex">
            <Phone size={16} weight="fill" className="text-[var(--gc-hi)]" aria-hidden="true" />
            <span className="gc-mono text-[0.82rem]">{PHONE_DISPLAY}</span>
          </a>
          <a href={WORK_WITH_US_HREF} target="_blank" rel="noopener noreferrer" className="gc-btn gc-btn-steel gc-focus !px-4 !py-2 text-[0.85rem]">View open roles</a>
          <a href="#contact" className="gc-btn gc-btn-primary gc-focus !px-4 !py-2 text-[0.85rem]">Request a bid</a>
        </div>

        {/* Mobile actions — persistent tap-to-call + menu toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <a href={PHONE_HREF} aria-label={`Call Gilchrist at ${PHONE_DISPLAY}`} className="gc-focus grid h-10 w-10 place-items-center rounded-[3px] text-[var(--gc-hi)]">
            <Phone size={20} weight="fill" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="gc-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="gc-focus grid h-10 w-10 place-items-center rounded-[3px] text-[var(--gc-text)]"
          >
            {open ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        id="gc-mobile-menu"
        ref={menuRef}
        className={`gc-material overflow-hidden border-b border-[var(--gc-line)] transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "visible max-h-[80dvh] opacity-100" : "invisible pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4">
          <ul className="divide-y divide-[var(--gc-line)]">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="gc-focus flex items-center justify-between py-3.5 text-[1.05rem] text-[var(--gc-text)]">
                  {n.label}
                  <ArrowRight size={16} className="text-[var(--gc-text-faint)]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <a href={PHONE_HREF} className="gc-focus mt-4 flex items-center gap-3 rounded-[3px] border border-[var(--gc-line-strong)] px-4 py-3.5">
            <Phone size={20} weight="fill" className="text-[var(--gc-hi)]" aria-hidden="true" />
            <span>
              <span className="gc-mono block text-[1.05rem] text-[var(--gc-text)]">{PHONE_DISPLAY}</span>
              <span className="block text-[0.74rem] text-[var(--gc-text-faint)]">Tap to call the office</span>
            </span>
          </a>

          <div className="mt-3 grid grid-cols-1 gap-2.5 pb-2">
            <a href="#contact" onClick={() => setOpen(false)} className="gc-btn gc-btn-primary gc-focus !py-[0.95rem]">
              Request a bid
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </a>
            <a href={WORK_WITH_US_HREF} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="gc-btn gc-btn-steel gc-focus !py-[0.95rem]">
              <HardHat size={17} weight="fill" aria-hidden="true" />
              View open roles
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
