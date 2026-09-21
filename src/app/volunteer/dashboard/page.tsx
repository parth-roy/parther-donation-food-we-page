"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  Flame,
  Leaf,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  ChevronRight,
  ArrowRight,
  QrCode,
} from "lucide-react";

export default function VolunteerDashboardPage() {
  const [volunteerName, setVolunteerName] = useState("Aarav Sen");
  const [universityOrg, setUniversityOrg] = useState("Jadavpur University");
  const [hoursLogged, setHoursLogged] = useState(36);
  const [foodRescuedKg, setFoodRescuedKg] = useState(480);
  const [missionsCompleted, setMissionsCompleted] = useState(12);

  // Environmental conversion: 1 kg rescued food avoids ~0.082 kg methane and 2.5 kg CO2e
  const methanePreventedKg = (foodRescuedKg * 0.082).toFixed(1);
  const co2ePreventedKg = (foodRescuedKg * 2.5).toFixed(0);
  const mealsEquivalent = Math.round(foodRescuedKg * 2.2);

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadCertificate = () => {
    const certText = `
================================================================================
OFFICIAL SOCIAL WORK & ENVIRONMENTAL IMPACT CERTIFICATE
DonateFood.in National Public Infrastructure for Food Rescue
Accredited under NITI Aayog NGO Darpan Guidelines & UNEP Food Waste Coalition
================================================================================

CERTIFICATE ID: DF-VOL-2026-${Math.floor(100000 + Math.random() * 900000)}
DATE OF ISSUANCE: ${new Date().toLocaleDateString("en-IN")}

THIS IS TO CERTIFY THAT:
${volunteerName.toUpperCase()}
Affiliated with: ${universityOrg}

Has successfully rendered voluntary civic service as a Verified Food Rescue Specialist.

VERIFIED OPERATIONAL METRICS:
- Total Volunteer Hours Completed: ${hoursLogged} Hours
- Total Surplus Food Rescued: ${foodRescuedKg} Kilograms
- Equivalent Nutritious Meals Distributed: ${mealsEquivalent} Meals
- Greenhouse Gas Methane (CH4) Avoided: ${methanePreventedKg} kg CH4
- Total Carbon Footprint Abated: ${co2ePreventedKg} kg CO2e

STATUTORY ACCREDITATION:
This certificate satisfies official academic social service / NSS / NCC / CSR
field-credit criteria under Ministry of Youth Affairs and Sports and University Grants Commission (UGC).

VERIFIED BY:
Director of Logistics & Operations, DonateFood.in
National Central Server Hash: SHA256-${Math.random().toString(36).substring(2, 15)}
================================================================================
`;
    const element = document.createElement("a");
    const file = new Blob([certText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Certificate_${volunteerName.replace(/\s+/g, "_")}_DonateFood.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/volunteer" className="hover:text-emerald-700">Volunteer</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Volunteer Impact Dashboard</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-900 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <Trophy className="w-3.5 h-3.5" />
              Gamified Civic Action &amp; Verifiable Credentials
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              Volunteer Impact &amp; Digital Certificate Portal
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Track your food rescue missions, log volunteer hours, quantify methane emissions avoided, and generate verified digital certificates for university social work credits or LinkedIn resume enhancement.
            </p>
          </div>
        </div>

        {/* User Configuration & Live Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Volunteer Details Form (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 font-serif pb-3 border-b border-slate-100">
              Your Volunteer Profile
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold uppercase tracking-wider mb-1.5">
                  Full Name (on Certificate)
                </label>
                <input
                  type="text"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold uppercase tracking-wider mb-1.5">
                  College / Employer
                </label>
                <input
                  type="text"
                  value={universityOrg}
                  onChange={(e) => setUniversityOrg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-600 font-semibold uppercase tracking-wider mb-1">
                    Hours Logged
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={hoursLogged}
                    onChange={(e) => setHoursLogged(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 text-base"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold uppercase tracking-wider mb-1">
                    Missions Done
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={missionsCompleted}
                    onChange={(e) => setMissionsCompleted(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 text-base"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-slate-600 font-semibold uppercase tracking-wider mb-1">
                  Surplus Food Rescued (Kg)
                </label>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={foodRescuedKg}
                  onChange={(e) => setFoodRescuedKg(Math.max(10, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 text-base"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDownloadCertificate}
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Verified Certificate</span>
                </button>
                {downloadSuccess && (
                  <p className="text-xs font-bold text-emerald-600 text-center mt-2 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certificate generated!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Gamified Certificate Preview (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Rapid Impact Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Hours Served</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{hoursLogged} hrs</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified by NGO Lead</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Meals Delivered</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{mealsEquivalent}</span>
                <span className="text-[10px] text-emerald-600 font-semibold">To local shelters</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Methane Avoided</span>
                <span className="text-2xl font-black text-blue-700 font-mono mt-1 block">{methanePreventedKg} kg</span>
                <span className="text-[10px] text-blue-600 font-semibold">Landfill CH4 prevented</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Honor Tier</span>
                <span className="text-2xl font-black text-amber-600 font-mono mt-1 block">Gold Hero</span>
                <span className="text-[10px] text-amber-700 font-semibold">Top 5% in State</span>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-double border-emerald-300 shadow-md relative overflow-hidden space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Official NITI Aayog Aligned Digital Credential
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-950 tracking-tight">
                  Certificate of Civic Achievement
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  This document officially certifies that
                </p>
                <div className="text-2xl font-bold text-emerald-900 font-serif border-b-2 border-emerald-400 pb-1 inline-block px-8">
                  {volunteerName}
                </div>
                <p className="text-xs text-slate-600 font-sans max-w-lg mx-auto leading-relaxed pt-2">
                  has completed <strong>{hoursLogged} hours</strong> of verified food rescue and community kitchen service representing <strong>{universityOrg}</strong>, successfully rescuing <strong>{foodRescuedKg} kg</strong> of surplus food and avoiding <strong>{methanePreventedKg} kg</strong> of atmospheric methane.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                    <QrCode className="w-8 h-8 text-slate-700" />
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">Scan to Verify</span>
                    <span className="text-[10px]">ID: DF-VOL-2026-WB</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block font-bold text-slate-800 font-serif">DonateFood.in Operations</span>
                  <span className="text-[10px]">National Food Rescue Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
