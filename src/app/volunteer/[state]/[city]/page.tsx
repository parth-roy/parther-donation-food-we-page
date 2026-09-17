import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { resolveCityLocation, getTopSeedCities } from "@/utils/dynamicLocation";
import { getDynamicNgosForCity } from "@/utils/dynamicNgos";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatNumber } from "@/utils/format";
import {
  HeartHandshake,
  Truck,
  Clock,
  ShieldCheck,
  Phone,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users,
  Navigation,
  Sparkles,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    state: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const seedCities = getTopSeedCities();
  return seedCities.map((city) => ({
    state: city.stateSlug,
    city: city.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city: citySlug } = await params;
  const city = resolveCityLocation(state, "central", citySlug);

  return {
    title: `Volunteer Food Rescue & Fleet in ${city.name}, ${city.stateName} | DonateFood.in`,
    description: `Join the rapid-response food rescue volunteer fleet in ${city.name}. Help transport banquet surplus, staff community kitchens, and deliver meals to local shelters.`,
    alternates: {
      canonical: `https://donatefood.in/volunteer/${state}/${citySlug}`,
    },
    openGraph: {
      title: `Volunteer for Hunger Relief in ${city.name} (${city.stateName})`,
      description: `Be a registered food rescue driver or kitchen helper in ${city.name}. FSSAI Good Samaritan covered.`,
      url: `https://donatefood.in/volunteer/${state}/${citySlug}`,
    },
  };
}

export default async function CityVolunteerPage({ params }: PageProps) {
  const { state, city: citySlug } = await params;
  const city = resolveCityLocation(state, "central", citySlug);
  const localNgos = getDynamicNgosForCity(city);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <JsonLd
        type="LocalCommunityHub"
        data={{
          name: `DonateFood.in Volunteer Fleet - ${city.name}`,
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
        <Link href="/" className="hover:text-emerald-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/volunteer" className="hover:text-emerald-700">
          Volunteer
        </Link>
        <span>/</span>
        <span className="text-gray-700">{city.stateName}</span>
        <span>/</span>
        <span className="text-emerald-800 font-bold">{city.name}</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-teal-50 via-emerald-50/50 to-white text-slate-900 rounded-3xl p-6 sm:p-10 mb-10 border border-teal-200 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
            <span>Community Rescue Fleet • {city.name}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-tight mb-4 text-slate-950">
            Join the Food Rescue Volunteer Network in{" "}
            <span className="text-teal-700">{city.name}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Every night, banquets, restaurants, and IT cafeterias in {city.name} have wholesome surplus food.
            Our community volunteer drivers and runners ensure this food reaches verified kitchens within 45 minutes.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Good Samaritan Statutory Immunity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Flexible 1-2 Hour Shifts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Digital Volunteer Certificates</span>
            </div>
          </div>
        </div>
      </div>

      {/* City Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium block">Active Fleets</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
            {city.activeNgosCount * 3}+
          </span>
          <span className="text-[10px] text-slate-400">Vans &amp; Bikes</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium block">Meals Rescued / Mo</span>
          <span className="text-2xl font-black text-teal-700 font-mono mt-1 block">
            {formatNumber(city.mealsDistributedMonth)}
          </span>
          <span className="text-[10px] text-slate-400">In {city.name}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium block">Community Kitchens</span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
            {city.communityKitchensCount}
          </span>
          <span className="text-[10px] text-slate-400">Active Centers</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center">
          <span className="text-xs text-slate-500 font-medium block">Emergency Helpline</span>
          <span className="text-sm font-bold text-slate-900 font-mono mt-2 block truncate">
            {city.emergencyHelpline}
          </span>
          <span className="text-[10px] text-emerald-600 font-bold">24x7 Ready</span>
        </div>
      </div>

      {/* Volunteer Action Roles */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span>Ways to Serve in {city.name}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Surplus Transport Driver
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Use your two-wheeler or four-wheeler to pick up packaged food from weddings and caterers along {city.surplusHotspots[0]} and deliver to nearby kitchens.
              </p>
            </div>
            <Link
              href="/volunteer"
              className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold text-center block transition-all"
            >
              Sign Up as Driver
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Kitchen &amp; Langar Helper
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Help staff local community kitchens during lunch and dinner serving hours. Assist with hygienic meal packaging, queue coordination, and sanitation.
              </p>
            </div>
            <Link
              href="/volunteer"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center block transition-all"
            >
              Sign Up for Kitchens
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                FSSAI Food Quality Auditor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Inspect donor batches with digital infrared thermometers, verify sensory freshness, and issue digital handover certificates on our mobile platform.
              </p>
            </div>
            <Link
              href="/volunteer"
              className="py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold text-center block transition-all"
            >
              Sign Up as Auditor
            </Link>
          </div>
        </div>
      </div>

      {/* Verified Partner NGOs Receiving Volunteers in this City */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-950 mb-2">
          Partner NGOs Welcoming Volunteers in {city.name}
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Connect directly with institutional partners operating authenticated rescue fleets in this district:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {localNgos.map((ngo) => (
            <div
              key={ngo.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Tier {ngo.tier} • {ngo.tierLabel}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{ngo.darpanId}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{ngo.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{ngo.address}</p>
              </div>

              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-200/60 text-xs">
                <a
                  href={`tel:${ngo.phone}`}
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{ngo.phone}</span>
                </a>
                <Link
                  href={`/ngo/${ngo.stateSlug}/${ngo.citySlug}/${ngo.slug}`}
                  className="font-semibold text-purple-700 hover:underline flex items-center gap-1"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
