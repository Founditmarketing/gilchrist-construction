"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "@phosphor-icons/react";
import { JOBS, JOB_CATEGORIES, countByCategory, type JobCategory } from "../jobs";

type Filter = "All" | JobCategory;

function Pill({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={active ? { borderColor: "var(--gc-hi)", background: "rgba(67,174,42,0.12)", color: "var(--gc-hi)" } : undefined}
      className={`gc-focus inline-flex items-center gap-2 rounded-[3px] border px-3.5 py-1.5 text-[0.82rem] transition-colors ${
        active ? "" : "border-[var(--gc-line-strong)] text-[var(--gc-text-muted)] hover:border-[var(--gc-text-faint)] hover:text-[var(--gc-text)]"
      }`}
    >
      {label}
      <span className="gc-mono text-[0.66rem] opacity-70">{count}</span>
    </button>
  );
}

/** The on-site job board: filter by trade, then an editorial index of open
 *  roles — each row links to its own page where you apply right here. */
export default function GcJobBoard() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? JOBS : JOBS.filter((j) => j.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Pill active={filter === "All"} label="All roles" count={JOBS.length} onClick={() => setFilter("All")} />
        {JOB_CATEGORIES.map((c) => (
          <Pill key={c} active={filter === c} label={c} count={countByCategory(c)} onClick={() => setFilter(c)} />
        ))}
      </div>

      <p className="gc-mono mt-6 text-[0.7rem] tracking-[0.14em] text-[var(--gc-text-faint)]">
        {shown.length} {shown.length === 1 ? "ROLE" : "ROLES"}{filter !== "All" ? ` · ${filter.toUpperCase()}` : " · APPLY ON-SITE"}
      </p>

      <ul className="mt-4 border-t border-[var(--gc-line)]">
        {shown.map((j) => (
          <li key={j.slug}>
            <Link
              href={`/careers/${j.slug}`}
              className="gc-focus group grid gap-y-3 border-b border-[var(--gc-line)] py-7 transition-colors hover:bg-[var(--gc-panel)]/40 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 sm:px-2"
            >
              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <h3 className="gc-display text-[1.45rem] leading-none text-[var(--gc-text)] transition-colors group-hover:text-[var(--gc-hi)]">
                    {j.title}
                  </h3>
                  {j.featured && (
                    <span className="gc-mono rounded-[3px] border border-[var(--gc-hi-deep)] bg-[rgba(67,174,42,0.1)] px-2 py-0.5 text-[0.56rem] tracking-[0.14em] text-[var(--gc-hi)]">
                      OFTEN HIRING
                    </span>
                  )}
                </div>
                <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-[var(--gc-text-muted)]">{j.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 gc-mono text-[0.62rem] tracking-[0.1em] text-[var(--gc-text-faint)]">
                  <span className="inline-flex items-center gap-1.5"><Briefcase size={12} weight="bold" aria-hidden="true" />{j.category}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin size={12} weight="fill" aria-hidden="true" />{j.location}</span>
                  <span>{j.type}</span>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 gc-mono text-[0.72rem] tracking-[0.1em] text-[var(--gc-text-muted)] transition-colors group-hover:text-[var(--gc-hi)] sm:justify-self-end">
                VIEW &amp; APPLY
                <ArrowRight size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
