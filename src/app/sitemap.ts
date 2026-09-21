import { MetadataRoute } from "next";
import { getAllCities, INDIAN_STATES } from "@/data/geography";
import { getAllTierAAndBCities } from "@/utils/dynamicLocation";
import { VERIFIED_NGOS } from "@/data/ngos";
import { evaluatePseoGovernance } from "@/utils/governance";
import { ALL_NFHS5_DISTRICTS } from "@/data/nfhs5Data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://donatefood.in";
  const tierCities = getAllTierAAndBCities();
  const geoCities = getAllCities();

  // Deduplicated city list
  const seenCitySlugs = new Set<string>();
  const allTargetCities = [...geoCities, ...tierCities].filter((c) => {
    if (seenCitySlugs.has(c.slug)) return false;
    seenCitySlugs.add(c.slug);
    return true;
  });

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/assistance`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.95 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/volunteer/dashboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/action-hub`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/ngo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/emergency`, lastModified: new Date(), changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/logistics`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/locations`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/enterprise/csr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/enterprise/carbon-credits`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/enterprise/brsr-calculator`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.92 },
    { url: `${baseUrl}/compliance/fssai-schedule-1`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/reports/state-of-food-waste`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
  ];

  // State Aggregator Hubs
  const stateRoutes: MetadataRoute.Sitemap = INDIAN_STATES.flatMap((s) => [
    { url: `${baseUrl}/donate-food/${s.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.88 },
    { url: `${baseUrl}/assistance/${s.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.88 },
    { url: `${baseUrl}/ngo-directory/${s.slug}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.88 },
  ]);

  // PSEO Governance Filter: Only index cities that pass Page Quality Score threshold (PQS >= 90)
  const indexableCities = allTargetCities.filter((city) => {
    const gov = evaluatePseoGovernance({
      activeNgosCount: city.activeNgosCount,
      hasUniqueHumanitarianData: Boolean(city.surplusHotspots && city.surplusHotspots.length > 0),
      searchDemandVolume: 85,
      daysSinceLastUpdate: 2,
    });
    return gov.inSitemap;
  });

  // Pillar 2: NFHS-5 Nutrition & Health Hubs
  const nfhsRoutes: MetadataRoute.Sitemap = ALL_NFHS5_DISTRICTS.map((d) => ({
    url: `${baseUrl}/data/nutrition/${d.stateSlug}/${d.districtSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.91,
  }));

  // Pillar 3 & G: Event-based donation routes for top cities
  const eventTypes = ["birthday", "wedding", "anniversary"];
  const eventDonationRoutes: MetadataRoute.Sitemap = indexableCities.slice(0, 20).flatMap((city) =>
    eventTypes.map((evt) => ({
      url: `${baseUrl}/donate/${evt}/in/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88,
    }))
  );

  // Silo 1: Donor Intent routes
  const donorRoutes: MetadataRoute.Sitemap = indexableCities.map((city) => ({
    url: `${baseUrl}/donate-food/${city.stateSlug}/${city.districtSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Silo 2: Beneficiary Assistance routes
  const assistanceRoutes: MetadataRoute.Sitemap = indexableCities.map((city) => ({
    url: `${baseUrl}/assistance/${city.stateSlug}/${city.districtSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.9,
  }));

  // Silo 3: Partner Directory routes
  const ngoDirectoryRoutes: MetadataRoute.Sitemap = indexableCities.map((city) => ({
    url: `${baseUrl}/ngo-directory/${city.stateSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Silo 4: Volunteer & Fleet routes (4th Intent Hub)
  const volunteerRoutes: MetadataRoute.Sitemap = indexableCities.map((city) => ({
    url: `${baseUrl}/volunteer/${city.stateSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.82,
  }));

  // Canonical Individual Verified NGO Entity Profiles
  const individualNgoRoutes: MetadataRoute.Sitemap = VERIFIED_NGOS.map((ngo) => ({
    url: `${baseUrl}/ngo/${ngo.stateSlug}/${ngo.citySlug}/${ngo.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.92,
  }));

  return [
    ...coreRoutes,
    ...stateRoutes,
    ...nfhsRoutes,
    ...eventDonationRoutes,
    ...donorRoutes,
    ...assistanceRoutes,
    ...ngoDirectoryRoutes,
    ...volunteerRoutes,
    ...individualNgoRoutes,
  ];
}
