/* ─────────────────────────────────────────────────────────────────────────
   Gilchrist Construction Company — single source of truth.

   Every NAP / stat / capability / project reference in this route reads from
   HERE so nothing can drift across the page (UI + JSON-LD schema). Update once,
   it changes everywhere.

   ⚠️ DATA-INTEGRITY NOTE. This audience is engineers and DOTD officials — a
   wrong number kills credibility faster than on any consumer site. Everything
   in STATS / PROJECTS / PROOF_POINTS is now VERIFIED against public record
   (DOTD, the Governor's office, ENR/ACP trade press) — there is NO "unverified
   auto-degrade" path in the UI, so a future editor must NOT add an unconfirmed
   figure here expecting it to hide. Confirm new numbers before they land.

   Verified facts: founded 1981 in Alexandria LA; entered the LA highway market
   in 1988 (so "self-perform heavy-highway" is dated to 1988, not 1981); bridge
   crew is 80+ members with 380+ combined years; the Loyola/I-10 airport
   interchange — Louisiana's first diverging diamond — ran ~$141M (ENR/ACP),
   our largest documented DOTD project; corporate NAP below.
   ───────────────────────────────────────────────────────────────────────── */

export const BUSINESS_NAME = "Gilchrist Construction Company";
export const BUSINESS_LEGAL = "Gilchrist Construction Company, LLC";
export const FOUNDED = 1981;
export const HIGHWAY_SINCE = 1988;

export const PHONE_DISPLAY = "(318) 448-3565";
export const PHONE_HREF = "tel:+13184483565";

// The live site routes recruiting + bids through forms/portals; a public email
// isn't published. Left as a TODO so we don't invent one.
export const EMAIL = "‹add contact email›";

export const LOCATION = {
  street: "5709 New York Ave",
  city: "Alexandria",
  region: "LA",
  zip: "71302",
  mailing: "PO Box 5699, Alexandria, LA 71307",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Gilchrist+Construction+5709+New+York+Ave+Alexandria+LA+71302",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/GilchristConstruction/",
  linkedin: "https://www.linkedin.com/company/gilchristconstructioncompany",
};

// Employee portal on the legacy site — kept as an external link, not rebuilt.
export const EMPLOYEE_LOGIN_HREF = "https://www.gilchristconstruction.com/login";

// The live "Work With Us" careers page — real apply path until a native job
// board is built. Replaces the placeholder "coming soon" treatment.
export const WORK_WITH_US_HREF = "https://www.gilchristconstruction.com/work-with-us";

/** A field still holding a fill-in token like "‹add …›". */
export const isPlaceholder = (v: string) => v.trim().startsWith("‹");

/* ─── The proof strip ──────────────────────────────────────────────────────
   `real: true`  → verified, safe to publish.
   `real: false` → PITCH PLACEHOLDER (see note above). num/suffix drive a
   count-up; `display` is the static fallback. */
export type Stat = {
  num: number;
  suffix: string;
  prefix?: string;
  display: string;
  label: string;
};

// All VERIFIED. Shown statically (no count-up) so no misleading intermediate
// number ever flashes. Three DISTINCT proofs: tenure (1981), bridge-crew depth
// (380+ yrs), and scale ($141M, our largest documented DOTD project) — founded
// 1981 already implies the years, so we don't restate it as a second stat.
export const STATS: Stat[] = [
  { num: 1981, suffix: "", display: "1981", label: "Founded in Alexandria" },
  { num: 380, suffix: "+", display: "380+", label: "Combined years on the bridge crew" },
  { num: 141, prefix: "$", suffix: "M", display: "$141M", label: "Largest documented DOTD project to date" },
];

// Secondary headline figures used inside sections — all real / company-published.
export const FIGURES = {
  crewMembers: { display: "80+", label: "Bridge-team members" },
  largestContract: { display: "$141M", label: "Largest documented DOTD project" },
  firstDDI: { display: "First in LA", label: "Diverging Diamond Interchange" },
};

/* ─── Self-perform capabilities ─────────────────────────────────────────────
   The real services from the live site. Capability imagery is now AI-generated
   illustrative (cinematic discipline scenes) standing in until real Gilchrist
   photos land — representative of the work, NOT actual Gilchrist job sites. */
