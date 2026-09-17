import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { INDIAN_STATES } from "@/data/geography";
import { slugToTitleCase, TIER_A_B_CITIES_REGISTRY, resolveCityLocation } from "@/utils/dynamicLocation";
import { formatNumber } from "@/utils/format";
import {
  MapPin,
  Heart,
  Utensils,
  ArrowRight,
  ChevronRight,
  Shield,
  Phone,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
    district: string;
  }>;
}

export async function generateStaticParams() {
  const seeds: { state: string; district: string }[] = [];
  for (const s of INDIAN_STATES) {
    for (const d of s.districts) {
      seeds.push({ state: s.slug, district: d.slug });
    }
  }
  return seeds;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug, district: districtSlug } = await params;
  const districtName = slugToTitleCase(districtSlug);
  const stateName = slugToTitleCase(stateSlug);

  return {
    title: `Free Food & Langars in ${districtName} District, ${stateName} | DonateFood.in`,
    description: `Community kitchens, free food distribution centers, and emergency meal services in ${districtName}, ${stateName}. Completely free, open to all.`,
    alternates: {
      canonical: `https://donatefood.in/assistance/${stateSlug}/${districtSlug}`,
    },
    openGraph: {
      title: `Free Food Centers in ${districtName} (${stateName})`,
      description: `Locate active langars and community meal distribution points in ${districtName}.`,
      url: `https://donatefood.in/assistance/${stateSlug}/${districtSlug}`,
    },
  };
}

export default async function DistrictAssistancePage({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const districtName = slugToTitleCase(districtSlug);
  const stateName = slugToTitleCase(stateSlug);

  const matchedCities = TIER_A_B_CITIES_REGISTRY.filter(
    (c) => c.stateSlug === stateSlug && c.districtSlug === districtSlug
  );

  const districtCities =
    matchedCities.length > 0
      ? matchedCities
      : [resolveCityLocation(stateSlug, districtSlug, `${districtSlug}-central`)];

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href={`/assistance/${stateSlug}`} className="hover:text-emerald-700">
          {stateName}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-amber-800 font-bold">{districtName} District</span>
      </nav>

      {/* District Header Banner */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-amber-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>District Relief Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Free Meal Centers in{" "}
            <span className="text-amber-700">{districtName} District</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Find active community kitchens, langars, and food assistance points in {districtName}, {stateName}. Freshly prepared meals distributed daily. No registration, no paperwork, 100% free and respectful service.
          </p>
        </div>
      </div>

      {/* Cities in District */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          <span>Municipalities &amp; Zones in {districtName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districtCities.map((city) => (
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
                  Helpline: {city.emergencyHelpline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
                <span>View Free Meal Points</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
