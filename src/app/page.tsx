import GcHero from "./_components/GcHero";
import GcProof from "./_components/GcProof";
import GcCapabilities from "./_components/GcCapabilities";
import GcBuiltLouisiana from "./_components/GcBuiltLouisiana";
import GcProjects from "./_components/GcProjects";
import GcBridgeCrew from "./_components/GcBridgeCrew";
import GcCareers from "./_components/GcCareers";
import GcCredibility from "./_components/GcCredibility";
import GcFaq from "./_components/GcFaq";
import GcContact from "./_components/GcContact";
import GcSchema from "./_components/GcSchema";
import GcSeam from "./_components/GcSeam";

export default function GilchristPage() {
  return (
    <>
      <GcHero />
      <GcProof />
      <GcSeam sta="4+20" />
      <GcCapabilities />
      <GcSeam sta="8+10" />
      <GcBuiltLouisiana />
      <GcSeam sta="12+00" />
      <GcProjects />
      {/* The one big cinematic inhale before the human beat stays tallest */}
      <div className="relative h-24 sm:h-32" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--gc-line)]" />
        <span className="absolute left-1/2 top-1/2 h-0.5 w-[22px] -translate-x-1/2 -translate-y-1/2 bg-[var(--gc-hi)] opacity-50" />
        <span className="gc-mono absolute left-[calc(50%_+_22px)] top-1/2 -translate-y-1/2 pl-3 text-[0.54rem] tracking-[0.22em] text-[var(--gc-text-faint)]">STA 16+50</span>
      </div>
      <GcBridgeCrew />
      <GcSeam tone="quiet" sta="20+00" />
      <GcCareers />
      {/* NO seam into Credibility — the daylight-concrete flip IS the punctuation */}
      <GcCredibility />
      <GcSeam tone="quiet" sta="30+00" />
      <GcFaq />
      <GcContact />
      <GcSchema />
    </>
  );
}
