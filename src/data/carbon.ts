export interface CarbonOffsetMetrics {
  foodDivertedKg: number;
  foodDivertedTonnes: number;
  mealsProvided: number;
  methaneAvoidedKg: number; // Methane (CH4) factor
  co2eAvoidedTonnes: number; // Carbon dioxide equivalent avoided
  carbonCreditsGenerated: number; // 1 credit = 1 metric tonne CO2e
  monetaryCreditValueInr: number; // Avg voluntary market price ~ ₹1,850 per tonne
  waterFootprintConservedLiters: number; // ~1,000L water per kg food
}

/**
 * Calculates environmental and carbon offset impact in accordance with
 * Verra VM0046 (Reduction of Food Loss & Waste) and Gold Standard DOWMER.
 */
export function calculateCarbonOffset(foodKg: number): CarbonOffsetMetrics {
  const tonnes = foodKg / 1000;
  // 1 tonne of food waste decaying in open landfills emits ~0.10 tonnes of CH4,
  // which has a 28-year Global Warming Potential (GWP) of 28x, translating to ~2.5 tonnes CO2e avoided.
  const co2eAvoidedTonnes = +(tonnes * 2.5).toFixed(3);
  const methaneAvoidedKg = +(tonnes * 98.4).toFixed(2);
  const meals = Math.round(foodKg / 0.45); // Average meal is ~450g
  const carbonCredits = +(co2eAvoidedTonnes).toFixed(2);
  const monetaryValue = Math.round(carbonCredits * 1850);
  const waterConserved = Math.round(foodKg * 950);

  return {
    foodDivertedKg: foodKg,
    foodDivertedTonnes: +tonnes.toFixed(3),
    mealsProvided: meals,
    methaneAvoidedKg,
    co2eAvoidedTonnes,
    carbonCreditsGenerated: carbonCredits,
    monetaryCreditValueInr: monetaryValue,
    waterFootprintConservedLiters: waterConserved,
  };
}

export const CSR_SCHEDULE_VII_CLAUSES = [
  {
    clause: "Item (i)",
    title: "Eradicating Hunger, Poverty and Malnutrition",
    description: "Promoting health care including preventive health care and sanitation, making available safe drinking water and nutritious sustenance.",
    qualifiesForDonateFood: true,
  },
  {
    clause: "Item (xii)",
    title: "Disaster Management, Relief & Rehabilitation",
    description: "Emergency food distribution, logistics mobilization, and critical nutritional sustenance during national/state notified natural disasters.",
    qualifiesForDonateFood: true,
  },
  {
    clause: "Item (iv)",
    title: "Ensuring Environmental Sustainability & Ecological Balance",
    description: "Preventing methane emissions from rotting landfill biomass via verified organic food recovery ledgers.",
    qualifiesForDonateFood: true,
  },
];
