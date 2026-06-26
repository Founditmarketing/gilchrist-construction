import type { Metadata } from "next";
import GcPageHeader from "../_components/GcPageHeader";
import GcProof from "../_components/GcProof";
import GcCredibility from "../_components/GcCredibility";
import GcBridgeCrew from "../_components/GcBridgeCrew";
import GcFaq from "../_components/GcFaq";
import { FOUNDED, HIGHWAY_SINCE } from "../site";

export const metadata: Metadata = {
  title: "About — Louisiana DOTD Prime Since 1981 | Gilchrist Construction",
  description:
    "Founded in Alexandria in 1981 and in the Louisiana highway market since 1988, Gilchrist Construction is a DOTD prime contractor that self-performs asphalt, concrete, bridges, and earthwork.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <GcPageHeader
        sta="STA 26+40"
        eyebrow="ABOUT GILCHRIST"
        title={<>Central Louisiana built,<br /><span className="gc-hot">statewide proven.</span></>}
        intro={`Founded in Alexandria in ${FOUNDED} and in the Louisiana highway market since ${HIGHWAY_SINCE}, Gilchrist self-performs asphalt, concrete, bridges, and earthwork on the roads the state drives on. We hold the standard because the crews that hold it are ours.`}
      />
      <GcProof />
      <GcCredibility />
      <GcBridgeCrew />
      <GcFaq />
    </>
  );
}
