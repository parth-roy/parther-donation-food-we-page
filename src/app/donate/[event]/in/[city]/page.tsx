import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getEventDonationConfig } from "@/data/eventDonations";
import { resolveCityLocation } from "@/utils/dynamicLocation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  Heart,
  Gift,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Video,
  FileCheck,
  Calendar,
  Share2,
  ChevronRight,
  Users,
} from "lucide-react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    event: string;
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { event, city: citySlug } = await params;
  const config = getEventDonationConfig(event);
  const city = resolveCityLocation("west-bengal", "kolkata", citySlug);

  const title = `${config.eventName} in ${city.name} | Verified 80G Tax Exemption & Digital Media Proof`;
  const description = `${config.heroSubheadline} Available across all localities in ${city.name}, ${city.stateName}. Verified shelter distribution with live video proof.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://donatefood.in/donate/${event}/in/${citySlug}`,
    },
    openGraph: {
      title: `${config.eventName} - ${city.name}`,
      description,
      url: `https://donatefood.in/donate/${event}/in/${citySlug}`,
      type: "website",
    },
  };
}

export default async function EventDonationPage({ params }: PageProps) {
  const { event, city: citySlug } = await params;
  const config = getEventDonationConfig(event);
  const city = resolveCityLocation("west-bengal", "kolkata", citySlug);

  const faqSchemaData = {
    faqs: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <JsonLd type="FAQPage" data={faqSchemaData} />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/donate" className="hover:text-emerald-700">Donate</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="capitalize text-slate-700">{config.eventName}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-bold">{city.name}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-emerald-800">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/30">
              <Gift className="w-3.5 h-3.5" />
              Special Milestone &amp; Life Occasion Food Relief Hub
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight">
              {config.eventName} in {city.name}
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-sans">
              {config.heroHeadline} across {city.name}, {city.stateName}.
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              {config.culturalSignificance}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-medium text-emerald-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant 80G Tax Exemption
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-emerald-400" /> WhatsApp HD Video Proof
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" /> {config.urgencyTimeline}
              </span>
            </div>
          </div>
        </div>

        {/* Sponsorship Packages Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-950">
              Select Your Meal Sponsorship Package in {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each package is fulfilled through verified Tier-1 community kitchens in {city.name} with complete photo/video documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.packages.map((pkg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl font-mono">
                    Most Popular
                  </div>
                )}
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Package {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-serif mb-2">
                    {pkg.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-slate-950 font-mono">
                      {pkg.amountInr === 0 ? "Free Express Pickup" : `₹${pkg.amountInr.toLocaleString("en-IN")}`}
                    </span>
                    {pkg.amountInr > 0 && (
                      <span className="text-xs text-slate-500 font-medium">all-inclusive</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-700">
                    {pkg.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={`/donate?amount=${pkg.amountInr}&event=${config.eventSlug}&city=${city.slug}`}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <span>Sponsor This Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 80G Tax Exemption & Digital Proof Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-white p-6 sm:p-8 rounded-3xl border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-950 font-serif">
                Instant 80G Tax Exemption Receipt
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every monetary contribution for meal sponsorship qualifies for a <strong>50% deduction from taxable income</strong> under Section 80G of the Income Tax Act, 1961. Your digital certificate with the NGO’s Darpan ID and 10BE filing reference is emailed immediately.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white p-6 sm:p-8 rounded-3xl border border-blue-200 space-y-4">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-700" />
              <h3 className="text-lg font-bold text-slate-950 font-serif">
                Direct WhatsApp Video &amp; Photo Proof
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We understand the sacred emotion behind life events. Within 4 hours of meal distribution at the partner shelter home in {city.name}, you receive high-definition photos and video footage showing the happy smiles of beneficiaries holding your personalized celebration card.
            </p>
          </div>
        </div>

        {/* Event FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 font-serif">
            Frequently Asked Questions: {config.eventName} in {city.name}
          </h2>
          <div className="divide-y divide-slate-100">
            {config.faqs.map((faq, idx) => (
              <div key={idx} className="py-4 space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-emerald-600 font-mono">Q{idx + 1}.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
