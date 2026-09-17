import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { INDIAN_STATES, getStateBySlug } from "@/data/geography";
import { slugToTitleCase, TIER_A_B_CITIES_REGISTRY } from "@/utils/dynamicLocation";
import { formatNumber } from "@/utils/format";
import {
  ShieldCheck,
  Building,
  Award,
  ArrowRight,
  MapPin,
  CheckCircle2,
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
    title: `Verified NGO Directory in ${stateName} | NITI Aayog DARPAN Verified`,
    description: `Official registry of Level-4 and Level-5 verified food rescue NGOs in ${stateName}. Compliant with FSSAI, 12A/80G, and Schedule VII CSR regulations.`,
    alternates: {
      canonical: `https://donatefood.in/ngo-directory/${stateSlug}`,
    },
    openGraph: {
      title: `Verified NGOs in ${stateName} — NITI Aayog DARPAN Registry`,
      description: `Statewide registry of audited food rescue organizations in ${stateName}.`,
      url: `https://donatefood.in/ngo-directory/${stateSlug}`,
    },
  };
}

export default async function StateNgoDirectoryPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateObj = getStateBySlug(stateSlug);
  const stateName = stateObj?.name || slugToTitleCase(stateSlug);

  const stateCities = TIER_A_B_CITIES_REGISTRY.filter((c) => c.stateSlug === stateSlug);
  const fallbackCities = stateObj ? stateObj.districts.flatMap((d) => d.cities) : [];
  const activeCities = stateCities.length > 0 ? stateCities : fallbackCities;

  const totalNgos = activeCities.reduce((acc, c) => acc + c.activeNgosCount, 25);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-purple-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/ngo" className="hover:text-purple-700">
          NGO Verification
        </Link>
        <span>/</span>
        <span className="text-purple-800 font-bold">{stateName}</span>
      </nav>

      {/* State Header Banner */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-purple-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>NITI Aayog DARPAN Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Verified Food Rescue NGOs in{" "}
            <span className="text-purple-700">{stateName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Official institutional directory of verified NGO partners operating across {stateName}. Every entity has been audited for NITI Aayog DARPAN registration, 12A/80G tax exemptions, and FSSAI surplus recovery licenses.
          </p>

          <div className="flex flex-wrap gap-6 pt-4 border-t border-purple-200/60 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Verified Partners</span>
              <span className="text-lg font-black text-purple-800 font-mono">
                {totalNgos} NGOs
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Audit Standard</span>
              <span className="text-lg font-black text-slate-900 font-mono">
                100% NITI Aayog Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cities in State */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          <span>Municipal Directories in {stateName}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCities.map((city) => (
            <Link
              key={city.slug}
              href={`/ngo-directory/${city.stateSlug}/${city.slug}`}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                    {city.activeNgosCount} NGOs
                  </span>
                  <span className="text-xs font-mono text-slate-400">PIN: {city.pincode}</span>
                </div>
                <h3 className="text-base font-bold text-slate-950 group-hover:text-purple-700 transition-colors">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {city.districtName} District
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                <span>View Verified Directory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
