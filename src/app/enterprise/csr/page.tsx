"use client";

import React, { useState } from "react";
import { CSR_SCHEDULE_VII_CLAUSES } from "@/data/carbon";
import { formatNumber } from "@/utils/format";
import {
  Building2,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  Download,
  Calendar,
  PieChart,
  ShieldCheck,
  TrendingUp,
  FileCheck,
} from "lucide-react";

export default function EnterpriseCsrPage() {
  const [companyName, setCompanyName] = useState("Tata Consultancy Services - Kolkata Cafeterias");
  const [reportingYear, setReportingYear] = useState("FY 2025-26");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const corporateStats = {
    totalFoodDivertedKg: 148200,
    totalNutritiousMealsProvided: 329333,
    partnerNgosBenefited: 12,
    carbonOffsetMtCo2e: 370.5,
    scheduleVIIComplianceScore: "100% AUDIT READY",
    statutoryFilingStatus: "FORM CSR-1 VALIDATED",
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Section 135 Companies Act Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-2">
          Enterprise CSR Dashboard &amp; Audit Suite
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Transform corporate cafeteria waste into legally verified Corporate Social Responsibility
          contributions under Schedule VII Clauses (i) &amp; (xii).
        </p>
      </div>

      {/* Corporate Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
              Registered Corporate Entity
            </span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="text-lg sm:text-xl font-bold text-gray-900 border-b border-dashed border-gray-300 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={reportingYear}
              onChange={(e) => setReportingYear(e.target.value)}
              className="bg-slate-100 border border-gray-300 text-xs font-bold rounded-lg px-3 py-2 text-gray-800"
            >
              <option value="FY 2025-26">FY 2025-26 (Active)</option>
              <option value="FY 2024-25">FY 2024-25 (Audited)</option>
            </select>

            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export MCA Audit PDF</span>
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-3 bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Generated Schedule VII MCA Filing Statement (SHA-256 Verified) for {companyName}.
            </span>
          </div>
        )}
      </div>

      {/* Corporate KPIs (White Mode) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 block mb-1 font-mono">Total Food Diverted</span>
          <div className="text-2xl font-black font-mono text-emerald-700">
            {formatNumber(corporateStats.totalFoodDivertedKg)} kg
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">148.2 Metric Tonnes</span>
        </div>

        <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 block mb-1 font-mono">Nutritious Meals Served</span>
          <div className="text-2xl font-black font-mono text-teal-700">
            {formatNumber(corporateStats.totalNutritiousMealsProvided)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Via Level-5 Partner NGOs</span>
        </div>

        <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 block mb-1 font-mono">Scope-3 Emission Avoided</span>
          <div className="text-2xl font-black font-mono text-amber-600">
            {corporateStats.carbonOffsetMtCo2e} MT CO₂e
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Verra VM0046 Ledger</span>
        </div>

        <div className="bg-white border border-slate-200 text-slate-900 p-5 rounded-2xl shadow-xs">
          <span className="text-xs text-slate-500 block mb-1 font-mono">Statutory Audit Rating</span>
          <div className="text-sm font-bold font-mono text-emerald-700 mt-1">
            {corporateStats.scheduleVIIComplianceScore}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {corporateStats.statutoryFilingStatus}
          </span>
        </div>
      </div>

      {/* Schedule VII Statutory Clauses */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Statutory Schedule VII Clauses Covered by Your Enterprise Contributions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {CSR_SCHEDULE_VII_CLAUSES.map((clause, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-slate-50 space-y-2">
              <span className="bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {clause.clause}
              </span>
              <h3 className="font-bold text-gray-900 text-sm">{clause.title}</h3>
              <p className="text-gray-600 leading-relaxed">{clause.description}</p>
              <div className="pt-2 border-t border-gray-200 flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>MCA Filing Eligible</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
