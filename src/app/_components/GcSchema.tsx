import {
  BUSINESS_NAME, BUSINESS_LEGAL, PHONE_DISPLAY, LOCATION, SOCIAL, FOUNDED, FAQ,
} from "../site";

const SITE = "https://www.gilchristconstruction.com";

function Ld({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Structured data: a GeneralContractor LocalBusiness with the correct NAP and
 *  the disciplines Gilchrist self-performs, plus a FAQPage. No AggregateRating —
 *  this is a B2B/B2G contractor, not a review-driven consumer business. */
export default function GcSchema() {
  return (
    <>
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          "@id": `${SITE}/#business`,
          name: BUSINESS_LEGAL,
          alternateName: BUSINESS_NAME,
          description:
            "Central Louisiana heavy-civil and highway contractor since 1981. Self-performed asphalt, concrete, bridges and structures, and earthwork for the State of Louisiana's infrastructure.",
          url: SITE,
          telephone: PHONE_DISPLAY,
          foundingDate: String(FOUNDED),
          priceRange: "$$$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: LOCATION.street,
            addressLocality: LOCATION.city,
            addressRegion: LOCATION.region,
            postalCode: LOCATION.zip,
            addressCountry: "US",
          },
          areaServed: { "@type": "State", name: "Louisiana" },
          knowsAbout: [
            "Highway construction",
            "Asphalt paving and production",
            "Concrete paving and production",
            "Bridge structures",
            "Pile driving",
            "Moveable bridges",
            "Earthwork and excavation",
            "Design-build",
          ],
          sameAs: [SOCIAL.facebook, SOCIAL.linkedin],
        }}
      />
      <Ld
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </>
  );
}
