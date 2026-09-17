import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCityBySlug, getAllCities } from "@/data/geography";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  MapPin,
  Utensils,
  Clock,
  Heart,
  Phone,
  Navigation,
  Shield,
  EyeOff,
  Building,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    state: string;
    district: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    state: city.stateSlug,
    district: city.districtSlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, district, city: citySlug } = await params;
  const city = getCityBySlug(state, district, citySlug);
  if (!city) return { title: "Location Not Found" };

  return {
    title: `Free Food & Community Kitchens in ${city.name} | DonateFood.in`,
    description: `Find free nutritious meals, langars, and food assistance centers in ${city.name}, ${city.stateName}. Privacy-first humanitarian service, no registration required.`,
    alternates: {
      canonical: `https://donatefood.in/assistance/${state}/${district}/${citySlug}`,
    },
  };
}

export default async function CityAssistancePage({ params }: PageProps) {
  const { state, district, city: citySlug } = await params;
  const city = getCityBySlug(state, district, citySlug);

  if (!city) {
    notFound();
  }

  const localKitchens = [
    {
      id: "ck-loc-1",
      name: `${city.name} Annapurna Community Kitchen`,
      type: "Free Public Meal Distribution",
      timings: "11:30 AM - 03:00 PM & 07:30 PM - 09:30 PM",
      location: `Near ${city.surplusHotspots[0] || "Railway Station"}, ${city.name}`,
      mealsPerDay: 750,
      dietary: "Fresh Cooked Dal, Rice, Subzi (100% Veg)",
    },
    {
      id: "ck-loc-2",
      name: `${city.name} Municipal Welfare Food Point`,
      type: "Subsidized & Free Hunger Relief",
      timings: "12:00 PM - 02:30 PM",
      location: `Station Approach Road, ${city.name}`,
      mealsPerDay: 500,
      dietary: "Nutritious Balanced Lunch",
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* JSON-LD Place Schema */}
      <JsonLd
        type="LocalCommunityHub"
        data={{
          name: `Free Food Assistance Hub - ${city.name}`,
          streetAddress: city.surplusHotspots[0],
          city: city.name,
          state: city.stateName,
          pincode: city.pincode,
          lat: city.lat,
          lng: city.lng,
          telephone: city.emergencyHelpline,
        }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-blue-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/assistance" className="hover:text-blue-700">
          Assistance
        </Link>
        <span>/</span>
        <span className="text-gray-700">{city.districtName}</span>
        <span>/</span>
        <span className="text-blue-800 font-bold">{city.name}</span>
      </nav>

      {/* Banner (White Mode) */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 text-slate-900 rounded-3xl p-6 sm:p-10 mb-8 border border-blue-200 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <EyeOff className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero-Tracking Humanitarian Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-3 text-slate-950">
            Free Nutritious Meals in <span className="text-blue-700">{city.name}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            All citizens in need are welcome. No documentation, registration, or identity proofs
            required. Hot, freshly cooked meals distributed with dignity.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
            <span>District: {city.districtName}</span>
            <span>•</span>
            <span>Emergency Food Line: {city.emergencyHelpline}</span>
          </div>
        </div>
      </div>

      {/* Distribution Centers */}
      <div className="space-y-4 mb-12">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-blue-600" />
          <span>Active Community Kitchens in {city.name}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localKitchens.map((k) => (
            <div
              key={k.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:border-blue-400 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
                  {k.type}
                </span>
                <span className="text-xs font-bold font-mono text-emerald-700">
                  {k.mealsPerDay} Meals Served
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900">{k.name}</h3>

              <div className="space-y-1.5 text-xs text-gray-600 bg-slate-50 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{k.timings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{k.dietary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{k.location}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 text-[11px]">Free For All</span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(k.name + " " + city.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
