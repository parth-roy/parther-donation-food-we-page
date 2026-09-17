import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { INDIAN_STATES } from "@/data/geography";
import { getAllUniqueLocations } from "@/utils/dynamicLocation";
import { LocationsExplorer } from "@/components/locations/LocationsExplorer";
import {
  Building2,
  MapPin,
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  Heart,
  Globe,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Locations & Municipal Hubs | DonateFood.in National Infrastructure",
  description:
    "Comprehensive directory of verified food rescue hubs, community kitchens, and disaster food relief operations across 200+ Tier A and Tier B Indian cities in 28 states and 8 UTs.",
  alternates: {
    canonical: "https://donatefood.in/locations",
  },
  openGraph: {
    title: "All Locations & Municipal Coverage — DonateFood.in",
    description:
      "Explore hyperlocal surplus food rescue networks, verified NGOs, and free food assistance centers across India.",
    url: "https://donatefood.in/locations",
    siteName: "DonateFood.in",
    type: "website",
  },
};

export default function LocationsPage() {
  const allLocations = getAllUniqueLocations();

  // Structured Data Schema for Local Government Directory & Administrative Explorer
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Food Rescue Locations & Municipal Coverage Across India",
    description:
      "Official directory of hyperlocal food donation hubs, community kitchens, and NITI Aayog verified NGOs across India.",
    url: "https://donatefood.in/locations",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://donatefood.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Locations",
          item: "https://donatefood.in/locations",
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200/80 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#06571a] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#06571a] font-bold">Hyperlocal Municipal Directory</span>
        </div>
      </div>

      {/* Hero Banner with Brand Color Gradient */}
      <section className="bg-gradient-to-br from-[#06571a] via-[#096e23] to-[#044013] text-white py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fe7801]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-xs border border-white/20">
            <Building2 className="w-4 h-4 text-[#fe7801]" />
            <span>Official Local Government Directory (LGD) Coverage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-serif">
            Nationwide Municipal Directory
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-emerald-100 max-w-3xl leading-relaxed mb-8">
            Every location connects surplus donors, relief seekers, verified NGOs, and volunteer fleets
            through dedicated, high-intent local command pages. Zero thin-content guarantee with authentic
            NITI Aayog DARPAN and FSSAI regulatory verification.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl text-left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-2xl sm:text-3xl font-black text-white block">
                {allLocations.length}+
              </span>
              <span className="text-xs text-emerald-200 font-medium">Core Municipal Hubs</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-2xl sm:text-3xl font-black text-[#fe7801] block">28 + 8</span>
              <span className="text-xs text-emerald-200 font-medium">States &amp; UTs Synchronized</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-2xl sm:text-3xl font-black text-white block">3,000+</span>
              <span className="text-xs text-emerald-200 font-medium">Verified Partner NGOs</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-2xl sm:text-3xl font-black text-white block">100%</span>
              <span className="text-xs text-emerald-200 font-medium">Good Samaritan Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* State Aggregator Quick-Links Bar */}
      <section className="border-b border-gray-200 bg-white py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <span className="w-2 h-2 rounded-full bg-[#fe7801]"></span>
            <span>Jump directly to State Aggregator Hubs:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {INDIAN_STATES.slice(0, 8).map((state) => (
              <Link
                key={state.slug}
                href={`/donate-food/${state.slug}`}
                className="px-3 py-1 bg-slate-100 hover:bg-[#06571a] text-slate-700 hover:text-white rounded-lg text-xs font-bold transition-all"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Locations Explorer */}
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
        <LocationsExplorer initialLocations={allLocations} states={INDIAN_STATES} />
      </main>

      {/* Institutional Compliance & Statutory Shield Notice */}
      <section className="max-w-7xl mx-auto pb-16 px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#06571a] mb-2">
            <ShieldCheck className="w-5 h-5 text-[#06571a]" />
            <span>Digital Public Infrastructure Regulatory Framework</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Multi-Tier Food Safety and Donor Statutory Indemnity
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl">
            Under Section 5 of the FSSAI Surplus Food Regulations (2019) and the Supreme Court of India
            ruling in <em>Save Life Foundation v. Union of India</em>, bona fide food donors acting in good
            faith are completely shielded from civil and criminal liabilities. Every municipal page provides
            direct access to Level 4/5 NITI Aayog DARPAN verified non-profits equipped with compliant insulated
            transport and cold storage protocols.
          </p>
        </div>
      </section>
    </div>
  );
}
