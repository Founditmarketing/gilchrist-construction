import Link from "next/link";
import { ArrowRight, HardHat } from "@phosphor-icons/react/dist/ssr";
import GcHero from "./_components/GcHero";
import GcProof from "./_components/GcProof";
import GcSchema from "./_components/GcSchema";
import GcSeam from "./_components/GcSeam";
import GcCapabilitiesReadout from "./_components/GcCapabilitiesReadout";
import GcFootprintTease from "./_components/GcFootprintTease";
import GcCrewBeat from "./_components/GcCrewBeat";
import { Reveal } from "./_components/Reveal";

const TRADES = ["Equipment Operators", "CDL Drivers", "Bridge Crews", "Concrete Finishers", "Asphalt Crews", "Foremen", "Mechanics"];

export default function HomePage() {
  return (
    <>
      <GcHero />
      <GcProof />

      <GcSeam sta="4+20" />
      <GcCapabilitiesReadout />

      <GcSeam sta="8+10" />
      <GcFootprintTease />

      {/* The one cinematic peak — the bridge crew, condensed (STA 16+50) */}
      <GcCrewBeat />

      <GcSeam sta="20+00" />

      {/* ── Careers — the on-site recruiting engine (killer feature) ── */}
      <section id="careers" className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-panel)]">
        <div className="gc-hazard absolute inset-x-0 top-0 h-1.5 opacity-90" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="mb-6 inline-flex items-center gap-2.5">
                <span className="gc-pulse inline-block h-2 w-2 rounded-full bg-[#5ed184]" aria-hidden="true" />
                <span className="gc-station-quiet">STA 20+00 · NOW HIRING</span>
              </p>
              <h2 className="gc-display-lg text-[var(--gc-text)]">
                Your name on<br /><span className="gc-hot">the next bridge.</span>
              </h2>
              <p className="gc-body-lg mt-6 max-w-lg text-[var(--gc-text-muted)]">
                Gilchrist is hiring across Louisiana and we hire for the long haul. Browse the trades we
                hire for and apply right here — no third-party portal.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/careers" className="gc-btn gc-btn-primary gc-focus !py-[1.05rem] sm:!px-7">
                  <HardHat size={18} weight="fill" aria-hidden="true" />
                  See open roles
                </Link>
                <Link href="/careers/apply" className="gc-btn gc-btn-steel gc-focus !py-[1.05rem] sm:!px-7">
                  General application
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="gc-card p-7 sm:p-8">
                <p className="gc-mono text-[0.62rem] tracking-[0.2em] text-[var(--gc-hi)]">THE CREWS WE&apos;RE BUILDING</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {TRADES.map((t) => (
                    <li
                      key={t}
                      className="rounded-[3px] border border-[var(--gc-line-strong)] bg-[var(--gc-panel-2)] px-3 py-1.5 text-[0.82rem] text-[var(--gc-text-muted)] transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-[var(--gc-hi-deep)] hover:text-[var(--gc-text)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-[var(--gc-line)] pt-5 text-[0.84rem] leading-relaxed text-[var(--gc-text-muted)]">
                  Train and promote from within, crews busy year-round. Apply to the trade that fits and a
                  superintendent matches you to live openings.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GcSeam tone="quiet" sta="34+80" />

      {/* ── The two doors — final CTA ── */}
      <section id="start" className="relative overflow-hidden bg-[var(--gc-inset)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <p className="gc-station-quiet mb-4">STA 34+80 · START HERE</p>
            <h2 className="gc-display-lg text-[var(--gc-text)]">
              Let&apos;s build<br /><span className="gc-hot">something that lasts.</span>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <Link href="/contact" className="gc-focus group gc-card relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7 transition-colors hover:border-[var(--gc-hi-deep)] sm:p-9">
                <div>
                  <p className="gc-mono text-[0.62rem] tracking-[0.2em] text-[var(--gc-hi)]">OWNERS &amp; AGENCIES</p>
                  <h3 className="gc-display-md mt-3 text-[var(--gc-text)]">Request a bid</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">
                    Send your project, owner, and let date. An estimator follows up.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 gc-mono text-[0.72rem] tracking-[0.1em] text-[var(--gc-text-muted)] transition-colors group-hover:text-[var(--gc-hi)]">
                  REQUEST A BID <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[var(--gc-hi)] transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Link href="/careers" className="gc-focus group gc-card relative flex h-full flex-col justify-between gap-8 overflow-hidden p-7 transition-colors hover:border-[var(--gc-steel)] sm:p-9">
                <div>
                  <p className="gc-mono text-[0.62rem] tracking-[0.2em] text-[var(--gc-steel)]">CREWS &amp; TRADES</p>
                  <h3 className="gc-display-md mt-3 text-[var(--gc-text)]">Build a career</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">
                    Browse open roles and apply on-site. Train and grow with the crew.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 gc-mono text-[0.72rem] tracking-[0.1em] text-[var(--gc-text-muted)] transition-colors group-hover:text-[var(--gc-steel)]">
                  VIEW OPEN ROLES <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-[var(--gc-steel)] transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <GcSchema />
    </>
  );
}
