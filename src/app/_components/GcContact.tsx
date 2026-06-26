import Link from "next/link";
import { MapPin, HardHat, Phone } from "@phosphor-icons/react/dist/ssr";
import { PHONE_DISPLAY, PHONE_HREF, LOCATION } from "../site";
import { Reveal } from "./Reveal";
import GcBidForm from "./GcBidForm";

/** The contact close — a real bid-request funnel (structured lead capture), not
 *  a call-only dead end. The talent door + corporate NAP sit alongside it. */
export default function GcContact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--gc-line)] bg-[var(--gc-inset)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
        <Reveal className="mb-12 max-w-2xl">
          <p className="gc-station-quiet mb-4">STA 34+80 / START HERE</p>
          <h2 className="gc-display-lg text-[var(--gc-text)]">
            Let's build<br /><span className="gc-hot">something that lasts.</span>
          </h2>
          <p className="gc-body-lg mt-5 max-w-xl">
            Owners and agencies — send the scope, location, bid date, and plans,
            and a Gilchrist estimator follows up.
          </p>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* Owner / agency door — a procurement intake panel, not a contact form */}
          <Reveal>
            <p className="gc-mono mb-3 text-[0.62rem] tracking-[0.22em] text-[var(--gc-text-faint)]">OWNERS &amp; AGENCIES</p>
            <h3 className="gc-display-md text-[var(--gc-text)]">Open a project file.</h3>
            <p className="mb-6 mt-2 max-w-md text-[0.95rem] leading-relaxed text-[var(--gc-text-muted)]">
              Send the scope, location, bid date, and plans — a Gilchrist estimator
              reviews and follows up.
            </p>
            <GcBidForm />
          </Reveal>

          {/* Talent door + NAP */}
          <div className="flex flex-col gap-4">
            <Reveal delay={0.06}>
              <Link
                href="/careers"
                className="gc-focus group flex items-center gap-4 gc-card p-6 transition-colors hover:border-[var(--gc-line-strong)]"
              >
                <span className="text-[var(--gc-steel)]"><HardHat size={22} weight="fill" aria-hidden="true" /></span>
                <div>
                  <p className="gc-display text-[1.1rem] text-[var(--gc-text)]">Looking to join a crew?</p>
                  <span className="mt-1 inline-block text-[0.82rem] text-[var(--gc-text-faint)] transition-colors group-hover:text-[var(--gc-hi)]">
                    View open roles &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={LOCATION.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="gc-focus group flex items-start gap-4 gc-card p-6 transition-colors hover:border-[var(--gc-line-strong)]"
              >
                <span className="mt-0.5 text-[var(--gc-hi)]"><MapPin size={22} weight="fill" aria-hidden="true" /></span>
                <div>
                  <p className="gc-display text-[1.1rem] text-[var(--gc-text)]">Corporate Office</p>
                  <p className="gc-mono mt-1.5 text-[0.82rem] leading-relaxed text-[var(--gc-text-muted)]">
                    {LOCATION.street}, {LOCATION.city}, {LOCATION.region} {LOCATION.zip}
                    <br />{LOCATION.mailing}
                  </p>
                  <span className="mt-2 inline-block text-[0.78rem] text-[var(--gc-text-faint)] transition-colors group-hover:text-[var(--gc-hi)]">
                    Get directions →
                  </span>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <a href={PHONE_HREF} className="gc-focus group flex items-center gap-4 gc-card p-6 transition-colors hover:border-[var(--gc-line-strong)]">
                <span className="text-[var(--gc-hi)]"><Phone size={22} weight="fill" aria-hidden="true" /></span>
                <div>
                  <p className="gc-mono text-[1.05rem] text-[var(--gc-text)] group-hover:text-[var(--gc-hi)]">{PHONE_DISPLAY}</p>
                  <p className="text-[0.78rem] text-[var(--gc-text-faint)]">Mon–Fri, business hours</p>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
