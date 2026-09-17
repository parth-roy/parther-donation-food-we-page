export interface FSSAIGuideline {
  id: string;
  title: string;
  clause: string;
  description: string;
  mandatoryForFBO: boolean;
}

export const FSSAI_SURPLUS_REGULATIONS: FSSAIGuideline[] = [
  {
    id: "fssai-temp-cold",
    title: "Cold Chain & Refrigerated Storage",
    clause: "Regulation 4(1)(a)",
    description: "Perishable surplus foods requiring cold storage must be maintained at or below 7°C at all times prior to handover to the rescue organization.",
    mandatoryForFBO: true,
  },
  {
    id: "fssai-temp-hot",
    title: "Hot Food Handling & Time Windows",
    clause: "Regulation 4(1)(b)",
    description: "Hot cooked food must be maintained above 60°C or consumed/distributed within a strictly enforced maximum window of 2 to 4 hours post-preparation.",
    mandatoryForFBO: true,
  },
  {
    id: "fssai-segregation",
    title: "Strict Dietary Segregation",
    clause: "Regulation 4(2)",
    description: "Vegetarian and non-vegetarian surplus foods must be packaged, labeled, and physically segregated during storage and transport to prevent cross-contamination.",
    mandatoryForFBO: true,
  },
  {
    id: "fssai-labeling",
    title: "Batch & Preparation Traceability",
    clause: "Regulation 4(3)",
    description: "All surplus food containers must indicate the preparation timestamp, batch identifier, allergen declarations, and maximum safe consumption window.",
    mandatoryForFBO: true,
  },
];

export const GOOD_SAMARITAN_LEGAL_FRAMEWORK = {
  title: "Good Samaritan Protection Framework",
  ruling: "Save Life Foundation v. Union of India & Ministry of Law and Justice",
  statutoryBasis: "FSSAI Surplus Food Regulations 2019 Section 5 & General Principles of Tort Law",
  summary:
    "Donors, catering services, corporate cafeterias, and volunteer networks acting in good faith to supply wholesome surplus food without commercial consideration are legally protected against civil and criminal liability, provided standard hygiene protocols and truthfulness of disclosure are observed at handover.",
};

export interface DigitalHandoverCertificate {
  certificateId: string;
  donorName: string;
  donorType: "FBO / Restaurant" | "Corporate Cafeteria" | "Event / Banquet" | "Household / Community";
  fssaiLicenseNumber?: string;
  foodDescription: string;
  dietaryType: "100% Vegetarian" | "Non-Vegetarian" | "Eggitarian / Mixed";
  quantityKg: number;
  estimatedMeals: number;
  preparationTimestamp: string;
  handoverTimestamp: string;
  temperatureRecordedC: number;
  temperatureCompliant: boolean;
  receivingNgoName: string;
  receivingNgoDarpanId: string;
  logisticsDriverSarathiId: string;
  verificationHash: string;
}

export function generateVerificationHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  return `0xDFI-${hex.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
}
