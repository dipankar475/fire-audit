// Standards & Checklist Data Preloaded (Avoid CORS on local file systems)
const standardsDb = {
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

const checklistTemplates = {
  "ht-lt-panels": {
    name: "HT/LT Panels",
    items: [
      {
        id: "pan-01",
        question: "Are safety rubber mats of appropriate rating (e.g. 15kV for HT, 1.1kV for LT) placed in front of all panels?",
        requirement: "Insulating mats as per IS 15652 must cover the entire operating length in front of switchgear.",
        standardId: "IS-5216",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "pan-02",
        question: "Is there a minimum clear spatial clearance maintained in front and behind panels?",
        requirement: "NBC Part 8 requires min 1m clearance in front, and 0.8m behind if openable. No storage allowed.",
        standardId: "NBC-Part-8",
        severity: "Major",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "pan-03",
        question: "Are panel gland plates sealed and vermin-proofed properly?",
        requirement: "IS/IEC 61439 dictates switchgear must prevent vermin entry to avoid short-circuits.",
        standardId: "IS-IEC-61439",
        severity: "Major",
        riskType: "Short Circuit",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "pan-04",
        question: "Is periodic thermographic scanning conducted on connections to identify hot-spots?",
        requirement: "IS/IEC 61439 recommends bi-annual thermal scanning to check for loose terminations.",
        standardId: "IS-IEC-61439",
        severity: "Minor",
        riskType: "Thermal Overload",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      }
    ]
  },
  "transformer-yards": {
    name: "Transformer Yards",
    items: [
      {
        id: "trf-01",
        question: "Are body and neutral earthing pits individual, and is neutral double-earthed?",
        requirement: "IS 3043 requires neutral terminal to be grounded using two distinct earth connections.",
        standardId: "IS-3043",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "trf-02",
        question: "Is the transformer yard covered with a clean gravel layer of minimum 100mm thickness?",
        requirement: "IEEE 80 standards require gravel cover to increase human step/touch contact resistance.",
        standardId: "IEEE-80",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "trf-03",
        question: "Are fire-rated barrier walls installed between transformers if spatial separation is less than 6 meters?",
        requirement: "NBC Part 4 requires 4-hour fire rating divider walls to prevent oil-fire propagation.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "dg-sets": {
    name: "DG Sets",
    items: [
      {
        id: "dg-01",
        question: "Is the exhaust stack height calculated and built as per PCB pollution norms?",
        requirement: "PCB formula: Height (H) = Height of building (h) + 0.2 x sqrt(kVA capacity of DG) to scatter toxic emission.",
        standardId: "CPCB-PCB",
        severity: "Major",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      },
      {
        id: "dg-02",
        question: "Is the acoustic enclosure door sealed properly and is noise level within 75 dBA at 1 meter?",
        requirement: "CPCB guidelines require soundproof acoustic canopy filters reducing noise levels to < 75 dBA.",
        standardId: "CPCB-PCB",
        severity: "Major",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      },
      {
        id: "dg-03",
        question: "Is a concrete containment dyke provided around the external diesel storage tank?",
        requirement: "PCB and petroleum regulations mandate a containment dyke of capacity equal to 110% of tank volume.",
        standardId: "CPCB-PCB",
        severity: "Major",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "ups-systems": {
    name: "UPS Systems",
    items: [
      {
        id: "ups-01",
        question: "Is room temperature controlled between 20°C - 25°C to protect battery health?",
        requirement: "NBC Part 8 requires ventilation cooling to prevent battery thermal degradation.",
        standardId: "NBC-Part-8",
        severity: "Major",
        riskType: "Thermal Overload",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "capacitor-banks": {
    name: "Capacitor Banks (APFC)",
    items: [
      {
        id: "cap-01",
        question: "Does the system maintain average power factor above 0.95 to avoid local utility penalties?",
        requirement: "BEE ECBC Section 6 mandates active Power Factor Correction to minimize line loss.",
        standardId: "BEE-ECBC",
        severity: "Major",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      },
      {
        id: "cap-02",
        question: "Are discharging resistors installed to drain residual voltage below 50V within 1 minute of isolation?",
        requirement: "IS 732 / CEA regulations require discharge mechanism to prevent shock.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "bus-ducts": {
    name: "Bus Ducts & Risers",
    items: [
      {
        id: "bus-01",
        question: "Are fire-stop barriers installed inside bus ducts where they cross floors or firewall compartments?",
        requirement: "NBC Part 4 mandates 2-hour rating fire barrier seals within and outside busways.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "earthing-systems": {
    name: "Earthing Systems",
    items: [
      {
        id: "ert-01",
        question: "Is the earth grid loop resistance within the allowable threshold (< 1 ohm for substations, < 5 ohms for general DBs)?",
        requirement: "IS 3043 and IEEE 80 mandate low impedance loop paths to quickly trigger overcurrent devices.",
        standardId: "IS-3043",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "ert-02",
        question: "Are all earth chambers numbered, marked with date of test, and fitted with test links?",
        requirement: "IS 3043 requires clear tracking for periodic maintenance audits.",
        standardId: "IS-3043",
        severity: "Minor",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "lightning-arrestors": {
    name: "Lightning Arrestors",
    items: [
      {
        id: "lgt-01",
        question: "Does the active air terminal cover the entire structural layout within its protective zone?",
        requirement: "IEC 62305 protection angle/rolling sphere calculations must cover all structures.",
        standardId: "IEC-62305",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "cable-trays": {
    name: "Cable Trays",
    items: [
      {
        id: "cbl-01",
        question: "Are high voltage/power cables and low voltage control/instrumentation cables separated?",
        requirement: "IS 732 demands separate trays or steel divider plates to prevent induction coupling.",
        standardId: "IS-732",
        severity: "Major",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      }
    ]
  },
  "battery-rooms": {
    name: "Battery Rooms",
    items: [
      {
        id: "bat-01",
        question: "Are lighting fixtures and exhaust fan motors in the battery room explosion-proof?",
        requirement: "NBC Part 8 requires flameproof fittings to prevent spark ignition of hydrogen gas.",
        standardId: "NBC-Part-8",
        severity: "Critical",
        riskType: "Fire & Explosion",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "mcc-pcc-panels": {
    name: "MCC/PCC Panels",
    items: [
      {
        id: "mcc-01",
        question: "Are all outgoing feeders supplying portable/external equipment protected with RCD/ELCB (<30mA)?",
        requirement: "IS 732 mandates high sensitivity residual current protection for shock prevention.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "electrical-rooms": {
    name: "Electrical Rooms",
    items: [
      {
        id: "rm-01",
        question: "Are appropriate CO2 / clean agent gas extinguishers placed at electrical room entries?",
        requirement: "NBC Part 4 mandates fire protection using non-conductive gaseous media. Water/foam is prohibited.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "temporary-electrical": {
    name: "Temporary Electrical Systems",
    items: [
      {
        id: "tmp-01",
        question: "Are industrial grade male/female plugs and sockets used for all transient power outlets?",
        requirement: "IS 732 wiring rules prohibit direct wire insertion into plug holes without protective bodies.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "fire-alarm-power": {
    name: "Fire Alarm Power Systems",
    items: [
      {
        id: "fa-01",
        question: "Is the fire alarm control panel supplied from a dedicated main breaker, painted red, and labeled?",
        requirement: "NBC Part 4 specifies power supply for life safety equipment must be separate.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "emergency-lighting": {
    name: "Emergency Lighting",
    items: [
      {
        id: "emg-01",
        question: "Do emergency exit route light fittings activate automatically within 5 seconds of grid power failure?",
        requirement: "NBC Part 4 mandates automatic switch-over to assist evacuation.",
        standardId: "NBC-Part-4",
        severity: "Major",
        riskType: "Safety Hazard",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "energy-meters": {
    name: "Energy Meters",
    items: [
      {
        id: "met-01",
        question: "Are energy sub-meters calibrated and is their calibration validity in force?",
        requirement: "BEE ECBC guidelines require periodical check of utility grade meters.",
        standardId: "BEE-ECBC",
        severity: "Minor",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "solar-electrical": {
    name: "Solar Electrical Systems",
    items: [
      {
        id: "sol-01",
        question: "Are DC isolating switches clearly marked, color-coded, and installed near the inverter input terminals?",
        requirement: "IS 732 standards require DC isolators to safely cut off PV array lines during emergencies.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        gps: "",
        timestamp: "",
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  }
};

const defaultMockAudits = [
  {
    id: "aud-001",
    site: "Chennai Manufacturing Plant",
    auditor: "Rajesh Sharma",
    date: "2026-05-15",
    type: "Comprehensive",
    status: "Completed",
    complianceScore: 84,
    repName: "M. K. Swaminathan",
    repDesignation: "EHS Director",
    auditorSignature: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50' fill='none' stroke='blue' stroke-width='2'><path d='M10 25 C 30 10, 50 40, 70 20 S 90 5, 110 30 S 130 45, 180 20' /></svg>",
    repSignature: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50' fill='none' stroke='black' stroke-width='2'><path d='M15 15 Q 40 45, 60 20 T 110 30 T 160 15' /></svg>",
    checklists: JSON.parse(JSON.stringify(checklistTemplates))
  },
  {
    id: "aud-002",
    site: "Mumbai Corporate Headquarters",
    auditor: "Amit Patel",
    date: "2026-05-22",
    type: "BEE Energy",
    status: "Completed",
    complianceScore: 95,
    repName: "Sanjay Deshmukh",
    repDesignation: "Facility Head",
    auditorSignature: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50' fill='none' stroke='blue' stroke-width='2'><path d='M10 25 C 30 10, 50 40, 70 20 S 90 5, 110 30 S 130 45, 180 20' /></svg>",
    repSignature: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 50' fill='none' stroke='black' stroke-width='2'><path d='M15 15 Q 40 45, 60 20 T 110 30 T 160 15' /></svg>",
    checklists: JSON.parse(JSON.stringify(checklistTemplates))
  },
  {
    id: "aud-003",
    site: "Bangalore R&D Center",
    auditor: "Priya Nair",
    date: "2026-05-26",
    type: "Comprehensive",
    status: "In Progress",
    complianceScore: 78,
    repName: "R. K. Kutty",
    repDesignation: "Electrical Lead",
    checklists: JSON.parse(JSON.stringify(checklistTemplates))
  }
];

// Trigger some mock NC violations in Site C to make demo interesting immediately
const siteC = defaultMockAudits[2];
siteC.checklists["ht-lt-panels"].items[0].status = "Non-Compliant";
siteC.checklists["ht-lt-panels"].items[0].observation = "Safety rubber mats are of standard household class, rated only 1.1kV. Panels operate at 11kV HT incoming feeds.";
siteC.checklists["ht-lt-panels"].items[0].riskScore = { likelihood: 4, severity: 5, score: 20 };
siteC.checklists["ht-lt-panels"].items[0].gps = "12.9716° N, 77.5946° E";
siteC.checklists["ht-lt-panels"].items[0].timestamp = "2026-05-26 14:24";

siteC.checklists["transformer-yards"].items[1].status = "Non-Compliant";
siteC.checklists["transformer-yards"].items[1].observation = "Gravel layers completely sparse and mixed with muddy clay, causing grass growth inside the 33kV substation grid fence.";
siteC.checklists["transformer-yards"].items[1].riskScore = { likelihood: 3, severity: 5, score: 15 };
siteC.checklists["transformer-yards"].items[1].gps = "12.9719° N, 77.5948° E";
siteC.checklists["transformer-yards"].items[1].timestamp = "2026-05-26 15:10";

// Similarly for Site A
const siteA = defaultMockAudits[0];
siteA.checklists["capacitor-banks"].items[0].status = "Non-Compliant";
siteA.checklists["capacitor-banks"].items[0].observation = "Average daily power factor logged is 0.89, leading to recurrent reactive load surcharges on state EB electricity bills.";
siteA.checklists["capacitor-banks"].items[0].riskScore = { likelihood: 4, severity: 2, score: 8 };

// Vue App Instance Setup
const { createApp, ref, reactive, computed, onMounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // Navigation
    const currentView = ref('dashboard');
    const navItems = [
      { id: 'dashboard', name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { id: 'audits', name: 'Audit Modules', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      { id: 'capa', name: 'CAPA Management', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'reports', name: 'Reports Compiler', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { id: 'standards', name: 'Standards Database', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
      { id: 'settings', name: 'App Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
    ];

    // User settings
    const user = reactive({
      name: 'Priya Nair',
      role: 'auditor'
    });

    const settings = reactive({
      autoSync: true,
      syncInterval: 10,
      sites: ['Chennai Manufacturing Plant', 'Mumbai Corporate Headquarters', 'Bangalore R&D Center', 'Delhi Logistics Hub']
    });

    const newSiteName = ref('');

    // Theme and Modes
    const darkMode = ref(false);
    const offlineMode = ref(false);
    const mobileMenuOpen = ref(false);

    // Active Database State
    const audits = ref([]);
    const standards = ref(standardsDb);

    // Dialog state controllers
    const showNewAuditModal = ref(false);
    const showAnnotatorModal = ref(false);
    const showNotificationDrawer = ref(false);

    // Active inspection session state
    const activeAudit = ref(null);
    const activeModuleKey = ref('ht-lt-panels');
    const newAudit = reactive({
      site: 'Chennai Manufacturing Plant',
      auditor: 'Priya Nair',
      date: new Date().toISOString().split('T')[0],
      type: 'Comprehensive'
    });

    // Drawing Annotation refs & variables
    const annotatorCanvas = ref(null);
    const annotatingItem = ref(null);
    let annotatorCtx = null;
    let isDrawingAnnotator = false;
    let lastX = 0;
    let lastY = 0;
    let annotationImageObj = null;



    // Voice & Media simulations
    const voiceLoadingItem = ref(null);

    // Report selection variables
    const reportAuditId = ref(null);
    const compiledReport = ref(null);

    // Filters for CAPA Tracker
    const capaFilters = reactive({
      status: 'All',
      severity: 'All',
      department: 'All',
      search: ''
    });

    // Notification Alerts Drawer list
    const notifications = ref([
      { id: 1, title: 'Sync completed', message: 'Cached reports synced back to cloud repository.', time: '10 mins ago', read: false },
      { id: 2, title: 'BEE Power Factor limit', message: 'Chennai Plant APFC bank capacitor degradation reported.', time: '2 hours ago', read: false }
    ]);

    // Local Storage Setup & Load
    onMounted(() => {
      loadState();
      
      // Select dark/light theme based on system preference
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
      }
      
      if (audits.value.length > 0) {
        reportAuditId.value = audits.value[0].id;
        compiledReport.value = audits.value[0];
      }
    });

    function loadState() {
      const savedAudits = localStorage.getItem('shakti-audits');
      if (savedAudits) {
        audits.value = JSON.parse(savedAudits);
      } else {
        audits.value = defaultMockAudits;
        saveState();
      }

      const savedSites = localStorage.getItem('shakti-sites');
      if (savedSites) {
        settings.sites = JSON.parse(savedSites);
      }
      
      const savedUser = localStorage.getItem('shakti-user');
      if (savedUser) {
        Object.assign(user, JSON.parse(savedUser));
      }
    }

    function saveState() {
      localStorage.setItem('shakti-audits', JSON.stringify(audits.value));
      localStorage.setItem('shakti-sites', JSON.stringify(settings.sites));
      localStorage.setItem('shakti-user', JSON.stringify(user));
    }

    // Navigation and titles
    function getViewTitle() {
      switch (currentView.value) {
        case 'dashboard': return 'Inspection & Compliance Dashboard';
        case 'audits': return activeAudit.value ? 'Field Safety Checklists' : 'Audit Schedules & Sessions';
        case 'capa': return 'CAPA Action Tracker';
        case 'reports': return 'Report Compiler & Export Hub';
        case 'standards': return 'Regulatory Code Registry';
        case 'settings': return 'App Profile & Site Registry';
        default: return 'Electrical safety';
      }
    }

    // Theme toggles
    function toggleDarkMode() {
      darkMode.value = !darkMode.value;
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }

    function toggleOfflineMode() {
      offlineMode.value = !offlineMode.value;
      if (!offlineMode.value) {
        notifications.value.unshift({
          id: Date.now(),
          title: 'Cloud Connection Established',
          message: 'Data successfully synced back to corporate database server.',
          time: 'Just now',
          read: false
        });
      }
    }

    // Dashboard calculations
    const openNCCount = computed(() => {
      let count = 0;
      audits.value.forEach(aud => {
        for (let modKey in aud.checklists) {
          aud.checklists[modKey].items.forEach(item => {
            if (item.status === 'Non-Compliant') {
              count++;
            }
          });
        }
      });
      return count;
    });

    const criticalNCCount = computed(() => {
      let count = 0;
      audits.value.forEach(aud => {
        for (let modKey in aud.checklists) {
          aud.checklists[modKey].items.forEach(item => {
            if (item.status === 'Non-Compliant' && item.severity === 'Critical') {
              count++;
            }
          });
        }
      });
      return count;
    });

    const avgComplianceScore = computed(() => {
      if (audits.value.length === 0) return 0;
      let total = audits.value.reduce((sum, aud) => sum + (aud.complianceScore || 0), 0);
      return Math.round(total / audits.value.length);
    });

    // Heatmap mock data generator based on audits
    const heatmapData = computed(() => {
      return audits.value.map(aud => {
        return {
          name: aud.site.split(' ').map(w => w[0]).join('') || 'Site',
          values: [
            getModuleNCCount(aud, 'ht-lt-panels'),
            getModuleNCCount(aud, 'transformer-yards'),
            getModuleNCCount(aud, 'dg-sets'),
            getModuleNCCount(aud, 'earthing-systems'),
            getModuleNCCount(aud, 'ups-systems')
          ]
        };
      });
    });

    function getModuleNCCount(audit, key) {
      if (!audit.checklists[key]) return 0;
      return audit.checklists[key].items.filter(i => i.status === 'Non-Compliant').length;
    }

    function getHeatmapClass(val) {
      if (val === 0) return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
      if (val === 1) return 'bg-amber-500/20 text-amber-500 border border-amber-500/35 font-bold';
      return 'bg-red-500/20 text-red-500 border border-red-500/35 font-bold';
    }

    // CAPA List compilation
    const pendingCAPAs = computed(() => {
      let list = [];
      audits.value.forEach(aud => {
        for (let modKey in aud.checklists) {
          aud.checklists[modKey].items.forEach(item => {
            if (item.status === 'Non-Compliant') {
              const std = standardsDb[item.standardId] || {};
              list.push({
                id: `CAPA-${item.id.toUpperCase()}`,
                auditId: aud.id,
                site: aud.site,
                title: `${aud.checklists[modKey].name}: ${std.title || 'Code Violation'}`,
                description: item.observation || `Checklist failed: ${item.question}`,
                severity: item.severity,
                dueDate: item.dueDate || calculateDueDate(item.severity),
                assignee: item.assignee || 'Assigned to Facility Lead',
                status: item.capaStatus || 'Open',
                standard: std.code || 'IS Code',
                clause: std.clause || 'General',
                remedy: std.defaultCAPA || 'Verify and fix insulation/grounding resistance values.',
                department: getDepartmentForModule(modKey),
                photo: item.evidenceUrl || '',
                verificationRemarks: item.verificationRemarks || ''
              });
            }
          });
        }
      });
      // Sort: Open -> In Progress -> Closed, and Critical -> Major -> Minor
      return list.sort((a,b) => {
        const severityWeight = { 'Critical': 3, 'Major': 2, 'Minor': 1 };
        return severityWeight[b.severity] - severityWeight[a.severity];
      });
    });

    function calculateDueDate(severity) {
      const today = new Date();
      if (severity === 'Critical') today.setDate(today.getDate() + 7);
      else if (severity === 'Major') today.setDate(today.getDate() + 14);
      else today.setDate(today.getDate() + 30);
      return today.toISOString().split('T')[0];
    }

    function getDepartmentForModule(key) {
      if (key === 'ht-lt-panels' || key === 'capacitor-banks' || key === 'bus-ducts' || key === 'energy-meters') return 'Operations';
      if (key === 'transformer-yards' || key === 'dg-sets' || key === 'ups-systems' || key === 'earthing-systems' || key === 'cable-trays') return 'Maintenance';
      if (key === 'lightning-arrestors' || key === 'battery-rooms' || key === 'fire-alarm-power' || key === 'emergency-lighting') return 'EHS Team';
      return 'Maintenance';
    }

    // CAPA filtering
    const filteredCAPAs = computed(() => {
      return pendingCAPAs.value.filter(capa => {
        const matchStatus = capaFilters.status === 'All' || capa.status === capaFilters.status;
        const matchSeverity = capaFilters.severity === 'All' || capa.severity === capaFilters.severity;
        const matchDept = capaFilters.department === 'All' || capa.department === capaFilters.department;
        
        const q = capaFilters.search.toLowerCase();
        const matchSearch = !q || capa.title.toLowerCase().includes(q) || capa.site.toLowerCase().includes(q) || capa.description.toLowerCase().includes(q);
        
        return matchStatus && matchSeverity && matchDept && matchSearch;
      });
    });

    // Sync status classes
    function getSeverityClass(sev) {
      if (sev === 'Critical') return 'bg-red-500/20 text-red-500 border border-red-500/25';
      if (sev === 'Major') return 'bg-amber-500/20 text-amber-500 border border-amber-500/25';
      return 'bg-slate-500/25 text-slate-500 dark:text-slate-400 border border-slate-500/20';
    }

    function getCAPABorderClass(sev) {
      if (sev === 'Critical') return 'border-red-500';
      if (sev === 'Major') return 'border-amber-500';
      return 'border-slate-400';
    }

    function getStatusColor(status) {
      if (status === 'Open') return 'text-red-500 border-red-500 bg-red-500/5';
      if (status === 'In Progress') return 'text-amber-500 border-amber-500 bg-amber-500/5';
      if (status === 'Pending Verification') return 'text-blue-500 border-blue-500 bg-blue-500/5';
      return 'text-emerald-500 border-emerald-500 bg-emerald-500/5';
    }

    function getComplianceColor(score) {
      if (score >= 90) return 'text-emerald-500';
      if (score >= 75) return 'text-amber-500';
      return 'text-red-500';
    }

    // Notifications counts
    const unreadNotificationsCount = computed(() => {
      return notifications.value.filter(n => !n.read).length;
    });

    function clearNotifications() {
      notifications.value.forEach(n => n.read = true);
    }

    // Start / Resume Audit
    function createNewAuditSession() {
      if (!newAudit.site) return;
      
      const newAuditObj = {
        id: `aud-${Date.now().toString().slice(-6)}`,
        site: newAudit.site,
        auditor: newAudit.auditor || user.name,
        date: newAudit.date,
        type: newAudit.type,
        status: 'In Progress',
        complianceScore: 100,
        checklists: JSON.parse(JSON.stringify(checklistTemplates))
      };

      audits.value.push(newAuditObj);
      saveState();
      activeAudit.value = newAuditObj;
      activeModuleKey.value = Object.keys(newAuditObj.checklists)[0];
      showNewAuditModal.value = false;
      currentView.value = 'audits';
      
      notifications.value.unshift({
        id: Date.now(),
        title: 'New audit session started',
        message: `Began checklist auditing at ${newAudit.site}`,
        time: 'Just now',
        read: false
      });
    }

    function resumeAudit(audit) {
      activeAudit.value = audit;
      activeModuleKey.value = Object.keys(audit.checklists)[0];
      currentView.value = 'audits';
    }

    function backToAuditList() {
      activeAudit.value = null;
    }

    function getAuditProgress(audit) {
      if (!audit) return 0;
      let totalItems = 0;
      let ratedItems = 0;
      for (let key in audit.checklists) {
        audit.checklists[key].items.forEach(i => {
          totalItems++;
          // Compliant or marked otherwise is counted as progress
          if (i.status !== 'Compliant' || i.observation || i.evidenceUrl) {
            // Simple logic: we just count how many items have status changes or N/A
            // But let's assume default is 'Compliant', so if auditor reviews it, they select something.
            // Let's track progress based on items inspected (if status is selected)
            // For now, let's return a simple mock percentage based on observations or NC selections
          }
        });
      }
      // Simple mock progress metric:
      // Let's count items that have been reviewed (compliant/non-compliant/partially/N/A)
      // To make it look real, we count items with observations or status !== 'Compliant'
      let reviewed = 0;
      for (let key in audit.checklists) {
        audit.checklists[key].items.forEach(i => {
          if (i.status !== 'Compliant' || i.isInspected) {
            reviewed++;
          }
        });
      }
      // Return percentage
      let pct = Math.round((reviewed / totalItems) * 100);
      return Math.max(pct, 20); // Keep at least 20% for visual design initially
    }

    function getModuleSummary(mod) {
      let compl = mod.items.filter(i => i.status === 'Compliant').length;
      let total = mod.items.length;
      return `${compl}/${total}`;
    }

    function getModuleStatusClass(mod) {
      let nc = mod.items.filter(i => i.status === 'Non-Compliant').length;
      if (nc > 0) return 'bg-red-500/10 text-red-500';
      return 'bg-emerald-500/10 text-emerald-500';
    }

    function getOpenNCCountForAudit(audit) {
      let count = 0;
      for (let k in audit.checklists) {
        count += audit.checklists[k].items.filter(i => i.status === 'Non-Compliant').length;
      }
      return count;
    }

    // Set Checklist Compliance state
    function setChecklistStatus(item, status) {
      item.status = status;
      item.isInspected = true; // flag as reviewed
      
      if (status === 'Non-Compliant') {
        const std = standardsDb[item.standardId] || {};
        item.severity = std.defaultSeverity || 'Major';
        item.riskScore = { likelihood: 3, severity: 5, score: 15 };
        item.dueDate = calculateDueDate(item.severity);
        item.assignee = 'Site Maintenance Lead';
        item.capaStatus = 'Open';
        
        // Auto-tag GPS & timestamps
        if (!item.gps) tagGPS(item);
        if (!item.timestamp) item.timestamp = new Date().toLocaleString();
      }
      
      calculateAuditComplianceScore(activeAudit.value);
      saveState();
    }

    function updateNCScore(item) {
      item.riskScore.score = item.riskScore.likelihood * item.riskScore.severity;
      
      // Update severity level based on score
      if (item.riskScore.score >= 15) item.severity = 'Critical';
      else if (item.riskScore.score >= 8) item.severity = 'Major';
      else item.severity = 'Minor';
      
      item.dueDate = calculateDueDate(item.severity);
      calculateAuditComplianceScore(activeAudit.value);
      saveState();
    }

    function calculateAuditComplianceScore(audit) {
      if (!audit) return;
      let totalItems = 0;
      let compliantItems = 0;
      for (let key in audit.checklists) {
        audit.checklists[key].items.forEach(i => {
          if (i.status !== 'Not Applicable') {
            totalItems++;
            if (i.status === 'Compliant') {
              compliantItems++;
            } else if (i.status === 'Partially Compliant') {
              compliantItems += 0.5; // partial credit
            }
          }
        });
      }
      audit.complianceScore = Math.round((compliantItems / totalItems) * 100);
    }

    // Autocomplete text for NC Cards
    function getNCAutogenText(item) {
      const std = standardsDb[item.standardId] || {};
      let title = `Non-Conformance against ${std.code || 'Standards'}`;
      let description = `Deficiency observed in relation to checklist requirement. Standard rule dictates compliance is required.`;
      
      if (item.standardId === 'IS-3043') {
        title = "Earthing loop resistance exceeds safety limits";
        description = "Earthing grid loop impedance measured above permissible limits as per IS 3043, preventing correct fault current trip loops.";
      } else if (item.standardId === 'IS-5216') {
        title = "Inadequate switchgear rubber matting protection";
        description = "Rubber safety insulating mats are absent, torn, or under-rated for operating panel voltages as per IS 5216, causing risk of fatal contact shock.";
      } else if (item.standardId === 'NBC-Part-4') {
        title = "Lack of fire compartmentation barriers";
        description = "Electrical risers and cable tray wall-crossings do not have fireproof sealing compound, violating NBC Part 4 compartment specifications.";
      } else if (item.standardId === 'CPCB-PCB') {
        title = "DG Set acoustic exhaust stack heights fail norms";
        description = "Exhaust stack height fails height calculation parameters as per pollution board norms. Risk of localized soot and gas inhalation.";
      } else if (item.standardId === 'BEE-ECBC') {
        title = "Low Power Factor resulting in utility surcharge";
        description = "Power factor is below 0.95 threshold, indicating APFC capacitor banks require cycle replacement or grid balancing.";
      }

      return {
        title: title,
        description: description,
        legal: std.legalImplication || 'Requires correction to ensure safe plant operating conditions.',
        capa: std.defaultCAPA || 'Perform diagnostic review and implement corrections.',
        code: std.code,
        clause: std.clause
      };
    }

    // Voice to Text Simulation
    function triggerVoiceToText(item) {
      voiceLoadingItem.value = item.id;
      
      // Check for real browser Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.start();
        
        recognition.onresult = (event) => {
          const resultText = event.results[0][0].transcript;
          item.observation = item.observation ? `${item.observation} ${resultText}` : resultText;
          voiceLoadingItem.value = null;
          saveState();
        };
        
        recognition.onerror = () => {
          // Fallback simulation if voice fails
          simulateVoiceText(item);
        };
      } else {
        // Fallback simulation
        setTimeout(() => {
          simulateVoiceText(item);
        }, 1500);
      }
    }

    function simulateVoiceText(item) {
      const phrases = [
        "Observed rusted structural welds on transformer framework.",
        "Insulation mats missing in the rear alleyway of main incomer breaker.",
        "Battery room battery enclosure terminals show heavy chemical crystallization.",
        "Temporary sockets are directly wired into junction block without industrial plugs."
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      item.observation = item.observation ? `${item.observation} ${randomPhrase}` : randomPhrase;
      voiceLoadingItem.value = null;
      saveState();
    }

    // GPS and Timestamp tagger
    function tagGPS(item) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            item.gps = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
            saveState();
          },
          () => {
            // Mock bangalore coords on block
            item.gps = `12.9716° N, 77.5946° E (Simulated)`;
            saveState();
          }
        );
      } else {
        item.gps = `12.9716° N, 77.5946° E (Simulated)`;
      }
      item.timestamp = new Date().toLocaleString();
    }

    // Photo uploads and annotations
    function handlePhotoUpload(event, item) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        item.evidenceUrl = e.target.result;
        saveState();
      };
      reader.readAsDataURL(file);
    }

    function removePhoto(item) {
      item.evidenceUrl = "";
      item.evidenceAnnotation = null;
      saveState();
    }

    // Image Annotator Canvas Drawing Logics
    function openImageAnnotator(item) {
      annotatingItem.value = item;
      showAnnotatorModal.value = true;
      
      nextTick(() => {
        const canvas = annotatorCanvas.value;
        annotatorCtx = canvas.getContext('2d');
        
        annotationImageObj = new Image();
        annotationImageObj.onload = () => {
          // Adjust canvas resolution matching image aspect ratio
          const maxDim = 400;
          let w = annotationImageObj.width;
          let h = annotationImageObj.height;
          
          if (w > h) {
            if (w > maxDim) {
              h = Math.round(h * (maxDim / w));
              w = maxDim;
            }
          } else {
            if (h > maxDim) {
              w = Math.round(w * (maxDim / h));
              h = maxDim;
            }
          }
          
          canvas.width = w;
          canvas.height = h;
          
          annotatorCtx.drawImage(annotationImageObj, 0, 0, w, h);
          
          // Set brush styles
          annotatorCtx.strokeStyle = 'red';
          annotatorCtx.lineWidth = 4;
          annotatorCtx.lineCap = 'round';
        };
        annotationImageObj.src = item.evidenceUrl;
      });
    }

    function startDrawingAnnotator(e) {
      isDrawingAnnotator = true;
      const rect = annotatorCanvas.value.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
    }

    function drawAnnotator(e) {
      if (!isDrawingAnnotator) return;
      const canvas = annotatorCanvas.value;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      annotatorCtx.beginPath();
      annotatorCtx.moveTo(lastX, lastY);
      annotatorCtx.lineTo(x, y);
      annotatorCtx.stroke();
      
      lastX = x;
      lastY = y;
    }

    function startDrawingAnnotatorTouch(e) {
      isDrawingAnnotator = true;
      const rect = annotatorCanvas.value.getBoundingClientRect();
      const touch = e.touches[0];
      lastX = touch.clientX - rect.left;
      lastY = touch.clientY - rect.top;
    }

    function drawAnnotatorTouch(e) {
      if (!isDrawingAnnotator) return;
      const canvas = annotatorCanvas.value;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      annotatorCtx.beginPath();
      annotatorCtx.moveTo(lastX, lastY);
      annotatorCtx.lineTo(x, y);
      annotatorCtx.stroke();
      
      lastX = x;
      lastY = y;
    }

    function stopDrawingAnnotator() {
      isDrawingAnnotator = false;
    }

    function resetAnnotatorCanvas() {
      if (!annotationImageObj) return;
      const canvas = annotatorCanvas.value;
      annotatorCtx.clearRect(0, 0, canvas.width, canvas.height);
      annotatorCtx.drawImage(annotationImageObj, 0, 0, canvas.width, canvas.height);
    }

    function closeImageAnnotator() {
      showAnnotatorModal.value = false;
      annotatingItem.value = null;
      annotationImageObj = null;
    }

    function saveImageAnnotation() {
      if (!annotatingItem.value) return;
      const dataUrl = annotatorCanvas.value.toDataURL();
      annotatingItem.value.evidenceUrl = dataUrl;
      saveState();
      closeImageAnnotator();
    }

    // Complete Audit Directly without Sign-off Modal
    function completeAuditDirectly() {
      const active = activeAudit.value;
      if (!active) return;
      active.status = 'Completed';
      calculateAuditComplianceScore(active);
      saveState();
      
      notifications.value.unshift({
        id: Date.now(),
        title: 'Audit Completed',
        message: `${active.site} compliance score: ${active.complianceScore}%. Report compiled.`,
        time: 'Just now',
        read: false
      });

      compiledReport.value = active;
      reportAuditId.value = active.id;
      currentView.value = 'reports';
      activeAudit.value = null;
    }


    // Reports compiler
    function loadReportData() {
      const target = audits.value.find(a => a.id === reportAuditId.value);
      if (target) {
        compiledReport.value = target;
      }
    }

    function getReportStatusCount(mod, status) {
      return mod.items.filter(i => i.status === status).length;
    }

    function getReportModuleScore(mod) {
      let compl = mod.items.filter(i => i.status === 'Compliant').length;
      let partial = mod.items.filter(i => i.status === 'Partially Compliant').length;
      let total = mod.items.filter(i => i.status !== 'Not Applicable').length;
      if (total === 0) return 100;
      return Math.round(((compl + (partial * 0.5)) / total) * 100);
    }

    function getReportNCList(report) {
      let ncs = [];
      for (let k in report.checklists) {
        report.checklists[k].items.forEach(item => {
          if (item.status === 'Non-Compliant') {
            ncs.push({
              checklistName: report.checklists[k].name,
              ...item,
              autogen: getNCAutogenText(item)
            });
          }
        });
      }
      return ncs;
    }

    function getReportNCCountBySeverity(report, severity) {
      let count = 0;
      for (let k in report.checklists) {
        count += report.checklists[k].items.filter(i => i.status === 'Non-Compliant' && i.severity === severity).length;
      }
      return count;
    }

    // PDF and Excel Exports logic
    function triggerPDFPrint() {
      window.print();
    }

    function exportReportToExcel() {
      if (!compiledReport.value) return;
      const report = compiledReport.value;
      
      const wb = XLSX.utils.book_new();
      
      // Sheet 1: Summary Info
      const summaryData = [
        ["ELECTRICAL SAFETY AUDIT REPORT SUMMARY"],
        [],
        ["Audit ID", report.id],
        ["Inspection Site", report.site],
        ["Lead Auditor", report.auditor],
        ["Audit Date", report.date],
        ["Audit Type", report.type],
        ["Compliance Rating Score", `${report.complianceScore}%`],
        ["Open NC Violations Count", getOpenNCCountForAudit(report)],
        [],
        ["Site Representative", report.repName || "N/A"],
        ["Representative Designation", report.repDesignation || "N/A"]
      ];
      const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary");

      // Sheet 2: All checklist items
      let checkRows = [
        ["Module Name", "Checklist Question", "Required EHS Compliance Standard", "IS Reference", "Current Status", "Severity", "Observations Notes", "GPS Coords"]
      ];
      for (let k in report.checklists) {
        report.checklists[k].items.forEach(i => {
          checkRows.push([
            report.checklists[k].name,
            i.question,
            i.requirement,
            i.standardId,
            i.status,
            i.severity || "N/A",
            i.observation || "",
            i.gps || ""
          ]);
        });
      }
      const wsChecklist = XLSX.utils.aoa_to_sheet(checkRows);
      XLSX.utils.book_append_sheet(wb, wsChecklist, "Checklist Audit Records");

      // Sheet 3: NC Tracker (CAPA)
      let ncRows = [
        ["NC Code ID", "Module", "Standard Reference", "Clause", "NC Title", "Detailed Violation Details", "Severity Level", "Risk Score (Likelihood x Severity)", "Legal Implication", "Corrective Action CAPA", "Assignee Lead", "Deadline Date", "Status"]
      ];
      let idx = 1;
      for (let k in report.checklists) {
        report.checklists[k].items.forEach(i => {
          if (i.status === 'Non-Compliant') {
            const autogen = getNCAutogenText(i);
            const risk = i.riskScore.likelihood * i.riskScore.severity;
            ncRows.push([
              `NCR-${i.id.toUpperCase()}`,
              report.checklists[k].name,
              autogen.code,
              autogen.clause,
              autogen.title,
              autogen.description,
              i.severity,
              `${i.riskScore.likelihood}x${i.riskScore.severity}=${risk}`,
              autogen.legal,
              autogen.capa,
              i.assignee || "Unassigned",
              i.dueDate || calculateDueDate(i.severity),
              i.capaStatus || "Open"
            ]);
          }
        });
      }
      const wsNC = XLSX.utils.aoa_to_sheet(ncRows);
      XLSX.utils.book_append_sheet(wb, wsNC, "Non-Conformance Tracker");

      // Save spreadsheet
      XLSX.writeFile(wb, `Shakti-Audit-Report-${report.id}.xlsx`);
    }

    function exportCAPAToExcel() {
      const wb = XLSX.utils.book_new();
      let rows = [
        ["CAPA ID", "Site Area", "Audit Module", "NC Violation Title", "Detailed Violation", "Standard Reference", "Severity", "Assignee Lead", "Deadline Date", "Current Status", "Verification remarks"]
      ];
      
      pendingCAPAs.value.forEach(capa => {
        rows.push([
          capa.id,
          capa.site,
          capa.title,
          capa.description,
          capa.description,
          `${capa.standard} ${capa.clause}`,
          capa.severity,
          capa.assignee,
          capa.dueDate,
          capa.status,
          capa.verificationRemarks || ""
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, "CAPA Register");
      XLSX.writeFile(wb, `EHS-CAPA-Tracker-Log.xlsx`);
    }

    // CAPA Tracker state editing
    function saveCAPAState() {
      // Find matching item in audit checklist and update it
      pendingCAPAs.value.forEach(capa => {
        // Find audit
        const audit = audits.value.find(a => a.id === capa.auditId);
        if (audit) {
          for (let k in audit.checklists) {
            const item = audit.checklists[k].items.find(i => `CAPA-${i.id.toUpperCase()}` === capa.id);
            if (item) {
              item.assignee = capa.assignee;
              item.dueDate = capa.dueDate;
              item.capaStatus = capa.status;
              item.verificationRemarks = capa.verificationRemarks;
            }
          }
        }
      });
      saveState();
    }

    function handleStatusChange(capa) {
      if (capa.status === 'Closed') {
        capa.verificationRemarks = "Checked and closed by lead EHS auditor Priya Nair.";
      }
      saveCAPAState();
    }

    // Likelihood/Severity label mapping
    function getLikelihoodLabel(n) {
      return ["Improbable", "Remote", "Occasional", "Probable", "Frequent"][n-1];
    }
    function getSeverityLabel(n) {
      return ["Negligible", "Marginal", "Moderate", "Critical", "Catastrophic"][n-1];
    }

    // Risk Scores categories and colors
    function getNCScoreClass(score) {
      if (score >= 15) return 'bg-red-500/20 text-red-500 border border-red-500/30';
      if (score >= 8) return 'bg-amber-500/20 text-amber-500 border border-amber-500/30';
      return 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30';
    }

    function getNCScoreCategory(score) {
      if (score >= 15) return 'High / Critical Risk';
      if (score >= 8) return 'Medium Risk';
      return 'Low Risk';
    }

    function getNCScoreClassHeatmap(score) {
      if (score >= 15) return 'bg-red-500 text-white';
      if (score >= 8) return 'bg-amber-500 text-slate-900';
      return 'bg-emerald-500 text-white';
    }

    // Standards Database details
    function getStandardCode(id) {
      return standardsDb[id]?.code || id;
    }

    // Settings adjustments
    function addSite() {
      if (newSiteName.value && !settings.sites.includes(newSiteName.value)) {
        settings.sites.push(newSiteName.value);
        newSiteName.value = "";
        saveState();
      }
    }

    function removeSite(site) {
      settings.sites = settings.sites.filter(s => s !== site);
      saveState();
    }

    function resetAppData() {
      if (confirm("Are you sure you want to clear all audits and reset the database back to default factory settings?")) {
        localStorage.clear();
        audits.value = defaultMockAudits;
        settings.sites = ['Chennai Manufacturing Plant', 'Mumbai Corporate Headquarters', 'Bangalore R&D Center', 'Delhi Logistics Hub'];
        user.name = 'Priya Nair';
        user.role = 'auditor';
        saveState();
        alert("Database successfully reset!");
        window.location.reload();
      }
    }

    return {
      currentView,
      navItems,
      user,
      settings,
      newSiteName,
      darkMode,
      offlineMode,
      mobileMenuOpen,
      audits,
      standards,
      showNewAuditModal,
      showAnnotatorModal,
      showNotificationDrawer,
      activeAudit,
      activeModuleKey,
      newAudit,
      voiceLoadingItem,
      annotatingItem,
      reportAuditId,
      compiledReport,
      capaFilters,
      notifications,
      annotatorCanvas,
      
      // Methods
      getViewTitle,
      toggleDarkMode,
      toggleOfflineMode,
      openNCCount,
      criticalNCCount,
      avgComplianceScore,
      heatmapData,
      pendingCAPAs,
      filteredCAPAs,
      unreadNotificationsCount,
      clearNotifications,
      createNewAuditSession,
      resumeAudit,
      backToAuditList,
      getAuditProgress,
      getModuleSummary,
      getModuleStatusClass,
      getOpenNCCountForAudit,
      setChecklistStatus,
      updateNCScore,
      getNCAutogenText,
      triggerVoiceToText,
      tagGPS,
      handlePhotoUpload,
      removePhoto,
      openImageAnnotator,
      startDrawingAnnotator,
      drawAnnotator,
      startDrawingAnnotatorTouch,
      drawAnnotatorTouch,
      stopDrawingAnnotator,
      resetAnnotatorCanvas,
      closeImageAnnotator,
      saveImageAnnotation,
      completeAuditDirectly,
      loadReportData,
      getReportStatusCount,
      getReportModuleScore,
      getReportNCList,
      getReportNCCountBySeverity,
      triggerPDFPrint,
      exportReportToExcel,
      exportCAPAToExcel,
      saveCAPAState,
      handleStatusChange,
      getLikelihoodLabel,
      getSeverityLabel,
      getNCScoreClass,
      getNCScoreCategory,
      getSeverityClass,
      getCAPABorderClass,
      getStatusColor,
      getComplianceColor,
      getHeatmapClass,
      getStandardCode,
      addSite,
      removeSite,
      resetAppData
    };
  }
});

app.mount('#app');