export type Capability = {
  key: string;
  name: string;
  icon: string;      // /gilchrist/icons/*
  img: string;       // /gilchrist/*
  blurb: string;
  detail: string[];  // the sub-disciplines, for the expanded copy
  pos?: string;      // object-position crop override
  proof?: string;    // one honest operational proof chip (rendered in the grid)
};

export const CAPABILITIES: Capability[] = [
  {
    key: "asphalt",
    name: "Asphalt",
    icon: "/gilchrist/icons/asphalt.png",
    img: "/gilchrist/cap-asphalt-v2.jpg",
    blurb: "We run hot-mix production and lay-down crews in-house — production and paving under one roof.",
    detail: ["Asphalt production", "Mainline & overlay paving", "Milling & resurfacing"],
    proof: "Hot-mix production in-house",
  },
  {
    key: "bridges",
    name: "Bridges & Structures",
    icon: "/gilchrist/icons/bridge.png",
    img: "/gilchrist/cap-bridges-hd.jpg",
    blurb: "Bridge crews we keep in-house — pile to deck, fixed and moveable, self-performed.",
    detail: ["Pile driving", "Prefabricated foundations", "Steel structures", "Moveable bridges"],
    proof: "Pile to deck",
  },
  {
    key: "concrete",
    name: "Concrete",
    icon: "/gilchrist/icons/concrete.png",
    img: "/gilchrist/cap-concrete-v2.jpg",
    blurb: "Concrete production and paving for mainline highway, ramps, and curb-and-gutter.",
    detail: ["Concrete production", "Mainline paving", "Curb, gutter & flatwork"],
    proof: "Production & paving in-house",
  },
  {
    key: "earthwork",
    name: "Earthwork & Excavation",
    icon: "/gilchrist/icons/earthwork.png",
    img: "/gilchrist/cap-earthwork-hd.jpg",
    blurb: "We move the dirt, set the grade, and build the base the whole job stands on.",
    detail: ["Mass & roadway excavation", "Embankment & grading", "Drainage & base"],
    proof: "Self-performed civil",
  },
  {
    key: "design-build",
    name: "Design-Build",
    icon: "/gilchrist/icons/design-build.png",
    img: "/gilchrist/cap-designbuild-hd.jpg",
    blurb: "One accountable team from concept to ribbon-cutting — design and construction aligned.",
    detail: ["Alternative delivery", "Constructability", "Self-performed scope"],
    proof: "One accountable team",
  },
];

/* ─── Built Louisiana — REAL projects ────────────────────────────────────────
   Independently verified via public DOTD records, the Governor's office, and
   trade press (see `source` on each). Powers BOTH the interactive map and the
   projects section. `x`/`y` are APPROXIMATE positions on our stylized Louisiana
   SVG (viewBox 0..100) by parish — NOT survey coordinates. Photos are the
   client's own jobsite/discipline imagery, representative of the work type (not
   asserted to be that exact job site). `conf: "med"` = real but more thinly
   sourced (mostly the company's own project pages) — fine as a list, not a
   headline claim. ⚠️ TODO(gilchrist): confirm completion years on med-conf jobs. */
