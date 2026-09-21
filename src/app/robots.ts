import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/donate",
          "/assistance",
          "/volunteer",
          "/ngo",
          "/emergency",
          "/logistics",
          "/locations",
          "/action-hub",
          "/enterprise/csr",
          "/enterprise/carbon-credits",
          "/enterprise/brsr-calculator",
          "/compliance/fssai-schedule-1",
          "/reports/state-of-food-waste",
          "/donate-food/",
          "/assistance/",
          "/ngo-directory/",
          "/data/nutrition/",
          "/donate/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/*?*sort=",
          "/*?*filter=",
          "/*?*distance=",
          "/*?*search=",
          "/*?*q=",
          "/*?*page=",
          "/*?*lat=",
          "/*?*lng=",
        ],
      },
    ],
    sitemap: "https://donatefood.in/sitemap.xml",
    host: "https://donatefood.in",
  };
}
