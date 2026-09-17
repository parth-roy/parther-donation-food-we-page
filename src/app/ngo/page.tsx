"use client";

import React, { useState } from "react";
import { VERIFIED_NGOS, NGOProfile } from "@/data/ngos";
import { formatNumber } from "@/utils/format";
import {
  ShieldCheck,
  Award,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  ExternalLink,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function NgoVerificationPage() {
  const [searchDarpan, setSearchDarpan] = useState("WB/2019/0248819");
  const [searchedNgo, setSearchedNgo] = useState<NGOProfile | null>(
    VERIFIED_NGOS.find((n) => n.darpanId === "WB/2019/0248819") || VERIFIED_NGOS[0]
  );
  const [searchStatus, setSearchStatus] = useState<"found" | "not_found" | "idle">("found");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchDarpan.trim().toLowerCase();
    const found = VERIFIED_NGOS.find(
      (n) => n.darpanId.toLowerCase() === query || n.name.toLowerCase().includes(query)
    );

    if (found) {
      setSearchedNgo(found);
      setSearchStatus("found");
    } else {
      setSearchedNgo(null);
      setSearchStatus("not_found");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section: Full-Bleed Edge-to-Edge Panoramic Display */}
      <section className="w-full p-0 m-0 border-b border-gray-200/80 bg-white overflow-hidden">
        <img
          src="/images/ngo.webp"
          alt="DonateFood.in NGO Network - Institutional Partnerships & DARPAN Validation"
          className="w-full h-auto object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </section>

      {/* Main NGO Content Section */}
      <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06571a]/10 text-[#06571a] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#fe7801]" />
            <span>Institutional Verification Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif mb-2">
            NGO Network &amp; NITI Aayog DARPAN Validation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Enforcing strict multi-tiered vetting. Integrating DARPAN Unique ID, 12A/80G tax exemptions,
            FCRA registration, and FSSAI surplus licensing.
          </p>
        </div>

      {/* Interactive DARPAN API Verification Lookup */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-md mb-12">
        <div className="max-w-xl mx-auto text-center mb-6">
          <h2 className="text-base font-bold text-gray-900">
            NITI Aayog DARPAN Real-Time Verification Simulator
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Query any registered NGO by DARPAN ID or organization name to view their platform verification
            tier and legal clearances.
          </p>
        </div>

        <form onSubmit={handleLookup} className="max-w-lg mx-auto flex gap-2 mb-6">
          <input
            type="text"
            value={searchDarpan}
            onChange={(e) => setSearchDarpan(e.target.value)}
            placeholder="e.g. WB/2019/0248819 or Annapurna"
            className="flex-1 text-xs p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Verify</span>
          </button>
        </form>

        {/* Lookup Result Card */}
        {searchStatus === "found" && searchedNgo && (
          <div className="bg-purple-50/50 rounded-xl border-2 border-purple-200 p-5 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border border-purple-200">
                  Level {searchedNgo.tier} • {searchedNgo.tierLabel}
                </span>
                <h3 className="text-lg font-bold text-gray-950 mt-1">{searchedNgo.name}</h3>
                <span className="text-xs font-mono text-purple-900 font-semibold">
                  DARPAN ID: {searchedNgo.darpanId}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                  {formatNumber(searchedNgo.mealsRescuedTotal)} Meals Rescued
                </span>
              </div>
            </div>

            {/* Check Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-4">
              <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                <span className="text-gray-400 block text-[10px]">12A &amp; 80G Status</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                <span className="text-gray-400 block text-[10px]">FCRA Clearance</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {searchedNgo.fcraRegistered ? "Registered" : "Domestic"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                <span className="text-gray-400 block text-[10px]">Cold-Chain Fleet</span>
                <span className="font-bold text-gray-800">
                  {searchedNgo.coldChainCapable ? "Active (≤7°C)" : "Standard Vans"}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-purple-100">
                <span className="text-gray-400 block text-[10px]">FSSAI License</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              <strong>Operational Base:</strong> {searchedNgo.address}
            </p>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-purple-100">
              <span className="text-gray-500 font-mono text-[11px]">
                PAN: {searchedNgo.panNumber} | FSSAI: {searchedNgo.fssaiLicenseNo}
              </span>
              <span className="text-purple-700 font-bold">Approved for Corporate FBO Pickups</span>
            </div>
          </div>
        )}

        {searchStatus === "not_found" && (
          <div className="bg-red-50 text-red-900 border border-red-200 p-4 rounded-xl max-w-lg mx-auto text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>No NGO found with that DARPAN ID. Please check the registration or apply below.</span>
          </div>
        )}
      </div>

      {/* The 5-Tier Verification Matrix Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs mb-12">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Multi-Tiered Verification Matrix &amp; Privileges
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Strict tiers protect food quality, ensure donor confidence, and eliminate fraudulent claims.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-500 uppercase font-mono text-[10px] border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Tier Level</th>
                <th className="py-3 px-4">Prerequisite Documentation</th>
                <th className="py-3 px-4">Platform Operational Privileges</th>
                <th className="py-3 px-4">CSR Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              <tr>
                <td className="py-3.5 px-4 font-bold text-gray-400">Level 1: Unverified</td>
                <td className="py-3.5 px-4">Basic public directory contact data</td>
                <td className="py-3.5 px-4">Listed for informational purposes only. Cannot claim active donations.</td>
                <td className="py-3.5 px-4 text-gray-400">Ineligible</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-blue-600">Level 2: Claimed</td>
                <td className="py-3.5 px-4">Email and OTP phone authentication</td>
                <td className="py-3.5 px-4">Can update profile, operating hours, and service areas.</td>
                <td className="py-3.5 px-4 text-gray-400">Ineligible</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-teal-600">Level 3: Document-Verified</td>
                <td className="py-3.5 px-4">PAN Card, Trust Deed / Society Certificate</td>
                <td className="py-3.5 px-4">Can accept small-scale household and neighborhood donations.</td>
                <td className="py-3.5 px-4 text-gray-400">Ineligible</td>
              </tr>
              <tr className="bg-purple-50/40">
                <td className="py-3.5 px-4 font-bold text-purple-700">Level 4: Partner</td>
                <td className="py-3.5 px-4 font-medium">NITI Aayog DARPAN ID, 12A/80G, FSSAI Registration</td>
                <td className="py-3.5 px-4">
                  Eligible for commercial FBO pickups, algorithmic routing, and large-scale event logistics.
                </td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">Eligible</td>
              </tr>
              <tr className="bg-emerald-50/50">
                <td className="py-3.5 px-4 font-bold text-emerald-800">Level 5: Trusted / Active</td>
                <td className="py-3.5 px-4 font-medium">
                  Consistent SLA compliance (&gt;95%), inspected cold storage, verified impact metrics
                </td>
                <td className="py-3.5 px-4">
                  Priority dynamic routing, autonomous vehicle dispatch, disaster response deployment.
                </td>
                <td className="py-3.5 px-4 text-emerald-800 font-bold">Priority CSR Allocation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
