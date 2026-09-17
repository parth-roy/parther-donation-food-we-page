import { MetadataRoute } from "next";
import { getAllCities } from "@/data/geography";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://donatefood.in";
  const cities = getAllCities();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/assistance`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.95 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/ngo`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/emergency`, lastModified: new Date(), changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/logistics`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/enterprise/csr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/enterprise/carbon-credits`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  ];

  // Silo 1: Donor Intent routes
  const donorRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/donate-food/${city.stateSlug}/${city.districtSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Silo 2: Beneficiary Assistance routes
  const assistanceRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/assistance/${city.stateSlug}/${city.districtSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: 0.9,
  }));

  // Silo 3: Partner Directory routes
  const ngoRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${baseUrl}/ngo-directory/${city.stateSlug}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...donorRoutes, ...assistanceRoutes, ...ngoRoutes];
}
