export interface CityLocation {
  name: string;
  slug: string;
  districtName: string;
  districtSlug: string;
  stateName: string;
  stateSlug: string;
  pincode: string;
  lat: number;
  lng: number;
  populationCovered: string;
  activeNgosCount: number;
  communityKitchensCount: number;
  mealsDistributedMonth: number;
  emergencyHelpline: string;
  disasterZoneTier: "Tier 1" | "Tier 2" | "Tier 3";
  surplusHotspots: string[];
  lgdCode?: string;
  mpiScore?: number;
  priorityTier?: "Tier A" | "Tier B" | "Tier C" | "Tier D";
}

export interface DistrictLocation {
  name: string;
  slug: string;
  stateName: string;
  stateSlug: string;
  headquarters: string;
  cities: CityLocation[];
}

export interface StateLocation {
  name: string;
  slug: string;
  code: string;
  districts: DistrictLocation[];
}

export const INDIAN_STATES: StateLocation[] = [
  {
    name: "West Bengal",
    slug: "west-bengal",
    code: "WB",
    districts: [
      {
        name: "North 24 Parganas",
        slug: "north-24-parganas",
        stateName: "West Bengal",
        stateSlug: "west-bengal",
        headquarters: "Barasat",
        cities: [
          {
            name: "Barrackpore",
            slug: "barrackpore",
            districtName: "North 24 Parganas",
            districtSlug: "north-24-parganas",
            stateName: "West Bengal",
            stateSlug: "west-bengal",
            pincode: "700120",
            lat: 22.7667,
            lng: 88.3667,
            populationCovered: "152,000",
            activeNgosCount: 14,
            communityKitchensCount: 6,
            mealsDistributedMonth: 28400,
            emergencyHelpline: "033-2592-0123",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["Barrackpore Station Road", "Orderly Bazar", "Titagarh Mill Gate", "Palta Junction"],
          },
          {
            name: "Barasat",
            slug: "barasat",
            districtName: "North 24 Parganas",
            districtSlug: "north-24-parganas",
            stateName: "West Bengal",
            stateSlug: "west-bengal",
            pincode: "700124",
            lat: 22.7233,
            lng: 88.4822,
            populationCovered: "278,000",
            activeNgosCount: 18,
            communityKitchensCount: 9,
            mealsDistributedMonth: 42100,
            emergencyHelpline: "033-2552-3211",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["Champadali More", "Barasat Colony More", "Dakbanglow More"],
          },
        ],
      },
      {
        name: "Kolkata",
        slug: "kolkata",
        stateName: "West Bengal",
        stateSlug: "west-bengal",
        headquarters: "Kolkata",
        cities: [
          {
            name: "Kolkata Central",
            slug: "kolkata-central",
            districtName: "Kolkata",
            districtSlug: "kolkata",
            stateName: "West Bengal",
            stateSlug: "west-bengal",
            pincode: "700001",
            lat: 22.5726,
            lng: 88.3639,
            populationCovered: "4,500,000",
            activeNgosCount: 78,
            communityKitchensCount: 32,
            mealsDistributedMonth: 184000,
            emergencyHelpline: "033-2214-5555",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["Park Street Dining Sector", "Burrabazar Grain Hub", "Sealdah Terminal", "Howrah Approaches"],
          },
          {
            name: "Salt Lake",
            slug: "salt-lake",
            districtName: "Kolkata",
            districtSlug: "kolkata",
            stateName: "West Bengal",
            stateSlug: "west-bengal",
            pincode: "700091",
            lat: 22.5800,
            lng: 88.4200,
            populationCovered: "320,000",
            activeNgosCount: 22,
            communityKitchensCount: 8,
            mealsDistributedMonth: 39500,
            emergencyHelpline: "033-2334-1234",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["Sector V IT Park Cafeterias", "City Centre 1", "Karunamoyee Bus Terminus"],
          },
        ],
      },
    ],
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    code: "MH",
    districts: [
      {
        name: "Mumbai Suburban",
        slug: "mumbai-suburban",
        stateName: "Maharashtra",
        stateSlug: "maharashtra",
        headquarters: "Bandra",
        cities: [
          {
            name: "Bandra",
            slug: "bandra",
            districtName: "Mumbai Suburban",
            districtSlug: "mumbai-suburban",
            stateName: "Maharashtra",
            stateSlug: "maharashtra",
            pincode: "400050",
            lat: 19.0596,
            lng: 72.8295,
            populationCovered: "350,000",
            activeNgosCount: 35,
            communityKitchensCount: 14,
            mealsDistributedMonth: 89000,
            emergencyHelpline: "022-2642-1234",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["BKC Corporate Towers", "Bandra Hill Road", "Pali Hill Hospitality Hub"],
          },
          {
            name: "Andheri",
            slug: "andheri",
            districtName: "Mumbai Suburban",
            districtSlug: "mumbai-suburban",
            stateName: "Maharashtra",
            stateSlug: "maharashtra",
            pincode: "400053",
            lat: 19.1136,
            lng: 72.8697,
            populationCovered: "820,000",
            activeNgosCount: 42,
            communityKitchensCount: 19,
            mealsDistributedMonth: 112000,
            emergencyHelpline: "022-2683-5678",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["MIDC Industrial Canteens", "Andheri West Banquets", "Chakala Metro"],
          },
        ],
      },
    ],
  },
  {
    name: "Delhi NCT",
    slug: "delhi",
    code: "DL",
    districts: [
      {
        name: "Central Delhi",
        slug: "central-delhi",
        stateName: "Delhi NCT",
        stateSlug: "delhi",
        headquarters: "Daryaganj",
        cities: [
          {
            name: "Connaught Place",
            slug: "connaught-place",
            districtName: "Central Delhi",
            districtSlug: "central-delhi",
            stateName: "Delhi NCT",
            stateSlug: "delhi",
            pincode: "110001",
            lat: 28.6315,
            lng: 77.2167,
            populationCovered: "190,000",
            activeNgosCount: 29,
            communityKitchensCount: 11,
            mealsDistributedMonth: 64000,
            emergencyHelpline: "011-2334-9999",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["Inner Circle Restaurants", "Barakhamba Commercial Zone", "Janpath Corridor"],
          },
        ],
      },
    ],
  },
  {
    name: "Karnataka",
    slug: "karnataka",
    code: "KA",
    districts: [
      {
        name: "Bengaluru Urban",
        slug: "bengaluru-urban",
        stateName: "Karnataka",
        stateSlug: "karnataka",
        headquarters: "Bengaluru",
        cities: [
          {
            name: "Indiranagar",
            slug: "indiranagar",
            districtName: "Bengaluru Urban",
            districtSlug: "bengaluru-urban",
            stateName: "Karnataka",
            stateSlug: "karnataka",
            pincode: "560038",
            lat: 12.9784,
            lng: 77.6408,
            populationCovered: "210,000",
            activeNgosCount: 26,
            communityKitchensCount: 10,
            mealsDistributedMonth: 58000,
            emergencyHelpline: "080-2222-1188",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["100 Feet Road Food Corridors", "Defence Colony Banquets", "CMH Road"],
          },
        ],
      },
    ],
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    code: "TN",
    districts: [
      {
        name: "Chennai",
        slug: "chennai",
        stateName: "Tamil Nadu",
        stateSlug: "tamil-nadu",
        headquarters: "Chennai",
        cities: [
          {
            name: "Chennai Central",
            slug: "chennai-central",
            districtName: "Chennai",
            districtSlug: "chennai",
            stateName: "Tamil Nadu",
            stateSlug: "tamil-nadu",
            pincode: "600001",
            lat: 13.0827,
            lng: 80.2707,
            populationCovered: "4,680,000",
            activeNgosCount: 52,
            communityKitchensCount: 24,
            mealsDistributedMonth: 142000,
            emergencyHelpline: "044-2561-9206",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["T. Nagar Commercial Retail", "Anna Nagar Banquet Clusters", "OMR IT Express Corridors"],
            lgdCode: "571",
            mpiScore: 0.021,
            priorityTier: "Tier A",
          },
        ],
      },
    ],
  },
  {
    name: "Gujarat",
    slug: "gujarat",
    code: "GJ",
    districts: [
      {
        name: "Ahmedabad",
        slug: "ahmedabad",
        stateName: "Gujarat",
        stateSlug: "gujarat",
        headquarters: "Ahmedabad",
        cities: [
          {
            name: "Navrangpura",
            slug: "navrangpura",
            districtName: "Ahmedabad",
            districtSlug: "ahmedabad",
            stateName: "Gujarat",
            stateSlug: "gujarat",
            pincode: "380009",
            lat: 23.0365,
            lng: 72.5611,
            populationCovered: "5,570,000",
            activeNgosCount: 38,
            communityKitchensCount: 16,
            mealsDistributedMonth: 98000,
            emergencyHelpline: "079-2755-1122",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["SG Highway Event Lawns", "Prahlad Nagar Corporate Hub", "Manek Chowk Food Plaza"],
            lgdCode: "441",
            mpiScore: 0.048,
            priorityTier: "Tier B",
          },
        ],
      },
    ],
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    code: "UP",
    districts: [
      {
        name: "Lucknow",
        slug: "lucknow",
        stateName: "Uttar Pradesh",
        stateSlug: "uttar-pradesh",
        headquarters: "Lucknow",
        cities: [
          {
            name: "Hazratganj",
            slug: "hazratganj",
            districtName: "Lucknow",
            districtSlug: "lucknow",
            stateName: "Uttar Pradesh",
            stateSlug: "uttar-pradesh",
            pincode: "226001",
            lat: 26.8467,
            lng: 80.9462,
            populationCovered: "2,815,000",
            activeNgosCount: 34,
            communityKitchensCount: 14,
            mealsDistributedMonth: 76000,
            emergencyHelpline: "0522-2615-190",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["Gomti Nagar Hospitality Sector", "Alambagh Bus Terminal", "Charbagh Railway Hub"],
            lgdCode: "157",
            mpiScore: 0.089,
            priorityTier: "Tier B",
          },
        ],
      },
    ],
  },
  {
    name: "Bihar",
    slug: "bihar",
    code: "BR",
    districts: [
      {
        name: "Patna",
        slug: "patna",
        stateName: "Bihar",
        stateSlug: "bihar",
        headquarters: "Patna",
        cities: [
          {
            name: "Dak Bungalow",
            slug: "dak-bungalow",
            districtName: "Patna",
            districtSlug: "patna",
            stateName: "Bihar",
            stateSlug: "bihar",
            pincode: "800001",
            lat: 25.6093,
            lng: 85.1376,
            populationCovered: "2,046,000",
            activeNgosCount: 28,
            communityKitchensCount: 18,
            mealsDistributedMonth: 82000,
            emergencyHelpline: "0612-2219-565",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["Bailey Road Wedding Lawns", "Patna Junction Shelter Belt", "Kankarbagh Community Centers"],
            lgdCode: "216",
            mpiScore: 0.165,
            priorityTier: "Tier B",
          },
        ],
      },
    ],
  },
  {
    name: "Assam",
    slug: "assam",
    code: "AS",
    districts: [
      {
        name: "Kamrup Metropolitan",
        slug: "kamrup-metropolitan",
        stateName: "Assam",
        stateSlug: "assam",
        headquarters: "Guwahati",
        cities: [
          {
            name: "Guwahati",
            slug: "guwahati",
            districtName: "Kamrup Metropolitan",
            districtSlug: "kamrup-metropolitan",
            stateName: "Assam",
            stateSlug: "assam",
            pincode: "781001",
            lat: 26.1445,
            lng: 91.7362,
            populationCovered: "1,116,000",
            activeNgosCount: 21,
            communityKitchensCount: 9,
            mealsDistributedMonth: 48000,
            emergencyHelpline: "0361-2732-266",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["GS Road Banquet Strip", "Paltan Bazaar Transit Hub", "Dispur Secretariat Enclave"],
            lgdCode: "298",
            mpiScore: 0.098,
            priorityTier: "Tier B",
          },
        ],
      },
    ],
  },
  {
    name: "Kerala",
    slug: "kerala",
    code: "KL",
    districts: [
      {
        name: "Ernakulam",
        slug: "ernakulam",
        stateName: "Kerala",
        stateSlug: "kerala",
        headquarters: "Kochi",
        cities: [
          {
            name: "Kochi",
            slug: "kochi",
            districtName: "Ernakulam",
            districtSlug: "ernakulam",
            stateName: "Kerala",
            stateSlug: "kerala",
            pincode: "682001",
            lat: 9.9312,
            lng: 76.2673,
            populationCovered: "677,000",
            activeNgosCount: 31,
            communityKitchensCount: 12,
            mealsDistributedMonth: 61000,
            emergencyHelpline: "0484-2423-513",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["MG Road Marine Drive Food Arcades", "Kakkanad Infopark Food Courts", "Edappally Mall Hub"],
            lgdCode: "555",
            mpiScore: 0.005,
            priorityTier: "Tier C",
          },
        ],
      },
    ],
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    code: "MP",
    districts: [
      {
        name: "Indore",
        slug: "indore",
        stateName: "Madhya Pradesh",
        stateSlug: "madhya-pradesh",
        headquarters: "Indore",
        cities: [
          {
            name: "Vijay Nagar",
            slug: "vijay-nagar",
            districtName: "Indore",
            districtSlug: "indore",
            stateName: "Madhya Pradesh",
            stateSlug: "madhya-pradesh",
            pincode: "452010",
            lat: 22.7533,
            lng: 75.8937,
            populationCovered: "2,170,000",
            activeNgosCount: 36,
            communityKitchensCount: 15,
            mealsDistributedMonth: 88000,
            emergencyHelpline: "0731-2533-333",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["Chhappan Dukan Night Food Street", "Sarafa Bazaar Sweets Enclave", "AB Road Banquet Strip"],
            lgdCode: "418",
            mpiScore: 0.062,
            priorityTier: "Tier B",
          },
        ],
      },
    ],
  },
  {
    name: "Odisha",
    slug: "odisha",
    code: "OD",
    districts: [
      {
        name: "Khurda",
        slug: "khurda",
        stateName: "Odisha",
        stateSlug: "odisha",
        headquarters: "Bhubaneswar",
        cities: [
          {
            name: "Bhubaneswar",
            slug: "bhubaneswar",
            districtName: "Khurda",
            districtSlug: "khurda",
            stateName: "Odisha",
            stateSlug: "odisha",
            pincode: "751001",
            lat: 20.2961,
            lng: 85.8245,
            populationCovered: "885,000",
            activeNgosCount: 25,
            communityKitchensCount: 11,
            mealsDistributedMonth: 54000,
            emergencyHelpline: "0674-2430-038",
            disasterZoneTier: "Tier 1",
            surplusHotspots: ["Jayadev Vihar Commercial Zone", "Master Canteen Junction", "Patia Institutional Corridor"],
            lgdCode: "366",
            mpiScore: 0.082,
            priorityTier: "Tier C",
          },
        ],
      },
    ],
  },
  {
    name: "Punjab",
    slug: "punjab",
    code: "PB",
    districts: [
      {
        name: "SAS Nagar",
        slug: "sas-nagar",
        stateName: "Punjab",
        stateSlug: "punjab",
        headquarters: "Mohali",
        cities: [
          {
            name: "Chandigarh Region",
            slug: "chandigarh-region",
            districtName: "SAS Nagar",
            districtSlug: "sas-nagar",
            stateName: "Punjab",
            stateSlug: "punjab",
            pincode: "160017",
            lat: 30.7333,
            lng: 76.7794,
            populationCovered: "1,055,000",
            activeNgosCount: 29,
            communityKitchensCount: 17,
            mealsDistributedMonth: 79000,
            emergencyHelpline: "0172-2740-400",
            disasterZoneTier: "Tier 2",
            surplusHotspots: ["Sector 17 Commercial Plazas", "Zirakpur Wedding Belt", "Phase 7 Industrial Area"],
            lgdCode: "034",
            mpiScore: 0.035,
            priorityTier: "Tier C",
          },
        ],
      },
    ],
  },
];

export function getAllCities(): CityLocation[] {
  const all: CityLocation[] = [];
  for (const s of INDIAN_STATES) {
    for (const d of s.districts) {
      for (const c of d.cities) {
        all.push(c);
      }
    }
  }
  return all;
}

export function getCityBySlug(stateSlug: string, districtSlug: string, citySlug: string): CityLocation | undefined {
  const state = INDIAN_STATES.find((s) => s.slug === stateSlug);
  if (!state) return undefined;
  const district = state.districts.find((d) => d.slug === districtSlug);
  if (!district) return undefined;
  return district.cities.find((c) => c.slug === citySlug);
}

export function getStateBySlug(stateSlug: string): StateLocation | undefined {
  return INDIAN_STATES.find((s) => s.slug === stateSlug);
}
