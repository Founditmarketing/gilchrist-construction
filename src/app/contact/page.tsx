import type { Metadata } from "next";
import GcContact from "../_components/GcContact";

export const metadata: Metadata = {
  title: "Request a Bid — Contact | Gilchrist Construction",
  description:
    "Send Gilchrist Construction your project — owner, scope, and let date — and an estimator will follow up. A Louisiana DOTD prime contractor in Alexandria, LA.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="h-10 sm:h-12" aria-hidden="true" />
      <GcContact />
    </>
  );
}
