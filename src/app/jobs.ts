/* ─────────────────────────────────────────────────────────────────────────
   Gilchrist Construction — open trades / careers data.

   The roles below are the trades Gilchrist hires for year-round across
   Louisiana, grounded in the company's own postings (equipment operators,
   dump-truck CDL drivers, bridge crews, finishers, foremen). They are framed
   as REPRESENTATIVE openings, not specific dated requisitions — see
   CAREERS_NOTE — so the on-site board + application are honest while the exact
   live-opening list lives with the recruiting office. NO invented salaries,
   requisition numbers, or posting dates.
   ───────────────────────────────────────────────────────────────────────── */

export const JOB_CATEGORIES = [
  "Operators & Drivers",
  "Bridges & Structures",
  "Asphalt & Concrete",
  "Field & Foremen",
  "Shop & Fleet",
  "Office & Survey",
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export type Job = {
  slug: string;
  title: string;
  category: JobCategory;
  type: string; // employment type
  location: string; // where the work is
  summary: string; // one-line hook
  responsibilities: string[];
  requirements: string[];
  featured?: boolean;
};

export const CAREERS_NOTE =
  "These are the trades Gilchrist hires for year-round across Louisiana. Apply to the role that fits and a superintendent will match you to live openings — no third-party portal, you apply right here.";

export const JOBS: Job[] = [
  {
    slug: "heavy-equipment-operator",
    title: "Heavy Equipment Operator",
    category: "Operators & Drivers",
    type: "Full-time",
    location: "Statewide · field crews",
    summary: "Run the iron on highway and bridge jobs — excavators, dozers, loaders, rollers, and motor graders.",
    responsibilities: [
      "Operate excavators, dozers, loaders, rollers, or graders to grade and line per plan",
      "Work to survey stakes, grade lasers, and GPS machine control",
      "Run daily walk-arounds, greasing, and basic field maintenance",
      "Hold the line on safety around crews, traffic, and utilities",
    ],
    requirements: [
      "Verifiable experience running one or more heavy machines",
      "Able to read grade stakes and follow a foreman's plan",
      "Reliable transportation and a clean work record",
      "Willing to travel to jobs across Louisiana",
    ],
    featured: true,
  },
  {
    slug: "cdl-driver-class-a",
    title: "CDL Driver (Class A)",
    category: "Operators & Drivers",
    type: "Full-time",
    location: "Statewide · field crews",
    summary: "Haul aggregate, hot-mix, and equipment that keep the jobs moving — dump and lowboy.",
    responsibilities: [
      "Safely load, haul, and dump soil, stone, asphalt, and concrete materials",
      "Run dump trucks and, with experience, lowboy and equipment floats",
      "Complete pre- and post-trip inspections and accurate logs",
      "Coordinate with operators and flaggers in tight, live-traffic work zones",
    ],
    requirements: [
      "Valid Class A CDL with a clean motor-vehicle record",
      "Construction or aggregate hauling experience preferred",
      "Able to pass DOT physical and drug screen",
      "Dependable and on-time, every shift",
    ],
    featured: true,
  },
  {
    slug: "asphalt-paver-operator",
    title: "Asphalt Paver Operator",
    category: "Operators & Drivers",
    type: "Full-time",
    location: "Statewide · paving crews",
    summary: "Run the paver and screed laying mainline and overlay on interstate-scale jobs.",
    responsibilities: [
      "Operate the paver and screed to spec for grade, slope, and mat depth",
      "Coordinate truck exchange and material flow behind the laydown",
      "Monitor joints, density, and surface for a clean mat",
      "Maintain the machine and keep the crew safe in the work zone",
    ],
    requirements: [
      "Hands-on paver/screed experience on roadway work",
      "Feel for mat quality, temperature, and yield",
      "Able to work nights and to the weather window",
      "Travel statewide with the paving crew",
    ],
  },
  {
    slug: "bridge-pile-crew",
    title: "Pile-Driving & Bridge Crew",
    category: "Bridges & Structures",
    type: "Full-time",
    location: "Statewide · bridge crews",
    summary: "Drive pile, set girders, form and pour decks — fixed and moveable structures.",
    responsibilities: [
      "Set and drive piling; rig and set precast and steel girders",
      "Build forms, place rebar, and finish bridge decks and substructure",
      "Work safely over water and at height with fall protection",
      "Keep tools, rigging, and the deck organized and tight",
    ],
    requirements: [
      "Bridge, marine, or structural-concrete experience preferred",
      "Comfortable working at height and over water",
      "Able to lift, rig, and work a full day outdoors",
      "Willing to travel and work the bridge crew's schedule",
    ],
    featured: true,
  },
  {
    slug: "crane-operator",
    title: "Crane Operator",
    category: "Bridges & Structures",
    type: "Full-time",
    location: "Statewide · bridge crews",
    summary: "Pick and set girders, pile, and material for the bridge crews.",
    responsibilities: [
      "Operate crawler or hydraulic cranes for bridge and structural picks",
      "Read load charts and plan lifts with the crew and signal person",
      "Run daily inspections and rigging checks before every pick",
      "Hold an exact, safe line setting girders and pile",
    ],
    requirements: [
      "NCCCO (or equivalent) certification and crane experience",
      "Strong load-chart and rigging knowledge",
      "Clean safety record on structural lifts",
      "Able to travel to bridge jobs statewide",
    ],
  },
  {
    slug: "concrete-finisher",
    title: "Concrete Finisher",
    category: "Asphalt & Concrete",
    type: "Full-time",
    location: "Statewide · concrete crews",
    summary: "Finish mainline paving, curb and gutter, flatwork, and structures.",
    responsibilities: [
      "Place, screed, float, and finish concrete to grade and spec",
      "Form and finish curb, gutter, sidewalk, and barrier",
      "Cut joints, cure, and protect fresh work",
      "Hold tight tolerances reading grade on highway work",
    ],
    requirements: [
      "Concrete finishing experience on civil or roadway work",
      "Knowledge of forms, joints, and curing",
      "Able to work bending, kneeling, and lifting all day",
      "Travel with the crew across Louisiana",
    ],
  },
  {
    slug: "asphalt-raker",
    title: "Asphalt Raker / Lute Hand",
    category: "Asphalt & Concrete",
    type: "Full-time",
    location: "Statewide · paving crews",
    summary: "Handwork behind the paver — joints, tie-ins, and the details a machine can't reach.",
    responsibilities: [
      "Rake and lute hot-mix at joints, edges, and tie-ins",
      "Set grade by hand around structures, drains, and turnouts",
      "Shovel, broom, and keep the laydown clean and safe",
      "Work the paving train in step with the operator and roller",
    ],
    requirements: [
      "Able to work around hot asphalt and live equipment safely",
      "Good stamina for outdoor, physical work in the heat",
      "Reliable and ready for night and weather-window work",
      "Entry applicants welcome with the right attitude",
    ],
  },
  {
    slug: "construction-laborer",
    title: "Construction Laborer",
    category: "Field & Foremen",
    type: "Full-time",
    location: "Statewide · field crews",
    summary: "The way into the trades — grade, forms, traffic control, and learning the iron.",
    responsibilities: [
      "Support operators and finishers: dig, set forms, place rebar, clean up",
      "Set and maintain work-zone traffic control",
      "Move material and keep the job site safe and organized",
      "Learn a trade from foremen who came up the same way",
    ],
    requirements: [
      "A strong work ethic and willingness to learn",
      "Able to do physical outdoor work in Louisiana weather",
      "Reliable transportation and on-time attendance",
      "No experience required — we train and promote from within",
    ],
  },
  {
    slug: "foreman-superintendent",
    title: "Foreman / Superintendent",
    category: "Field & Foremen",
    type: "Full-time",
    location: "Statewide · field crews",
    summary: "Run crews, hold the schedule, and own safety and quality on the job.",
    responsibilities: [
      "Plan and run daily crew work to the schedule and the plan",
      "Own safety, quality, and production on your section",
      "Coordinate equipment, material, subs, and the owner's inspector",
      "Develop the crew and bring up the next operators and finishers",
    ],
    requirements: [
      "Proven heavy-civil / DOTD field leadership experience",
      "Able to read plans, run quantities, and hold a schedule",
      "Strong safety record and crew-leadership ability",
      "Travel to jobs across Louisiana",
    ],
  },
  {
    slug: "heavy-equipment-mechanic",
    title: "Heavy Equipment Mechanic / Diesel Tech",
    category: "Shop & Fleet",
    type: "Full-time",
    location: "Alexandria HQ · shop & field",
    summary: "Keep the fleet running — diesel, hydraulics, and the machines that build the road.",
    responsibilities: [
      "Diagnose and repair diesel engines, hydraulics, and undercarriage",
      "Run preventive maintenance on trucks, pavers, cranes, and earthmoving iron",
      "Make field service calls to keep crews moving",
      "Keep accurate service records and parts usage",
    ],
    requirements: [
      "Heavy-equipment or diesel mechanic experience",
      "Own tools and able to read hydraulic and electrical schematics",
      "Welding and fabrication a plus",
      "Valid driver's license; CDL a plus",
    ],
  },
  {
    slug: "estimator",
    title: "Estimator",
    category: "Office & Survey",
    type: "Full-time",
    location: "Alexandria HQ · office",
    summary: "Take-offs and bids for DOTD and civil work — win the next job on the numbers.",
    responsibilities: [
      "Run quantity take-offs from plans and specs for heavy-civil bids",
      "Solicit and level subcontractor and supplier quotes",
      "Build cost and production analyses for self-performed scope",
      "Assemble competitive, accurate bids on the let schedule",
    ],
    requirements: [
      "Heavy-civil / DOTD estimating experience",
      "Strong with plans, specs, and estimating software",
      "Sharp with numbers, organized, and deadline-driven",
      "Based in or able to relocate to Central Louisiana",
    ],
  },
  {
    slug: "survey-party-chief",
    title: "Survey Party Chief",
    category: "Office & Survey",
    type: "Full-time",
    location: "Statewide · field",
    summary: "Layout and grade control that the whole job builds to.",
    responsibilities: [
      "Run construction layout, grade, and as-builts with GPS and total station",
      "Set control and stake alignment, structures, and earthwork",
      "Manage a survey crew and the data behind machine control",
      "Coordinate with foremen and the owner's survey",
    ],
    requirements: [
      "Construction survey experience; party-chief experience preferred",
      "Proficient with GPS, total station, and survey software",
      "Able to read civil plans and run grade",
      "Travel to jobs across Louisiana",
    ],
  },
];

export const getJob = (slug: string): Job | undefined => JOBS.find((j) => j.slug === slug);

export const countByCategory = (cat: JobCategory): number => JOBS.filter((j) => j.category === cat).length;
