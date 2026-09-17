"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { INDIAN_STATES, getAllCities } from "@/data/geography";
import { FSSAI_SURPLUS_REGULATIONS } from "@/data/compliance";
import { formatNumber } from "@/utils/format";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  HeartHandshake,
  Utensils,
  MapPin,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Leaf,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building,
  Truck,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();
  const [selectedStateSlug, setSelectedStateSlug] = useState("west-bengal");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedState = INDIAN_STATES.find((s) => s.slug === selectedStateSlug) || INDIAN_STATES[0];
  const allCities = getAllCities();

  const faqs = [
    {
      q: "Is DonateFood.in free for donors and NGOs?",
      a: "Yes. DonateFood.in is conceptualized as an agnostic Digital Public Infrastructure (DPI). The foundational humanitarian utility is unequivocally free. Stakeholders do not face any financial barriers to donate, volunteer, or receive food.",
    },
    {
      q: "How does the platform protect donors from legal liability under Indian law?",
      a: "Under Section 5 of the FSSAI Surplus Food Regulations 2019 and Supreme Court guidelines in Save Life Foundation v. Union of India, donors acting in good faith without commercial gain are shielded from civil and criminal liabilities. The platform generates an immutable Digital Handover Certificate verifying time, temperature, and hygiene at handover.",
    },
    {
      q: "How are NGOs verified before they can collect food?",
      a: "The network uses a strict 5-tier verification matrix. Partner NGOs must hold a valid NITI Aayog NGO DARPAN Unique ID, PAN, 12A/80G tax exemption, and FSSAI registration. Only tier-4 and tier-5 organizations can claim large-scale commercial donations.",
    },
    {
      q: "How does the platform prevent 'doorway page' SEO penalties?",
      a: "Every single programmatic location page (e.g. Barrackpore, Bandra) is backed by authentic, verified first-party data from the Local Government Directory (LGD), including real active NGO profiles, local disaster management contacts, and operating hours, fully complying with Google Helpful Content guidelines.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section: Full-Bleed Edge-to-Edge Panoramic Banner (Zero gaps, 100% width) */}
      <section className="w-full p-0 m-0 border-b border-gray-200/80 bg-white overflow-hidden">
        <img
          src="/images/hero.webp"
          alt="DonateFood.in - Turning Surplus Food into Nationwide Nutrition"
          className="w-full h-auto object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </section>

      {/* Content Section: Mission Statement, Actions & National Metrics */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdf4]/50 via-white to-slate-50 text-slate-900 pt-12 pb-16 px-4 sm:px-6 border-b border-gray-100">
        {/* Background Subtle Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06571a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-serif leading-[1.15] mb-6 text-slate-950">
              Turning Surplus Food into{" "}
              <span className="text-[#06571a]">
                Nationwide Nutrition
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              India wastes ~78 million tonnes of food annually while over 170 million face hunger.
              DonateFood.in provides the algorithmic routing, FSSAI compliance, and zero-trust
              coordination layer to eliminate food waste across 800+ districts.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/donate"
                className="relative group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#06571a] via-[#086a20] to-[#0a7a28] text-white font-bold text-sm tracking-wide shadow-md shadow-[#06571a]/25 hover:shadow-xl hover:shadow-[#06571a]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 overflow-hidden border border-[#0a7e28]/40"
              >
                {/* Ambient light sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                {/* Circular icon chip with smooth color morph to brand orange */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 group-hover:bg-[#fe7801] transition-colors duration-300 shadow-2xs">
                  <Utensils className="w-3.5 h-3.5 text-[#fe7801] group-hover:text-white transition-colors duration-300" />
                </span>

                <span>{t("haveFood")}</span>
              </Link>

              <Link
                href="/assistance"
                className="relative group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-[#fe7801] font-bold text-sm tracking-wide shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 overflow-hidden border border-gray-200 hover:border-[#fe7801]/40"
              >
                {/* Ambient light sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#fe7801]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                {/* Circular icon chip with smooth color morph to brand orange */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-50 group-hover:bg-[#fe7801] transition-colors duration-300 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#fe7801] group-hover:text-white transition-colors duration-300" />
                </span>

                <span>{t("needFood")}</span>
              </Link>

              <Link
                href="/emergency"
                className="relative group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#fff7ed] via-[#ffedd5] to-[#fed7aa]/50 hover:from-[#ffedd5] hover:to-[#fed7aa] text-[#c2410c] hover:text-[#9a3412] font-bold text-sm tracking-wide shadow-sm hover:shadow-xl hover:shadow-[#fe7801]/15 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 overflow-hidden border border-[#fed7aa] hover:border-[#fe7801]/50"
              >
                {/* Ambient light sweep */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                {/* Circular icon chip with smooth color morph to brand orange */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fe7801]/15 group-hover:bg-[#fe7801] transition-colors duration-300 shadow-2xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#fe7801] group-hover:text-white transition-colors duration-300" />
                </span>

                <span>Emergency Mode</span>
              </Link>
            </div>
          </div>

          {/* Real-time National Ticker / KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#06571a]/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">Meals Rescued</span>
                <TrendingUp className="w-4 h-4 text-[#06571a]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={4821450} suffix="+" />
              </div>
              <p className="text-[11px] text-[#06571a] mt-1 font-medium">Directly to verified food banks</p>
            </div>

            <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#fe7801]/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">Verified NGO Partners</span>
                <ShieldCheck className="w-4 h-4 text-[#fe7801]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={2140} suffix="+" />
              </div>
              <p className="text-[11px] text-[#fe7801] mt-1 font-medium">NITI Aayog DARPAN validated</p>
            </div>

            <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#06571a]/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">Districts Mapped</span>
                <MapPin className="w-4 h-4 text-[#06571a]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={800} suffix="+" />
              </div>
              <p className="text-[11px] text-[#06571a] mt-1 font-medium">Local Government Directory standard</p>
            </div>

            <div className="bg-white/95 backdrop-blur-xs p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-[#fe7801]/40 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 font-medium">CO₂e Avoided</span>
                <Leaf className="w-4 h-4 text-[#fe7801]" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                <AnimatedCounter target={12050} suffix=" MT" />
              </div>
              <p className="text-[11px] text-[#fe7801] mt-1 font-medium">Verra VM0046 methane offset</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Ecosystem Entry Pathways */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif mb-3">
            Five Purpose-Built Pathways
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Action-oriented, mobile-optimized entry points designed for low latency and zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: I Have Food */}
          <Link
            href="/donate"
            className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#06571a] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#06571a]/10 text-[#06571a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#06571a] uppercase tracking-wider font-mono">
                Donor Workflow
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">I Have Food</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Donate surplus cooked or raw food from weddings, banquets, cafeterias, and restaurants.
                Includes automated FSSAI temperature verification (&lt;7°C) and digital compliance certificate.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#06571a]">
              <span>Initiate Food Dispatch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: I Need Food */}
          <Link
            href="/assistance"
            className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#fe7801] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fe7801]/10 text-[#fe7801] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#fe7801] uppercase tracking-wider font-mono">
                Beneficiary Workflow
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">I Need Food</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Privacy-first assistance. No phone numbers, personal identities, or tracking required. Find
                active community kitchens, langars, food banks, and daily meal points near you.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#fe7801]">
              <span>Find Free Sustenance</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: I Want To Help */}
          <Link
            href="/volunteer"
            className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#06571a] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#06571a]/10 text-[#06571a] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#06571a] uppercase tracking-wider font-mono">
                Citizen Logistics
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">I Want To Help</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Join India's largest volunteer rescue network. Help pick up cooked meals with short time
                windows and deliver them to designated community hubs and shelters.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#06571a]">
              <span>Register as Volunteer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: I'm An NGO */}
          <Link
            href="/ngo"
            className="group relative bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#fe7801] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fe7801]/10 text-[#fe7801] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#fe7801] uppercase tracking-wider font-mono">
                Partner Matrix
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">I'm An NGO</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Multi-tiered verification backed by NITI Aayog DARPAN. Claim your profile, verify 12A/80G
                and FSSAI credentials, and receive high-volume corporate and banquet pickups.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#fe7801]">
              <span>Verify DARPAN Credentials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Emergency Mode */}
          <Link
            href="/emergency"
            className="group relative bg-gradient-to-br from-[#fff7ed] via-white to-[#fff7ed] rounded-2xl p-6 border border-[#fed7aa] shadow-sm hover:shadow-md hover:border-[#fe7801] transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#fe7801] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-[#fe7801]/30">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span className="bg-[#fe7801]/15 text-[#fe7801] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#fed7aa]">
                  NDMA / NDRF Protocol
                </span>
              </div>
              <span className="text-xs font-bold text-[#fe7801] uppercase tracking-wider font-mono">
                Crisis Command System
              </span>
              <h3 className="text-xl font-bold text-slate-950 mt-1 mb-2">Disaster Emergency Mode</h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-4">
                Overrides the standard interface to establish a centralized logistics command center during
                floods, cyclones, or heatwaves. Integrates live NDMA alerts, heavy transport vehicle
                capacities, relief camps, and potable water supplies.
              </p>
            </div>
            <div className="pt-4 border-t border-[#fed7aa] flex items-center justify-between text-xs font-bold text-[#fe7801]">
              <span>Launch Emergency Command Center</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Programmatic SEO Showcase: Hyperlocal Geographic Directory */}
      <section className="py-16 bg-slate-100 border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06571a] uppercase tracking-wider mb-2">
                <Building className="w-4 h-4 text-[#06571a]" />
                <span>Doorway-Safe Programmatic SEO Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
                Hyperlocal Administrative Coverage
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mt-1">
                Conforming to the official Local Government Directory (LGD). Every page is anchored by
                authenticated local NGO capacity and emergency contacts to eliminate thin content.
              </p>
            </div>

            {/* State Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {INDIAN_STATES.map((state) => (
                <button
                  key={state.slug}
                  onClick={() => setSelectedStateSlug(state.slug)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    selectedStateSlug === state.slug
                      ? "bg-[#06571a] text-white shadow-sm"
                      : "bg-white text-gray-700 hover:bg-[#f0fdf4] hover:text-[#06571a] border border-gray-200"
                  }`}
                >
                  {state.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cities Grid for Selected State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedState.districts.flatMap((district) =>
              district.cities.map((city) => (
                <div
                  key={city.slug}
                  className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#06571a]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400 font-mono">
                        {district.name} • {city.pincode}
                      </span>
                      <span className="bg-[#06571a]/10 text-[#06571a] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#06571a]/20">
                        {city.disasterZoneTier}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">{city.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">
                      Serving {city.populationCovered} residents across major surplus corridors.
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">
                      <div>
                        <span className="text-gray-400 block text-[10px]">Verified NGOs:</span>
                        <span className="font-bold text-gray-800">{city.activeNgosCount} hubs</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px]">Monthly Meals:</span>
                        <span className="font-bold text-[#06571a]">
                          {formatNumber(city.mealsDistributedMonth)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Silo Links for this City */}
                  <div className="space-y-1.5 text-xs pt-3 border-t border-gray-100">
                    <Link
                      href={`/donate-food/${city.stateSlug}/${city.districtSlug}/${city.slug}`}
                      className="flex items-center justify-between text-[#06571a] hover:text-[#044013] font-medium py-1 px-1.5 rounded hover:bg-[#06571a]/5 transition-colors"
                    >
                      <span>Donate Food in {city.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#06571a]" />
                    </Link>
                    <Link
                      href={`/assistance/${city.stateSlug}/${city.districtSlug}/${city.slug}`}
                      className="flex items-center justify-between text-[#fe7801] hover:text-[#e06900] font-medium py-1 px-1.5 rounded hover:bg-[#fe7801]/5 transition-colors"
                    >
                      <span>Find Free Food in {city.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#fe7801]" />
                    </Link>
                    <Link
                      href={`/ngo-directory/${city.stateSlug}/${city.slug}`}
                      className="flex items-center justify-between text-slate-700 hover:text-[#06571a] font-medium py-1 px-1.5 rounded hover:bg-slate-50 transition-colors"
                    >
                      <span>Verified NGOs in {city.name}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Algorithmic Logistics (DVRPTW) & Corporate CSR / Carbon Teaser */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Logistics Box (Brand Green Theme) */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-[#06571a]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#06571a] text-xs font-mono font-bold uppercase mb-2">
                <Truck className="w-4 h-4 text-[#06571a]" />
                <span>Dynamic Vehicle Routing (DVRPTW)</span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-slate-950">
                Algorithmic Logistics for Perishable Cooked Food
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Unlike parcel delivery, cooked food decays rapidly. The platform deploys advanced heuristic
                algorithms (multiple ant colony optimization &amp; large neighborhood search) that calculate
                optimal volunteer routes based on perishable time windows, traffic, and storage temperatures
                under 7°C.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-2 mb-6 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">ULIP &amp; FASTag Interop:</span>
                  <span className="font-mono text-[#06571a] font-bold">ACTIVE SYNC</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Quick-Commerce Dark Stores (Blinkit/Swiggy):</span>
                  <span className="font-mono text-[#06571a] font-bold">TRANSIT HUBS ENABLED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Avg Rescue-to-Table Handover:</span>
                  <span className="font-mono text-slate-900 font-bold">42 Minutes</span>
                </div>
              </div>
            </div>

            <Link
              href="/logistics"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-[#06571a] hover:bg-[#044013] text-white font-bold text-xs transition-all shadow-sm active:scale-95 border border-[#06571a]"
            >
              <span>Explore Interactive Logistics Simulator</span>
              <ArrowRight className="w-4 h-4 text-[#fe7801]" />
            </Link>
          </div>

          {/* CSR & ESG Box (Brand Orange Theme) */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-[#fed7aa] shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#fe7801] text-xs font-mono font-bold uppercase mb-2">
                <Building className="w-4 h-4 text-[#fe7801]" />
                <span>Schedule VII &amp; Carbon Offsets</span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-slate-950">
                Sustainable Monetization: CSR &amp; Verra VM0046
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                To guarantee that the humanitarian service remains 100% free for citizens and NGOs,
                DonateFood.in monetizes ethically through enterprise cafeteria food waste tracking (MCA
                Schedule VII compliance) and certified methane reduction carbon credits sold on global ESG
                markets.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-2 mb-6 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Schedule VII Item (i) &amp; (xii):</span>
                  <span className="font-mono text-[#fe7801] font-bold">LEGAL MCA COMPLIANT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Verra VM0046 / Gold Standard:</span>
                  <span className="font-mono text-[#fe7801] font-bold">CERTIFIED METHANE CREDITS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Corporate Cafeteria SaaS:</span>
                  <span className="font-mono text-slate-900 font-bold">AUTOMATED AUDIT LOGS</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/enterprise/csr"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-[#fe7801] hover:bg-[#e06900] text-white font-bold text-xs transition-all shadow-sm"
              >
                Enterprise CSR Suite
              </Link>
              <Link
                href="/enterprise/carbon-credits"
                className="flex-1 text-center py-3.5 px-4 rounded-xl bg-white hover:bg-[#fff7ed] text-[#fe7801] border border-[#fed7aa] font-bold text-xs transition-all shadow-2xs"
              >
                Carbon Credits Ledger
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions with GEO Schema integration */}
      <section className="py-16 bg-white border-t border-gray-200 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#06571a] uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-[#fe7801]" />
              <span>Public Knowledge &amp; Regulatory Guidance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white shadow-2xs hover:border-[#06571a]/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base font-bold text-gray-900 hover:bg-[#f0fdf4]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-lg text-[#06571a] font-black shrink-0 ml-4">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
