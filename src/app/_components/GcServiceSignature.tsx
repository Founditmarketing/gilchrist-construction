import { Reveal } from "./Reveal";

/** The per-service signature at STA 2+00 — the one moment that bends each
 *  discipline page differently. Built ONLY from real site.ts data: numerals
 *  for the two services with verified figures (bridges, design-build), a
 *  produce/pave word lockup for asphalt anchored to a real project, and a
 *  purely typographic pulled quote for the two figure-free disciplines
 *  (concrete, earthwork) — restraint, not an invented stat. One shared
 *  container; only the content swaps. */
export type ServiceSig =
  | { kind: "figures"; label: string; figures: { value: string; label: string }[]; anchor: string }
  | { kind: "lockup"; label: string; words: string[]; anchor: string }
  | { kind: "quote"; label: string; quote: string; anchor: string };

export default function GcServiceSignature({ sig }: { sig: ServiceSig }) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-ground)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <Reveal>
          <p className="gc-station mb-12">STA 2+00 · {sig.label}</p>
        </Reveal>

        {sig.kind === "figures" && (
          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:max-w-4xl">
            {sig.figures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1}>
                <p className="gc-display-xl leading-[0.82] text-[var(--gc-hi)]">{f.value}</p>
                <p className="gc-mono mt-3 text-[0.7rem] tracking-[0.16em] text-[var(--gc-text-muted)]">{f.label.toUpperCase()}</p>
              </Reveal>
            ))}
          </div>
        )}

        {sig.kind === "lockup" && (
          <Reveal>
            <div className="flex flex-col gap-1">
              {sig.words.map((w, i) => (
                <span key={w} className="gc-display-xl leading-[0.82] text-[var(--gc-text)]">
                  {i === sig.words.length - 1 ? <span className="gc-hot">{w}.</span> : `${w}.`}
                </span>
              ))}
            </div>
          </Reveal>
        )}

        {sig.kind === "quote" && (
          <Reveal>
            <p className="gc-display-lg max-w-3xl whitespace-pre-line text-[var(--gc-text)]">{sig.quote}</p>
          </Reveal>
        )}

        <Reveal delay={0.18}>
          <p className="gc-body-lg mt-10 max-w-xl text-[var(--gc-text-muted)]">{sig.anchor}</p>
        </Reveal>
      </div>
    </section>
  );
}
