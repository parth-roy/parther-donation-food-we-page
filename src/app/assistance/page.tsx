"use client";

import React, { useState } from "react";
import { getAllCities, CityLocation } from "@/data/geography";
import { VERIFIED_NGOS } from "@/data/ngos";
import {
  MapPin,
  Shield,
  Clock,
  Phone,
  Navigation,
  CheckCircle,
  AlertCircle,
  Utensils,
  EyeOff,
  Heart,
} from "lucide-react";

export default function AssistancePage() {
  const cities = getAllCities();
  const [selectedCitySlug, setSelectedCitySlug] = useState("barrackpore");
  const [activeFilter, setActiveFilter] = useState<"all" | "cooked" | "langar" | "shelter">("all");

  const activeCity = cities.find((c) => c.slug === selectedCitySlug) || cities[0];
  const cityNgos = VERIFIED_NGOS.filter((n) => n.citySlug === activeCity.slug);

  // Mock community kitchens, langars, and distribution points
  const communityKitchens = [
    {
      id: "ck-1",
      name: `${activeCity.name} Jan Aahar Kendra & Annapurna Kitchen`,
      type: "Free Community Kitchen",
      timings: "11:30 AM - 03:30 PM & 07:00 PM - 09:30 PM",
      address: `Near ${activeCity.surplusHotspots[0] || "Station Area"}, ${activeCity.name}`,
      mealsPerDay: 850,
      dietary: "100% Pure Vegetarian Meals",
      status: "Serving Now",
      managedBy: cityNgos[0]?.name || "Verified Local Rescue Trust",
      emergencyContact: activeCity.emergencyHelpline,
    },
    {
      id: "ck-2",
      name: `${activeCity.name} Gurdwara Guru Nanak Langar Hall`,
      type: "Continuous Langar",
      timings: "Open 24 Hours (All Welcome)",
      address: `Main Trunk Road, ${activeCity.name}`,
      mealsPerDay: 1400,
      dietary: "Hot Dal, Roti, Rice & Sabzi",
      status: "Serving Now",
      managedBy: "Community Langar Seva Committee",
      emergencyContact: activeCity.emergencyHelpline,
    },
    {
      id: "ck-3",
      name: `Maa Canteen & Night Shelter Nutrition Point`,
      type: "Municipal Subsidized / Free Relief",
      timings: "12:00 PM - 03:00 PM",
      address: `Opposite Sub-Divisional Hospital, ${activeCity.name}`,
      mealsPerDay: 600,
      dietary: "Balanced Rice, Dal & Seasonal Veg",
      status: "Preparing Dinner",
      managedBy: cityNgos[1]?.name || "City Municipal Health Mission",
      emergencyContact: activeCity.emergencyHelpline,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section: Full-Bleed Edge-to-Edge Panoramic Display */}
      <section className="w-full p-0 m-0 border-b border-gray-200/80 bg-white overflow-hidden">
        <img
          src="/images/need-food.webp"
          alt="DonateFood.in Food Assistance - Find Free Nutritious Meals Near You"
          className="w-full h-auto object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </section>

      {/* Main Assistance Content Section */}
      <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Privacy Guarantee Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06571a]/10 text-[#06571a] text-xs font-bold uppercase tracking-wider mb-3">
            <EyeOff className="w-3.5 h-3.5 text-[#fe7801]" />
            <span>Zero-Data-Extraction Privacy Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif mb-2">
            Find Free Nutritious Meals Near You
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            No sign-ups, no registration, no Aadhaar card, and no phone numbers required. Everyone is
            welcome at our verified community kitchens, langars, and food banks.
          </p>
        </div>

      {/* Privacy Shield Notice (White Mode) */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-900 border border-blue-200 rounded-2xl p-4 sm:p-6 mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-white border border-blue-200 text-blue-700 shrink-0 shadow-2xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950">Privacy-First Humanitarian Infrastructure</h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              We will never ask for your identity or track your location. All meals are provided free of
              charge with dignity and respect.
            </p>
          </div>
        </div>

        {/* Approximate Area Selector */}
        <div className="w-full sm:w-auto shrink-0">
          <label className="block text-[10px] uppercase font-bold text-blue-900 mb-1">
            Choose Approximate Area:
          </label>
          <select
            value={selectedCitySlug}
            onChange={(e) => setSelectedCitySlug(e.target.value)}
            className="w-full sm:w-auto bg-white text-slate-900 border border-blue-300 text-xs rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
          >
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.name} ({city.districtName}, {city.stateName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Map Visualizer Placeholder & Distribution Centers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left 2 Cols: Distribution Centers List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-blue-600" />
              <span>Active Kitchens in {activeCity.name}</span>
            </h2>
            <span className="text-xs text-gray-500 font-mono">
              {communityKitchens.length} Points Operating Today
            </span>
          </div>

          <div className="space-y-4">
            {communityKitchens.map((kitchen) => (
              <div
                key={kitchen.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                        {kitchen.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {kitchen.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900">{kitchen.name}</h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg self-start">
                    {kitchen.mealsPerDay} meals daily
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 bg-slate-50 p-3 rounded-xl mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{kitchen.timings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{kitchen.dietary}</span>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{kitchen.address}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 text-[11px]">
                    Supported by: <strong className="text-gray-800">{kitchen.managedBy}</strong>
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      kitchen.name + " " + activeCity.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 font-bold hover:text-blue-800"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Walking Directions</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Emergency Hotlines & Area Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-mono mb-3">
              Area Relief Coordinator
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] block">Emergency Food Helpline:</span>
                <span className="font-mono font-bold text-base text-emerald-700">
                  {activeCity.emergencyHelpline}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Disaster Zone Classification:</span>
                <span className="font-bold text-gray-800">{activeCity.disasterZoneTier} (Operational)</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Active NGO Hubs:</span>
                <span className="font-bold text-gray-800">{activeCity.activeNgosCount} Verified Hubs</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-xs text-amber-900">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-950 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Special Assistance for Elderly or Disabled
            </h4>
            <p className="text-[11px] leading-relaxed text-amber-800 mb-3">
              If you or someone you know is unable to walk to a kitchen due to disability or age,
              neighborhood volunteer squads can deliver meals directly through Level-5 verified partners.
            </p>
            <a
              href={`tel:${activeCity.emergencyHelpline}`}
              className="w-full text-center block py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition-colors"
            >
              Call Local Helpline ({activeCity.emergencyHelpline})
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
