import React from "react";

interface JsonLdProps {
  type: "Organization" | "LocalCommunityHub" | "FoodBank" | "FAQPage" | "HowTo" | "Dataset";
  data: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  let schema: Record<string, unknown> = {};

  if (type === "Organization") {
    schema = {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "DonateFood.in",
      url: "https://donatefood.in",
      logo: "https://donatefood.in/logo.png",
      description:
        "India's National Digital Public Infrastructure (DPI) for algorithmic food rescue, NFHS-5 hunger metrics, and SEBI BRSR compliance.",
      nonprofitStatus: "Nonprofit501c3",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Republic of India",
      },
      knowsAbout: [
        "FSSAI Surplus Food Regulations 2019",
        "Dynamic Vehicle Routing Problem with Time Windows (DVRPTW)",
        "Schedule VII Companies Act CSR Compliance",
        "SEBI BRSR Scope 3 Emissions Reporting",
        "Verra VM0046 Methane Avoidance",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-1800-FOOD-RESCUE",
        contactType: "Emergency & Logistics Dispatch",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi"],
      },
      ...data,
    };
  } else if (type === "FoodBank") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FoodBank",
      name: data.name || "Community Food Bank & Kitchen",
      address: {
        "@type": "PostalAddress",
        streetAddress: data.streetAddress,
        addressLocality: data.city,
        addressRegion: data.state,
        postalCode: data.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.lat,
        longitude: data.lng,
      },
      openingHours: data.openingHours || "Mo-Su 08:00-22:00",
      isAccessibleForFree: true,
      publicAccess: true,
      ...data,
    };
  } else if (type === "LocalCommunityHub") {
    schema = {
      "@context": "https://schema.org",
      "@type": ["Place", "CivicStructure"],
      name: data.name || "Community Food Rescue Hub",
      address: {
        "@type": "PostalAddress",
        streetAddress: data.streetAddress,
        addressLocality: data.city,
        addressRegion: data.state,
        postalCode: data.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.lat,
        longitude: data.lng,
      },
      isAccessibleForFree: true,
      publicAccess: true,
      ...data,
    };
  } else if (type === "HowTo") {
    schema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: data.name || "How to Safely Donate Food under FSSAI 2019 Regulations",
      description: data.description,
      step: data.steps,
      ...data,
    };
  } else if (type === "FAQPage") {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs,
    };
  } else if (type === "Dataset") {
    schema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: data.name || "India Hyperlocal Surplus Food Diversion & Hunger Metrics",
      description:
        "Machine-readable operational ledger of organic food waste diverted and NFHS-5 district nutritional indicators in compliance with Verra VM0046.",
      license: "https://creativecommons.org/licenses/by/4.0/",
      spatialCoverage: "IN",
      variableMeasured: [
        "Kg Food Waste Diverted",
        "Equivalent Nutritious Meals Provided",
        "Methane Emissions Avoided (MT CH4)",
        "FSSAI Temperature Verification Compliance Rate",
        "NFHS-5 Child Stunting and Wasting Prevalence",
      ],
      ...data,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