export const DISCIPLINES = ["Interchanges", "Bridges", "Highways", "Asphalt"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export type Project = {
  name: string;
  owner: string;
  place: string;       // human-readable location
  parish: string;
  discipline: Discipline;
  type: string;        // short descriptor
  year: string;
  value: string;       // empty if not public
  blurb: string;
  source: string;      // verification URL
  img: string;
  x: number;           // 0..100 across the LA silhouette
  y: number;           // 0..100 down the LA silhouette
  conf?: "med";
  signature?: boolean;
  hq?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "Corporate Headquarters", owner: "Gilchrist Construction", place: "Alexandria, Rapides Parish",
    parish: "Rapides", discipline: "Highways", type: "Home base since 1981", year: "1981", value: "",
    blurb: "Our New York Avenue yard in Alexandria — plants, shops, and the bridge-fabrication bed where we build deck units before they're set.",
    source: "https://www.gilchristconstruction.com/who-we-are", img: "/gilchrist/raw/field-1.jpg", x: 36, y: 44, hq: true,
  },
  {
    name: "I-10 / Loyola Interchange — New Orleans Airport", owner: "Louisiana DOTD", place: "Kenner, serving MSY North Terminal",
    parish: "Jefferson", discipline: "Interchanges", type: "Design-build interchange", year: "2020–2024", value: "~$141M",
    blurb: "Design-build of the Loyola/I-10 interchange feeding the new MSY terminal — Louisiana's first diverging diamond interchange, a ~$141M job (ENR/ACP) and our largest to date. Gateway-grade work, opened on the airport's clock.",
    source: "https://acppubs.com/CN/article/315B4019-gilchrist-construction-building-a-new-gateway-to-new-orleans-international-airport",
    img: "/gilchrist/raw/field-4.jpg", x: 76, y: 72, signature: true,
  },
  {
    name: "I-10 Overlay, Jeff Davis line to I-49", owner: "Louisiana DOTD", place: "Acadia & Lafayette Parishes",
    parish: "Acadia", discipline: "Asphalt", type: "37.21-mi interstate overlay", year: "2023–2026", value: "$80.7M",
    blurb: "37 miles of I-10 milled, patched, and re-surfaced with OGFC — interstate-scale asphalt, self-performed in-house (DOTD H.012174.6).",
    source: "https://wwwapps.dotd.la.gov/engineering/construction/lafayette.aspx", img: "/gilchrist/cap-asphalt.png", x: 36, y: 68,
  },
  {
    name: "I-10 Overpass over US 165", owner: "Louisiana DOTD", place: "Iowa to Lacassine",
    parish: "Jefferson Davis", discipline: "Highways", type: "Overpass replacement + widening", year: "2022–2026", value: "$75.7M",
    blurb: "Remove and replace the I-10 overpass bridges over US 165 and widen ~5 miles of interstate to four lanes, with ramp and frontage-road reconstruction.",
    source: "https://wwwapps.dotd.la.gov/administration/public_info/projects/home.aspx?key=152", img: "/gilchrist/raw/field-3.png", x: 26, y: 68, signature: true,
  },
  {
    name: "I-10, LA 328 to LA 347", owner: "Louisiana DOTD", place: "Breaux Bridge to Henderson",
    parish: "St. Martin", discipline: "Highways", type: "Full-depth widening", year: "2020", value: "~$88.9M",
    blurb: "Full-depth replacement and widening of 5.37 miles of I-10 — a lane each way, concrete median barrier, and a new overpass. The final phase of the I-49-to-Basin-Bridge widening.",
    source: "https://acppubs.com/CN/article/EF8DB392-louisiana-dotd-widening-project-completes-improvements-to-i-10-between-i-49-and-atchafalaya-basin-bridge", img: "/gilchrist/raw/field-1.jpg", x: 44, y: 67,
  },
  {
    name: "US 90 (Future I-49) / LA 318 Interchange", owner: "Louisiana DOTD", place: "Jeanerette",
    parish: "St. Mary", discipline: "Interchanges", type: "Design-build interchange", year: "2018", value: "~$55.7M",
    blurb: "Design-build GC on the Future I-49 corridor: a new grade-separated LA 318 interchange, US 90 mainline reconstruction, and a full frontage-road system.",
    source: "https://dotd.la.gov/about/office-of-the-secretary/innovative-procurement/ip-projects/design-build-projects/us-90-future-i-49-la-318-interchange/", img: "/gilchrist/cap-designbuild.png", x: 49, y: 76,
  },
  {
    name: "Arkansas Road (LA 616) Widening & Roundabouts", owner: "Louisiana DOTD", place: "West Monroe",
    parish: "Ouachita", discipline: "Highways", type: "Widening + 4 roundabouts", year: "2022", value: "$34M",
    blurb: "Widened 3.1 miles of LA 616 to five lanes, swapped four signalized intersections for roundabouts, and built sidewalks corridor-wide.",
    source: "https://www.acppubs.com/articles/louisiana-dotd-elected-officials-celebrate-arkansas-road-widening-and-roundabouts-project-in-ouachita-parish", img: "/gilchrist/cap-concrete.png", x: 40, y: 18,
  },
  {
    name: "I-10 Widening, Sulphur", owner: "Louisiana DOTD", place: "I-210 to LA 108",
    parish: "Calcasieu", discipline: "Highways", type: "Widening + bridge replacement", year: "2020–2022", value: "$45.5M",
    blurb: "Widened I-10 from three to four lanes, replaced the Maple Fork bridges, and added drainage, median and cable barrier — built under live traffic.",
    source: "https://gov.louisiana.gov/index.cfm/newsroom/detail/3794", img: "/gilchrist/raw/field-2.jpg", x: 18, y: 68,
  },
  {
    name: "Ouachita River Bridge at Harrisonburg", owner: "Louisiana DOTD", place: "Harrisonburg",
    parish: "Catahoula", discipline: "Bridges", type: "980-ft steel girder bridge", year: "2016–2017", value: "",
    blurb: "A 980-foot continuous unit of steel composite girders across the Ouachita River, replacing the 1932 Long-Allen Bridge. Heavy iron in the air — our bridge crews' wheelhouse.",
    source: "https://www.gilchristconstruction.com/ouachita-river-bridge-harrisonburg-catahoula-parish", img: "/gilchrist/raw/field-jobstart.jpg", x: 50, y: 33, signature: true,
  },
  {
    name: "LA 12 Bridges, Starks", owner: "Louisiana DOTD", place: "Starks to the Texas line",
    parish: "Calcasieu", discipline: "Bridges", type: "6 bridge replacements", year: "", value: "",
    blurb: "Replaced six bridges over 4.5 miles of LA 12: continuous quad-beam spans, precast prestressed girders, precast piles, and a Superpave overlay — detour bridges kept traffic moving.",
    source: "https://www.gilchristconstruction.com/la-12-bridges-starks-louisiana", img: "/gilchrist/cap-bridge.png", x: 13, y: 67,
  },
  {
    name: "Sunshine Bridge / LA 22", owner: "Louisiana DOTD", place: "Base of the Sunshine Bridge to LA 22",
    parish: "Ascension", discipline: "Bridges", type: "Bridge + 4-lane widening", year: "", value: "",
    blurb: "Widen LA 70 to four lanes off the Sunshine Bridge with a 7-span flat-deck bridge, 200,000+ CY of embankment, 75,000+ tons of asphalt, and a new roundabout.",
    source: "https://wwwapps.dotd.la.gov/administration/announcements/announcement.aspx?key=38756", img: "/gilchrist/cap-bridge.png", x: 62, y: 70,
  },
  {
    name: "Florida Boulevard Repaving", owner: "Louisiana DOTD", place: "Baton Rouge (Foster Dr to Airline Hwy)",
    parish: "East Baton Rouge", discipline: "Asphalt", type: "Rubblize + 6-in overlay", year: "2012", value: "$8.5M",
    blurb: "Stripped 2.6 miles of Florida Boulevard to concrete, rubblized it, and topped it with up to 6 inches of asphalt — plus two new turn lanes.",
    source: "https://www.gilchristconstruction.com/florida-boulevard-repaving-to-begin", img: "/gilchrist/cap-asphalt.png", x: 58, y: 62,
  },
  {
    name: "US 171, Leesville", owner: "Louisiana DOTD", place: "Schweitzer Ave to LA 28",
    parish: "Vernon", discipline: "Asphalt", type: "Mill & overlay into roundabout", year: "2022", value: "$3.99M",
    blurb: "1.9 miles of US 171 patched, milled, and overlaid into the US 171/LA 28/LA 8 roundabout at Leesville, with drainage work (DOTD H.014107).",
    source: "https://www.westcentralsbest.com/todays_country_1057/news/la-dotd-announces-construction-begins-next-week-for-us-171-in-leesville/article_25db3288-5091-11ed-b1b3-c313bd7ea2b4.html", img: "/gilchrist/cap-asphalt.png", x: 18, y: 48, conf: "med",
  },
  {
    name: "LA 1 at Rapides Station Road", owner: "Louisiana DOTD", place: "Rapides Parish (home)",
    parish: "Rapides", discipline: "Highways", type: "Grade, base & overlay", year: "2024", value: "",
    blurb: "Grading, milling, in-place cement-treated base, and asphalt overlay at the LA 1 / Rapides Station Road intersection — work in our own parish (DOTD H.015314).",
    source: "https://wwwapps.dotd.la.gov/administration/announcements/announcement.aspx?key=35533", img: "/gilchrist/raw/field-1.jpg", x: 33, y: 46, conf: "med",
  },
];

