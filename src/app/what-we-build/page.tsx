import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import GcCapabilities from "../_components/GcCapabilities";

export const metadata: Metadata = {
  title: "What We Build — Self-Performed Heavy Civil | Gilchrist Construction",
  description:
    "Asphalt, concrete, bridges and structures, earthwork, and design-build — production and crews under one roof. What Gilchrist Construction self-performs across Louisiana.",
  alternates: { canonical: "/what-we-build" },
};

export default function WhatWeBuildPage() {
  return (
    <>
      <GcCapabilities />

      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-inset)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="gc-display-md max-w-xl text-[var(--gc-text)]">
              Have a project on the let schedule?
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="gc-btn gc-btn-primary gc-focus !py-[1rem] sm:!px-7">
                Request a bid
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
              <Link href="/projects" className="gc-btn gc-btn-ghost gc-focus !py-[1rem] sm:!px-7">
                See it built
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
