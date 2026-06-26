import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import GcBuiltLouisiana from "../_components/GcBuiltLouisiana";
import GcProjects from "../_components/GcProjects";

export const metadata: Metadata = {
  title: "Projects — Built Across Louisiana | Gilchrist Construction",
  description:
    "Documented DOTD interchanges, bridges, and interstate corridors Gilchrist Construction has built across Louisiana — including the state's first diverging diamond interchange.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      {/* spacer so the map's section padding clears the fixed header with room */}
      <div className="h-12 sm:h-16" aria-hidden="true" />
      <GcBuiltLouisiana />
      <GcProjects />

      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-inset)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="gc-display-md max-w-xl text-[var(--gc-text)]">
              Put your project on the map.
            </h2>
            <Link href="/contact" className="gc-btn gc-btn-primary gc-focus shrink-0 !py-[1rem] sm:!px-7">
              Request a bid
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