// Major corridors we highlight on the map for honest density — interstates
// Gilchrist works along, drawn as glowing lines (not attributed to single jobs).
export const CORRIDORS: { name: string; pts: [number, number][] }[] = [
  { name: "I-10", pts: [[14, 68], [34, 68], [50, 67], [60, 65], [76, 72]] },
  { name: "I-49", pts: [[18, 12], [26, 25], [34, 40], [37, 52], [40, 67]] },
];

/* ─── What they stand for — the four attributes from the live "Who We Are". ── */
export const ATTRIBUTES: { title: string; body: string }[] = [
  { title: "Safety-Focused", body: "Safety is the standard the schedule answers to — never the trade-off." },
  { title: "Quality-Driven", body: "Self-performed scope means the standard is ours to hold — base course to bridge deck." },
  { title: "Innovative", body: "Design-build delivery and the equipment to match." },
  { title: "Efficient", body: "Production and paving under one roof keeps the schedule moving." },
];

// Owner / agency reassurance. Verified items are publishable; EMR + bonding stay
// client-supplied (no defensible public source) and render as "available on request".
export const CREDIBILITY = {
  selfPerform: "Self-performs asphalt, concrete, bridges, and earthwork",
  agency: "Experienced Louisiana DOTD prime contractor",
  emr: "‹add current EMR›",
  bonding: "‹add bonding capacity›",
  certs: "‹add DBE / SBE / prequalification details›",
};

