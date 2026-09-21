"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Thermometer,
  AlertTriangle,
  Download,
  FileCheck2,
  Sparkles,
  ArrowRight,
  Truck,
  HelpCircle,
  Building,
  Clock,
  ChevronRight,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";

interface ChecklistItem {
  id: string;
  category: "Storage & Temperature" | "Segregation" | "Personal Hygiene" | "Pest & Sanitation";
  title: string;
  requirement: string;
  mandatory: boolean;
}

const FSSAI_SCHEDULE_1_ITEMS: ChecklistItem[] = [
  {
    id: "temp-cold",
    category: "Storage & Temperature",
    title: "Cold-Chain Maintenance (≤ 7°C)",
    requirement: "Perishable cooked and raw dairy/meat items must be continuously stored at 7°C or lower prior to handover.",
    mandatory: true,
  },
  {
    id: "temp-hot",
    category: "Storage & Temperature",
    title: "Hot Holding Protocol (≥ 60°C)",
    requirement: "If cooked food is held hot for same-day distribution, it must remain at or above 60°C until collected by thermal transport units.",
    mandatory: true,
  },
  {
    id: "segregation-perishable",
    category: "Segregation",
    title: "Perishable vs. Non-Perishable Segregation",
    requirement: "Cooked foods, fresh produce, and dry grains must be packed in segregated, food-grade airtight containers to prevent cross-contamination.",
    mandatory: true,
  },
  {
    id: "segregation-veg-nonveg",
    category: "Segregation",
    title: "Vegetarian and Non-Vegetarian Segregation",
    requirement: "Strict visual labeling and physical separation between vegetarian and non-vegetarian surplus preparations.",
    mandatory: true,
  },
  {
    id: "hygiene-attire",
    category: "Personal Hygiene",
    title: "Clean Protective Garments & Hair Coverings",
    requirement: "All kitchen staff handling food donation handover must wear clean aprons, trimmed nails, and hair nets.",
    mandatory: true,
  },
  {
    id: "hygiene-health",
    category: "Personal Hygiene",
    title: "Exclusion of Symptomatic Handlers",
    requirement: "Handlers displaying signs of respiratory illness, skin lesions, or communicable digestive disorders are strictly barred from surplus packing.",
    mandatory: true,
  },
  {
    id: "sanitation-pest",
    category: "Pest & Sanitation",
    title: "Hermetically Sealed Pest Defense",
    requirement: "Surplus staging zones must have active pest deterrence, fly-killers, and raised pallets keeping food at least 15 cm above the floor.",
    mandatory: true,
  },
  {
    id: "audit-shelf-life",
    category: "Storage & Temperature",
    title: "Time-Temperature Shelf Life Verification",
    requirement: "Surplus must be registered for donation within 2 hours of preparation with an estimated safe consumption window exceeding 4 hours.",
    mandatory: true,
  },
];

