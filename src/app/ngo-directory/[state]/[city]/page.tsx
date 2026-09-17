import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllCities, INDIAN_STATES } from "@/data/geography";
import { VERIFIED_NGOS } from "@/data/ngos";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/utils/format";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Truck,
  ArrowRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city: citySlug } = await params;
  const cities = getAllCities();
  const city = cities.find((c) => c.stateSlug === state && c.slug === citySlug);
  if (!city) return { title: "Directory Not Found" };

  return {
    title: `Verified NGOs in ${city.name}, ${city.stateName} | NITI Aayog DARPAN Verified`,
    description: `Official registry of Level-4 and Level-5 verified food rescue NGOs in ${city.name}. Compliant with FSSAI, 12A/80G, and Schedule VII CSR regulations.`,
    alternates: {
      canonical: `https://donatefood.in/ngo-directory/${state}/${citySlug}`,
    },
  };
}

export default async function NgoDirectoryPage({ params }: PageProps) {
  const { state, city: citySlug } = await params;
  const cities = getAllCities();
  const city = cities.find((c) => c.stateSlug === state && c.slug === citySlug);

  if (!city) {
    notFound();
  }

  const ngos = VERIFIED_NGOS.filter((n) => n.citySlug === city.slug);

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
        <span className="text-gray-700">{city.stateName}</span>
        <span>/</span>
        <span className="text-purple-800 font-bold">{city.name}</span>
      </nav>

      {/* Header Banner (White Mode) */}
      <div className="bg-gradient-to-br from-purple-50 via-indigo-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-purple-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>NITI Aayog DARPAN Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Verified Food Rescue NGOs in <span className="text-purple-700">{city.name}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Complete institutional audit for NGOs operating in {city.name}, {city.districtName}. Each
            entity has undergone statutory verification for Income Tax 12A &amp; 80G exemptions, MCA
            CSR-1 eligibility, and FSSAI surplus recovery licenses.
          </p>
        </div>
      </div>

      {/* Directory Listings */}
      <div className="space-y-6">
        {ngos.map((ngo) => (
          <div
            key={ngo.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs hover:border-purple-400 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-purple-200">
                    Tier {ngo.tier} • {ngo.tierLabel}
                  </span>
                  {ngo.coldChainCapable && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Cold Chain Capable (≤7°C)
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-950">{ngo.name}</h2>
                <span className="text-xs font-mono text-purple-900 font-semibold">
                  DARPAN ID: {ngo.darpanId} • PAN: {ngo.panNumber}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 block sm:inline-block">
                  {formatNumber(ngo.mealsRescuedTotal)} Meals Rescued
                </span>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs mb-4">
              <div>
                <span className="text-gray-400 block text-[10px]">12A / 80G Tax Exemption:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">FSSAI Surplus License:</span>
                <span className="font-mono font-bold text-gray-800 text-[11px] block mt-0.5">
                  {ngo.fssaiLicenseNo}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Avg Response SLA:</span>
                <span className="font-bold text-gray-800 block mt-0.5">
                  {ngo.avgResponseTimeMin} Minutes
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Active Fleet:</span>
                <span className="font-bold text-gray-800 block mt-0.5">
                  {ngo.activeVehicles} Transport Vehicles
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              <strong>Base of Operations:</strong> {ngo.address}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-4 text-gray-600">
                <a
                  href={`tel:${ngo.phone}`}
                  className="flex items-center gap-1 hover:text-purple-700 font-medium"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{ngo.phone}</span>
                </a>
                <a
                  href={`mailto:${ngo.email}`}
                  className="flex items-center gap-1 hover:text-purple-700 font-medium hidden sm:flex"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{ngo.email}</span>
                </a>
              </div>

              <Link
                href="/donate"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
              >
                <span>Route Food to This Partner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
