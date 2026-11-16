import { Shipment } from '../types/logistics';

export const SEED_SHIPMENTS: Shipment[] = [
  {
    id: "MFX-2026-BHW-08942",
    lrNumber: "LR-MH-98124",
    ewayBillNumber: "541098234190",
    status: "In Transit",
    priority: "Express",
    originHub: "Bhiwandi Central SuperHub",
    destinationHub: "Pune Chakan Auto Cluster Link",
    currentLocation: "Khalapur Toll Plaza, Mumbai-Pune Expressway",
    createdAt: "2026-11-15T08:30:00Z",
    estimatedDelivery: "2026-11-16T18:00:00Z",
    consignor: {
      companyName: "Mahindra Logistics Hub & Spares",
      contactPerson: "Rajesh S. Patil",
      phone: "+91 98201 44821",
      email: "rpatil@mahindraspares.example.com",
      address: "Godown No. 14, Mankoli Logistics Park, Mumbai-Nashik Road",
      city: "Bhiwandi, Thane",
      pincode: "421302",
      gstin: "27AABCM8291Q1ZP"
    },
    consignee: {
      companyName: "Bajaj Auto Stamping & Assembly Plant",
      contactPerson: "Suresh Deshmukh",
      phone: "+91 98450 11923",
      email: "sdeshmukh@bajajauto.example.com",
      address: "Plot B-12, MIDC Chakan Phase 2, Industrial Area",
      city: "Pune",
      pincode: "410501",
      gstin: "27AAACB2201P1ZS"
    },
    cargo: {
      items: [
        {
          id: "item-1",
          description: "Engine Gearbox Assemblies and Flange Castings",
          quantity: 24,
          packageType: "Wooden Crates",
          weightKg: 4800,
          declaredValueInr: 1850000
        },
        {
          id: "item-2",
          description: "Precision CNC Machined Shafts",
          quantity: 12,
          packageType: "Corrugated Boxes",
          weightKg: 1200,
          declaredValueInr: 620000
        }
      ],
      totalWeightKg: 6000,
      totalVolumeCft: 450,
      goodsType: "Automotive Precision Assemblies",
      specialHandlingNotes: "Keep dry. Fasten ratchet straps securely across pallet bases."
    },
    driver: {
      name: "Tukaram Shantaram More",
      phone: "+91 98692 33109",
      licenseNumber: "MH-04-2015-0081294",
      vehicleNumber: "MH-04-GP-8291",
      truckModel: "BharatBenz 2823C Heavy Hauler (6x4)",
      avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
    },
    checkpoints: [
      {
        id: "cp-1",
        name: "Bhiwandi Central SuperHub",
        location: "Godown Sector 4, Mankoli, Bhiwandi",
        timestamp: "2026-11-15T10:15:00Z",
        status: "completed",
        remarks: "Loaded, weighed on weighbridge, and sealed",
        lat: 19.2968,
        lng: 73.0631
      },
      {
        id: "cp-2",
        name: "Majiwada Junction Gateway",
        location: "Eastern Express Highway, Thane",
        timestamp: "2026-11-15T13:40:00Z",
        status: "completed",
        remarks: "Thane Toll cleared via Fastag",
        lat: 19.2183,
        lng: 72.9781
      },
      {
        id: "cp-3",
        name: "Khalapur Toll Plaza",
        location: "Mumbai-Pune Expressway (KM 32)",
        timestamp: "2026-11-16T09:15:00Z",
        status: "current",
        remarks: "Vehicle inspected at expressway safety bay. Transit smooth.",
        lat: 18.8252,
        lng: 73.2842
      },
      {
        id: "cp-4",
        name: "Talegaon Toll & Chakan Bypass",
        location: "Talegaon Dabhade Interchange",
        timestamp: "2026-11-16T14:30:00Z",
        status: "upcoming",
        remarks: "Expected arrival for unloading dock 3",
        lat: 18.7302,
        lng: 73.6766
      },
      {
        id: "cp-5",
        name: "Pune Chakan Destination Gate",
        location: "Bajaj Plant Gate 4B, Chakan MIDC",
        timestamp: "2026-11-16T18:00:00Z",
        status: "upcoming",
        remarks: "POD verification & security gate check-in",
        lat: 18.7606,
        lng: 73.8567
      }
    ],
    tollChargesEstimatedInr: 1450,
    freightAmountInr: 42500,
    gstAmountInr: 5100
  },

  // Edge Case: Very Long Names for Consignor & Consignee and Missing Driver Photo
  {
    id: "MFX-2026-JNP-04189",
    lrNumber: "LR-MH-94820",
    ewayBillNumber: "541098492019",
    status: "Delayed",
    priority: "Over-Dimensional (ODC)",
    originHub: "JNPT Port Container Terminal CFS",
    destinationHub: "Taloja MIDC Industrial Hub",
    currentLocation: "Uran Phata Toll Plaza, Navghar Bypass",
    createdAt: "2026-11-14T11:00:00Z",
    estimatedDelivery: "2026-11-15T16:00:00Z",
    consignor: {
      companyName: "Shri Siddhivinayak Over-Dimensional Heavy Engineering Fabricators & Infrastructure Consignment Transport Logistics Private Limited",
      contactPerson: "Dnyaneshwar Chandrakant Suryavanshi-Bhosale",
      phone: "+91 97680 91823",
      email: "logistics.compliance@shrisiddhivinayak-engineering-consortium.in",
      address: "CFS Yard 9B, Sector 11, Container Freight Station Complex, Dronagiri Node, Navi Mumbai",
      city: "Uran / Nhava Sheva",
      pincode: "400707",
      gstin: "27AAZCS9102L1ZQ"
    },
    consignee: {
      companyName: "Maharashtra State Electricity Transmission Corporation (MSETCL) Extra High Voltage Sub-Station Expansion Special Project Division III",
      contactPerson: "Executive Engineer Pramod Madhukar Kulkarni",
      phone: "+91 99204 88310",
      email: "ehv.substation.taloja@msetcl-projects.gov.in",
      address: "Plot 88-92, Block C, Taloja Heavy Industrial Corridor, Next to Deep Chemicals",
      city: "Taloja, Navi Mumbai",
      pincode: "410208",
      gstin: "27AAACM9981K1Z2"
    },
    cargo: {
      items: [
        {
          id: "item-3",
          description: "High-Capacity 220kV Step-Down Power Transformer Core with Custom Moisture-Proof Nitrogen Shielding Container",
          quantity: 1,
          packageType: "Steel Drums",
          weightKg: 28500,
          declaredValueInr: 8900000
        }
      ],
      totalWeightKg: 28500,
      totalVolumeCft: 1820,
      goodsType: "Super Heavy Electrical Transformer",
      specialHandlingNotes: "ODC cargo: Hydraulic multi-axle trailer speed limited to 25 km/h. Escort pilot vehicle required."
    },
    driver: {
      name: "Balwant Singh Grewal",
      phone: "+91 98112 09481",
      licenseNumber: "MH-06-2009-0019284",
      vehicleNumber: "MH-46-AR-4019",
      truckModel: "Tata Signa 4825.TK 16-Wheeler Multi-Axle",
      avatarUrl: undefined // EDGE CASE: Missing image
    },
    delayReason: "High container congestion at JNPT Port Gate 2 & slow escort clearance at Uran flyover roadworks.",
    checkpoints: [
      {
        id: "cp-11",
        name: "JNPT CFS Terminal",
        location: "Nhava Sheva CFS Yard Gate 2",
        timestamp: "2026-11-14T14:00:00Z",
        status: "completed",
        remarks: "Loaded via 50-tonne gantry crane",
        lat: 18.9511,
        lng: 72.9518
      },
      {
        id: "cp-12",
        name: "Uran Phata Toll Plaza",
        location: "State Highway 41, Uran Bypass",
        timestamp: "2026-11-15T09:00:00Z",
        status: "current",
        remarks: "Delayed due to police escort scheduling and bridge height verification",
        lat: 18.9042,
        lng: 73.0112
      },
      {
        id: "cp-13",
        name: "Taloja Industrial Gate",
        location: "Plot 88, Taloja MIDC",
        timestamp: "2026-11-16T18:00:00Z",
        status: "upcoming",
        remarks: "Crane standby ready for offloading",
        lat: 19.0881,
        lng: 73.1205
      }
    ],
    tollChargesEstimatedInr: 3200,
    freightAmountInr: 125000,
    gstAmountInr: 15000
  },

  // Delivered Shipment with Full Proof-of-Delivery (Signature & Stamped Photo)
  {
    id: "MFX-2026-VAS-03312",
    lrNumber: "LR-MH-81092",
    ewayBillNumber: "541098110943",
    status: "Delivered",
    priority: "Standard",
    originHub: "Vashi APMC Agro-Logistics Yard",
    destinationHub: "Andheri MIDC Distribution Hub",
    currentLocation: "Delivered at Consignee Premises (Andheri East)",
    createdAt: "2026-11-14T06:00:00Z",
    estimatedDelivery: "2026-11-14T15:00:00Z",
    actualDelivery: "2026-11-14T14:42:00Z",
    consignor: {
      companyName: "Maharashtra State Co-operative Agro Federation",
      contactPerson: "Vilas R. Shinde",
      phone: "+91 98220 54190",
      email: "apmc.sales@agrofed-maha.example.com",
      address: "Gala No. 45, Fruit & Grain Market-II, Sector 19, Vashi",
      city: "Navi Mumbai",
      pincode: "400703",
      gstin: "27AAAGM4491D1ZQ"
    },
    consignee: {
      companyName: "Nature's Basket Regional Fulfillment Center",
      contactPerson: "Ananya Mehta",
      phone: "+91 98199 00421",
      email: "inventory.andheri@naturesbasket.example.com",
      address: "Unit 3A, Akruti Trade Centre, Road No. 7, MIDC, Andheri East",
      city: "Mumbai",
      pincode: "400093",
      gstin: "27AAACN0021M1ZX"
    },
    cargo: {
      items: [
        {
          id: "item-4",
          description: "Fresh Alphonso Mango Pulp Drums (Aseptic Cans)",
          quantity: 120,
          packageType: "Steel Drums",
          weightKg: 3600,
          declaredValueInr: 720000
        }
      ],
      totalWeightKg: 3600,
      totalVolumeCft: 280,
      goodsType: "Packaged Agro Produce",
      specialHandlingNotes: "Food grade delivery. Maintain hygiene seal."
    },
    driver: {
      name: "Ramesh Narayan Sawant",
      phone: "+91 98205 77123",
      licenseNumber: "MH-01-2012-0091823",
      vehicleNumber: "MH-03-CP-9102",
      truckModel: "Ashok Leyland Ecomet 1215 High Deck",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    pod: {
      receivedBy: "Harishankar Tiwari (Receiving Store Manager)",
      relation: "Store Manager",
      signatureUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><path d='M10 40 Q 40 10, 80 40 T 150 20 T 190 35' fill='none' stroke='%230f172a' stroke-width='3'/></svg>",
      photoUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      deliveredAt: "2026-11-14T14:42:00Z",
      deliveryNotes: "All 120 drums verified intact without dent or leakage. Stamped LR handed to driver.",
      otpVerified: true,
      biltyStamped: true
    },
    checkpoints: [
      {
        id: "cp-21",
        name: "Vashi APMC Yard",
        location: "Turbhe APMC Gate 3, Navi Mumbai",
        timestamp: "2026-11-14T07:30:00Z",
        status: "completed",
        remarks: "Dispatched after quality cert sign-off",
        lat: 19.0688,
        lng: 73.0033
      },
      {
        id: "cp-22",
        name: "Vashi Creek Bridge Toll",
        location: "Sion-Panvel Expressway, Mankhurd",
        timestamp: "2026-11-14T09:15:00Z",
        status: "completed",
        remarks: "Crossed into Mumbai city limits",
        lat: 19.0435,
        lng: 72.9348
      },
      {
        id: "cp-23",
        name: "Andheri MIDC Gate",
        location: "Akruti Trade Centre, Andheri East",
        timestamp: "2026-11-14T14:42:00Z",
        status: "completed",
        remarks: "Delivered & POD digitally stamped",
        lat: 19.1197,
        lng: 72.8697
      }
    ],
    tollChargesEstimatedInr: 450,
    freightAmountInr: 18500,
    gstAmountInr: 2220
  },

  // Out for Delivery Shipment
  {
    id: "MFX-2026-THN-07102",
    lrNumber: "LR-MH-76291",
    ewayBillNumber: "541098661902",
    status: "Out for Delivery",
    priority: "Express",
    originHub: "Bhiwandi Central SuperHub",
    destinationHub: "Thane Industrial Hub",
    currentLocation: "Wagle Industrial Estate, Road No. 16, Thane West",
    createdAt: "2026-11-16T05:30:00Z",
    estimatedDelivery: "2026-11-16T16:00:00Z",
    consignor: {
      companyName: "Siemens Healthcare Diagnostics India",
      contactPerson: "Dr. Sandeep Nadkarni",
      phone: "+91 98200 48291",
      email: "logistics.diagnostics@siemens.example.com",
      address: "Warehouse Block C, Kalher Logistics Hub",
      city: "Bhiwandi, Thane",
      pincode: "421302",
      gstin: "27AAACS1190K1ZW"
    },
    consignee: {
      companyName: "Jupiter Super Speciality Hospital Central Stores",
      contactPerson: "Sister Philomena DSouza",
      phone: "+91 98203 11840",
      email: "centralpharmacy@jupiterhospital.example.com",
      address: "Eastern Express Highway, Service Road, Next to Viviana Mall",
      city: "Thane West",
      pincode: "400601",
      gstin: "27AAACJ8821F1ZT"
    },
    cargo: {
      items: [
        {
          id: "item-5",
          description: "Immunoassay Reagent Kits (Cold Chain 2-8°C)",
          quantity: 18,
          packageType: "Corrugated Boxes",
          weightKg: 350,
          declaredValueInr: 1450000
        }
      ],
      totalWeightKg: 350,
      totalVolumeCft: 40,
      goodsType: "Medical Diagnostics Cold Chain",
      specialHandlingNotes: "URGENT HOSPITAL SUPPLY: Temperature datalogger attached. Deliver directly to cold room."
    },
    driver: {
      name: "Ganpat Raghunath Jadhav",
      phone: "+91 97691 00293",
      licenseNumber: "MH-04-2016-0044129",
      vehicleNumber: "MH-04-ED-4109",
      truckModel: "Mahindra Bolero Maxi Truck Plus (Reefer Box)",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    checkpoints: [
      {
        id: "cp-31",
        name: "Kalher Logistics Hub",
        location: "Bhiwandi-Thane Road",
        timestamp: "2026-11-16T07:00:00Z",
        status: "completed",
        remarks: "Loaded with temp datalogger at 4.2°C",
        lat: 19.2612,
        lng: 73.0112
      },
      {
        id: "cp-32",
        name: "Majiwada Gateway",
        location: "Ghodbunder Road Junction",
        timestamp: "2026-11-16T10:30:00Z",
        status: "completed",
        remarks: "Clear traffic",
        lat: 19.2183,
        lng: 72.9781
      },
      {
        id: "cp-33",
        name: "Wagle Estate Approach",
        location: "Road No. 16, Thane West",
        timestamp: "2026-11-16T13:45:00Z",
        status: "current",
        remarks: "Van 1.5 km away from hospital receiving bay",
        lat: 19.1982,
        lng: 72.9541
      }
    ],
    tollChargesEstimatedInr: 120,
    freightAmountInr: 8500,
    gstAmountInr: 1020
  },

  // Inwarded at Hub Shipment
  {
    id: "MFX-2026-TAL-01923",
    lrNumber: "LR-MH-60912",
    ewayBillNumber: "541098991209",
    status: "Inwarded at Hub",
    priority: "Standard",
    originHub: "Taloja MIDC Industrial Hub",
    destinationHub: "JNPT Port Container Terminal CFS",
    currentLocation: "Taloja Central Loading Bay 4",
    createdAt: "2026-11-16T11:00:00Z",
    estimatedDelivery: "2026-11-17T12:00:00Z",
    consignor: {
      companyName: "Deepak Fertilisers and Petrochemicals Corp Ltd",
      contactPerson: "Nilesh G. Kadam",
      phone: "+91 98211 90812",
      email: "dispatch.taloja@deepakfertilisers.example.com",
      address: "Plot K-1 to K-8, MIDC Industrial Area",
      city: "Taloja, Raigad",
      pincode: "410208",
      gstin: "27AAACD1198H1ZS"
    },
    consignee: {
      companyName: "Maersk Container Logistics CFS Hub",
      contactPerson: "Capt. Arzan Khambatta",
      phone: "+91 98202 88419",
      email: "jnpt.exportyard@maersk.example.com",
      address: "CFS Yard 4, Dronagiri Node, Nhava Sheva",
      city: "Uran",
      pincode: "400707",
      gstin: "27AAACM4490B1ZY"
    },
    cargo: {
      items: [
        {
          id: "item-6",
          description: "Technical Grade Ammonium Nitrate Emulsion Pellets",
          quantity: 200,
          packageType: "Pallets",
          weightKg: 10000,
          declaredValueInr: 2100000
        }
      ],
      totalWeightKg: 10000,
      totalVolumeCft: 650,
      goodsType: "Industrial Chemicals (Non-Hazardous Blend)",
      specialHandlingNotes: "Ensure moisture seal, weighbridge slip verified."
    },
    driver: {
      name: "Hanif Mohammed Sheikh",
      phone: "+91 98920 18273",
      licenseNumber: "MH-43-2017-0091283",
      vehicleNumber: "MH-43-BP-7744",
      truckModel: "Eicher Pro 3015 Container Carrier",
      avatarUrl: undefined // EDGE CASE: Missing image
    },
    checkpoints: [
      {
        id: "cp-41",
        name: "Taloja MIDC Yard",
        location: "Plot K-1 Bay 4",
        timestamp: "2026-11-16T11:30:00Z",
        status: "current",
        remarks: "Consignment inwarded, barcodes scanned, awaiting container slot clearance",
        lat: 19.0881,
        lng: 73.1205
      }
    ],
    tollChargesEstimatedInr: 350,
    freightAmountInr: 26000,
    gstAmountInr: 3120
  },

  // Booked Shipment (Newly created, awaiting pickup)
  {
    id: "MFX-2026-AND-05519",
    lrNumber: "LR-MH-55219",
    ewayBillNumber: "541098877119",
    status: "Booked",
    priority: "Express",
    originHub: "Andheri MIDC Distribution Hub",
    destinationHub: "Bhiwandi Central SuperHub",
    currentLocation: "Shipper Warehouse, MIDC Marol, Andheri East",
    createdAt: "2026-11-16T13:15:00Z",
    estimatedDelivery: "2026-11-17T09:00:00Z",
    consignor: {
      companyName: "Godrej Appliances Consumer Distribution",
      contactPerson: "Kavita S. Salunke",
      phone: "+91 98204 99012",
      email: "dispatch.mumbai@godrejappliances.example.com",
      address: "Plant 11, Gate 3, Pirojshanagar, Vikhroli / Andheri Link",
      city: "Mumbai",
      pincode: "400079",
      gstin: "27AAACG0012A1Z1"
    },
    consignee: {
      companyName: "Amazon India Fulfillment Center (BOM5)",
      contactPerson: "Vikram Singhania",
      phone: "+91 98451 09871",
      email: "inward-bom5@amazonlogistics.example.com",
      address: "K Square Industrial Logistics Park, Kurund Village, Bhiwandi",
      city: "Bhiwandi",
      pincode: "421101",
      gstin: "27AACAA4419E1ZP"
    },
    cargo: {
      items: [
        {
          id: "item-7",
          description: "Smart Inverter Refrigerators & Microwave Units",
          quantity: 40,
          packageType: "Corrugated Boxes",
          weightKg: 2800,
          declaredValueInr: 1240000
        }
      ],
      totalWeightKg: 2800,
      totalVolumeCft: 520,
      goodsType: "Consumer Electronics",
      specialHandlingNotes: "Fragile glass doors. Do not clamp top."
    },
    driver: {
      name: "Sanjay Baban Gaikwad",
      phone: "+91 98670 44319",
      licenseNumber: "MH-02-2018-0012481",
      vehicleNumber: "MH-02-ER-3829",
      truckModel: "Tata Ultra T.7 Medium Commercial Vehicle",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    },
    checkpoints: [
      {
        id: "cp-51",
        name: "Godrej Vikhroli Plant",
        location: "Gate 3, Pirojshanagar",
        timestamp: "2026-11-16T13:15:00Z",
        status: "current",
        remarks: "Consignment note generated. Truck assigned for dock inward.",
        lat: 19.1021,
        lng: 72.9298
      }
    ],
    tollChargesEstimatedInr: 280,
    freightAmountInr: 16500,
    gstAmountInr: 1980
  }
];

export const MUMBAI_HUBS = [
  "Bhiwandi Central SuperHub",
  "JNPT Port Container Terminal CFS",
  "Vashi APMC Agro-Logistics Yard",
  "Taloja MIDC Industrial Hub",
  "Andheri MIDC Distribution Hub",
  "Pune Chakan Auto Cluster Link",
  "Thane Industrial Hub"
];
