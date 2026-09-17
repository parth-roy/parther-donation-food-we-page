import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { resolveCityLocation, getTopSeedCities } from "@/utils/dynamicLocation";
import { getDynamicNgosForCity } from "@/utils/dynamicNgos";
import { FSSAI_SURPLUS_REGULATIONS } from "@/data/compliance";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/utils/format";
import {
  Utensils,
  MapPin,
  ShieldCheck,
  Building,
  Phone,
  ArrowRight,
  TrendingUp,
  Thermometer,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
    district: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const seedCities = getTopSeedCities();
  return seedCities.map((city) => ({
    state: city.stateSlug,
    district: city.districtSlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, district, city: citySlug } = await params;
  const city = resolveCityLocation(state, district, citySlug);

  return {
    title: `Donate Food in ${city.name}, ${city.districtName} | Verified Rescue Network`,
    description: `Safely donate surplus food from restaurants, weddings, and cafeterias in ${city.name}, ${city.stateName}. FSSAI compliant, Good Samaritan protected, pickup by verified NGOs.`,
    alternates: {
      canonical: `https://donatefood.in/donate-food/${state}/${district}/${citySlug}`,
    },
    openGraph: {
      title: `Surplus Food Donation in ${city.name} (${city.districtName})`,
      description: `Support community kitchens and food banks in ${city.name}. Instant FSSAI digital compliance handover.`,
      url: `https://donatefood.in/donate-food/${state}/${district}/${citySlug}`,
    },
  };
}

export default async function CityDonationPage({ params }: PageProps) {
  const { state, district, city: citySlug } = await params;
  const city = resolveCityLocation(state, district, citySlug);
  const localNgos = getDynamicNgosForCity(city);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* JSON-LD for Local Search Entity & Dataset */}
      <JsonLd
        type="LocalCommunityHub"
        data={{
          name: `DonateFood.in Food Rescue Hub - ${city.name}`,
          streetAddress: city.surplusHotspots[0],
          city: city.name,
          state: city.stateName,
          pincode: city.pincode,
          lat: city.lat,
          lng: city.lng,
          telephone: city.emergencyHelpline,
        }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-700">{city.stateName}</span>
        <span>/</span>
        <span className="text-gray-700">{city.districtName}</span>
        <span>/</span>
        <span className="text-emerald-800 font-bold">{city.name}</span>
      </nav>

      {/* Header Banner (White Mode) */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-emerald-200 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {city.name} ({city.pincode}) • {city.districtName} District
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Donate Surplus Food in <span className="text-emerald-700">{city.name}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Connect directly with {city.activeNgosCount} verified food rescue teams and{" "}
            {city.communityKitchensCount} community kitchens serving {city.populationCovered} residents in{" "}
            {city.name}, {city.stateName}.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
            >
              Dispatch Food Pickup in {city.name}
            </Link>
            <Link
              href={`/assistance/${state}/${district}/${citySlug}`}
              className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs uppercase tracking-wider rounded-xl border border-emerald-300 transition-all shadow-2xs"
            >
              View Free Food Distribution Points
            </Link>
          </div>
        </div>
      </div>

      {/* Localized Metrics & Verified First-Party Data (Doorway Prevention) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
            Monthly Rescued Food
          </span>
          <span className="text-2xl font-black text-emerald-700 font-mono">
            {formatNumber(city.mealsDistributedMonth)}
          </span>
          <span className="text-[11px] text-gray-500 block mt-0.5">Nutritious meals delivered</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
            Verified Active Hubs
          </span>
          <span className="text-2xl font-black text-gray-900 font-mono">{city.activeNgosCount}</span>
          <span className="text-[11px] text-gray-500 block mt-0.5">NITI Aayog DARPAN checked</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
            Community Kitchens
          </span>
          <span className="text-2xl font-black text-blue-700 font-mono">
            {city.communityKitchensCount}
          </span>
          <span className="text-[11px] text-gray-500 block mt-0.5">Daily free food points</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
            Emergency Helpline
          </span>
          <span className="text-sm font-bold text-gray-900 font-mono block mt-1">
            {city.emergencyHelpline}
          </span>
          <span className="text-[11px] text-emerald-700 block mt-0.5 font-semibold">
            Disaster Zone: {city.disasterZoneTier}
          </span>
        </div>
      </div>

      {/* Local Verified NGOs Serving This Municipality */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Verified Rescue Partners in {city.name}
            </h2>
            <p className="text-xs text-gray-500">
              These organizations hold verified cold-chain and FSSAI surplus delivery clearances.
            </p>
          </div>
          <Link
            href={`/ngo-directory/${state}/${citySlug}`}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localNgos.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:border-emerald-500 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-purple-50 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-200">
                  Level {ngo.tier} • {ngo.tierLabel}
                </span>
                <span className="text-xs font-mono text-gray-400">DARPAN: {ngo.darpanId}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-1">{ngo.name}</h3>
              <p className="text-xs text-gray-600 mb-3">{ngo.address}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {ngo.acceptedFoodTypes.map((type) => (
                  <span
                    key={type}
                    className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-emerald-700 font-bold">
                  Avg SLA: {ngo.avgResponseTimeMin} mins pickup
                </span>
                <a
                  href={`tel:${ngo.phone}`}
                  className="font-bold text-gray-900 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ngo.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Surplus Hotspots in this City */}
      <div className="bg-slate-100 rounded-2xl p-6 mb-12 border border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 font-mono mb-2">
          Recognized Food Surplus Collection Corridors in {city.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Volunteer logistics units actively patrol these dining sectors and banquet hubs:
        </p>
        <div className="flex flex-wrap gap-2">
          {city.surplusHotspots.map((spot) => (
            <span
              key={spot}
              className="bg-white border border-gray-200 text-gray-800 text-xs px-3 py-1.5 rounded-xl font-medium shadow-2xs"
            >
              📍 {spot}
            </span>
          ))}
        </div>
      </div>

      {/* FSSAI 2019 Food Handling Protocol Checklist */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>FSSAI Safe Donation Guidelines for {city.name} Donors</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 mt-4">
          {FSSAI_SURPLUS_REGULATIONS.map((item) => (
            <div key={item.id} className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <strong className="text-emerald-950 block mb-1">
                {item.title} ({item.clause})
              </strong>
              <span>{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
