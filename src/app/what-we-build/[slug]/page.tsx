import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { CAPABILITIES, PROJECTS } from "../../site";
import { Reveal } from "../../_components/Reveal";

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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cap = CAPABILITIES.find((c) => c.key === slug);
  if (!cap) notFound();

  const others = CAPABILITIES.filter((c) => c.key !== cap.key);
  const related = cap.relatedDiscipline
    ? PROJECTS.filter((p) => !p.hq && p.discipline === cap.relatedDiscipline).slice(0, 3)
    : [];
  const includes = cap.includes ?? cap.detail.map((d) => ({ title: d, body: "" }));

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <Link href="/what-we-build" className="gc-focus inline-flex items-center gap-2 gc-mono text-[0.72rem] tracking-[0.12em] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          WHAT WE BUILD
        </Link>
      </div>

      {/* Header */}
      <header className="mx-auto max-w-7xl px-5 pb-12 pt-6 sm:px-8 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-12">
          <div>
            <p className="gc-station mb-4">WHAT WE SELF-PERFORM</p>
            <h1 className="gc-display-xl text-[var(--gc-text)]">{cap.name}</h1>
            <p className="gc-body-lg mt-5 max-w-xl text-[var(--gc-text-muted)]">{cap.lead ?? cap.blurb}</p>
            {cap.proof && (
              <span className="gc-mono mt-6 inline-flex w-fit items-center gap-2 rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(67,174,42,0.06)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--gc-hi)]">
                <span className="inline-block h-[0.4rem] w-[0.4rem] shrink-0 bg-[var(--gc-hi)]" aria-hidden="true" />
                {cap.proof}
              </span>
            )}
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-[3px] border border-[var(--gc-line-strong)]">
            <Image
              src={cap.img}
              alt={`Gilchrist ${cap.name.toLowerCase()} work in Louisiana`}
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="gc-cap-img object-cover"
              priority
            />
            <p className="absolute bottom-3 left-4 gc-mono text-[0.52rem] tracking-[0.18em] text-[var(--gc-text-faint)]">
              ILLUSTRATIVE
            </p>
          </div>
        </div>
      </header>

      {/* What this includes */}
      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-ground)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="gc-mono text-[0.66rem] tracking-[0.2em] text-[var(--gc-hi)]">WHAT THIS INCLUDES</h2>
          </Reveal>
          <Reveal className="mt-8">
            <ul className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {includes.map((it) => (
                <li key={it.title} className="border-t border-[var(--gc-line-strong)] pt-5">
                  <h3 className="gc-display text-[1.22rem] leading-tight text-[var(--gc-text)]">{it.title}</h3>
                  {it.body && <p className="mt-2.5 text-[0.92rem] leading-relaxed text-[var(--gc-text-muted)]">{it.body}</p>}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-12">
            <div className="gc-card flex items-start gap-4 p-6 sm:p-7">
              <CheckCircle size={24} weight="fill" className="mt-0.5 shrink-0 text-[var(--gc-hi)]" aria-hidden="true" />
              <p className="max-w-2xl text-[0.96rem] leading-relaxed text-[var(--gc-text-muted)]">
                Self-performed means the standard is ours to hold. The crews, the equipment, and the production are
                Gilchrist&apos;s, not a sub&apos;s — so quality, safety, and the schedule stay accountable to one company.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related work */}
      {related.length > 0 && (
        <section className="border-t border-[var(--gc-line)] bg-[var(--gc-panel)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="gc-display-md text-[var(--gc-text)]">Where we&apos;ve done it</h2>
              <Link href="/projects" className="gc-focus inline-flex shrink-0 items-center gap-1.5 gc-mono text-[0.7rem] tracking-[0.1em] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
                ALL PROJECTS <ArrowRight size={13} weight="bold" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-4 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.name} className="gc-card flex h-full flex-col p-6">
                  <p className="gc-mono text-[0.6rem] tracking-[0.14em] text-[var(--gc-text-faint)]">
                    {p.parish.toUpperCase()} PARISH{p.year ? ` · ${p.year}` : ""}
                  </p>
                  <h3 className="gc-display mt-2 text-[1.15rem] leading-tight text-[var(--gc-text)]">{p.name}</h3>
                  {p.value && <p className="gc-display mt-3 text-[1.6rem] leading-none text-[var(--gc-hi)]">{p.value}</p>}
                  <p className="mt-3 line-clamp-3 text-[0.86rem] leading-relaxed text-[var(--gc-text-muted)]">{p.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Other services */}
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

      {/* CTA */}
      <section className="border-t border-[var(--gc-line)] bg-[var(--gc-inset)] gc-grid-lines">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
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
