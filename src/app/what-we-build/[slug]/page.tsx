import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CAPABILITIES, PROJECTS, FIGURES, STATS } from "../../site";
import { Reveal } from "../../_components/Reveal";
import GcMediaPlate from "../../_components/GcMediaPlate";
import GcServiceSignature, { type ServiceSig } from "../../_components/GcServiceSignature";

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ slug: c.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cap = CAPABILITIES.find((c) => c.key === slug);
  if (!cap) return { title: "Service not found — Gilchrist Construction" };
  return {
    title: `${cap.name} — What We Build | Gilchrist Construction`,
    description: cap.lead ?? cap.blurb,
    alternates: { canonical: `/what-we-build/${cap.key}` },
  };
}

// The bridge crew's combined-years figure lives in STATS (verified). Pulled here
// so the signature stays sourced from the single source of truth, never literals.
const YEARS = STATS.find((s) => s.num === 380);

/** Per-service signature (STA 2+00) — real data only. Bridges + design-build
 *  carry verified figures; asphalt a produce/pave lockup anchored to a real
 *  project; concrete + earthwork a typographic line from their own lead (no
 *  invented number). */
const SIGNATURE: Record<string, ServiceSig> = {
  bridges: {
    kind: "figures",
    label: "THE DEEP BENCH",
    figures: [
      { value: FIGURES.crewMembers.display, label: FIGURES.crewMembers.label },
      { value: YEARS?.display ?? "380+", label: "Combined years of experience" },
    ],
    anchor:
      "One of Louisiana's deepest bridge teams. The 980-foot steel girder span over the Ouachita River at Harrisonburg is squarely their wheelhouse.",
  },
  "design-build": {
    kind: "figures",
    label: "A LOUISIANA FIRST",
    figures: [
      { value: FIGURES.largestContract.display, label: FIGURES.largestContract.label },
      { value: FIGURES.firstDDI.display, label: FIGURES.firstDDI.label },
    ],
    anchor:
      "The I-10 / Loyola interchange feeding the New Orleans airport — Louisiana's first diverging diamond, delivered design-build.",
  },
  asphalt: {
    kind: "lockup",
    label: "ONE ROOF",
    words: ["Produce", "Pave"],
    anchor:
      "Hot-mix production and laydown under one roof, proven at interstate scale on the 37-mile I-10 overlay ($80.7M).",
  },
  concrete: {
    kind: "quote",
    label: "BUILT TO LAST",
    quote: "The parts of the job\nthat have to last.",
    anchor: "Mainline, ramps, and the curb-and-gutter detail that frames every corridor.",
  },
  earthwork: {
    kind: "quote",
    label: "GRADE FIRST",
    quote: "Before the road,\nthe grade.",
    anchor: "We move the dirt, set the line, and build the base the whole job stands on.",
  },
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = CAPABILITIES.find((c) => c.key === slug);
  if (!cap) notFound();

  const idx = CAPABILITIES.findIndex((c) => c.key === cap.key) + 1;
  const num = String(idx).padStart(2, "0");
  const others = CAPABILITIES.filter((c) => c.key !== cap.key);
  const related = cap.relatedDiscipline
    ? PROJECTS.filter((p) => !p.hq && p.discipline === cap.relatedDiscipline).slice(0, 3)
    : [];
  const includes = cap.includes ?? cap.detail.map((d) => ({ title: d, body: "" }));
  const sig = SIGNATURE[cap.key];

  return (
    <>
      {/* ── HERO · STA 0+00 — type-first, no competing image ── */}
      <header className="relative overflow-hidden bg-[var(--gc-ground)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32 lg:pb-28">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 gc-mono text-[0.7rem] tracking-[0.14em] text-[var(--gc-text-faint)]">
              <Link href="/what-we-build" className="gc-focus inline-flex items-center gap-1.5 transition-colors hover:text-[var(--gc-hi)]">
                <ArrowLeft size={13} weight="bold" aria-hidden="true" /> WHAT WE BUILD
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--gc-text-muted)]">{num} — {cap.name.toUpperCase()}</span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="gc-station mb-6 mt-9">STA 0+00 · WHAT WE SELF-PERFORM</p>
            <h1 className="gc-display-xl max-w-5xl text-[var(--gc-text)]">{cap.name}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 max-w-[42ch]">
              <p className="gc-body-lg text-[var(--gc-text-muted)]">{cap.lead ?? cap.blurb}</p>
              {cap.proof && <p className="gc-station-quiet mt-6">{cap.proof}</p>}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── The media plate — the page-turn; plays the discipline clip where we
            have real footage (bridges, design-build), else the still photo. ── */}
      <GcMediaPlate img={cap.img} video={cap.video} alt={`Gilchrist ${cap.name.toLowerCase()} work in Louisiana`} />

      {/* ── SCOPE OF WORK · STA 1+00 — the ledger ── */}
      <section className="border-b border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
            <p className="gc-station">STA 1+00 · SCOPE OF WORK</p>
            <p className="gc-mono text-[0.66rem] tracking-[0.14em] text-[var(--gc-text-faint)]">
              {String(includes.length).padStart(2, "0")} ITEMS · SELF-PERFORMED
            </p>
          </Reveal>
          <ul>
            {includes.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.05}>
                <li className="grid gap-x-8 gap-y-2 border-t border-[var(--gc-line-strong)] py-7 sm:grid-cols-[2.5rem_1fr_minmax(0,42ch)] sm:items-baseline">
                  <span className="gc-mono text-[0.82rem] tabular-nums text-[var(--gc-hi)]">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="gc-display text-[clamp(1.4rem,3vw,1.95rem)] leading-tight text-[var(--gc-text)]">{it.title}</h2>
                  {it.body && <p className="text-[0.92rem] leading-relaxed text-[var(--gc-text-muted)]">{it.body}</p>}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The concrete daylight band — the one tonal break ── */}
      <section style={{ background: "var(--gc-concrete)", color: "var(--gc-on-concrete)" }} className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="gc-mono text-[0.62rem] tracking-[0.2em]" style={{ color: "var(--gc-on-concrete-muted)" }}>SELF-PERFORMED</p>
            <p className="gc-display-md mt-5 max-w-3xl" style={{ color: "var(--gc-on-concrete)" }}>
              Self-performed means the standard is ours to hold.
            </p>
            <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed" style={{ color: "var(--gc-on-concrete-muted)" }}>
              The crews, the equipment, and the production are Gilchrist&apos;s, not a sub&apos;s — so quality, safety,
              and the schedule stay accountable to one company.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SIGNATURE · STA 2+00 — the per-discipline peak ── */}
      {sig && <GcServiceSignature sig={sig} />}

      {/* ── REFERENCE PROJECTS · STA 3+00 — the register (only where real) ── */}
      {related.length > 0 && (
        <section className="border-b border-[var(--gc-line)] bg-[var(--gc-panel)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
              <p className="gc-station">STA 3+00 · WHERE WE&apos;VE DONE IT</p>
              <Link href="/projects" className="gc-focus inline-flex items-center gap-1.5 gc-mono text-[0.7rem] tracking-[0.1em] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                ALL PROJECTS <ArrowRight size={13} weight="bold" aria-hidden="true" />
              </Link>
            </Reveal>
            <ul className="border-t border-[var(--gc-line-strong)]">
              {related.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.05}>
                  <li className="grid gap-x-6 gap-y-2 border-b border-[var(--gc-line)] py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                    <div>
                      <h3 className="gc-display text-[1.25rem] leading-tight text-[var(--gc-text)]">{p.name}</h3>
                      <p className="gc-mono mt-1.5 text-[0.62rem] tracking-[0.12em] text-[var(--gc-text-faint)]">
                        {p.parish.toUpperCase()} PARISH{p.year ? ` · ${p.year}` : ""} · {p.type.toUpperCase()}
                      </p>
                    </div>
                    {p.value && <p className="gc-display text-[1.6rem] leading-none text-[var(--gc-hi)] sm:text-right">{p.value}</p>}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Other services ── */}
      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="gc-station-quiet mb-6">MORE OF WHAT WE BUILD</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.key}>
                <Link href={`/what-we-build/${o.key}`} className="gc-focus group gc-card flex items-center justify-between gap-3 p-5 transition-colors hover:border-[var(--gc-hi-deep)]">
                  <span className="gc-display text-[1.1rem] leading-tight text-[var(--gc-text)] transition-colors group-hover:text-[var(--gc-hi)]">{o.name}</span>
                  <ArrowRight size={15} weight="bold" className="shrink-0 text-[var(--gc-text-faint)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--gc-hi)]" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA · STA 4+20 — end of alignment ── */}
      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-inset)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="gc-station-quiet mb-6">STA 4+20 · END OF ALIGNMENT</p>
          </Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="gc-display-md max-w-xl text-[var(--gc-text)]">
              Need {cap.name.toLowerCase()} on your project?
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
