"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  TrendingDown,
  BarChart3,
  Globe,
  Share2,
  Copy,
  CheckCircle2,
  Download,
  AlertTriangle,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

export default function StateOfFoodWasteReportPage() {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [partnerDomain, setPartnerDomain] = useState("mycompany.com");

  const badgeSnippet = `<!-- DonateFood.in Zero Waste Certified Partner Badge -->
<a href="https://donatefood.in/enterprise/csr?partner=${partnerDomain}" target="_blank" rel="noopener">
  <img src="https://donatefood.in/images/badges/zero-waste-partner-badge.svg" alt="Certified Zero Waste Corporate Partner - DonateFood.in" width="220" height="75" />
</a>`;

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(badgeSnippet);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 3000);
  };

  const datasetJsonLd = {
    name: "The State of Food Waste and Hunger in India (2024-2026 Comprehensive Report)",
    description:
      "A national meta-analysis combining UNEP Food Waste Index 2024, Global Hunger Index, and ICAR post-harvest data to quantify economic loss, methane emissions, and rescue opportunity.",
    variableMeasured: [
      "Annual household food waste (78.2 million tonnes)",
      "Per capita food waste (55 kg/year)",
      "Economic loss (₹1.55 lakh crore)",
      "Global Hunger Index Rank (111th of 125)",
      "ICAR Post-harvest loss rate (10-40%)",
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd type="Dataset" data={datasetJsonLd} />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Reports</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">State of Food Waste in India</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-14 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <Globe className="w-3.5 h-3.5" />
              Special Research Report &amp; Data Journalism Release
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              The State of Food Waste and Hunger in India
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-sans max-w-3xl">
              An authoritative synthesis of the <strong>UNEP Food Waste Index 2024</strong>, <strong>Global Hunger Index</strong>, and <strong>ICAR post-harvest studies</strong>, modeling how algorithmic food rescue bridges the ₹1.55 Lakh Crore gap.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-emerald-300">
              <span>UNEP 2024 Data</span>
              <span>•</span>
              <span>ICAR Benchmark</span>
              <span>•</span>
              <span>Open Citation (CC BY 4.0)</span>
            </div>
          </div>
        </div>

        {/* Top Shock-Value Statistics (The Core Data Points from the PDF) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
              Annual Household Waste
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-950 font-mono">78.2 M</span>
              <span className="text-xs text-slate-500 font-bold">Tonnes / yr</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Indian households discard <strong>55 kg per capita</strong> each year, per the UNEP 2024 Report.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
              National Economic Loss
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-red-600 font-mono">₹1.55 L</span>
              <span className="text-xs text-slate-500 font-bold">Crore / yr</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Colossal capital drained through unconsumed edible agricultural and cooked goods.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
              Global Hunger Index
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-amber-600 font-mono">111th</span>
              <span className="text-xs text-slate-500 font-bold">of 125 Nations</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Housing between <strong>194 to 233.9 million undernourished individuals</strong> nationwide.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block">
              ICAR Supply Chain Loss
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-blue-600 font-mono">10% - 40%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Post-harvest losses occurring in farm gates and transit before retail sale.
            </p>
          </div>
        </div>

        {/* Deep Dive Data Journalism (Left) + Embed Badge Generator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Report Text & Synthesis (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-slate-950">
                The Paradox of Abundance: India's Food Conundrum
              </h2>
              <div className="prose prose-slate text-sm text-slate-700 leading-relaxed space-y-4">
                <p>
                  While India produces record-breaking grain outputs and horticultural yields, the paradox between massive post-harvest loss and pervasive child undernutrition represents one of the 21st century's most critical systemic challenges.
                </p>
                <p>
                  According to the <strong>United Nations Environment Programme (UNEP) Food Waste Index Report 2024</strong>, Indian households discard an estimated 78.2 million tonnes of food annually—equivalent to 55 kilograms per person. Simultaneously, research from the <strong>Indian Council of Agricultural Research (ICAR)</strong> establishes that 10% to 40% of agricultural yields perish in transit and wholesale storage due to broken cold chains.
                </p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    The Climate Dimension: Methane &amp; Carbon Footprint
                  </span>
                  <p className="text-xs text-slate-600">
                    Food waste decomposing in municipal landfills produces massive volumes of <strong>methane (CH4)</strong>, a greenhouse gas 28 times more potent than carbon dioxide over a 100-year cycle. Every metric tonne of surplus food rescued prevents approximately 2.54 tonnes of CO2 equivalent emissions.
                  </p>
                </div>
                <p>
                  By deploying programmatic logistics, temperature-validated staging under FSSAI Schedule I, and localized community kitchen routing, DonateFood.in transforms what would be landfill rot into emergency life-saving sustenance.
                </p>
              </div>
            </div>

            {/* Citation Box for Media & Journalists */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Media Citation Reference (For Press &amp; Academic Journals)
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 break-words select-all">
                DonateFood.in Research Bureau (2026). "The State of Food Waste and Hunger in India: A Multi-Pillar Analysis of UNEP, GHI, and ICAR Metrics". Available at: https://donatefood.in/reports/state-of-food-waste
              </div>
            </div>
          </div>

          {/* Right Column: "Zero Waste Corporate Partner" Badge Generator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold font-serif">
                  Zero Waste Corporate Partner Badge
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Corporations, hotels, and caterers diverting food with DonateFood.in can embed this high-authority verification badge on their ESG, CSR, or Sustainability pages, linking back to their verified impact ledger.
              </p>

              {/* Badge Preview */}
              <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-500/40 text-center space-y-2">
                <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider">
                  Live Badge Preview
                </span>
                <div className="py-3 px-4 bg-emerald-900/60 rounded-xl border border-emerald-400/50 inline-flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">
                      Zero Food Waste Certified
                    </span>
                    <span className="block text-[10px] text-emerald-300 font-mono">
                      Verified by DonateFood.in
                    </span>
                  </div>
                </div>
              </div>

              {/* Partner Website Input */}
              <div className="space-y-2 text-xs">
                <label className="block text-slate-400 font-semibold uppercase tracking-wider">
                  Your Corporate Domain
                </label>
                <input
                  type="text"
                  value={partnerDomain}
                  onChange={(e) => setPartnerDomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:outline-emerald-500"
                />
              </div>

              {/* HTML Snippet Box */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="uppercase font-semibold tracking-wider">Embed Code (HTML)</span>
                  <button
                    type="button"
                    onClick={handleCopyBadge}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
                  >
                    {copiedBadge ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto select-all">
                  {badgeSnippet}
                </pre>
              </div>

              <div className="pt-2">
                <Link
                  href="/enterprise/brsr-calculator"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Calculate Corporate Scope 3 Savings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
