import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import GcApplyForm from "../../_components/GcApplyForm";

export const metadata: Metadata = {
  title: "General Application — Careers | Gilchrist Construction",
  description:
    "Don't see your trade? Send a general application to Gilchrist Construction and we'll match you to a crew across Louisiana. Apply on-site.",
  alternates: { canonical: "/careers/apply" },
};

export default function GeneralApplyPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <Link href="/careers" className="gc-focus inline-flex items-center gap-2 gc-mono text-[0.72rem] tracking-[0.12em] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          ALL OPEN ROLES
        </Link>
      </div>

      <header className="mx-auto max-w-3xl px-5 pb-10 pt-6 sm:px-8">
        <p className="gc-station mb-4">STA 20+00 · GENERAL APPLICATION</p>
        <h1 className="gc-display-xl text-[var(--gc-text)]">Tell us what you do.</h1>
        <p className="gc-body-lg mt-5 text-[var(--gc-text-muted)]">
          Whatever you run, drive, or build, send it our way and a superintendent will match you to a crew. You apply
          right here, no third-party portal.
        </p>
      </header>

      <div className="border-t border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <GcApplyForm position="General application" />
        </div>
      </div>
    </>
  );
}
