import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { INDIAN_STATES, getStateBySlug } from "@/data/geography";
import { slugToTitleCase, TIER_A_B_CITIES_REGISTRY } from "@/utils/dynamicLocation";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/utils/format";
import {
  MapPin,
  Building,
  Utensils,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
  }>;
}

export async function generateStaticParams() {
  return INDIAN_STATES.map((s) => ({
    state: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateName = slugToTitleCase(stateSlug);

  return {
    title: `Surplus Food Rescue & Donation in ${stateName} | DonateFood.in`,
    description: `Statewide surplus food diversion network across ${stateName}. Direct connections with verified NGOs, community kitchens, and cold-chain logistics in all districts.`,
    alternates: {
      canonical: `https://donatefood.in/donate-food/${stateSlug}`,
    },
    openGraph: {
      title: `Donate Food in ${stateName} — State Food Rescue Network`,
      description: `Hyperlocal district directories and certified NGO partnerships across ${stateName}.`,
      url: `https://donatefood.in/donate-food/${stateSlug}`,
    },
  };
}

export default async function StateDonationPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateObj = getStateBySlug(stateSlug);
  const stateName = stateObj?.name || slugToTitleCase(stateSlug);

  // Collect all cities in this state
  const stateCities = TIER_A_B_CITIES_REGISTRY.filter((c) => c.stateSlug === stateSlug);
  const fallbackCities = stateObj ? stateObj.districts.flatMap((d) => d.cities) : [];
  const activeCities = stateCities.length > 0 ? stateCities : fallbackCities;

  const totalMeals = activeCities.reduce((acc, c) => acc + c.mealsDistributedMonth, 125000);
  const totalNgos = activeCities.reduce((acc, c) => acc + c.activeNgosCount, 28);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/donate" className="hover:text-emerald-700">
          Donate Food
        </Link>
        <span>/</span>
        <span className="text-emerald-800 font-bold">{stateName}</span>
      </nav>

      {/* State Header Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-emerald-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>Statewide Humanitarian Coverage</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Surplus Food Rescue Network in{" "}
            <span className="text-emerald-700">{stateName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Official food recovery network covering municipal corporations, revenue districts, and commercial catering corridors across {stateName}. All donor handovers comply with FSSAI regulations and Good Samaritan statutory protections.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-emerald-200/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Monthly Distribution</span>
              <span className="text-lg font-black text-emerald-800 font-mono">
                {formatNumber(totalMeals)} Meals
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Verified NGOs</span>
              <span className="text-lg font-black text-slate-900 font-mono">
                {totalNgos} Partners
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Active Hubs</span>
              <span className="text-lg font-black text-slate-900 font-mono">
                {Math.max(activeCities.length, 1)} Cities Mapped
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities and Districts Grid */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Local Food Rescue Hubs in {stateName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCities.map((city) => (
            <Link
              key={city.slug}
              href={`/donate-food/${city.stateSlug}/${city.districtSlug}/${city.slug}`}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {city.priorityTier || "Tier B"}
                  </span>
                  <span className="text-xs font-mono text-slate-400">PIN: {city.pincode}</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {city.districtName} District • Pop: {city.populationCovered}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                <span>{city.activeNgosCount} Verified NGOs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
