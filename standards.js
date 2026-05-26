// Indian and International Electrical Safety Standards Database
export const standardsDb = {
  "IS-3043": {
    code: "IS 3043",
    title: "Code of Practice for Earthing",
    clause: "Clause 17 & 20",
    description: "Guideline for design, installation, and maintenance of earthing systems for electrical installations. Soil resistivity and grounding conductor sizes.",
    legalImplication: "Strict compliance is mandatory under Central Electricity Authority (CEA) Regulations, 2010. Non-compliance invites penal action and shutdown of power supply.",
    riskImpact: "Inefficient dissipation of fault currents, causing high touch/step voltages, leading to fatal electrical shock, device failure, and fire hazards.",
    defaultSeverity: "Critical",
    defaultCAPA: "Conduct soil resistivity test, treat earthing pits with charcoal and salt/bentonite slurry, measure earthing resistance, and ensure grounding grid loop continuity (<1 ohm for sub-station earthing, <5 ohms for equipment)."
  },
  "IS-732": {
    code: "IS 732",
    title: "Code of Practice for Electrical Wiring Installations",
    clause: "Clause 3.4 & 4.1",
    description: "Requirements for design, selection, and erection of wiring systems to ensure safety and proper functioning for intended use.",
    legalImplication: "Required under State Electrical Inspectorate regulations for commercial and residential licensing.",
    riskImpact: "Loose connection, uninsulated wiring, or incorrect cable rating may cause short-circuits, overloading, structural fire, and shock hazards.",
    defaultSeverity: "Major",
    defaultCAPA: "Re-route exposed wiring through fire-retardant conduit (FRLS), replace sub-standard cables matching connected loads, and use appropriate color-coded insulation sleeves."
  },
  "IS-5216": {
    code: "IS 5216",
    title: "Guide for Safety Procedures and Practices in Electrical Work",
    clause: "Part 1, Clause 5",
    description: "Safety instructions for operations, maintenance, and testing of electrical equipment, including Permits-To-Work (PTW) and Lock-Out Tag-Out (LOTO).",
    legalImplication: "Mandatory under the Factories Act, 1948, Section 40-A. Non-compliance holds EHS manager/auditor legally responsible for onsite accidents.",
    riskImpact: "Accidental energization of circuit under maintenance, resulting in severe electrocution or death of maintenance personnel.",
    defaultSeverity: "Critical",
    defaultCAPA: "Enforce strict LOTO protocol with dedicated padlocks, provide personal protective equipment (PPE) like insulated gloves and arc flash suits, and display clear safety warning signs."
  },
  "NBC-Part-4": {
    code: "NBC Part 4",
    title: "National Building Code - Fire and Life Safety",
    clause: "Clause 4.16 & Annexure C",
    description: "Detailed safety requirements for electrical installations inside buildings to prevent starting of fire or spread of smoke.",
    legalImplication: "Mandatory to obtain Fire No Objection Certificate (NOC) from local Fire Authorities.",
    riskImpact: "Lack of fire compartmentation or missing fire barrier sealing in cable shafts allows toxic smoke and fire to propagate across building floors within minutes.",
    defaultSeverity: "Critical",
    defaultCAPA: "Provide certified fire barrier sealing (2-hour rating) for all cable shaft penetrations at floor levels and install automatic fire suppression systems in electrical rooms."
  },
  "NBC-Part-8": {
    code: "NBC Part 8 Section 2",
    title: "National Building Code - Building Services (Electrical)",
    clause: "Clause 5.3 & 6.2",
    description: "Layout planning, space allocation, ventilation requirements, and installation of transformers, switchgear, and backup generators.",
    legalImplication: "Governs building plan approval by municipal corporations and electrical inspectorates.",
    riskImpact: "Insufficient spatial clearance or poor ventilation in transformer rooms leads to high ambient heat, insulating oil degradation, and risk of explosion.",
    defaultSeverity: "Major",
    defaultCAPA: "Rearrange electrical panel clearance distances (minimum 1 meter front space), install exhaust ventilation system, and remove any non-electrical piping (water/sewage) from electrical rooms."
  },
  "IEEE-80": {
    code: "IEEE 80",
    title: "Guide for Safety in AC Substation Grounding",
    clause: "Section 8 & 14",
    description: "Design criteria for safety from shock during fault conditions. Deals with Step and Touch voltages inside transformer yards.",
    legalImplication: "Industry best practice for high voltage grid safety standard audit compliance.",
    riskImpact: "High touch or step potential in the yard under ground fault conditions, resulting in lethal electric shocks to operators walking near fence or structures.",
    defaultSeverity: "Critical",
    defaultCAPA: "Spread a 100mm layer of clean gravel (crushed rock) across the transformer yard, bond the metallic fence directly to the main grounding grid, and implement copper grounding grid loops."
  },
  "IEEE-1584": {
    code: "IEEE 1584",
    title: "Guide for Performing Arc-Flash Hazard Calculations",
    clause: "Section 4 & 6",
    description: "Methods for calculating the arc flash boundary and incident energy level at electrical equipment. Guides selection of appropriate EHS PPE.",
    legalImplication: "Crucial for occupational safety audits under EHS and ISO 45001 compliance standards.",
    riskImpact: "Arc flash incident during panel operation causing severe thermal burns, blindness, hearing damage, and blast injuries to workers.",
    defaultSeverity: "Major",
    defaultCAPA: "Conduct arc flash hazard assessment, label panel boards with arc flash boundary details and energy levels, and mandate minimum rating (e.g., 8/40 cal/cm²) PPE for operators."
  },
  "BEE-ECBC": {
    code: "BEE ECBC",
    title: "Energy Conservation Building Code (BEE)",
    clause: "Section 6 (Electrical & Power)",
    description: "Energy efficiency standards for transformers, motors, power factor correction, and metering.",
    legalImplication: "Mandatory under the Energy Conservation Act, 2001 for designated commercial buildings.",
    riskImpact: "Low power factor leads to energy losses, penalties on electricity bills, and inefficient loading of transformers and distribution lines.",
    defaultSeverity: "Minor",
    defaultCAPA: "Install Automatic Power Factor Correction (APFC) capacitor banks to maintain average power factor above 0.98, and replace old motors with IE3/IE4 super-efficient induction motors."
  },
  "CPCB-PCB": {
    code: "CPCB / PCB Norms",
    title: "Pollution Control Board Regulations for DG Sets",
    clause: "Section 3 (Air & Noise)",
    description: "Guidelines on stack height (exhaust chimney calculation based on building height), acoustic enclosures (noise limit < 75 dBA at 1m), and fuel storage safety.",
    legalImplication: "Mandatory for obtaining Consent to Establish (CTE) and Consent to Operate (CTO).",
    riskImpact: "Excessive noise pollution, release of toxic diesel exhaust gases at low levels affecting personnel health, and ground contamination from fuel spills.",
    defaultSeverity: "Major",
    defaultCAPA: "Extend DG exhaust stack height (Formula: H = h + 0.2 x sqrt(kVA)), maintain acoustic acoustic panel seals to ensure noise is below 75 dBA, and build a concrete containment dyke around the fuel tank."
  },
  "IEC-62305": {
    code: "IEC 62305 / IS 15086",
    title: "Protection Against Lightning",
    clause: "Part 3 & 4",
    description: "Standard for design of physical lightning protection systems (LPS), surge protection devices (SPDs), and electromagnetic shielding.",
    legalImplication: "Regulated in critical industrial structures and high-rise commercial buildings.",
    riskImpact: "Lightning strike directly hitting structure leading to structural damage, explosive fire, and high voltage surge destroying electronic control rooms.",
    defaultSeverity: "Critical",
    defaultCAPA: "Install Early Streamer Emission (ESE) or conventional air terminals on the roof, route down conductors through insulated routes, and install Class I & II SPDs in main distribution boards."
  },
  "IS-IEC-61439": {
    code: "IS/IEC 61439",
    title: "Low-voltage Switchgear and Controlgear Assemblies",
    clause: "Part 1 & 2",
    description: "Defines integration requirements of electrical panels including IP protection code, internal partition forms, clearance and creepage distances.",
    legalImplication: "Standard of compliance for electrical panel manufacturing and panel installations.",
    riskImpact: "Inadequate IP rating (ingress of dust, water or vermin) causing internal phase-to-phase short circuits, flashovers, and sudden power outage.",
    defaultSeverity: "Major",
    defaultCAPA: "Ensure internal partitions match Form 3b or 4b configuration, install panel vermin traps, seal cable entry points with gland plates and flame-retardant compound, and maintain IP54 rating."
  }
};
