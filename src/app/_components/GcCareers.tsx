import Image from "next/image";
import { ArrowRight, HardHat } from "@phosphor-icons/react/dist/ssr";
import { WORK_WITH_US_HREF } from "../site";
import { Reveal } from "./Reveal";

// Three core paths into the company — the other trades roll up under these.
const PATHS = [
  { role: "Operator", line: "Run the iron — excavators, pavers, dozers, cranes." },
  { role: "CDL Driver", line: "Haul material and keep the jobs moving statewide." },
  { role: "Bridge Crew", line: "Build the structures Louisiana crosses every day." },
];

// The path in — honest recruiting structure (no invented testimonial).
const PATH = [
  { n: "01", title: "Apply", body: "Send your trade and experience — whatever you run, drive, or build." },
  { n: "02", title: "Interview", body: "Talk with people who know the work — a superintendent, not just a recruiter." },
  { n: "03", title: "Join a crew", body: "Get on a crew with the training, equipment, and safety culture to do it right." },
  { n: "04", title: "Build Louisiana", body: "Grow and promote from within on roads and bridges still standing in fifty years." },
];

/** Careers as a co-hero, not a footnote — recruiting is the #1 conversion for a
 *  heavy-civil contractor. The CTA links to the live Work-With-Us apply page; a
 *  native job board / ATS feed is a later phase. The crew-story slot is reserved
 *  for a REAL photo + employee quote from the client — never a fabricated one. */
export default function GcCareers() {
  return (
    <section id="careers" className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-panel)]">
      <div className="gc-hazard absolute inset-x-0 top-0 h-1.5 opacity-90" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2.5">
              <span className="gc-pulse inline-block h-2 w-2 rounded-full bg-[#5ed184]" aria-hidden="true" />
              <span className="gc-station-quiet">STA 20+00 / CAREERS · NOW HIRING</span>
            </p>
            <h2 className="gc-display-lg text-[var(--gc-text)]">
              Your name on<br /><span className="gc-hot">the next bridge.</span>
            </h2>
            <p className="gc-body-lg mt-6 max-w-lg">
              Gilchrist is growing, and we hire for the long haul — train, promote
              from within, keep crews busy year-round.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {PATHS.map((p) => (
                <li key={p.role} className="gc-card p-5">
                  <span className="gc-display block text-[1.2rem] text-[var(--gc-text)]">{p.role}</span>
                  <span className="mt-1.5 block text-[0.82rem] leading-snug text-[var(--gc-text-muted)]">{p.line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.8rem] leading-relaxed text-[var(--gc-text-faint)]">
              Plus foremen &amp; superintendents, laborers, heavy-equipment mechanics,
              surveyors, and estimators — see all open roles to apply.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="gc-card relative overflow-hidden p-7 sm:p-9">
              <span className="grid h-12 w-12 place-items-center rounded-[3px] bg-[var(--gc-hi)] text-[#160f00]">
                <HardHat size={26} weight="fill" aria-hidden="true" />
              </span>
              <h3 className="gc-display-md mt-5 text-[var(--gc-text)]">Open positions</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">
                See current openings and apply online — or tell us what you do and
                where you want to grow.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <a href={WORK_WITH_US_HREF} target="_blank" rel="noopener noreferrer" className="gc-btn gc-btn-primary gc-focus !py-[1.05rem]">
                  View open roles
                  <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </a>
                <a href="#contact" className="gc-btn gc-btn-ghost gc-focus !py-[0.95rem]">
                  Start a conversation
                </a>
              </div>

              <p className="mt-6 border-t border-[var(--gc-line)] pt-5 text-[0.74rem] leading-relaxed text-[var(--gc-text-faint)]">
                Gilchrist Construction is an Equal Opportunity Employer. All qualified
                applicants are considered without regard to race, color, religion, sex,
                national origin, disability, or veteran status.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The path in — a clear, human recruiting story without inventing one. */}
        <Reveal className="mt-16 border-t border-[var(--gc-line)] pt-12">
          <p className="gc-station-quiet mb-6">THE PATH IN</p>
          <ol className="grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {PATH.map((s) => (
              <li key={s.title} className="border-t border-[var(--gc-line-strong)] pt-5">
                <span className="gc-display block text-[2.6rem] leading-none text-[var(--gc-hi)]">{s.n}</span>
                <h4 className="gc-display mt-3 text-[1.15rem] text-[var(--gc-text)]">{s.title}</h4>
                <p className="mt-2 text-[0.86rem] leading-relaxed text-[var(--gc-text-muted)]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* "Built by people who know the work" — paired with an AI-illustrative
            crew image (labeled below) standing in until a real crew photo lands. */}
        <Reveal className="mt-16 border-t border-[var(--gc-line)] pt-14 sm:mt-20 sm:pt-16">
          <div className="gc-card grid gap-6 p-7 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="gc-mono text-[0.62rem] tracking-[0.2em] text-[var(--gc-hi)]">THE CREW</p>
              <h3 className="gc-display-md mt-3 text-[var(--gc-text)]">
                Built by people who know the work.
              </h3>
              <p className="mt-4 max-w-xl text-[0.96rem] leading-relaxed text-[var(--gc-text-muted)]">
                Operators, drivers, mechanics, bridge crews, foremen — many trained
                and promoted from within. The work holds because the people who
                build it stay.
              </p>
            </div>
            {/* Crew image — AI-illustrative until a real crew photo lands. */}
            <div className="relative min-h-[220px] overflow-hidden rounded-[3px] border border-[var(--gc-line-strong)] sm:min-h-[260px]">
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
  );
}
