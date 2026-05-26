// Audit Checklist Templates for 17 Electrical Modules
export const checklistTemplates = {
  "ht-lt-panels": {
    name: "HT/LT Panels",
    icon: "Sliders",
    items: [
      {
        id: "pan-01",
        question: "Are safety rubber mats of appropriate rating (e.g. 15kV for HT, 1.1kV for LT) placed in front of all panels?",
        requirement: "Insulating mats as per IS 15652 must cover the entire operating length in front of switchgear.",
        standardId: "IS-5216",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant", // Default state
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 } // Default low if compliant
      },
      {
        id: "pan-02",
        question: "Is there a minimum clear spatial clearance maintained in front and behind panels?",
        requirement: "NBC Part 8 requires min 1m clearance in front, and 0.8m behind if openable. No storage allowed.",
        standardId: "NBC-Part-8",
        severity: "Major",
        riskType: "Fire & Access Block",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "pan-03",
        question: "Are panel gland plates sealed and vermin-proofed properly?",
        requirement: "IS/IEC 61439 dictates switchgear must prevent vermin entry (using fire-retardant foam/compounds) to avoid short-circuits.",
        standardId: "IS-IEC-61439",
        severity: "Major",
        riskType: "Thermal Overload & Short Circuit",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "pan-04",
        question: "Is periodic thermographic (infrared) scanning conducted on connections to identify hot-spots?",
        requirement: "Preventive maintenance norms under IS/IEC 61439 recommend bi-annual thermal scanning to check for loose terminations.",
        standardId: "IS-IEC-61439",
        severity: "Minor",
        riskType: "Thermal Overload",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      }
    ]
  },
  "transformer-yards": {
    name: "Transformer Yards",
    icon: "Zap",
    items: [
      {
        id: "trf-01",
        question: "Are body and neutral earthing pits individual, and is neutral double-earthed?",
        requirement: "IS 3043 requires neutral terminal to be grounded using two distinct earth connections with copper conductor.",
        standardId: "IS-3043",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "trf-02",
        question: "Is the transformer yard covered with a clean gravel layer of minimum 100mm thickness?",
        requirement: "IEEE 80 standards require gravel cover to increase human step/touch contact resistance during line-to-ground faults.",
        standardId: "IEEE-80",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "trf-03",
        question: "Are fire-rated barrier walls installed between transformers if spatial separation is less than 6 meters?",
        requirement: "NBC Part 4 requires 4-hour fire rating divider walls to prevent oil-fire propagation to adjacent transformers.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "trf-04",
        question: "Are silica gel breathers active and is the gel colored blue (indicating dry condition)?",
        requirement: "BEE/NBC standards recommend regular check. Pink gel indicates moisture ingress, reducing dielectric strength of oil.",
        standardId: "BEE-ECBC",
        severity: "Major",
        riskType: "Thermal Overload & Explosion",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "dg-sets": {
    name: "DG Sets",
    icon: "ShieldAlert",
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
        evidenceAnnotation: null,
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
        evidenceAnnotation: null,
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
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "ups-systems": {
    name: "UPS Systems",
    icon: "BatteryCharging",
    items: [
      {
        id: "ups-01",
        question: "Is room temperature controlled between 20°C - 25°C to protect battery health and prevent runaway?",
        requirement: "NBC Part 8 and IEEE battery backup standard require ventilation cooling to prevent thermal degradation.",
        standardId: "NBC-Part-8",
        severity: "Major",
        riskType: "Thermal Overload",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "ups-02",
        question: "Are AC power cables and DC battery cables routed in separate channels or trays?",
        requirement: "IS 732 mandates separation of system cables to prevent electromagnetic interference and induction faults.",
        standardId: "IS-732",
        severity: "Minor",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "capacitor-banks": {
    name: "Capacitor Banks (APFC)",
    icon: "Percent",
    items: [
      {
        id: "cap-01",
        question: "Does the system maintain average power factor above 0.95 to avoid local utility penalties?",
        requirement: "BEE ECBC Section 6 mandates active Power Factor Correction to minimize distribution line loss.",
        standardId: "BEE-ECBC",
        severity: "Major",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      },
      {
        id: "cap-02",
        question: "Are discharging resistors installed and operating to drain residual voltage below 50V within 1 minute of isolation?",
        requirement: "IS 732 / CEA regulations require discharge mechanism to prevent shock to maintenance staff.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "bus-ducts": {
    name: "Bus Ducts & Risers",
    icon: "Layers",
    items: [
      {
        id: "bus-01",
        question: "Are fire-stop barriers installed inside bus ducts where they cross floors or firewall compartments?",
        requirement: "NBC Part 4 mandates 2-hour rating fire barrier seals within and outside busways at crossing junctions.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "bus-02",
        question: "Are periodic Insulation Resistance (IR) tests logged for the bus-duct conductors?",
        requirement: "IS 732 wiring code dictates yearly IR testing to verify aging bus ducts do not have phase-to-phase leakage.",
        standardId: "IS-732",
        severity: "Major",
        riskType: "Short Circuit",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "earthing-systems": {
    name: "Earthing Systems",
    icon: "Network",
    items: [
      {
        id: "ert-01",
        question: "Is the earth grid loop resistance within the allowable threshold (< 1 ohm for substations, < 5 ohms for general DBs)?",
        requirement: "IS 3043 and IEEE 80 mandate low impedance loop paths to quickly trigger overcurrent devices during faults.",
        standardId: "IS-3043",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "ert-02",
        question: "Are all earth chambers numbered, marked with date of test, and fitted with test links?",
        requirement: "IS 3043 requires clear tracking for periodic maintenance audits of soil resistance values.",
        standardId: "IS-3043",
        severity: "Minor",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      },
      {
        id: "ert-03",
        question: "Are earth flat/loop connections bolted with proper overlaps and painted to prevent galvanic corrosion?",
        requirement: "IS 3043 specifies guidelines for flat overlaps (minimum width of flat) and anti-corrosive painting of joints.",
        standardId: "IS-3043",
        severity: "Major",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "lightning-arrestors": {
    name: "Lightning Arrestors",
    icon: "CloudLightning",
    items: [
      {
        id: "lgt-01",
        question: "Does the active air terminal (ESE or conventional rod) cover the entire structural layout within its protective zone?",
        requirement: "IEC 62305 and IS/IEC 62305 protection angle/rolling sphere calculations must cover all structures.",
        standardId: "IEC-62305",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "lgt-02",
        question: "Is the down conductor isolated, ran straight without loops, and connected to an independent earth pit?",
        requirement: "IEC 62305 specifies down conductors must not have sharp bends to avoid flashovers due to high inductance.",
        standardId: "IEC-62305",
        severity: "Major",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "cable-trays": {
    name: "Cable Trays",
    icon: "Grid",
    items: [
      {
        id: "cbl-01",
        question: "Are high voltage/power cables and low voltage control/instrumentation cables separated by a barrier?",
        requirement: "IS 732 demands separate trays or steel divider plates to prevent induction coupling and voltage creep.",
        standardId: "IS-732",
        severity: "Major",
        riskType: "Energy Wastage",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 3, score: 3 }
      },
      {
        id: "cbl-02",
        question: "Are cable tray sections structurally continuous and electrically bonded across joints back to the earth loop?",
        requirement: "IS 3043 requires complete bonding of structural support items to avoid floating potential hazards under leakage.",
        standardId: "IS-3043",
        severity: "Major",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "battery-rooms": {
    name: "Battery Rooms",
    icon: "Battery",
    items: [
      {
        id: "bat-01",
        question: "Are lighting fixtures and exhaust fan motors in the battery room explosion-proof (flameproof Type d)?",
        requirement: "NBC Part 8 requires flameproof fittings to prevent spark ignition of explosive hydrogen gas during charging.",
        standardId: "NBC-Part-8",
        severity: "Critical",
        riskType: "Fire & Explosion",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "bat-02",
        question: "Is the battery room floor coated with acid-resistant tile grout or epoxy?",
        requirement: "NBC Part 8 prescribes acid protection measures to avoid concrete structural erosion in case of battery leak/spray.",
        standardId: "NBC-Part-8",
        severity: "Minor",
        riskType: "Safety Hazard",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "mcc-pcc-panels": {
    name: "MCC/PCC Panels",
    icon: "Cpu",
    items: [
      {
        id: "mcc-01",
        question: "Are all outgoing feeders supplying portable/external equipment protected with RCD/ELCB (<30mA)?",
        requirement: "IS 732 mandates high sensitivity residual current protection for shock prevention on contact surfaces.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "mcc-02",
        question: "Are single line diagrams (SLD) and safety instructions displayed near panels?",
        requirement: "IS 5216 safety rules require updated circuit blueprints to facilitate safe isolation by EHS operators.",
        standardId: "IS-5216",
        severity: "Minor",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "electrical-rooms": {
    name: "Electrical Rooms",
    icon: "Home",
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
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "rm-02",
        question: "Is there unauthorized entry restricted signage in local languages and English displayed on doors?",
        requirement: "IS 5216 mandates statutory danger boards for safety awareness of personnel.",
        standardId: "IS-5216",
        severity: "Minor",
        riskType: "Legal Non-Compliance",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "temporary-electrical": {
    name: "Temporary Electrical Systems",
    icon: "Hammer",
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
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "tmp-02",
        question: "Are temporary wiring routes free of open joints or simple PVC tape wraps?",
        requirement: "IS 732 requires heavy-duty rubber cables or armored cables without splicing joints for temporary services.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      }
    ]
  },
  "fire-alarm-power": {
    name: "Fire Alarm Power Systems",
    icon: "BellRing",
    items: [
      {
        id: "fa-01",
        question: "Is the fire alarm control panel supplied from a dedicated main breaker, painted red, and labeled?",
        requirement: "NBC Part 4 specifies power supply for life safety equipment must be separate and prominently identifiable.",
        standardId: "NBC-Part-4",
        severity: "Critical",
        riskType: "Fire Risk",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "fa-02",
        question: "Does the fire panel battery backup provide at least 24 hours of standby operation and 30 mins alarm load?",
        requirement: "NBC Part 4 requires continuous battery readiness to handle primary power failure states.",
        standardId: "NBC-Part-4",
        severity: "Major",
        riskType: "Fire & Power Loss",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "emergency-lighting": {
    name: "Emergency Lighting",
    icon: "Lightbulb",
    items: [
      {
        id: "emg-01",
        question: "Do emergency exit route light fittings activate automatically within 5 seconds of grid power failure?",
        requirement: "NBC Part 4 mandates automatic switch-over and illumination levels to assist safe building evacuation.",
        standardId: "NBC-Part-4",
        severity: "Major",
        riskType: "Safety Hazard & Panic",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      },
      {
        id: "emg-02",
        question: "Are green backlit 'EXIT' signs visible and positioned clearly at all partition doors?",
        requirement: "NBC Part 4 evacuation directives mandate continuous signage visibility along escape corridors.",
        standardId: "NBC-Part-4",
        severity: "Major",
        riskType: "Safety Hazard",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  },
  "energy-meters": {
    name: "Energy Meters",
    icon: "Activity",
    items: [
      {
        id: "met-01",
        question: "Are energy sub-meters calibrated and is their calibration validity in force?",
        requirement: "BEE ECBC guidelines require periodical check and calibration certification of utility grade meters.",
        standardId: "BEE-ECBC",
        severity: "Minor",
        riskType: "Energy Wastage & Billing",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 2, score: 2 }
      }
    ]
  },
  "solar-electrical": {
    name: "Solar Electrical Systems",
    icon: "Sun",
    items: [
      {
        id: "sol-01",
        question: "Are DC isolating switches clearly marked, color-coded, and installed near the inverter input terminals?",
        requirement: "IS 732 and CEA standards require DC isolators to safely cut off high voltage photovoltaic array lines during fires.",
        standardId: "IS-732",
        severity: "Critical",
        riskType: "Fire Risk & Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 5, score: 5 }
      },
      {
        id: "sol-02",
        question: "Are solar panel metal mounting structures connected directly to the earthing network?",
        requirement: "IS 3043 specifies frame grounding for lightning dissipation and shielding structural static voltages.",
        standardId: "IS-3043",
        severity: "Major",
        riskType: "Electrical Shock",
        status: "Compliant",
        observation: "",
        evidenceUrl: "",
        evidenceAnnotation: null,
        riskScore: { likelihood: 1, severity: 4, score: 4 }
      }
    ]
  }
};
