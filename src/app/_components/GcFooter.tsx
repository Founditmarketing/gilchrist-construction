import { FacebookLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import {
  BUSINESS_NAME, BUSINESS_LEGAL, PHONE_DISPLAY, PHONE_HREF, LOCATION, SOCIAL,
  EMPLOYEE_LOGIN_HREF, FOUNDED,
} from "../site";

const NAV = [
  { label: "What we build", href: "#capabilities" },
  { label: "Built Louisiana", href: "#map" },
  { label: "Bridges", href: "#bridges" },
  { label: "Careers", href: "#careers" },
  { label: "Why Gilchrist", href: "#credibility" },
  { label: "Contact", href: "#contact" },
];

export default function GcFooter() {
  const year = 2026; // build-stamped; new Date() is unavailable in this runtime path

  return (
    <footer className="relative border-t border-[var(--gc-line)] bg-[var(--gc-ground)] gc-actionbar-clear">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="gc-display text-[1.6rem] leading-none text-[var(--gc-text)]">GILCHRIST</p>
            <p className="gc-mono mt-2 text-[0.6rem] tracking-[0.18em] text-[var(--gc-text-faint)]">
              CONSTRUCTION CO. · EST. {FOUNDED}
            </p>
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-[var(--gc-text-muted)]">
              A Louisiana DOTD prime contractor — self-performed asphalt, concrete,
              bridges and earthwork, built from Alexandria across the state.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gilchrist on Facebook"
                className="gc-focus grid h-10 w-10 place-items-center rounded-[3px] border border-[var(--gc-line-strong)] text-[var(--gc-text-muted)] transition-colors hover:border-[var(--gc-hi)] hover:text-[var(--gc-hi)]"
              >
                <FacebookLogo size={20} weight="fill" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gilchrist on LinkedIn"
                className="gc-focus grid h-10 w-10 place-items-center rounded-[3px] border border-[var(--gc-line-strong)] text-[var(--gc-text-muted)] transition-colors hover:border-[var(--gc-hi)] hover:text-[var(--gc-hi)]"
              >
                <LinkedinLogo size={20} weight="fill" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="gc-mono mb-4 text-[0.62rem] tracking-[0.2em] text-[var(--gc-text-faint)]">EXPLORE</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="gc-focus text-[0.9rem] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-text)]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="gc-mono mb-4 text-[0.62rem] tracking-[0.2em] text-[var(--gc-text-faint)]">OFFICE</p>
            <a href={PHONE_HREF} className="gc-focus gc-mono text-[0.95rem] text-[var(--gc-text)] transition-colors hover:text-[var(--gc-hi)]">
              {PHONE_DISPLAY}
            </a>
            <p className="gc-mono mt-3 text-[0.8rem] leading-relaxed text-[var(--gc-text-muted)]">
              {LOCATION.street}<br />
              {LOCATION.city}, {LOCATION.region} {LOCATION.zip}
            </p>
            <a
              href={EMPLOYEE_LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-focus mt-5 inline-block text-[0.82rem] text-[var(--gc-text-faint)] underline-offset-4 transition-colors hover:text-[var(--gc-text)] hover:underline"
            >
              Employee Login →
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--gc-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-[var(--gc-text-faint)]">
            © {year} {BUSINESS_LEGAL}. All rights reserved.
          </p>
          <p className="gc-mono text-[0.66rem] tracking-[0.12em] text-[var(--gc-text-faint)]">
            {BUSINESS_NAME.toUpperCase()} · ALEXANDRIA, LA · EQUAL OPPORTUNITY EMPLOYER
          </p>
        </div>
      </div>
    </footer>
  );
}
