"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CityLocation, StateLocation } from "@/data/geography";
import { formatNumber } from "@/utils/format";
import {
  Search,
  MapPin,
  Building2,
  HeartHandshake,
  Truck,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Filter,
  Flame,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface LocationsExplorerProps {
  initialLocations: CityLocation[];
  states: StateLocation[];
}

export function LocationsExplorer({ initialLocations, states }: LocationsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  // Filter locations based on search query, state, and tier
  const filteredLocations = useMemo(() => {
    return initialLocations.filter((loc) => {
      // State filter
      if (selectedState !== "all" && loc.stateSlug !== selectedState) {
        return false;
      }

      // Tier filter
      if (selectedTier !== "all") {
        if (selectedTier === "tier-a" && loc.priorityTier !== "Tier A") return false;
        if (selectedTier === "tier-b" && loc.priorityTier !== "Tier B") return false;
      }

      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchName = loc.name.toLowerCase().includes(q);
        const matchDistrict = loc.districtName.toLowerCase().includes(q);
        const matchState = loc.stateName.toLowerCase().includes(q);
        const matchPincode = loc.pincode.includes(q);
        const matchHotspots = loc.surplusHotspots?.some((h) => h.toLowerCase().includes(q));

        return matchName || matchDistrict || matchState || matchPincode || matchHotspots;
      }

      return true;
    });
  }, [initialLocations, searchQuery, selectedState, selectedTier]);

  // Unique states present in locations list
  const availableStates = useMemo(() => {
    const map = new Map<string, string>();
    initialLocations.forEach((loc) => {
      if (!map.has(loc.stateSlug)) {
        map.set(loc.stateSlug, loc.stateName);
      }
    });
    return Array.from(map.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [initialLocations]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Control Panel */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
          {/* Real-time Search Box */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city name, district, state, PIN code, or surplus zone..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-gray-200 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#06571a] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* State Select Dropdown */}
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-gray-200 rounded-xl px-4 py-3 pr-9 text-xs font-bold text-gray-800 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#06571a]"
              >
                <option value="all">All States &amp; UTs ({availableStates.length})</option>
                {availableStates.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </span>
            </div>

            {/* Priority Tier Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-gray-200 text-xs font-bold">
              <button
                onClick={() => setSelectedTier("all")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedTier === "all"
                    ? "bg-[#06571a] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Tiers
              </button>
              <button
                onClick={() => setSelectedTier("tier-a")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedTier === "tier-a"
                    ? "bg-[#06571a] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tier A Metros
              </button>
              <button
                onClick={() => setSelectedTier("tier-b")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedTier === "tier-b"
                    ? "bg-[#06571a] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Tier B Cities
              </button>
            </div>
          </div>
        </div>

        {/* Live Active Query / Filter Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
          <div>
            Showing <strong className="text-gray-900 font-bold">{filteredLocations.length}</strong> active
            municipal hubs
            {selectedState !== "all" && (
              <span>
                {" "}
                in <strong className="text-[#06571a] font-bold">{availableStates.find((s) => s.slug === selectedState)?.name}</strong>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                matching &quot;<strong className="text-gray-900 font-bold">{searchQuery}</strong>&quot;
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-gray-400">
              LGD Local Government Directory 2026 Synchronized
            </span>
          </div>
        </div>
      </div>

      {/* Zero State Fallback */}
      {filteredLocations.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <MapPin className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No matching municipal hubs found</h3>
          <p className="text-xs text-gray-500">
            No city in our registry matched &quot;{searchQuery}&quot;. However, our dynamic engine can
            synthesize any valid Indian city on demand with zero 404s!
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedState("all");
              setSelectedTier("all");
            }}
            className="px-4 py-2 bg-[#06571a] text-white text-xs font-bold rounded-xl hover:bg-[#054615] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Grid of Hyperlocal Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLocations.map((loc) => (
          <div
            key={loc.slug}
            className="bg-white rounded-3xl p-6 border border-gray-200/85 hover:border-[#06571a]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Card Meta Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-gray-400">
                  {loc.districtName} • PIN {loc.pincode}
                </span>
                <div className="flex items-center gap-1.5">
                  {loc.priorityTier && (
                    <span className="bg-[#06571a]/10 text-[#06571a] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#06571a]/20">
                      {loc.priorityTier}
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {loc.disasterZoneTier}
                  </span>
                </div>
              </div>

              {/* City Title & Primary Link */}
              <Link
                href={`/donate-food/${loc.stateSlug}/${loc.districtSlug}/${loc.slug}`}
                className="group-hover:text-[#06571a] transition-colors inline-block"
              >
                <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-1.5">
                  <span>{loc.name}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#06571a] transition-opacity" />
                </h3>
              </Link>
              <div className="text-xs text-gray-500 font-semibold mb-3">
                {loc.stateName} • LGD #{loc.lgdCode || "N/A"}
              </div>

              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Active surplus food recovery network covering an estimated {loc.populationCovered} residents.
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Verified NGOs</span>
                  <span className="text-sm font-black text-gray-900">{loc.activeNgosCount} Hubs</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Monthly Meals</span>
                  <span className="text-sm font-black text-[#06571a]">
                    {formatNumber(loc.mealsDistributedMonth)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Relief Kitchens</span>
                  <span className="font-bold text-gray-800">{loc.communityKitchensCount} Kitchens</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold">Emergency Support</span>
                  <span className="font-bold text-red-600 font-mono text-[11px] truncate block">
                    {loc.emergencyHelpline}
                  </span>
                </div>
              </div>

              {/* Surplus Hotspots Pills */}
              {loc.surplusHotspots && loc.surplusHotspots.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Surplus Recovery Corridors:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {loc.surplusHotspots.slice(0, 3).map((h, i) => (
                      <span
                        key={i}
                        className="bg-emerald-50/70 text-emerald-800 text-[10px] font-medium px-2 py-0.5 rounded-md border border-emerald-100"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Action Buttons to All 4 Intent Hubs */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              {/* Primary Dedicated Hub Button */}
              <Link
                href={`/donate-food/${loc.stateSlug}/${loc.districtSlug}/${loc.slug}`}
                className="w-full bg-[#06571a] hover:bg-[#054615] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-between shadow-xs transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#fe7801]" />
                  <span>Open {loc.name} Donor Hub</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/70" />
              </Link>

              {/* 3 Intent Sub-Links */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-bold">
                <Link
                  href={`/assistance/${loc.stateSlug}/${loc.districtSlug}/${loc.slug}`}
                  className="bg-amber-50/80 hover:bg-amber-100 text-amber-900 py-1.5 px-2 rounded-lg text-center border border-amber-200/60 transition-colors"
                  title={`Find Free Food in ${loc.name}`}
                >
                  🍲 Free Food
                </Link>
                <Link
                  href={`/ngo-directory/${loc.stateSlug}/${loc.slug}`}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 px-2 rounded-lg text-center transition-colors"
                  title={`Verified NGOs in ${loc.name}`}
                >
                  🏢 NGOs
                </Link>
                <Link
                  href={`/volunteer/${loc.stateSlug}/${loc.slug}`}
                  className="bg-teal-50/80 hover:bg-teal-100 text-teal-900 py-1.5 px-2 rounded-lg text-center border border-teal-200/60 transition-colors"
                  title={`Volunteer in ${loc.name}`}
                >
                  🤝 Volunteer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
