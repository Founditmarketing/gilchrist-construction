import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import GcPageHeader from "../_components/GcPageHeader";
import GcJobBoard from "../_components/GcJobBoard";
import { Reveal } from "../_components/Reveal";
import { CAREERS_NOTE } from "../jobs";

export const metadata: Metadata = {
  title: "Careers — Gilchrist Construction | Build Louisiana",
  description:
    "Apply on-site for heavy-civil trades across Louisiana: equipment operators, CDL drivers, bridge crews, finishers, foremen, mechanics and more. We train and promote from within.",
  alternates: { canonical: "/careers" },
};

const PATH = [
  { n: "01", title: "Apply", body: "Send your trade and experience right here — whatever you run, drive, or build." },
  { n: "02", title: "Interview", body: "Talk with people who know the work — a superintendent, not just a recruiter." },
  { n: "03", title: "Join a crew", body: "Get on a crew with the training, equipment, and safety culture to do it right." },
  { n: "04", title: "Build Louisiana", body: "Grow and promote from within on roads and bridges still standing in fifty years." },
];

export default function CareersPage() {
  return (
    <>
      <GcPageHeader
        sta="STA 20+00"
        eyebrow="CAREERS · NOW HIRING"
        title={<>Your name on<br /><span className="gc-hot">the next bridge.</span></>}
        intro="Gilchrist is hiring across Louisiana, and we hire for the long haul: train, promote from within, keep crews busy year-round. Apply right here — no third-party portal."
      />

      {/* ── The board ── */}
      <section className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="gc-display-lg text-[var(--gc-text)]">Open trades</h2>
              <p className="max-w-md text-[0.86rem] leading-relaxed text-[var(--gc-text-faint)]">{CAREERS_NOTE}</p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <GcJobBoard />
          </Reveal>

          <Reveal className="mt-8">
            <div className="gc-card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h3 className="gc-display-md text-[var(--gc-text)]">Don&apos;t see your trade?</h3>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">
                  Send a general application. Tell us what you run, drive, or build, and we&apos;ll match you to a crew.
                </p>
              </div>
              <Link href="/careers/apply" className="gc-btn gc-btn-primary gc-focus shrink-0 !py-[1rem]">
                General application
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The path in ── */}
      <section className="border-b border-[var(--gc-line)] bg-[var(--gc-panel)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="gc-station-quiet mb-7">THE PATH IN</h2>
            <ol className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
              {PATH.map((s) => (
                <li key={s.title} className="border-t border-[var(--gc-line-strong)] pt-5">
                  <span className="gc-display block text-[2.6rem] leading-none text-[var(--gc-hi)]">{s.n}</span>
                  <h3 className="gc-display mt-3 text-[1.15rem] text-[var(--gc-text)]">{s.title}</h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-[var(--gc-text-muted)]">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── The crew ── */}
      <section className="border-b border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div className="gc-card grid gap-6 p-7 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="gc-mono text-[0.62rem] tracking-[0.2em] text-[var(--gc-hi)]">THE CREW</p>
                <h2 className="gc-display-md mt-3 text-[var(--gc-text)]">Built by people who know the work.</h2>
                <p className="mt-4 max-w-xl text-[0.96rem] leading-relaxed text-[var(--gc-text-muted)]">
                  Operators, drivers, mechanics, bridge crews, foremen — many trained and promoted from within.
                  The work holds because the people who build it stay.
                </p>
                <p className="mt-6 border-t border-[var(--gc-line)] pt-5 text-[0.74rem] leading-relaxed text-[var(--gc-text-faint)]">
                  Gilchrist Construction is an Equal Opportunity Employer. All qualified applicants are considered
                  without regard to race, color, religion, sex, national origin, disability, or veteran status.
                </p>
              </div>
              <div className="relative min-h-[220px] overflow-hidden rounded-[3px] border border-[var(--gc-line-strong)] sm:min-h-[280px]">
                <Image
                  src="/gilchrist/careers-crew.jpg"
                  alt="A heavy-civil crew guiding a steel girder into place against a low sun"
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="gc-img object-cover"
                />
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,14,15,0.82) 100%)" }} aria-hidden="true" />
                <p className="absolute bottom-3 left-4 gc-mono text-[0.52rem] tracking-[0.18em] text-[var(--gc-text-faint)]">
                  ILLUSTRATIVE · CREW PHOTOGRAPHY TO COME
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