export default function FssaiComplianceGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [fboName, setFboName] = useState("The Grand Palace Hotel & Banquet");

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount = FSSAI_SCHEDULE_1_ITEMS.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const handleDownloadLogTemplate = () => {
    const logTemplate = `
FSSAI 2019 SURPLUS FOOD REGULATIONS (SCHEDULE I)
DAILY TEMPERATURE & HYGIENE VERIFICATION LOG

Facility / Food Business Operator (FBO): ${fboName}
FSSAI License / Registration No: _____________________________
Log Date: ${new Date().toLocaleDateString("en-IN")}

-----------------------------------------------------------------------------------------
BATCH ID | FOOD TYPE | PREPARATION TIME | STAGING TEMP (°C) | PACKAGING HYGIENE | VERIFIED BY
-----------------------------------------------------------------------------------------
001      | Hot Buffet | 14:30            | 63.5°C            | Food Grade Sealed | Head Chef
002      | Cooked Rice| 15:00            | 62.0°C            | Insulated Cask    | Sous Chef
003      | Chilled Dal| 16:00            | 5.2°C             | Cold Container    | Food Safety Mgr
-----------------------------------------------------------------------------------------

GOOD SAMARITAN LEGAL SHIELD ATTESTATION:
Under the Food Safety and Standards (Recovery and Distribution of Surplus Food) Regulations, 2019,
food donated in good faith adhering to the Schedule I parameters above constitutes safe compliance.
DonateFood.in assumes chain-of-custody upon thermal handover confirmation.

Signed by FBO Authorised Representative: _______________________
`;
    const element = document.createElement("a");
    const file = new Blob([logTemplate], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `FSSAI_Daily_Temperature_Log_${fboName.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const howToSchema = {
    name: "How to Safely Donate Food Under FSSAI Schedule I Regulations",
    description: "Step-by-step statutory guide for hotels, restaurants, and caterers in India to donate surplus food with zero legal liability.",
    steps: [
      {
        "@type": "HowToStep",
        name: "Temperature Staging",
        text: "Ensure cooked surplus is held hot at or above 60°C or refrigerated at 7°C or lower.",
      },
      {
        "@type": "HowToStep",
        name: "Hygienic Segregation",
        text: "Segregate vegetarian and non-vegetarian food into sealed, clean food-grade canisters.",
      },
      {
        "@type": "HowToStep",
        name: "Digital Log & Handover",
        text: "Log dispatch temperatures on the digital checklist and hand over to verified DonateFood.in transport.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd type="HowTo" data={howToSchema} />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/enterprise/csr" className="hover:text-emerald-700">Compliance</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">FSSAI Schedule I Audit</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Statutory Food Safety &amp; Standards Authority of India (FSSAI)
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              FSSAI Schedule I Hygiene Compliance &amp; Legal Shield Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In 2019, FSSAI notified the <em>Recovery and Distribution of Surplus Food Regulations</em> to protect bona fide donors. Learn how adherence to Schedule I temperature and hygiene standards serves as your hotel or restaurant's de facto legal shield against liability.
            </p>
          </div>
        </div>

        {/* Good Samaritan Shield Callout */}
        <div className="bg-emerald-50 border-2 border-emerald-300/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
              <span>The "Good Samaritan" Legal Protection for Indian FBOs</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
              Unlike common misconception, Indian law fully protects commercial kitchens donating in good faith. Under <strong>Regulation 4 of the FSSAI Surplus Food Regulations (2019)</strong>, a food business operator that handles and stores surplus per Schedule I is indemnified against civil or criminal liability once food is transferred to a verified food rescue organization.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadLogTemplate}
            className="shrink-0 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Temperature Log Template</span>
          </button>
        </div>

        {/* Interactive Checklist & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Checklist Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">
                  Schedule I Digital Audit Checklist
                </h2>
                <p className="text-xs text-slate-500">
                  Verify these 8 statutory hygiene protocols before dispatching surplus
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-600">
                  {completedCount}/{totalCount} Completed
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${progressPct === 100 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"}`}>
                  {progressPct}%
                </span>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {FSSAI_SCHEDULE_1_ITEMS.map((item) => {
                const isChecked = Boolean(checkedItems[item.id]);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isChecked
                        ? "bg-emerald-50/50 border-emerald-300"
                        : "bg-slate-50/60 border-slate-200 hover:bg-slate-100/70"
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"}`}>
                        {isChecked && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase text-slate-400">
                          {item.category}
                        </span>
                        {item.mandatory && (
                          <span className="text-[10px] uppercase font-bold text-red-700 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                            Statutory Mandatory
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.requirement}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {progressPct === 100 && (
              <div className="p-4 bg-emerald-100 text-emerald-900 rounded-2xl text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  Your kitchen satisfies 100% of FSSAI Schedule I hygiene standards!
                </span>
                <Link
                  href="/donate"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs"
                >
                  Proceed to Pickup
                </Link>
              </div>
            )}
          </div>

          {/* Right Sidebar: Guidelines & Fast Dispatch (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <Thermometer className="w-8 h-8 text-emerald-400" />
              <h3 className="text-lg font-bold font-serif">
                Critical Temperature Boundaries
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                  <span><strong>Cold Staging:</strong> Below 7°C (Dairy, gravies, meat, desserts).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                  <span><strong>Hot Holding:</strong> Above 60°C (Rice, rotis, sambar, cooked vegetables).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></span>
                  <span><strong>The Danger Zone:</strong> Food between 8°C and 59°C must not exceed 2 hours ambient exposure.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/donate"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Call Standby Insulated Van</span>
                </Link>
              </div>
            </div>

            {/* FBO Name Input for Template */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
              <span className="text-slate-400 uppercase font-bold tracking-wider block">
                Customise Your Daily Log
              </span>
              <label className="block text-slate-700 font-semibold">Your Hotel / FBO Name</label>
              <input
                type="text"
                value={fboName}
                onChange={(e) => setFboName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300 font-medium text-slate-900"
              />
              <button
                type="button"
                onClick={handleDownloadLogTemplate}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all mt-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Log Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
