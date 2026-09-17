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
