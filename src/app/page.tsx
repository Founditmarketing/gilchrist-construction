import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HardHat, MapTrifold } from "@phosphor-icons/react/dist/ssr";
import GcHero from "./_components/GcHero";
import GcProof from "./_components/GcProof";
import GcSchema from "./_components/GcSchema";
import GcSeam from "./_components/GcSeam";
import { Reveal } from "./_components/Reveal";
import { CAPABILITIES, PROJECTS } from "./site";

const DOCUMENTED = PROJECTS.filter((p) => !p.hq).length;

const TRADES = ["Equipment Operators", "CDL Drivers", "Bridge Crews", "Concrete Finishers", "Asphalt Crews", "Foremen", "Mechanics"];

export default function HomePage() {
  return (
    <>
      <GcHero />
      <GcProof />

      <GcSeam sta="4+20" />

      {/* ── What we build — teaser into /what-we-build ── */}
      <section id="capabilities" className="relative border-b border-[var(--gc-line)] bg-[var(--gc-ground)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <p className="gc-station mb-5">STA 4+20 · WHAT WE SELF-PERFORM</p>
              <h2 className="gc-display-lg text-[var(--gc-text)]">
                One company.<br /><span className="gc-hot">The whole job.</span>
              </h2>
              <p className="gc-body-lg mt-6 max-w-md text-[var(--gc-text-muted)]">
                Asphalt, concrete, bridges, earthwork, and design-build: production and crews under one roof, so the
                standard is ours to hold from base course to bridge deck.
              </p>
              <Link href="/what-we-build" className="gc-btn gc-btn-ghost gc-focus mt-8 !py-[0.95rem] sm:!px-6">
                See what we self-perform
                <ArrowRight size={17} weight="bold" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="border-t border-[var(--gc-line)]">
                {CAPABILITIES.map((c) => (
                  <li key={c.key}>
                    <Link
                      href={`/what-we-build/${c.key}`}
                      className="gc-focus group flex items-baseline justify-between gap-4 border-b border-[var(--gc-line)] py-5 transition-colors hover:text-[var(--gc-hi)]"
                    >
                      <span className="gc-display text-[1.5rem] leading-none text-[var(--gc-text)] transition-colors group-hover:text-[var(--gc-hi)]">
                        {c.name}
                      </span>
                      <span className="gc-mono max-w-[12rem] text-right text-[0.66rem] leading-snug tracking-[0.08em] text-[var(--gc-text-faint)]">
                        {c.proof}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <GcSeam sta="8+10" />

      {/* ── Built across Louisiana — teaser into /projects ── */}
      <section id="map" className="relative isolate overflow-hidden border-b border-[var(--gc-line)]">
        <Image
          src="/gilchrist/raw/field-4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 gc-img object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--gc-ground)_0%,rgba(12,14,15,0.82)_55%,var(--gc-ground)_100%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="max-w-2xl">
            <p className="gc-station mb-5">STA 8+10 · THE FOOTPRINT</p>
            <h2 className="gc-display-lg text-[var(--gc-text)]">
              Every pin is a road<br /><span className="gc-hot">Louisiana drives on.</span>
            </h2>
            <p className="gc-body-lg mt-6 max-w-lg text-[var(--gc-text-muted)]">
              {DOCUMENTED} documented DOTD interchanges, bridges, and interstate corridors across the state, including
              Louisiana&apos;s first diverging diamond interchange.
            </p>
            <Link href="/projects" className="gc-btn gc-btn-primary gc-focus mt-8 !py-[1rem] sm:!px-7">
              <MapTrifold size={18} weight="fill" aria-hidden="true" />
              Explore where we build
            </Link>
          </Reveal>
        </div>
      </section>

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
                    <li key={t} className="rounded-[3px] border border-[var(--gc-line-strong)] bg-[var(--gc-panel-2)] px-3 py-1.5 text-[0.82rem] text-[var(--gc-text-muted)]">
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
              <Link href="/contact" className="gc-focus group gc-card flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:border-[var(--gc-hi-deep)] sm:p-9">
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
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Link href="/careers" className="gc-focus group gc-card flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:border-[var(--gc-steel)] sm:p-9">
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
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <GcSchema />
    </>
  );
}
