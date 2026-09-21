"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Calculator,
  Download,
  FileCheck2,
  FileText,
  HelpCircle,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Truck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";

export default function BrsrScope3CalculatorPage() {
  const [wasteKgPerMonth, setWasteKgPerMonth] = useState<number>(3500);
  const [foodType, setFoodType] = useState<string>("cooked");
  const [facilitiesCount, setFacilitiesCount] = useState<number>(3);
  const [companyName, setCompanyName] = useState<string>("Enterprise India Ltd");

  // Environmental impact calculations (UNEP / EPA WARM factors for organic food diversion from landfill)
  // Diverting 1 kg of food from landfill prevents ~2.5 kg CO2 equivalent greenhouse gas emissions (including potent methane)
  const emissionFactor = foodType === "cooked" ? 2.54 : foodType === "raw" ? 1.9 : 2.1;
  const methaneFactor = 0.082; // kg CH4 avoided per kg food diverted from anaerobic landfill decomposition

  const totalMonthlyKg = wasteKgPerMonth * facilitiesCount;
  const totalAnnualKg = totalMonthlyKg * 12;

  const annualCo2eAvoidedTonnes = ((totalAnnualKg * emissionFactor) / 1000).toFixed(1);
  const annualMethaneAvoidedKg = (totalAnnualKg * methaneFactor).toFixed(0);
  const annualMealsProvided = Math.round(totalAnnualKg * 2.2); // approx 450g per nutritious meal
  const estimatedCsrValueInr = (annualMealsProvided * 35).toLocaleString("en-IN");

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadMou = () => {
    const element = document.createElement("a");
    const mouText = `
MEMORANDUM OF UNDERSTANDING (MoU)
FOR ZERO-WASTE CORPORATE SURPLUS FOOD RECOVERY & BRSR SCOPE 3 ESG COMPLIANCE

BETWEEN:
${companyName} (Hereinafter referred to as the "Corporate Partner")
AND
DonateFood.in National Public Infrastructure (Hereinafter referred to as "DonateFood.in")

1. PURPOSE & STATUTORY ALIGNMENT:
This MoU facilitates the safe, verified recovery and redistribution of surplus food generated at the Corporate Partner's commercial canteens and events, in strict compliance with:
a) Section 135, Schedule VII of the Companies Act, 2013 (Eradication of Hunger, Poverty, and Malnutrition).
b) SEBI BRSR (Business Responsibility and Sustainability Reporting) Core Guidelines (Principle 6: Environmental Protection - Scope 3 Waste Reduction).
c) Food Safety and Standards Authority of India (FSSAI) Surplus Food Regulations, 2019 (Schedule I Hygiene & Cold-Chain Protocol).

2. QUANTIFIED ESTIMATED ANNUAL IMPACT:
- Surplus Food Diverted: ${Number(totalAnnualKg).toLocaleString()} kg/year
- Scope 3 GHG Emissions Avoided: ${annualCo2eAvoidedTonnes} Metric Tonnes CO2e
- Methane Emissions Prevented: ${annualMethaneAvoidedKg} kg CH4
- Community Meals Provided: ${annualMealsProvided.toLocaleString()} Wholesome Meals

3. LEGAL IMMUNITY & INDEMNIFICATION:
Per FSSAI 2019 Surplus Regulations, the Corporate Partner is safeguarded from food safety liabilities when handover is executed in bona fide compliance with temperature guidelines (Refrigerated ≤7°C or Hot ≥60°C).

EXECUTED on: ${new Date().toLocaleDateString("en-IN")}
Authorised Signatory: DonateFood.in National Logistics Network
`;
    const file = new Blob([mouText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${companyName.replace(/\s+/g, "_")}_BRSR_CSR_MoU_DonateFood.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              SEBI BRSR Core &amp; Section 135 CSR Compliance Suite
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              BRSR Scope 3 Food Waste &amp; Carbon Reduction Calculator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Empowering Chief Sustainability Officers (CSOs) of top 1,000 SEBI-listed companies to calculate Scope 3 GHG emissions avoided, document methane diversion, and execute legally indemnified Section 135 CSR partnerships.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-12 translate-y-12">
            <Calculator className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Corporate Facility Parameters</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase tracking-wider mb-1.5">
                  Corporate / Enterprise Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-600 font-medium text-slate-900"
                  placeholder="e.g. Tata Consultancy Services / Infosys"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase tracking-wider mb-1.5">
                  Monthly Surplus Food Waste (Kg per Facility)
                </label>
                <input
                  type="number"
                  min={100}
                  step={100}
                  value={wasteKgPerMonth}
                  onChange={(e) => setWasteKgPerMonth(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-600 font-mono font-bold text-slate-900 text-lg"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Typical enterprise campus cafeteria generates 2,500 – 6,000 kg surplus monthly.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase tracking-wider mb-1.5">
                  Number of Campuses / Canteens
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={facilitiesCount}
                  onChange={(e) => setFacilitiesCount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-600 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 text-xs uppercase tracking-wider mb-1.5">
                  Primary Food Stream Type
                </label>
                <select
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-emerald-600 font-medium text-slate-900"
                >
                  <option value="cooked">Prepared Cooked Buffet &amp; Canteen Meals (2.54 kg CO2e/kg)</option>
                  <option value="raw">Raw Perishables, Fruits &amp; Vegetables (1.90 kg CO2e/kg)</option>
                  <option value="grains">Bakery, Grains &amp; Packaged Goods (2.10 kg CO2e/kg)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDownloadMou}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Free Section 135 CSR MoU Template</span>
                </button>
                {downloadSuccess && (
                  <p className="text-xs font-bold text-emerald-600 text-center mt-2 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> MoU downloaded successfully!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Impact Dashboard (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 font-serif">
                    Estimated Annual ESG &amp; CSR Deliverables
                  </h3>
                  <p className="text-xs text-slate-500">
                    Calculated for {companyName} across {facilitiesCount} facilities
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold rounded-full">
                  SEBI BRSR Ready
                </span>
              </div>

              {/* Big Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-5 rounded-2xl border border-emerald-200">
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-900 block">
                    Scope 3 Emissions Avoided
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-mono">
                      {annualCo2eAvoidedTonnes}
                    </span>
                    <span className="text-xs font-bold text-slate-600">MT CO2e / yr</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Equivalent to removing {(Number(annualCo2eAvoidedTonnes) / 4.6).toFixed(0)} cars from roads.
                  </span>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 p-5 rounded-2xl border border-blue-200">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-900 block">
                    Methane Gas Prevented
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-blue-800 font-mono">
                      {Number(annualMethaneAvoidedKg).toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-600">kg CH4 / yr</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Avoids toxic anaerobic landfill off-gassing under Verra VM0046.
                  </span>
                </div>

                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5 rounded-2xl border border-amber-200">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-900 block">
                    Wholesome Meals Provided
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-amber-800 font-mono">
                      {annualMealsProvided.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-slate-600">Meals / yr</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Distributed to shelter children &amp; day laborers via verified NGOs.
                  </span>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-5 rounded-2xl border border-purple-200">
                  <span className="text-xs uppercase font-bold tracking-wider text-purple-900 block">
                    CSR Schedule VII Value
                  </span>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-purple-800 font-mono">
                      ₹{estimatedCsrValueInr}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Audited food security contribution eligible for Section 135 accounting.
                  </span>
                </div>
              </div>

              {/* Regulatory Assurance Callout */}
              <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Mandatory Compliance Assurance</span>
                </div>
                <p className="leading-relaxed text-slate-300">
                  Under <strong>Companies Act Section 135</strong> and <strong>FSSAI 2019 Regulations</strong>, corporate catering surplus handed over to DonateFood.in receives automated digital chain-of-custody logs, relieving the enterprise of post-handover liability and satisfying SEBI BRSR Principle 6 assured disclosures.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-emerald-400 font-mono text-[11px]">
                  <span>✓ ISO 14064 GHG Compatible</span>
                  <span>✓ 100% Tax Deductible 80G Receipts</span>
                  <span>✓ Daily IoT Temperature Logs</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/compliance/fssai-schedule-1"
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all text-center"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  <span>Review FSSAI Schedule I Checklist</span>
                </Link>
                <Link
                  href="/reports/state-of-food-waste"
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all text-center"
                >
                  <span>Explore National Food Waste Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
