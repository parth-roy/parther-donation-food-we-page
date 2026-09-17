"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { VERIFIED_NGOS, NGOProfile } from "@/data/ngos";
import { getAllCities, CityLocation } from "@/data/geography";
import { formatNumber } from "@/utils/format";
import {
  MapPin,
  Navigation,
  ShieldCheck,
  Truck,
  Clock,
  Phone,
  ArrowRight,
  Search,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

interface NgoDistanceItem {
  ngo: NGOProfile;
  distanceKm: number;
  city: CityLocation;
}

export function NearestFoodBankLocator() {
  const cities = useMemo(() => getAllCities(), []);
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>("barrackpore");
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [activeRadiusKm, setActiveRadiusKm] = useState<number>(35);

  // Match coordinates based on selected city or user geolocation
  const activeLocation = useMemo(() => {
    if (userCoords) {
      return userCoords;
    }
    const found = cities.find((c) => c.slug === selectedCitySlug) || cities[0];
    return { lat: found.lat, lng: found.lng };
  }, [userCoords, selectedCitySlug, cities]);

  // Compute sorted NGOs by distance
  const sortedNgos = useMemo(() => {
    const list: NgoDistanceItem[] = [];

    for (const ngo of VERIFIED_NGOS) {
      const city = cities.find((c) => c.slug === ngo.citySlug);
      if (city) {
        const dist = calculateHaversineKm(
          activeLocation.lat,
          activeLocation.lng,
          city.lat,
          city.lng
        );
        list.push({ ngo, distanceKm: dist, city });
      }
    }

    return list.sort((a, b) => a.distanceKm - b.distanceKm);
  }, [activeLocation, cities]);

  const nearbyNgos = useMemo(() => {
    const filtered = sortedNgos.filter((item) => item.distanceKm <= activeRadiusKm);
    return filtered.length > 0 ? filtered : sortedNgos.slice(0, 3);
  }, [sortedNgos, activeRadiusKm]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        setGeoError(
          err.code === 1
            ? "Location permission was denied. Please select your nearest city below."
            : "Unable to retrieve precise location. Please select your city manually."
        );
      },
      { timeout: 8000, maximumAge: 60000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
      {/* Top Banner with Brand Gradient */}
      <div className="bg-gradient-to-r from-[#06571a] via-[#0b6b22] to-[#12802d] text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-2.5 backdrop-blur-xs">
              <Navigation className="w-3.5 h-3.5 text-[#fe7801]" />
              <span>Real-Time Proximity Geo-Locator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Find Nearest Verified Food Bank &amp; Rescue Hub
            </h2>
            <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
              Algorithmic dispatch matching your exact location to verified Level 4 &amp; Level 5 NGOs with active cold-chain fleets and under-60-minute response SLAs.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fe7801] hover:bg-[#e06a00] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? "animate-spin" : ""}`} />
              <span>{isLocating ? "Locating..." : userCoords ? "Update GPS Location" : "Detect My Location"}</span>
            </button>
          </div>
        </div>

        {/* Location Selector Fallback Row */}
        <div className="mt-6 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-white/70 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#fe7801]" /> Or Select Metro Hub:
          </span>
          <select
            value={userCoords ? "" : selectedCitySlug}
            onChange={(e) => {
              setUserCoords(null);
              setSelectedCitySlug(e.target.value);
            }}
            className="bg-white/10 text-white font-semibold px-3.5 py-1.5 rounded-xl border border-white/20 hover:bg-white/20 focus:bg-white/20 focus:outline-hidden transition-all text-xs cursor-pointer"
          >
            {userCoords && <option value="" className="text-slate-900">Current GPS Coords Active</option>}
            {cities.map((city) => (
              <option key={city.slug} value={city.slug} className="text-slate-900">
                {city.name} ({city.stateName})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 ml-auto text-xs">
            <span className="text-white/70">Radius:</span>
            {[25, 50, 100].map((r) => (
              <button
                key={r}
                onClick={() => setActiveRadiusKm(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeRadiusKm === r
                    ? "bg-white text-[#06571a]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {r} km
              </button>
            ))}
          </div>
        </div>

        {geoError && (
          <div className="mt-3 text-[11px] text-amber-200 flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{geoError}</span>
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="p-6 sm:p-8 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {nearbyNgos.length} Verified Food Banks Within Range (Ordered by Distance)
            </span>
          </div>
          {userCoords && (
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md font-semibold">
              GPS: {userCoords.lat.toFixed(3)}°N, {userCoords.lng.toFixed(3)}°E
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nearbyNgos.map(({ ngo, distanceKm, city }) => (
            <div
              key={ngo.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Tier {ngo.tier} • {ngo.tierLabel}
                  </span>
                  <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {distanceKm.toFixed(1)} km
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-950 leading-snug mb-1">
                  {ngo.name}
                </h3>

                <p className="text-[11px] font-mono text-slate-500 mb-3">
                  DARPAN: {ngo.darpanId}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Turnaround SLA:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {ngo.avgResponseTimeMin} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Cold Chain (≤7°C):</span>
                    <span className={`font-semibold text-[11px] ${ngo.coldChainCapable ? "text-cyan-700" : "text-slate-500"}`}>
                      {ngo.coldChainCapable ? "Certified Fleet" : "Standard Fleet"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Buffer Capacity:</span>
                    <span className="font-mono font-bold text-slate-800 text-[11px]">
                      {formatNumber(ngo.storageCapacityKg)} kg
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${ngo.phone}`}
                    className="flex-1 py-2 px-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{ngo.phone}</span>
                  </a>
                  <Link
                    href={`/ngo/${ngo.stateSlug}/${ngo.citySlug}/${ngo.slug}`}
                    className="py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-1 transition-all border border-purple-200"
                  >
                    <Award className="w-3 h-3 text-purple-600" />
                    <span>Audit</span>
                  </Link>
                </div>

                <Link
                  href={`/donate?city=${city.slug}&ngo=${ngo.slug}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#06571a] hover:bg-[#054615] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  <span>Route Donation to This Hub</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
