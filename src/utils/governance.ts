// ============================================================
// PSEO Governance Engine — DonateFood.in
// Blueprint Reference: Section 1, Section 5.2, Section 13.3
// Calculates Page Quality Score (0–100) to prevent Google Scaled Content Abuse penalties
// ============================================================

export interface PageQualityMetrics {
  activeNgosCount: number;
  hasUniqueHumanitarianData: boolean;
  searchDemandVolume: number; // Monthly search index 0-100
  daysSinceLastUpdate: number;
}

export interface GovernanceDecision {
  score: number;
  action: "PUBLISH_INDEX" | "IMPROVE_HOLD" | "MERGE_REDIRECT";
  shouldIndex: boolean;
  inSitemap: boolean;
  reason: string;
}

/**
 * Calculates Page Quality Score (0-100) based on strict algorithmic thresholds:
 * - Count of verified active NGOs (Weight: 40%)
 * - Presence of unique local humanitarian data (Weight: 30%)
 * - Search demand volume for specific intent (Weight: 20%)
 * - Freshness of data updates (Weight: 10%)
 */
export function calculatePageQualityScore(metrics: PageQualityMetrics): number {
  // 1. NGO Density Factor (40% weight, max at 10+ verified active NGOs)
  const ngoScore = Math.min(metrics.activeNgosCount / 10, 1.0) * 40;

  // 2. Unique Local Humanitarian Data Factor (30% weight)
  const dataScore = metrics.hasUniqueHumanitarianData ? 30 : 0;

  // 3. Search Demand Volume Factor (20% weight, normalized 0-100)
  const demandScore = Math.min(Math.max(metrics.searchDemandVolume, 0), 100) * 0.2;

  // 4. Data Freshness Factor (10% weight, degrades if older than 30 days)
  const freshnessRatio = Math.max(0, 1 - metrics.daysSinceLastUpdate / 30);
  const freshnessScore = freshnessRatio * 10;

  const totalScore = Math.round(ngoScore + dataScore + demandScore + freshnessScore);
  return Math.min(Math.max(totalScore, 0), 100);
}

/**
 * Evaluates the Page Quality Score against Blueprint Governance Thresholds:
 * - 90–100 (Publish/Index): Fully fleshed-out page, unique value, submitted to XML sitemap.
 * - 75–89 (Improve/Hold): Accessible via internal navigation, but tagged noindex until further NGO onboarding occurs.
 * - < 74 (Merge/Redirect): Do not generate. Queries route to parent District or State page.
 */
export function evaluatePseoGovernance(metrics: PageQualityMetrics): GovernanceDecision {
  const score = calculatePageQualityScore(metrics);

  if (score >= 90) {
    return {
      score,
      action: "PUBLISH_INDEX",
      shouldIndex: true,
      inSitemap: true,
      reason: "High-density verified humanitarian data surpasses Google helpful content threshold.",
    };
  } else if (score >= 75) {
    return {
      score,
      action: "IMPROVE_HOLD",
      shouldIndex: false,
      inSitemap: false,
      reason: "Accessible via internal navigation, but marked noindex until additional local NGOs are verified.",
    };
  } else {
    return {
      score,
      action: "MERGE_REDIRECT",
      shouldIndex: false,
      inSitemap: false,
      reason: "Insufficient local data. Prevents scaled content abuse by routing to parent district hub.",
    };
  }
}
