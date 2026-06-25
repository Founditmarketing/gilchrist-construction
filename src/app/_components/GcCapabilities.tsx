import Image from "next/image";
import { CAPABILITIES } from "../site";
import { Reveal } from "./Reveal";

function IconChip({ src }: { src: string }) {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(8,10,11,0.62)] backdrop-blur-sm">
      {/* harvested icons are black line-art → invert to white so they read on
          the dark chip instead of disappearing as a smudge */}
      <Image src={src} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" style={{ filter: "brightness(0) invert(1)" }} />
    </span>
  );
}

function DetailTags({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
      {items.slice(0, 3).map((d) => (
        <li key={d} className="gc-mono text-[0.66rem] tracking-[0.06em] text-[var(--gc-text-faint)]">
          <span className="mr-1.5 text-[var(--gc-hi)]" aria-hidden="true">/</span>
          {d}
        </li>
      ))}
    </ul>
  );
}

/** One honest operational claim per capability — an inline green pill, not a
 *  bordered plan-sheet stamp. Reads like an operation, not a brochure. */
function ProofChip({ label }: { label: string }) {
  return (
    <span className="gc-mono mt-4 inline-flex w-fit items-center gap-2 rounded-[3px] border border-[var(--gc-line-strong)] bg-[rgba(67,174,42,0.06)] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--gc-hi)]">
      <span className="inline-block h-[0.4rem] w-[0.4rem] shrink-0 bg-[var(--gc-hi)]" aria-hidden="true" />
      {label}
    </span>
  );
}

/** The capability WALL — an editorial composition, not five equal cards. A
 *  full-width Bridges feature, a strong image-forward Asphalt/Concrete pair, and
 *  a compact Earthwork/Design-Build support row create three distinct rhythms.
 *  Every photo carries the cohesive .gc-cap-img grade so the imagery reads as one
 *  shoot. (Same factual content as before — only the composition is elevated.) */
export default function GcCapabilities() {
  const featured = CAPABILITIES.find((c) => c.key === "bridges")!;
  const pair = ["asphalt", "concrete"].map((k) => CAPABILITIES.find((c) => c.key === k)!);
  const support = ["earthwork", "design-build"].map((k) => CAPABILITIES.find((c) => c.key === k)!);

  return (
    <section id="capabilities" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36 gc-grid-lines">
      <Reveal className="mb-16 max-w-3xl sm:mb-20">
        <p className="gc-station mb-5">STA 4+20 — WHAT WE SELF-PERFORM</p>
        <h2 className="gc-display-lg text-[var(--gc-text)]">
          One company.<br />
          <span className="gc-hot">The whole job.</span>
        </h2>
        <p className="gc-body-lg mt-5 max-w-xl">
          Most contractors sub out the hard parts. Gilchrist owns them — production
          plants, paving crews, and one of Louisiana&rsquo;s deepest bridge teams,
          all under one roof.
        </p>
      </Reveal>

      {/* ── Feature: Bridges & Structures — the differentiator, full-width ── */}
      <Reveal>
        <article className="gc-cap gc-card relative grid overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[500px]">
            <Image
              src={featured.img}
              alt="Gilchrist bridge and structures work in Louisiana"
              fill
              sizes="(max-width:1024px) 100vw, 55vw"
              className="gc-cap-img object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{ background: "linear-gradient(180deg, transparent 45%, rgba(12,14,15,0.92) 100%)" }}
              aria-hidden="true"
            />
            <span className="absolute left-5 top-5"><IconChip src={featured.icon} /></span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="gc-mono mb-3 text-[0.62rem] tracking-[0.2em] text-[var(--gc-hi)]">PILE TO DECK · FIXED &amp; MOVEABLE</p>
            <h3 className="gc-display-md text-[var(--gc-text)]">{featured.name}</h3>
            <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-[var(--gc-text-muted)]">
              {featured.blurb}
            </p>
          </div>
        </article>
      </Reveal>

      {/* ── Strong pair: Asphalt + Concrete — image-forward, name set on the photo ── */}
      <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
        {pair.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.06}>
            <article className="gc-cap gc-card relative flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.img}
                  alt={`Gilchrist ${c.name.toLowerCase()} work in Louisiana`}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="gc-cap-img object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 38%, rgba(12,14,15,0.92) 100%)" }}
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4"><IconChip src={c.icon} /></span>
                <h3 className="gc-display-md absolute bottom-5 left-6 right-6 text-[var(--gc-text)]">{c.name}</h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">{c.blurb}</p>
                {c.proof && <ProofChip label={c.proof} />}
                <DetailTags items={c.detail} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ── Support: Earthwork + Design-Build — compact split tiles (image left) ── */}
      <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2">
        {support.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.06}>
            <article className="gc-cap gc-card relative grid overflow-hidden sm:grid-cols-[0.85fr_1.15fr]">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[220px]">
                <Image
                  src={c.img}
                  alt={`Gilchrist ${c.name.toLowerCase()} work in Louisiana`}
                  fill
                  sizes="(max-width:1024px) 100vw, 25vw"
                  className="gc-cap-img object-cover"
                />
                <span className="absolute left-4 top-4"><IconChip src={c.icon} /></span>
              </div>
              <div className="flex flex-col justify-center p-6">
                <h3 className="gc-display text-[1.22rem] text-[var(--gc-text)]">{c.name}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--gc-text-muted)]">{c.blurb}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
