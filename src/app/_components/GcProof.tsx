import { STATS } from "../site";
import { Reveal } from "./Reveal";

/** The proof band — verified numbers up front, shown STATICALLY (no count-up).
 *  A count-up flashed misleading intermediate values (e.g. "$77M", "234") that
 *  read as real-but-wrong figures to an engineer audience, so the final value is
 *  rendered from first paint with only a soft reveal. All three are sourced. */
export default function GcProof() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--gc-line)] bg-[var(--gc-inset)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal>
          <p className="gc-station-quiet mb-12 flex items-center gap-2.5 sm:mb-16">
            <span className="inline-block h-[0.45rem] w-[0.45rem] shrink-0 bg-[var(--gc-hi)] [box-shadow:0_0_10px_var(--gc-hi-glow)]" aria-hidden="true" />
            Louisiana DOTD prime · self-performing asphalt, concrete, bridges &amp; earthwork
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr] lg:items-end">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="relative">
                <span className="mb-4 block h-[2px] w-9 bg-[var(--gc-hi)] opacity-70" aria-hidden="true" />
                <div className={`gc-display tabular-nums leading-none text-[var(--gc-text)] ${i === 0 ? "text-[clamp(3.2rem,7vw,5rem)]" : "text-[clamp(2.2rem,4.4vw,3.2rem)]"}`}>
                  {s.display}
                </div>
                <p className="mt-3 max-w-[22ch] text-[0.78rem] leading-snug text-[var(--gc-text-muted)] sm:text-[0.8rem]">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
