import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { VERIFIED_NGOS } from "@/data/ngos";
import { resolveNgoProfile } from "@/utils/dynamicNgos";
import { formatNumber } from "@/utils/format";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Truck,
  Clock,
  Warehouse,
  Calendar,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Flame,
  FileCheck2,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
    "ngo-slug": string;
  }>;
}

export async function generateStaticParams() {
  return VERIFIED_NGOS.slice(0, 18).map((ngo) => ({
    state: ngo.stateSlug,
    city: ngo.citySlug,
    "ngo-slug": ngo.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const ngo = resolveNgoProfile(resolved.state, resolved.city, resolved["ngo-slug"]);

  const title = `${ngo.name} - Verified NGO Profile | DARPAN ${ngo.darpanId} | ${ngo.cityName}`;
  const description = `Official institutional compliance profile for ${ngo.name} in ${ngo.cityName}. Tier ${ngo.tier} verified with NITI Aayog DARPAN ID ${ngo.darpanId}, FSSAI Surplus License ${ngo.fssaiLicenseNo}, and 12A/80G tax exemption.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://donatefood.in/ngo/${resolved.state}/${resolved.city}/${resolved["ngo-slug"]}`,
    },
    openGraph: {
      title,
      description,
      url: `https://donatefood.in/ngo/${resolved.state}/${resolved.city}/${resolved["ngo-slug"]}`,
      siteName: "DonateFood.in",
      locale: "en_IN",
      type: "article",
    },
  };
}

export default async function NgoProfilePage({ params }: PageProps) {
  const resolved = await params;
  const ngo = resolveNgoProfile(resolved.state, resolved.city, resolved["ngo-slug"]);

  const canonicalUrl = `https://donatefood.in/ngo/${ngo.stateSlug}/${ngo.citySlug}/${ngo.slug}`;

  // Structured Data (JSON-LD) for Google Knowledge Graph & AI Crawlers
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": ["NGO", "LocalBusiness"],
    "@id": `${canonicalUrl}#organization`,
    name: ngo.name,
    legalName: ngo.name,
    identifier: ngo.darpanId,
    taxID: ngo.panNumber,
    url: canonicalUrl,
    telephone: ngo.phone,
    email: ngo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: ngo.address,
      addressLocality: ngo.cityName,
      addressRegion: ngo.stateSlug.toUpperCase(),
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: ngo.cityName,
    },
    award: `Level ${ngo.tier} Verified NGO Partner`,
    knowsAbout: [
      "Surplus Food Redistribution",
      "FSSAI Food Safety Compliance",
      "Emergency Hunger Alleviation",
      "Cold Chain Logistics",
    ],
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <JsonLd type="Organization" data={jsonLdData} />

      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-mono mb-6">
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/ngo" className="hover:text-emerald-700">
          NGO Verification
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href={`/ngo-directory/${ngo.stateSlug}/${ngo.citySlug}`} className="hover:text-emerald-700 capitalize">
          {ngo.cityName} Directory
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-gray-900 font-bold truncate">{ngo.name}</span>
      </nav>

      {/* Institutional Profile Header */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Tier {ngo.tier} • {ngo.tierLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                DARPAN: {ngo.darpanId}
              </span>
              {ngo.coldChainCapable && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold border border-cyan-200">
                  <Truck className="w-3 h-3 text-cyan-600" /> Cold-Chain Certified (≤7°C)
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif leading-tight">
              {ngo.name}
            </h1>

            <p className="text-sm text-slate-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{ngo.address}</span>
            </p>

            <p className="text-xs text-slate-500">
              Operating since <strong>{ngo.establishedYear}</strong> • Authorized Food Recovery Partner for {ngo.cityName} and surrounding logistics corridors.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <Link
              href="/donate"
              className="px-6 py-3 bg-[#06571a] hover:bg-[#054615] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Route Food Donation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${ngo.phone}`}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-2xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{ngo.phone}</span>
            </a>
          </div>
        </div>

        {/* Rapid Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-emerald-200/60">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">Rescued Volume</span>
            <span className="text-2xl font-black text-emerald-800 font-mono mt-1 block">
              {formatNumber(ngo.mealsRescuedTotal)}
            </span>
            <span className="text-[10px] text-slate-400">Meals to Date</span>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">Response SLA</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {ngo.avgResponseTimeMin} min
            </span>
            <span className="text-[10px] text-slate-400">Avg Logistics Turnaround</span>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">Storage Buffer</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {formatNumber(ngo.storageCapacityKg)} kg
            </span>
            <span className="text-[10px] text-slate-400">Hygienic Buffer Capacity</span>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-2xs">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium block">Active Logistics</span>
            <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
              {ngo.activeVehicles} Units
            </span>
            <span className="text-[10px] text-slate-400">Equipped Transport Fleet</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Compliance Audit & Operational Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left 2 Cols: Statutory Compliance & FSSAI Verification */}
        <div className="lg:col-span-2 space-y-8">
          {/* Statutory Verification Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-950">Statutory & Regulatory Audit</h2>
            </div>

            <div className="divide-y divide-slate-100">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-medium text-slate-600">NITI Aayog DARPAN Unique ID</span>
                <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                  {ngo.darpanId}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-medium text-slate-600">FSSAI Surplus Recovery License</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {ngo.fssaiLicenseNo}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-medium text-slate-600">Income Tax 12A &amp; 80G Certification</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approved (CSR Schedule VII Eligible)
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-medium text-slate-600">FCRA Registration</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ngo.fcraRegistered ? "text-emerald-700 bg-emerald-50" : "text-slate-500 bg-slate-100"}`}>
                  {ngo.fcraRegistered ? "Registered for International Aid" : "Domestic Entities Exclusively"}
                </span>
              </div>

              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm font-medium text-slate-600">Permanent Account Number (PAN)</span>
                <span className="font-mono text-xs text-slate-700">{ngo.panNumber}</span>
              </div>
            </div>

            {/* Inspection History */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Food Safety Inspection History
              </h3>
              {ngo.recentInspections.map((insp, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs border border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-900 block">{insp.inspector}</span>
                    <span className="text-slate-500 text-[11px]">Audited: {insp.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-100/60 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" /> Passed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Protocols & Food Acceptance Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-6">
              <Warehouse className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-950">Food Acceptance & Capabilities</h2>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Accepted Surplus Streams
                </span>
                <div className="flex flex-wrap gap-2">
                  {ngo.acceptedFoodTypes.map((food, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200"
                    >
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Standard Operating Hours</span>
                  <span className="text-slate-800 font-semibold mt-0.5 block">{ngo.operatingHours}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Emergency Disaster Protocol</span>
                  <span className="text-emerald-700 font-bold mt-0.5 block">
                    {ngo.emergencyResponseCapable ? "Active 24x7 Tier 1 Protocol" : "Scheduled Operations"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Contact & Action Hub */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-2">Route Surplus Directly</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Commercial kitchens, banquets, and supermarkets can dispatch food to {ngo.name} with automated chain-of-custody documentation.
            </p>

            <div className="space-y-3">
              <Link
                href="/donate"
                className="w-full py-3 bg-[#fe7801] hover:bg-[#e06a00] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Initiate Food Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/assistance"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
              >
                <span>Request Community Assistance</span>
              </Link>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider text-slate-400">
              Verified Logistics Contact
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`tel:${ngo.phone}`} className="hover:text-emerald-700 font-mono font-medium">
                  {ngo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`mailto:${ngo.email}`} className="hover:text-emerald-700 truncate">
                  {ngo.email}
                </a>
              </div>

              {ngo.website && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={ngo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 truncate flex items-center gap-1 font-medium"
                  >
                    <span>{ngo.website.replace("https://", "")}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              )}

              <div className="flex items-start gap-3 text-slate-700 pt-2 border-t border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ngo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
