import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getDistrictNutrition, WEST_BENGAL_NFHS5_DISTRICTS } from "@/data/nfhs5Data";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Download,
  Flame,
  HeartPulse,
  Info,
  MapPin,
  Scale,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
    district: string;
  }>;
}

export async function generateStaticParams() {
  return WEST_BENGAL_NFHS5_DISTRICTS.map((d) => ({
    state: d.stateSlug,
    district: d.districtSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, district } = await params;
  const data = getDistrictNutrition(state, district);

  return {
    title: `${data.districtName} Malnutrition & Food Scarcity Dashboard (NFHS-5) | DonateFood.in`,
    description: `Official public health & malnutrition metrics for ${data.districtName}, ${data.stateName}. Child wasting: ${data.wastingPrevalence}%, stunting: ${data.stuntingPrevalence}%. Hyperlocal surplus food intervention & CSR allocation data.`,
    alternates: {
      canonical: `https://donatefood.in/data/nutrition/${state}/${district}`,
    },
    openGraph: {
      title: `${data.districtName} Nutrition & Hunger Index | NFHS-5 Public Health Report`,
      description: `Analysis of acute child wasting (${data.wastingPrevalence}%) and chronic stunting (${data.stuntingPrevalence}%) in ${data.districtName}. Data-driven food rescue corridors.`,
      url: `https://donatefood.in/data/nutrition/${state}/${district}`,
      type: "article",
    },
  };
}

export default async function DistrictNutritionPage({ params }: PageProps) {
  const { state, district } = await params;
  const data = getDistrictNutrition(state, district);

  const nationalAvgWasting = 19.3;
  const nationalAvgStunting = 35.5;
  const nationalAvgAnaemia = 67.1;

  const jsonLdDataset = {
    name: `${data.districtName} District Nutrition & Malnutrition Profile (NFHS-5)`,
    description: `Public health indicators for ${data.districtName}, including acute child wasting (${data.wastingPrevalence}%), stunting (${data.stuntingPrevalence}%), and women anaemia (${data.womenAnaemiaPrevalence}%).`,
    spatialCoverage: `${data.districtName}, ${data.stateName}, India`,
    variableMeasured: [
      "Child Wasting Prevalence (<5 years)",
      "Child Stunting Prevalence (<5 years)",
      "Child Severe Wasting Rate",
      "Women Anaemia Prevalence (15-49 years)",
      "Multidimensional Poverty Headcount Ratio",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd type="Dataset" data={jsonLdDataset} />

      {/* Header Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono mb-4">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link href="/reports/state-of-food-waste" className="hover:text-emerald-400">Data &amp; Research</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="capitalize text-slate-300">{data.stateName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-emerald-400 font-bold">{data.districtName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  NFHS-5 Official Demographic Dataset
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-mono font-bold rounded-full border border-amber-500/30 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  {data.priorityCategory} Priority
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
                {data.districtName} Nutrition &amp; Food Scarcity Profile
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 leading-relaxed">
                National Family Health Survey (NFHS-5) granular district metrics cross-referenced with DonateFood.in algorithmic food rescue corridors to eliminate acute undernutrition.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href={`/donate-food/${data.stateSlug}/${data.districtSlug}/${data.districtSlug}`}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>Dispatch Food to {data.districtName}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/enterprise/brsr-calculator"
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Building2 className="w-4 h-4 text-emerald-400" />
                <span>CSR Allocation Tool</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* District Selector Tabs (West Bengal Focus Corridor) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              West Bengal District Corridor Analysis
            </span>
            <span className="text-xs text-slate-400 font-mono">NFHS-5 (2019-21)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {WEST_BENGAL_NFHS5_DISTRICTS.map((d) => {
              const isActive = d.districtSlug === data.districtSlug;
              return (
                <Link
                  key={d.districtSlug}
                  href={`/data/nutrition/${d.stateSlug}/${d.districtSlug}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span>{d.districtName}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? "bg-slate-800 text-emerald-400" : "bg-white text-slate-500"}`}>
                    {d.wastingPrevalence}%
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Child Wasting */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Wasting (&lt;5 yrs)</span>
              <Activity className="w-4 h-4 text-red-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-mono">{data.wastingPrevalence}%</span>
              <span className={`text-xs font-bold flex items-center ${data.wastingPrevalence > nationalAvgWasting ? "text-red-600" : "text-emerald-600"}`}>
                {data.wastingPrevalence > nationalAvgWasting ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +{(data.wastingPrevalence - nationalAvgWasting).toFixed(1)}% vs Nat. Avg
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Below Nat. Avg
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Indicator of acute undernutrition and immediate calorie deficit requiring rapid food rescue.
            </p>
            <div className="mt-4 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full"
                style={{ width: `${Math.min(data.wastingPrevalence * 2.5, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Child Stunting */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Child Stunting (&lt;5 yrs)</span>
              <Scale className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-mono">{data.stuntingPrevalence}%</span>
              <span className={`text-xs font-bold flex items-center ${data.stuntingPrevalence > nationalAvgStunting ? "text-red-600" : "text-emerald-600"}`}>
                {data.stuntingPrevalence > nationalAvgStunting ? (
                  <>
                    <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +{(data.stuntingPrevalence - nationalAvgStunting).toFixed(1)}% vs Nat.
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> Favorable
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Low height-for-age reflecting chronic long-term nutritional deprivation and micronutrient gaps.
            </p>
            <div className="mt-4 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${Math.min(data.stuntingPrevalence * 2, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Women Anaemia */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Women Anaemia (15-49)</span>
              <HeartPulse className="w-4 h-4 text-purple-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-mono">{data.womenAnaemiaPrevalence}%</span>
              <span className="text-xs font-bold text-red-600 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-0.5" /> Severe
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Prevalence of iron-deficiency anaemia amongst women of reproductive age in {data.districtName}.
            </p>
            <div className="mt-4 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full"
                style={{ width: `${Math.min(data.womenAnaemiaPrevalence * 1.2, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Underweight Rate */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Underweight Children</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-mono">{data.underweightPrevalence}%</span>
              <span className="text-xs font-bold text-amber-600 font-mono">
                {data.severeWastingPrevalence}% Severe
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Combined weight-for-age deficits pointing to acute and chronic community hunger stressors.
            </p>
            <div className="mt-4 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${Math.min(data.underweightPrevalence * 2.2, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Detailed Strategic Analysis & Operational Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: E-E-A-T Data Journalism & Operational Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  E
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
                    Strategic Food Rescue Analysis: {data.districtName}
                  </h2>
                  <span className="text-xs text-slate-500">
                    Sourced from Ministry of Health &amp; Family Welfare (MoHFW), NFHS-5, and NITI Aayog Aspirational District Reports
                  </span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  According to official National Family Health Survey (NFHS-5) micro-data, <strong>{data.districtName}</strong> records a child wasting rate of <strong>{data.wastingPrevalence}%</strong> and a stunting rate of <strong>{data.stuntingPrevalence}%</strong>. Child wasting (low weight-for-height) indicates severe acute malnutrition resulting from recent, catastrophic food intake failures or recurrent infections.
                </p>
                <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200">
                  <h3 className="text-sm font-bold text-emerald-950 mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Targeted Programmatic Intervention Strategy
                  </h3>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {data.strategicFocus}
                  </p>
                </div>
                <p>
                  {data.operationalSummary}
                </p>
                <p>
                  By redirecting untouched commercial banquet food, hotel surplus, and corporate canteen meals under strict FSSAI Schedule I hygiene standards (temperature logging ≤7°C or ≥60°C), DonateFood.in operates continuous nutrition pipelines directly to certified local community kitchens and shelter homes across {data.districtName}.
                </p>
              </div>

              {/* Data Table Comparison */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">
                  Comparative Nutritional Benchmark Table
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Nutritional Indicator</th>
                        <th className="py-3 px-4">{data.districtName}</th>
                        <th className="py-3 px-4">West Bengal Average</th>
                        <th className="py-3 px-4">India National Average</th>
                        <th className="py-3 px-4">Intervention Urgency</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Child Wasting (&lt;5 yrs)</td>
                        <td className="py-3 px-4 font-mono font-bold text-red-600">{data.wastingPrevalence}%</td>
                        <td className="py-3 px-4 font-mono">20.3%</td>
                        <td className="py-3 px-4 font-mono">19.3%</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">Critical</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Child Stunting (&lt;5 yrs)</td>
                        <td className="py-3 px-4 font-mono font-bold text-amber-700">{data.stuntingPrevalence}%</td>
                        <td className="py-3 px-4 font-mono">33.8%</td>
                        <td className="py-3 px-4 font-mono">35.5%</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">High</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Severe Wasting (SAM)</td>
                        <td className="py-3 px-4 font-mono font-bold text-red-700">{data.severeWastingPrevalence}%</td>
                        <td className="py-3 px-4 font-mono">7.1%</td>
                        <td className="py-3 px-4 font-mono">7.7%</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">Emergency</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold text-slate-900">Women Anaemia (15-49 yrs)</td>
                        <td className="py-3 px-4 font-mono font-bold text-purple-700">{data.womenAnaemiaPrevalence}%</td>
                        <td className="py-3 px-4 font-mono">71.4%</td>
                        <td className="py-3 px-4 font-mono">57.0%</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">Severe Widespread</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Dispatch & Corporate Alignment */}
          <div className="space-y-6">
            {/* Direct Action Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider block mb-2">
                Operational Nexus
              </span>
              <h3 className="text-xl font-bold font-serif mb-3">
                Mobilize Food Rescue in {data.districtName}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Are you a restaurant owner, wedding caterer, hotel, or food manufacturing plant located in or near {data.districtName}? Dispatch your excess edible food immediately.
              </p>

              <div className="space-y-3">
                <Link
                  href={`/donate-food/${data.stateSlug}/${data.districtSlug}/${data.districtSlug}`}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Request Urgent Food Pickup</span>
                </Link>
                <Link
                  href={`/ngo-directory/${data.stateSlug}/${data.districtSlug}`}
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified {data.districtName} NGOs</span>
                </Link>
              </div>
            </div>

            {/* Citation & Methodology Card for Researchers/Media */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Citation &amp; Academic Source
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Researchers and journalists may cite this profile under CC BY 4.0:
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 break-words select-all">
                DonateFood.in (2026). "District Nutrition Profile: {data.districtName}, {data.stateName} (NFHS-5 Synthesis)". Retrieved from https://donatefood.in/data/nutrition/{data.stateSlug}/{data.districtSlug}
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Dataset: MoHFW NFHS-5</span>
                <span className="font-semibold text-emerald-700">Open Access</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
