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
          "/enterprise/csr",
          "/enterprise/carbon-credits",
          "/donate-food/",
          "/assistance/",
          "/ngo-directory/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/*?*sort=",
          "/*?*filter=",
          "/*?*distance=",
        ],
      },
    ],
    sitemap: "https://donatefood.in/sitemap.xml",
    host: "https://donatefood.in",
  };
}
