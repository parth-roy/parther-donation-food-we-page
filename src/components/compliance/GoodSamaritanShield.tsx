"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Scale,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  Lock,
  Download,
} from "lucide-react";

export function GoodSamaritanShield() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-2xl border border-emerald-200 shadow-xs overflow-hidden">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
            <Scale className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                Statutory Immunity Framework
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Zero Liability
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
              Good Samaritan Protection &amp; FSSAI 2019 Legal Shield
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
              Donating wholesome surplus food in good faith is legally indemnified under FSSAI Surplus Regulations &amp; Supreme Court guidelines.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all shadow-2xs cursor-pointer shrink-0"
        >
          <span>{isOpen ? "Hide Statutory Clauses" : "View Legal Clauses & FAQ"}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Accordion Content */}
      {isOpen && (
        <div className="p-6 sm:p-8 border-t border-emerald-100 bg-slate-50/50 space-y-6 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Clause 1 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>FSSAI Regulation 2019 (§ 24)</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Section 24 of the Food Safety &amp; Standards (Recovery &amp; Distribution of Surplus Food) Regulations explicitly protects bona fide Food Business Operators from civil and criminal liability when handling surplus food with standard hygiene precautions.
              </p>
            </div>

            {/* Clause 2 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>Supreme Court Precedent</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                In <em>SaveLIFE Foundation v. Union of India (2016)</em>, the Supreme Court mandated binding statutory immunity for citizens and entities acting as Good Samaritans to prevent distress or starvation, prohibiting harassment by law enforcement.
              </p>
            </div>

            {/* Clause 3 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Digital Custody Chain</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                DonateFood.in generates a cryptographic Digital Handover Certificate at dispatch with temperature logs (&le;7°C or &ge;60°C) and verified SARATHI carrier IDs, providing an immutable audit trail for legal protection.
              </p>
            </div>
          </div>

          {/* Compliance Checklist for Donors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Donor Protocol to Maintain 100% Legal Protection</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Ensure cooked food is chilled to &le;7°C or kept hot at &ge;60°C before dispatch.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Package in clean, food-grade insulated containers without physical contamination.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Maintain separate segregation for vegetarian and non-vegetarian surplus batches.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span>Hand over exclusively to NITI Aayog DARPAN &amp; FSSAI verified rescue partners.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
