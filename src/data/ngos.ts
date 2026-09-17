export type VerificationTier = 1 | 2 | 3 | 4 | 5;

export interface NGOProfile {
  id: string;
  name: string;
  darpanId: string; // NITI Aayog Darpan Unique ID
  panNumber: string;
  stateSlug: string;
  districtSlug: string;
  citySlug: string;
  cityName: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  tier: VerificationTier;
  tierLabel: "Unverified" | "Claimed" | "Document-Verified" | "Partner" | "Trusted/Active";
  taxExemption12A80G: boolean;
  fcraRegistered: boolean;
  fssaiLicenseNo: string;
  coldChainCapable: boolean;
  acceptedFoodTypes: ("Cooked Meals" | "Raw Grain/Ration" | "Packaged Foods" | "Perishable Produce" | "Bakery Items")[];
  storageCapacityKg: number;
  activeVehicles: number;
  avgResponseTimeMin: number;
  mealsRescuedTotal: number;
  rating: number;
  establishedYear: number;
  operatingHours: string;
  emergencyResponseCapable: boolean;
  recentInspections: {
    date: string;
    passed: boolean;
    inspector: string;
  }[];
}

export const VERIFIED_NGOS: NGOProfile[] = [
  {
    id: "ngo-wb-001",
    name: "Bengal Annapurna Food Rescue & Relief",
    darpanId: "WB/2019/0248819",
    panNumber: "AAATB1948C",
    stateSlug: "west-bengal",
    districtSlug: "north-24-parganas",
    citySlug: "barrackpore",
    cityName: "Barrackpore",
    address: "42 Riverside Road, Near Cantonment Gate, Barrackpore, WB 700120",
    phone: "+91 98301 24890",
    email: "dispatch@annapurnarescue.org.in",
    website: "https://annapurnarescue.org.in",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-21522045000189",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Packaged Foods", "Perishable Produce"],
    storageCapacityKg: 2500,
    activeVehicles: 4,
    avgResponseTimeMin: 32,
    mealsRescuedTotal: 342000,
    rating: 4.9,
    establishedYear: 2017,
    operatingHours: "07:00 AM - 11:30 PM (24x7 for emergencies)",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-08-12", passed: true, inspector: "FSSAI Food Safety Officer Kolkata Zone" },
    ],
  },
  {
    id: "ngo-wb-002",
    name: "North 24 Parganas Community Kitchen Alliance",
    darpanId: "WB/2021/0319401",
    panNumber: "AABCK4012D",
    stateSlug: "west-bengal",
    districtSlug: "north-24-parganas",
    citySlug: "barrackpore",
    cityName: "Barrackpore",
    address: "18 Ghoshpara Road, Titagarh / Barrackpore border, WB 700120",
    phone: "+91 94330 91823",
    email: "kitchens@n24pcommunity.org",
    website: "https://n24pcommunity.org",
    tier: 4,
    tierLabel: "Partner",
    taxExemption12A80G: true,
    fcraRegistered: false,
    fssaiLicenseNo: "FSSAI-21523091000412",
    coldChainCapable: false,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Bakery Items"],
    storageCapacityKg: 1200,
    activeVehicles: 2,
    avgResponseTimeMin: 45,
    mealsRescuedTotal: 184500,
    rating: 4.7,
    establishedYear: 2021,
    operatingHours: "08:00 AM - 10:00 PM",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-07-05", passed: true, inspector: "District Health & Sanitation Officer" },
    ],
  },
  {
    id: "ngo-wb-003",
    name: "Barasat Janakalyan Food Bank",
    darpanId: "WB/2018/0199432",
    panNumber: "AAATJ9941K",
    stateSlug: "west-bengal",
    districtSlug: "north-24-parganas",
    citySlug: "barasat",
    cityName: "Barasat",
    address: "88 Jessore Road, Near Duckbanglow More, Barasat, WB 700124",
    phone: "+91 98311 55670",
    email: "info@barasatfoodbank.org",
    website: "https://barasatfoodbank.org",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-21521011000874",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Perishable Produce"],
    storageCapacityKg: 3000,
    activeVehicles: 5,
    avgResponseTimeMin: 28,
    mealsRescuedTotal: 410000,
    rating: 4.9,
    establishedYear: 2018,
    operatingHours: "07:00 AM - Midnight",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-09-01", passed: true, inspector: "FSSAI State Enforcement Wing" },
    ],
  },
  {
    id: "ngo-wb-004",
    name: "Kolkata Hunger Relief Society",
    darpanId: "WB/2016/0112440",
    panNumber: "AACTK1124M",
    stateSlug: "west-bengal",
    districtSlug: "kolkata",
    citySlug: "kolkata-central",
    cityName: "Kolkata Central",
    address: "12 Park Street, Camac Street Junction, Kolkata, WB 700016",
    phone: "+91 98300 11990",
    email: "desk@kolkatahungerrelief.org",
    website: "https://kolkatahungerrelief.org",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-21519001000321",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Packaged Foods", "Perishable Produce", "Bakery Items"],
    storageCapacityKg: 6500,
    activeVehicles: 9,
    avgResponseTimeMin: 25,
    mealsRescuedTotal: 1250000,
    rating: 5.0,
    establishedYear: 2016,
    operatingHours: "24 Hours Service",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-08-20", passed: true, inspector: "Central Food Safety Audit Group" },
    ],
  },
  {
    id: "ngo-mh-001",
    name: "Mumbai Roti & Grain Foundation",
    darpanId: "MH/2017/0187421",
    panNumber: "AAATM1874N",
    stateSlug: "maharashtra",
    districtSlug: "mumbai-suburban",
    citySlug: "bandra",
    cityName: "Bandra",
    address: "Station Road, Opp. Bandra Terminus Logistics Hub, Bandra East, Mumbai 400051",
    phone: "+91 98200 44551",
    email: "contact@mumbairotibank.in",
    website: "https://mumbairotibank.in",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-11518002000542",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Packaged Foods"],
    storageCapacityKg: 5000,
    activeVehicles: 8,
    avgResponseTimeMin: 22,
    mealsRescuedTotal: 980000,
    rating: 4.9,
    establishedYear: 2017,
    operatingHours: "06:30 AM - Midnight",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-07-19", passed: true, inspector: "FDA Maharashtra Surveillance" },
    ],
  },
  {
    id: "ngo-dl-001",
    name: "Delhi Sewa Food Mission",
    darpanId: "DL/2015/0098412",
    panNumber: "AAATD0984E",
    stateSlug: "delhi",
    districtSlug: "central-delhi",
    citySlug: "connaught-place",
    cityName: "Connaught Place",
    address: "KG Marg, Barakhamba Lane, Central Delhi 110001",
    phone: "+91 98110 33441",
    email: "rescue@delhisewafood.org",
    website: "https://delhisewafood.org",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-13317001000219",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Packaged Foods", "Bakery Items"],
    storageCapacityKg: 4200,
    activeVehicles: 6,
    avgResponseTimeMin: 24,
    mealsRescuedTotal: 870000,
    rating: 4.9,
    establishedYear: 2015,
    operatingHours: "06:00 AM - 11:00 PM",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-08-30", passed: true, inspector: "Department of Food Safety Govt of NCT Delhi" },
    ],
  },
  {
    id: "ngo-ka-001",
    name: "Bengaluru Annadana Network",
    darpanId: "KA/2018/0176433",
    panNumber: "AAATB1764P",
    stateSlug: "karnataka",
    districtSlug: "bengaluru-urban",
    citySlug: "indiranagar",
    cityName: "Indiranagar",
    address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
    phone: "+91 98450 77882",
    email: "dispatch@annadananetwork.org",
    website: "https://annadananetwork.org",
    tier: 5,
    tierLabel: "Trusted/Active",
    taxExemption12A80G: true,
    fcraRegistered: true,
    fssaiLicenseNo: "FSSAI-11219001000491",
    coldChainCapable: true,
    acceptedFoodTypes: ["Cooked Meals", "Raw Grain/Ration", "Packaged Foods", "Perishable Produce"],
    storageCapacityKg: 3800,
    activeVehicles: 6,
    avgResponseTimeMin: 26,
    mealsRescuedTotal: 690000,
    rating: 4.8,
    establishedYear: 2018,
    operatingHours: "07:00 AM - 11:00 PM",
    emergencyResponseCapable: true,
    recentInspections: [
      { date: "2026-09-03", passed: true, inspector: "FSSAI Regional Office South" },
    ],
  },
];

export function getNgosByCity(citySlug: string): NGOProfile[] {
  return VERIFIED_NGOS.filter((ngo) => ngo.citySlug === citySlug);
}

export function getNgoByDarpan(darpanId: string): NGOProfile | undefined {
  return VERIFIED_NGOS.find((ngo) => ngo.darpanId.toLowerCase() === darpanId.toLowerCase());
}

export function getAllNgos(): NGOProfile[] {
  return VERIFIED_NGOS;
}
