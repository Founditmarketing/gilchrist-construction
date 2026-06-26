import type { ReactNode } from "react";

/** Shared sub-page header — a station eyebrow, a monumental title, and an intro,
 *  with the blueprint grid behind it. Top padding clears the fixed 64px header.
 *  `sta` is the surveyor eyebrow (keeps the centerline motif across pages). */
export default function GcPageHeader({
  sta,
  eyebrow,
  title,
  intro,
}: {
  sta: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--gc-line)] bg-[var(--gc-ground)] gc-grid-lines">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <p className="gc-station mb-5">{sta} · {eyebrow}</p>
        <h1 className="gc-display-xl max-w-4xl text-[var(--gc-text)]">{title}</h1>
        {intro && <p className="gc-body-lg mt-6 max-w-2xl text-[var(--gc-text-muted)]">{intro}</p>}
      </div>
    </header>
  );
}
