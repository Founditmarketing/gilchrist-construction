/** A surveyed section seam — a faint vertical centerline stub crossed by one
 *  amber station tick. The page's recurring "mile-marker": every section
 *  transition becomes a point on the same alignment. Pure CSS, aria-hidden. */
export default function GcSeam({ sta, tone = "default" }: { sta?: string; tone?: "default" | "quiet" }) {
  const tickOpacity = tone === "quiet" ? 0.32 : 0.5;
  return (
    <div className="relative h-16 sm:h-20" aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--gc-line)]" />
      <span
        className="absolute left-1/2 top-1/2 h-0.5 w-[22px] -translate-x-1/2 -translate-y-1/2 bg-[var(--gc-hi)]"
        style={{ opacity: tickOpacity }}
      />
      {sta && (
        <span className="gc-mono absolute left-[calc(50%_+_22px)] top-1/2 -translate-y-1/2 pl-3 text-[0.54rem] tracking-[0.22em] text-[var(--gc-text-faint)]">
          STA {sta}
        </span>
      )}
    </div>
  );
}
