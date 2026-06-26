import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Wrench, MapPin, Briefcase } from "@phosphor-icons/react/dist/ssr";
import { JOBS, getJob } from "../../jobs";
import GcApplyForm from "../../_components/GcApplyForm";
import { Reveal } from "../../_components/Reveal";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Role not found — Gilchrist Construction" };
  return {
    title: `${job.title} — Careers | Gilchrist Construction`,
    description: `${job.summary} Apply on-site with Gilchrist Construction, a Louisiana DOTD prime contractor.`,
    alternates: { canonical: `/careers/${job.slug}` },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const related = JOBS.filter((j) => j.category === job.category && j.slug !== job.slug).slice(0, 3);

  return (
    <>
      {/* Breadcrumb / back (top padding clears the fixed header) */}
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <Link href="/careers" className="gc-focus inline-flex items-center gap-2 gc-mono text-[0.72rem] tracking-[0.12em] text-[var(--gc-text-muted)] transition-colors hover:text-[var(--gc-hi)]">
          <ArrowLeft size={14} weight="bold" aria-hidden="true" />
          ALL OPEN ROLES
        </Link>
      </div>

      {/* Role header */}
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-6 sm:px-8 sm:pb-14">
        <p className="gc-mono mb-4 inline-flex items-center gap-2 rounded-[3px] border border-[var(--gc-line-strong)] bg-[var(--gc-panel-2)] px-2.5 py-1 text-[0.6rem] tracking-[0.14em] text-[var(--gc-text-muted)]">
          {job.category}{job.featured ? " · OFTEN HIRING" : ""}
        </p>
        <h1 className="gc-display-xl max-w-4xl text-[var(--gc-text)]">{job.title}</h1>
        <p className="gc-body-lg mt-5 max-w-2xl text-[var(--gc-text-muted)]">{job.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 gc-mono text-[0.66rem] tracking-[0.1em] text-[var(--gc-text-faint)]">
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} weight="fill" aria-hidden="true" />{job.location}</span>
          <span className="inline-flex items-center gap-1.5"><Briefcase size={13} weight="bold" aria-hidden="true" />{job.type}</span>
        </div>
      </header>

      {/* Details + apply */}
      <div className="border-t border-[var(--gc-line)] bg-[var(--gc-ground)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
          {/* The work */}
          <div>
            <Reveal>
              <h2 className="gc-mono text-[0.66rem] tracking-[0.2em] text-[var(--gc-hi)]">THE WORK</h2>
              <ul className="mt-5 space-y-3.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.96rem] leading-relaxed text-[var(--gc-text-muted)]">
                    <CheckCircle size={20} weight="fill" className="mt-0.5 shrink-0 text-[var(--gc-hi)]" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="gc-mono text-[0.66rem] tracking-[0.2em] text-[var(--gc-hi)]">WHAT YOU&apos;LL BRING</h2>
              <ul className="mt-5 space-y-3.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-[0.96rem] leading-relaxed text-[var(--gc-text-muted)]">
                    <Wrench size={18} weight="fill" className="mt-0.5 shrink-0 text-[var(--gc-text-faint)]" aria-hidden="true" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <p className="mt-12 border-t border-[var(--gc-line)] pt-6 text-[0.78rem] leading-relaxed text-[var(--gc-text-faint)]">
              Gilchrist Construction is an Equal Opportunity Employer. All qualified applicants are considered without
              regard to race, color, religion, sex, national origin, disability, or veteran status. Roles shown are
              representative of the trades we hire for; a superintendent will match you to live openings.
            </p>
          </div>

          {/* Apply (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="gc-display-md mb-4 text-[var(--gc-text)]">Apply for this role</h2>
            <GcApplyForm position={job.title} category={job.category} />
          </div>
        </div>
      </div>

      {/* Related roles */}
      {related.length > 0 && (
        <section className="border-t border-[var(--gc-line)] bg-[var(--gc-panel)]">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
            <p className="gc-station-quiet mb-6">MORE IN {job.category.toUpperCase()}</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {related.map((j) => (
                <li key={j.slug}>
                  <Link href={`/careers/${j.slug}`} className="gc-focus group gc-card flex h-full flex-col p-5 transition-colors hover:border-[var(--gc-hi-deep)]">
                    <span className="gc-display text-[1.15rem] leading-tight text-[var(--gc-text)] transition-colors group-hover:text-[var(--gc-hi)]">{j.title}</span>
                    <span className="mt-2 text-[0.82rem] leading-snug text-[var(--gc-text-muted)]">{j.summary}</span>
                    <span className="mt-3 inline-flex items-center gap-1 gc-mono text-[0.62rem] tracking-[0.12em] text-[var(--gc-text-faint)] transition-colors group-hover:text-[var(--gc-hi)]">
                      VIEW &amp; APPLY <ArrowRight size={12} weight="bold" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
