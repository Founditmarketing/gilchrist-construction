import { ShieldCheck, Medal, Lightbulb, Gauge } from "@phosphor-icons/react/dist/ssr";
import { ATTRIBUTES, CREDIBILITY, isPlaceholder } from "../site";
import { Reveal } from "./Reveal";

const ICONS = [ShieldCheck, Medal, Lightbulb, Gauge];

/** Daylight concrete band — the owner/agency "qualification wall". Leads with the
 *  hard credentials a DOTD buyer scans for first (EMR + bonding capacity degrade
 *  honestly to "available on request" until the client confirms); the four values
 *  sit as a quieter secondary row beneath. */
export default function GcCredibility() {
  const qualifications = [
    { label: "Louisiana DOTD", value: "Prequalified prime", ok: true },
    { label: "Self-performed civil", value: "Asphalt · concrete · bridges · earthwork", ok: true },
    { label: "Bonded & insured", value: isPlaceholder(CREDIBILITY.bonding) ? "Capacity furnished to qualified owners" : CREDIBILITY.bonding, ok: true },
    { label: "Safety program", value: isPlaceholder(CREDIBILITY.emr) ? "EMR & records on request" : `EMR ${CREDIBILITY.emr}`, ok: true },
    { label: "Alexandria-based", value: "Statewide reach", ok: true },
    { label: "CAAL member", value: "Concrete & Aggregates Assn. of LA", ok: true },
  ];

  return (
    <section
      id="credibility"
      style={{ background: "var(--gc-concrete)", color: "var(--gc-on-concrete)" }}
      className="relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal className="mb-12 max-w-3xl">
          <p className="gc-mono mb-4 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[var(--gc-on-concrete-muted)]">
            STA 26+40 / The qualification wall
          </p>
          <h2 className="gc-display-md text-[var(--gc-on-concrete)]">
            Built to clear procurement.
          </h2>
        </Reveal>

        {/* The qualification wall — the hard credentials a public-works buyer scans
            for first. EMR + bonding capacity stay "available on request" until the
            client confirms (never invented). */}
        <Reveal className="mb-16 sm:mb-20">
          <dl className="grid border-t border-[rgba(22,25,27,0.14)] sm:grid-cols-2 lg:grid-cols-3">
            {qualifications.map((q) => (
              <div
                key={q.label}
                className="flex flex-col gap-1.5 border-b border-[rgba(22,25,27,0.14)] py-5 pr-6 sm:py-6"
              >
                <dt className="text-[0.82rem] font-semibold tracking-[0.01em] text-[var(--gc-on-concrete)]">
                  {q.label}
                </dt>
                <dd className="text-[0.82rem] leading-snug text-[var(--gc-on-concrete-muted)]">
                  {q.ok ? q.value : "Available on request"}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The four values — secondary to the qualifications above. */}
        <Reveal>
          <p className="gc-station-quiet mb-6">How we work</p>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {ATTRIBUTES.map((a, i) => {
              const Icon = ICONS[i];
              return (
                <div key={a.title} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 text-[var(--gc-hi-deep)]">
                    <Icon size={20} weight="regular" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[0.92rem] font-semibold text-[var(--gc-on-concrete)]">{a.title}</h3>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-[var(--gc-on-concrete-muted)]">{a.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
