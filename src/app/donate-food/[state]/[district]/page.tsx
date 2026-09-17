import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { INDIAN_STATES } from "@/data/geography";
import { slugToTitleCase, TIER_A_B_CITIES_REGISTRY, resolveCityLocation } from "@/utils/dynamicLocation";
import { formatNumber } from "@/utils/format";
import {
  MapPin,
  Building,
  Utensils,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
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
    title: `Food Donation in ${districtName} District, ${stateName} | DonateFood.in`,
    description: `Official surplus food rescue network for ${districtName} District. Connect banquet halls, hotels, and caterers with verified local food banks and community kitchens.`,
    alternates: {
      canonical: `https://donatefood.in/donate-food/${stateSlug}/${districtSlug}`,
    },
    openGraph: {
      title: `Surplus Food Rescue in ${districtName} (${stateName})`,
      description: `District-wide food recovery hub connecting donors with verified NGOs in ${districtName}.`,
      url: `https://donatefood.in/donate-food/${stateSlug}/${districtSlug}`,
    },
  };
}

export default async function DistrictDonationPage({ params }: PageProps) {
  const { state: stateSlug, district: districtSlug } = await params;
  const districtName = slugToTitleCase(districtSlug);
  const stateName = slugToTitleCase(stateSlug);

  // Find cities matching this district
  const matchedCities = TIER_A_B_CITIES_REGISTRY.filter(
    (c) => c.stateSlug === stateSlug && c.districtSlug === districtSlug
  );

  // Fallback: If no pre-listed cities, synthesize dynamic city
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
        <Link href={`/donate-food/${stateSlug}`} className="hover:text-emerald-700">
          {stateName}
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-emerald-800 font-bold">{districtName} District</span>
      </nav>

      {/* District Header Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-emerald-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>District Administrative Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Surplus Food Rescue in{" "}
            <span className="text-emerald-700">{districtName} District</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Connecting banquet halls, corporate cafeterias, and wedding venues in {districtName}, {stateName} with authenticated NGO cold-chain fleets. Instant FSSAI digital compliance handover certificates generated at dispatch.
          </p>
        </div>
      </div>

      {/* Cities in District */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Municipalities &amp; Zones in {districtName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {districtCities.map((city) => (
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
                  Pop: {city.populationCovered} • {city.communityKitchensCount} Kitchens
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
