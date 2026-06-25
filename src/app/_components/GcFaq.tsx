import { Plus, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FAQ } from "../site";
import { Reveal } from "./Reveal";

export default function GcFaq() {
  return (
    <section id="faq" className="relative mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mb-10 sm:mb-12">
        <p className="gc-station-quiet mb-3">STA 30+00 / QUESTIONS</p>
        <h2 className="gc-display-lg text-[var(--gc-text)]">The short answers.</h2>
      </Reveal>

      <div className="divide-y divide-[var(--gc-line)] border-y border-[var(--gc-line)]">
        {FAQ.map((f) => (
          <details key={f.q} className="group">
            <summary className="gc-focus flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left sm:py-7">
              <span className="gc-display text-[1.15rem] text-[var(--gc-text)] sm:text-[1.3rem]">{f.q}</span>
              <Plus
                size={20}
                weight="bold"
                className="gc-faq-ico shrink-0 text-[var(--gc-hi)] transition-transform duration-300"
                aria-hidden="true"
              />
            </summary>
            <div className="max-w-2xl pb-6">
              <p className="text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">{f.a}</p>
              {f.cta && (
                <a
                  href={f.cta.href}
                  {...(f.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="gc-focus gc-mono mt-3 inline-flex items-center gap-1.5 text-[0.72rem] tracking-[0.14em] text-[var(--gc-hi)] transition-opacity hover:opacity-80"
                >
                  {f.cta.label}
                  <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
