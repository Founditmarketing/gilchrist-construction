"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react";
import { PROJECTS, DISCIPLINES, type Discipline } from "../site";
import { Reveal } from "./Reveal";

type Filter = "All" | Discipline;

const JOBS = PROJECTS.filter((p) => !p.hq);            // all 13 documented DOTD jobs
const FEATURED = JOBS.filter((p) => p.signature);      // 3 flagship case studies
const [FLAGSHIP, ...SUPPORTING] = FEATURED;
const ARCHIVE = JOBS.filter((p) => !p.signature);      // the remaining 10 — no repeats

// Photos are the client's own discipline imagery, representative of the work
// type — not asserted to be that exact job site (see footer note).
const repAlt = (discipline: string, name: string) =>
  `${discipline} work, representative of Gilchrist's self-performed scope — shown with the ${name} project`;

export default function GcProjects() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? ARCHIVE : ARCHIVE.filter((p) => p.discipline === filter);
  const [showRecord, setShowRecord] = useState(false);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40 gc-grid-lines">
      <Reveal className="mb-14 max-w-3xl sm:mb-16">
        <p className="gc-station mb-5">STA 12+00 — SELECTED WORK</p>
        <h2 className="gc-display-xl text-[var(--gc-text)]">
          Real roads. Real bridges.<br /><span className="gc-hot">Real numbers.</span>
        </h2>
        <p className="gc-body-lg mt-5 max-w-xl">
          Gilchrist&rsquo;s DOTD work across Louisiana &mdash; each job linked to its source.
        </p>
      </Reveal>

      {/* ── Featured tier: the marquee jobs first, then the full database ── */}
      {FLAGSHIP && (
        <div className="mb-16 sm:mb-20">
          <Reveal>
            <article className="group gc-card relative grid overflow-hidden lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[440px]">
                <Image
                  src={FLAGSHIP.img}
                  alt={repAlt(FLAGSHIP.discipline, FLAGSHIP.name)}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="gc-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(12,14,15,0.12) 40%, rgba(12,14,15,0.92) 100%)" }}
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 gc-mono rounded-[3px] border border-[rgba(67,174,42,0.4)] bg-[rgba(67,174,42,0.12)] px-2.5 py-1 text-[0.56rem] tracking-[0.16em] text-[var(--gc-hi)] backdrop-blur-sm">
                  FLAGSHIP PROJECT
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="gc-mono text-[0.62rem] tracking-[0.18em] text-[var(--gc-text-muted)]">
                  {FLAGSHIP.discipline.toUpperCase()} · {FLAGSHIP.parish.toUpperCase()} PARISH{FLAGSHIP.year ? ` · ${FLAGSHIP.year}` : ""}
                </p>
                <h3 className="gc-display-md mt-3 text-[var(--gc-text)]">{FLAGSHIP.name}</h3>
                {FLAGSHIP.value && (
                  <p className="gc-display mt-5 text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-[var(--gc-hi)]">{FLAGSHIP.value}</p>
                )}
                <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-[var(--gc-text-muted)]">{FLAGSHIP.blurb}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex rounded-[3px] border border-[var(--gc-line-strong)] bg-[var(--gc-panel-2)] px-3 py-1.5 text-[0.76rem] text-[var(--gc-text-muted)]">{FLAGSHIP.owner}</span>
                  <a href={FLAGSHIP.source} target="_blank" rel="noopener noreferrer" className="gc-focus inline-flex items-center gap-1 text-[0.78rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                    Source <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>

          {SUPPORTING.length > 0 && (
            <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-2">
              {SUPPORTING.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.06}>
                  <article className="group gc-card flex h-full flex-col overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={repAlt(p.discipline, p.name)}
                        fill
                        sizes="(max-width:640px) 100vw, 50vw"
                        className="gc-img object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{ background: "linear-gradient(180deg, rgba(12,14,15,0.15) 35%, rgba(12,14,15,0.94) 100%)" }}
                        aria-hidden="true"
                      />
                      <span className="absolute left-3 top-3 gc-mono rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(10,12,13,0.6)] px-2 py-1 text-[0.54rem] tracking-[0.12em] text-[var(--gc-text-muted)] backdrop-blur-sm">
                        {p.discipline.toUpperCase()}
                      </span>
                      {p.value && (
                        <span className="absolute bottom-3 left-3 gc-display text-[1.5rem] leading-none text-[var(--gc-hi)]">{p.value}</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="gc-display text-[1.18rem] leading-tight text-[var(--gc-text)]">{p.name}</h3>
                      <p className="gc-mono mt-2 text-[0.72rem] tracking-[0.04em] text-[var(--gc-text-muted)]">
                        {p.owner} · {p.parish.toUpperCase()}{p.year ? ` · ${p.year}` : ""}
                      </p>
                      <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--gc-text-muted)]">{p.blurb}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                        <span className="text-[0.74rem] text-[var(--gc-text-muted)]">{p.type}</span>
                        <a href={p.source} target="_blank" rel="noopener noreferrer" className="gc-focus inline-flex shrink-0 items-center gap-1 text-[0.74rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                          Source <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── The full record — quieter STA corner-tag, then filter + grid ── */}
      <Reveal className="mb-8 border-t border-[var(--gc-line)] pt-14 sm:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <p className="gc-mono text-[0.6rem] tracking-[0.2em] text-[var(--gc-text-faint)]">STA 12+40 / THE FULL RECORD</p>
            <h3 className="gc-display mt-2 text-[1.6rem] text-[var(--gc-text)]">Every other job, on the record</h3>
          </div>
          <p className="text-[0.78rem] text-[var(--gc-text-faint)]">
            <span className="gc-mono text-[var(--gc-hi)]">{JOBS.length}</span> documented DOTD projects · {ARCHIVE.length} more below
          </p>
        </div>
      </Reveal>

      {/* Mobile: the 10-row record collapses behind one tap so the phone page
          isn't endless; desktop (md+) always shows it. */}
      {!showRecord && (
        <button
          onClick={() => setShowRecord(true)}
          className="gc-focus gc-card mb-2 flex w-full items-center justify-between gap-3 px-5 py-5 text-left transition-colors hover:border-[var(--gc-line-strong)] md:hidden"
        >
          <span className="text-[1rem] font-semibold leading-tight text-[var(--gc-text)]">
            Show all {ARCHIVE.length} documented projects
            <span className="mt-1 block text-[0.76rem] font-normal text-[var(--gc-text-faint)]">Owner, parish, year, value &amp; source</span>
          </span>
          <ArrowDown size={18} weight="bold" className="shrink-0 text-[var(--gc-hi)]" aria-hidden="true" />
        </button>
      )}

      <div className={showRecord ? "" : "hidden md:block"}>
      {/* Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {(["All", ...DISCIPLINES] as Filter[]).map((f) => {
          const on = filter === f;
          const count = f === "All" ? ARCHIVE.length : ARCHIVE.filter((p) => p.discipline === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={on}
              style={on ? { borderColor: "var(--gc-hi)", background: "rgba(67,174,42,0.12)", color: "var(--gc-hi)" } : undefined}
              className={`gc-focus rounded-[3px] border px-3.5 py-1.5 text-[0.82rem] transition-colors ${
                on ? "" : "border-[var(--gc-line-strong)] text-[var(--gc-text-muted)] hover:border-[var(--gc-text-faint)] hover:text-[var(--gc-text)]"
              }`}
            >
              {f} <span className="gc-mono text-[0.7em] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── The public record — a quiet, typography-forward archive (no photos).
            md+: aligned columns with the header row shown. Below md: rows stack,
            each value carrying a visible label; those labels become md:sr-only so a
            desktop screen-reader still hears the column for every value (WCAG 1.3.1)
            without the fragility of forcing display:grid onto real <table> elements. ── */}
      <Reveal>
        <div className="gc-card overflow-hidden">
          {/* Column header — md+ only (purely visual; per-cell labels carry SR context) */}
          <div
            role="presentation"
            className="hidden grid-cols-[1.6fr_1fr_0.7fr_0.5fr_0.7fr_auto] items-center gap-x-6 border-b border-[var(--gc-line)] px-6 py-3 md:grid"
          >
            {["Project", "Owner", "Parish", "Year", "Value", "Source"].map((h) => (
              <span key={h} className="gc-mono text-[0.58rem] tracking-[0.16em] text-[var(--gc-text-faint)]">
                {h.toUpperCase()}
              </span>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="gc-mono px-6 py-8 text-[0.74rem] tracking-[0.1em] text-[var(--gc-text-faint)]">
              NO RECORD ROWS FOR THIS DISCIPLINE.
            </p>
          ) : (
            <ul>
              {shown.map((p) => (
                <li
                  key={p.name}
                  className="grid grid-cols-1 gap-y-2 border-b border-[var(--gc-line)] px-6 py-5 transition-colors last:border-b-0 hover:bg-[var(--gc-panel-2)] md:grid-cols-[1.6fr_1fr_0.7fr_0.5fr_0.7fr_auto] md:items-center md:gap-x-6 md:gap-y-0 md:py-4"
                >
                  {/* Project name + discipline + type — the typographic anchor */}
                  <div className="min-w-0">
                    <p className="gc-display text-[1.02rem] leading-tight text-[var(--gc-text)]">{p.name}</p>
                    <p className="gc-mono mt-1 text-[0.64rem] tracking-[0.1em] text-[var(--gc-text-faint)]">
                      <span className="text-[var(--gc-hi)]">{p.discipline.toUpperCase()}</span> · {p.type}
                    </p>
                  </div>

                  {/* Owner */}
                  <p className="text-[0.84rem] text-[var(--gc-text-muted)]">
                    <span className="gc-mono mr-2 text-[0.56rem] tracking-[0.14em] text-[var(--gc-text-faint)] md:sr-only">OWNER</span>
                    {p.owner}
                  </p>

                  {/* Parish */}
                  <p className="text-[0.84rem] text-[var(--gc-text-muted)]">
                    <span className="gc-mono mr-2 text-[0.56rem] tracking-[0.14em] text-[var(--gc-text-faint)] md:sr-only">PARISH</span>
                    {p.parish}
                  </p>

                  {/* Year — tabular for clean column alignment */}
                  <p className="gc-mono text-[0.8rem] tabular-nums text-[var(--gc-text-muted)]">
                    <span className="mr-2 text-[0.56rem] tracking-[0.14em] text-[var(--gc-text-faint)] md:sr-only">YEAR</span>
                    {p.year || "—"}
                  </p>

                  {/* Value — the scale signal, green + tabular; honest em-dash when not public */}
                  <p className="gc-mono text-[0.88rem] font-semibold tabular-nums text-[var(--gc-hi)]">
                    <span className="mr-2 text-[0.56rem] font-normal tracking-[0.14em] text-[var(--gc-text-faint)] md:sr-only">VALUE</span>
                    {p.value || (
                      <>
                        <span aria-hidden="true" className="text-[var(--gc-text-faint)]">—</span>
                        <span className="sr-only">Not publicly disclosed</span>
                      </>
                    )}
                  </p>

                  {/* Source — every row keeps its public-record link */}
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gc-focus inline-flex w-fit items-center gap-1 text-[0.74rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]"
                    aria-label={`Source for ${p.name}`}
                  >
                    Source <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>

      <p className="mt-10 max-w-2xl text-[0.72rem] leading-relaxed text-[var(--gc-text-faint)]">
        Owner, parish, year, and contract value are drawn from the public record;
        each row links to its source (DOTD records, trade press, or the
        contractor&rsquo;s project page). Project photography is representative of
        the discipline shown.
      </p>
      </div>
    </section>
  );
}
