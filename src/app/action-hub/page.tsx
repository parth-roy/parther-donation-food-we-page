"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Navigation,
  Search,
  Truck,
  Building,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Phone,
  Flame,
} from "lucide-react";
import { VernacularFaq } from "@/components/shared/VernacularFaq";

interface RecoveryNode {
  id: string;
  name: string;
  type: "Community Kitchen" | "Food Bank Warehouse" | "Shelter Distribution Point" | "Hospital Pantry";
  district: string;
  state: string;
  distanceKm: number;
  openNow: boolean;
  mealsServedToday: number;
  acceptingCookedSurplus: boolean;
  volunteersActive: number;
  phone: string;
  address: string;
}

const SAMPLE_RECOVERY_NODES: RecoveryNode[] = [
  {
    id: "kol-01",
    name: "Park Circus Central Food Rescue Hub",
    type: "Community Kitchen",
    district: "Kolkata",
    state: "West Bengal",
    distanceKm: 1.4,
    openNow: true,
    mealsServedToday: 1850,
    acceptingCookedSurplus: true,
    volunteersActive: 14,
    phone: "+91 98301 22910",
    address: "24B Park Circus Avenue, Near CIT Park, Kolkata - 700017",
  },
  {
    id: "kol-02",
    name: "Howrah Railway Station Night Kitchen",
    type: "Shelter Distribution Point",
    district: "Howrah",
    state: "West Bengal",
    distanceKm: 3.8,
    openNow: true,
    mealsServedToday: 2400,
    acceptingCookedSurplus: true,
    volunteersActive: 22,
    phone: "+91 98311 00219",
    address: "Platform 14 Transit Shed, Howrah Station Complex - 711101",
  },
  {
    id: "kol-03",
    name: "Salt Lake Sector V Tech-Canteen Bank",
    type: "Food Bank Warehouse",
    district: "North 24 Parganas",
    state: "West Bengal",
    distanceKm: 6.2,
    openNow: true,
    mealsServedToday: 1200,
    acceptingCookedSurplus: true,
    volunteersActive: 9,
    phone: "+91 98322 88102",
    address: "Block EP & GP, Sector V, Bidhannagar, Kolkata - 700091",
  },
  {
    id: "pur-01",
    name: "Puruliya Aspirational Nutrition Node",
    type: "Community Kitchen",
    district: "Puruliya",
    state: "West Bengal",
    distanceKm: 215.0,
    openNow: true,
    mealsServedToday: 950,
    acceptingCookedSurplus: false,
    volunteersActive: 18,
    phone: "+91 94340 77215",
    address: "Manbazar Road, Puruliya District - 723101",
  },
  {
    id: "med-01",
    name: "Kharagpur Bypass Relief Dispatch",
    type: "Hospital Pantry",
    district: "Paschim Medinipur",
    state: "West Bengal",
    distanceKm: 118.0,
    openNow: true,
    mealsServedToday: 1450,
    acceptingCookedSurplus: true,
    volunteersActive: 11,
    phone: "+91 97320 66450",
    address: "Station Road, Kharagpur Bypass, Paschim Medinipur - 721301",
  },
];

export default function ActionHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [onlySurplusReady, setOnlySurplusReady] = useState(false);

  const filteredNodes = SAMPLE_RECOVERY_NODES.filter((node) => {
    const matchesSearch =
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || node.type === selectedType;
    const matchesSurplus = !onlySurplusReady || node.acceptingCookedSurplus;
    return matchesSearch && matchesType && matchesSurplus;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-900 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
              <Compass className="w-3.5 h-3.5" />
              Geo-Spatial Action Hub &amp; Live Recovery Grid
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              Interactive Food Rescue &amp; Volunteer Action Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Find verified food drop-off points, emergency community kitchens, and active volunteer rescue missions near you. Geo-synchronized with Google Business Profiles and local hunger hot spots.
            </p>
          </div>
        </div>

        {/* Map Mockup & Live Feed View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Node Directory (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Search & Filters */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search by city, district, or landmark (e.g. Kolkata, Park Circus, Puruliya)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-emerald-600 text-sm font-medium text-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedType("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  All Hubs ({SAMPLE_RECOVERY_NODES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("Community Kitchen")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === "Community Kitchen" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  Community Kitchens
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("Shelter Distribution Point")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === "Shelter Distribution Point" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  Shelters
                </button>
                <button
                  type="button"
                  onClick={() => setOnlySurplusReady(!onlySurplusReady)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${onlySurplusReady ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-800 border border-emerald-200"}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accepting Cooked Food</span>
                </button>
              </div>
            </div>

            {/* Nodes List */}
            <div className="space-y-4">
              {filteredNodes.map((node) => (
                <div
                  key={node.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          {node.type}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          {node.district}, {node.state} (~{node.distanceKm} km)
                        </span>
                        {node.openNow && (
                          <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                            Active Now
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-slate-950 font-serif">
                        {node.name}
                      </h3>
                      <p className="text-xs text-slate-500">{node.address}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <a
                        href={`tel:${node.phone}`}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Call Node</span>
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Today&apos;s Output</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {node.mealsServedToday.toLocaleString()} Meals
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Volunteers On-Site</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {node.volunteersActive} Active
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Surplus Acceptance</span>
                      <span className={`text-xs font-bold ${node.acceptingCookedSurplus ? "text-emerald-700" : "text-slate-400"}`}>
                        {node.acceptingCookedSurplus ? "Instant Handover" : "Dry Grains Only"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Geo-Spatial Radar & Gamified Volunteer Link (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Radar Mockup */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  Live Dispatch Radar
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata HQ 22.5726° N, 88.3639° E</span>
              </div>

              {/* Graphical Radar Grid Mockup */}
              <div className="w-full h-56 bg-slate-950/80 rounded-2xl border border-slate-800 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <div className="w-40 h-40 rounded-full border border-emerald-500/30 flex items-center justify-center animate-ping"></div>
                <div className="w-24 h-24 rounded-full border border-emerald-500/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]"></div>
                </div>

                {/* Node blips */}
                <div className="absolute top-12 left-20 flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-slate-900/90 px-2 py-0.5 rounded border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Park Circus (1.4 km)
                </div>
                <div className="absolute bottom-10 right-16 flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  Howrah Hub (3.8 km)
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white font-serif">
                  Become a Certified Food Rescue Volunteer
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join night-shift van dispatch teams or inspect temperature hygiene at community kitchens. Earn official social work credits and digital certificates.
                </p>
                <Link
                  href="/volunteer/dashboard"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Open Volunteer Impact Dashboard</span>
                </Link>
              </div>
            </div>

            {/* Quick Emergency Assistance Callout */}
            <div className="bg-amber-500/10 border border-amber-300/80 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Urgent Beneficiary Assistance</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                If you are a shelter coordinator or community leader seeking immediate food delivery for over 50 people, our rapid fleet distributes within 90 minutes across Kolkata and surrounding districts.
              </p>
              <Link
                href="/assistance"
                className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 pt-1"
              >
                <span>Submit Emergency Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Vernacular NLP FAQs for voice search & beneficiaries */}
        <VernacularFaq />
      </div>
    </div>
  );
}
