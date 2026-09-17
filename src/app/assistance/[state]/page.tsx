import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { INDIAN_STATES, getStateBySlug } from "@/data/geography";
import { slugToTitleCase, TIER_A_B_CITIES_REGISTRY } from "@/utils/dynamicLocation";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/utils/format";
import {
  MapPin,
  Utensils,
  ArrowRight,
  Heart,
  Shield,
  Phone,
  Clock,
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
    title: `Free Food & Community Kitchens in ${stateName} | DonateFood.in`,
    description: `Find free meal centers, community kitchens, and hunger relief distribution points across all districts in ${stateName}. Privacy-first humanitarian service, no registration required.`,
    alternates: {
      canonical: `https://donatefood.in/assistance/${stateSlug}`,
    },
    openGraph: {
      title: `Free Meals & Food Assistance in ${stateName}`,
      description: `Locate active community kitchens and langars in ${stateName}.`,
      url: `https://donatefood.in/assistance/${stateSlug}`,
    },
  };
}

export default async function StateAssistancePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateObj = getStateBySlug(stateSlug);
  const stateName = stateObj?.name || slugToTitleCase(stateSlug);

  const stateCities = TIER_A_B_CITIES_REGISTRY.filter((c) => c.stateSlug === stateSlug);
  const fallbackCities = stateObj ? stateObj.districts.flatMap((d) => d.cities) : [];
  const activeCities = stateCities.length > 0 ? stateCities : fallbackCities;

  const totalKitchens = activeCities.reduce((acc, c) => acc + c.communityKitchensCount, 25);
  const totalMeals = activeCities.reduce((acc, c) => acc + c.mealsDistributedMonth, 120000);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/assistance" className="hover:text-emerald-700">
          Food Assistance
        </Link>
        <span>/</span>
        <span className="text-emerald-800 font-bold">{stateName}</span>
      </nav>

      {/* State Header Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-amber-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Statewide Hunger Alleviation Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Free Food Centers &amp; Community Kitchens in{" "}
            <span className="text-amber-700">{stateName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Privacy-first humanitarian directory of free food points, langars, and relief meal centers across {stateName}. No identification required. Nutritious, freshly prepared meals served daily to all in need.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-amber-200/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Monthly Relief Meals</span>
              <span className="text-lg font-black text-amber-800 font-mono">
                {formatNumber(totalMeals)}+ Meals
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Active Kitchens</span>
              <span className="text-lg font-black text-slate-900 font-mono">
                {totalKitchens} Kitchens
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Cities Covered</span>
              <span className="text-lg font-black text-slate-900 font-mono">
                {Math.max(activeCities.length, 1)} Municipalities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities in State */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          <span>Select City or District in {stateName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCities.map((city) => (
            <Link
              key={city.slug}
              href={`/assistance/${city.stateSlug}/${city.districtSlug}/${city.slug}`}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    {city.communityKitchensCount} Kitchens
                  </span>
                  <span className="text-xs font-mono text-slate-400">PIN: {city.pincode}</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-amber-700 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {city.districtName} • Helpline: {city.emergencyHelpline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
                <span>View Free Food Locations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