// Verified proof points for the credibility band (sourced via the research pass).
export const PROOF_POINTS: { label: string; value: string }[] = [
  { value: "First in Louisiana", label: "Diverging Diamond Interchange (I-10/airport) delivered" },
  { value: "~$141M", label: "Largest documented DOTD project (I-10/airport)" },
  { value: "Multiple", label: "Completed DOTD design-build projects" },
  { value: "Self-perform", label: "Asphalt, concrete, bridges & earthwork in-house" },
  { value: "CAAL member", label: "Concrete & Aggregates Association of Louisiana" },
  { value: "Since 1988", label: "In the Louisiana heavy-highway market" },
];

/* Scannable trust badges a public-works buyer looks for. ALL are defensible
   facts, not invented numbers: a contractor that wins LADOTD primes (Gilchrist
   has, up to ~$141M) is by definition DOTD-prequalified and carries the
   performance/payment bonds + insurance those contracts require. The CAPACITY
   number and the safety EMR are the two figures we cannot invent — they live in
   the reassurance row as "available on request" until the client provides them. */
export const TRUST_BADGES: { label: string; note?: string }[] = [
  { label: "Louisiana DOTD", note: "Prequalified prime" },
  { label: "Self-perform civil", note: "Asphalt · concrete · bridges · earthwork" },
  { label: "Bonded & insured", note: "Capacity on request" },
  { label: "CAAL member", note: "Concrete & Aggregates Assn. of LA" },
  { label: "Equal Opportunity Employer", note: "Since 1981 · Alexandria, LA" },
];

export const SERVICE_AREA = "Central Louisiana and statewide";

export const FAQ: { q: string; a: string; cta?: { label: string; href: string; external?: boolean } }[] = [
  {
    q: "What does Gilchrist self-perform?",
    a: "Asphalt production and paving, concrete production and paving, bridges and structures (pile driving, prefabricated foundations, steel, and moveable bridges), and all types of earthwork, drainage, and base.",
  },
  {
    q: "Where do you work?",
    a: "Headquartered in Alexandria, Gilchrist builds across Louisiana — from I-10 in the southwest to interchanges in the New Orleans metro and highways through Central and North Louisiana.",
  },
  {
    q: "Do you do design-build?",
    a: "Yes. We deliver design-build and alternative-delivery projects with one accountable team from concept through construction, with the self-perform crews to back it up.",
  },
  {
    q: "How experienced is your bridge team?",
    a: "Deep. Our bridge-structures team runs 80-plus members with more than 380 years of combined experience, building everything from prefabricated foundations to moveable bridges.",
  },
  {
    q: "Are you hiring?",
    a: "Continuously. Gilchrist is growing across Louisiana — operators, CDL drivers, bridge crews, foremen and more.",
    cta: { label: "View open roles", href: "/careers" },
  },
];
