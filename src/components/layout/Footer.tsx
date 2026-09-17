import React from "react";
import Link from "next/link";
import { INDIAN_STATES } from "@/data/geography";
import { Shield, FileText, CheckCircle2, Globe, Heart, Award } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Institutional Trust Badges Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-12 shadow-sm">
          <div className="text-xs uppercase font-mono tracking-widest text-emerald-800 font-bold mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>Digital Public Infrastructure &amp; Regulatory Compliance Framework</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">FSSAI 2019</span>
                <span className="text-slate-600 text-[11px]">Recovery &amp; Distribution of Surplus Food Regs</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">NITI Aayog DARPAN</span>
                <span className="text-slate-600 text-[11px]">100% Verified NGOs (12A, 80G, FCRA)</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">ULIP / Gati Shakti</span>
                <span className="text-slate-600 text-[11px]">VAHAN &amp; FASTag Logistics Interop</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">NDMA &amp; NDRF</span>
                <span className="text-slate-600 text-[11px]">National Disaster Response Command</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Verra VM0046</span>
                <span className="text-slate-600 text-[11px]">Gold Standard Methane Offset Credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block py-1">
              <BrandLogo size="lg" showDpiBadge={false} />
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed pr-6">
              DonateFood.in operates as an agnostic national technology utility connecting commercial
              establishments, event organizers, and households with verified food rescue organizations.
              The foundational humanitarian utility remains unequivocally free for citizens and NGOs.
            </p>
            <div className="pt-2 text-[11px] text-slate-700 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                Good Samaritan Statutory Protection:
              </p>
              Under guidelines affirmed in <em>Save Life Foundation v. Union of India</em> and Section 5 of
              FSSAI Surplus Food Regulations, bona fide donors acting in good faith without commercial gain
              are protected against civil and criminal liability.
            </div>
          </div>

          {/* Silo 1: Donor Intent */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06571a] mb-3">
              Surplus Food Rescue
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/donate" className="hover:text-[#06571a] transition-colors text-slate-600">
                  Submit Surplus Food
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-food/west-bengal/north-24-parganas/barrackpore"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  Donate in Barrackpore (WB)
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-food/west-bengal/kolkata/kolkata-central"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  Donate in Kolkata Central
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-food/maharashtra/mumbai-suburban/bandra"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  Donate in Bandra (Mumbai)
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-food/delhi/central-delhi/connaught-place"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  Donate in Connaught Place (Delhi)
                </Link>
              </li>
              <li>
                <Link
                  href="/donate-food/karnataka/bengaluru-urban/indiranagar"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  Donate in Indiranagar (Bengaluru)
                </Link>
              </li>
            </ul>
          </div>

          {/* Silo 2: Beneficiary Intent */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#fe7801] mb-3">
              Food Assistance &amp; Langars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/assistance" className="hover:text-[#fe7801] transition-colors text-slate-600">
                  Find Nearest Kitchen
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance/west-bengal/north-24-parganas/barrackpore"
                  className="hover:text-[#fe7801] transition-colors text-slate-600"
                >
                  Food Relief in Barrackpore
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance/west-bengal/kolkata/kolkata-central"
                  className="hover:text-[#fe7801] transition-colors text-slate-600"
                >
                  Food Relief in Kolkata
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance/maharashtra/mumbai-suburban/bandra"
                  className="hover:text-[#fe7801] transition-colors text-slate-600"
                >
                  Food Relief in Bandra
                </Link>
              </li>
              <li>
                <Link
                  href="/assistance/delhi/central-delhi/connaught-place"
                  className="hover:text-[#fe7801] transition-colors text-slate-600"
                >
                  Community Kitchens Delhi
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-[#fe7801] font-semibold hover:underline">
                  NDMA Disaster Food Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Silo 3: Partners & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06571a] mb-3">
              Partners &amp; Technology
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/ngo" className="hover:text-[#06571a] transition-colors text-slate-600">
                  NITI Aayog NGO Verification
                </Link>
              </li>
              <li>
                <Link
                  href="/ngo-directory/west-bengal/barrackpore"
                  className="hover:text-[#06571a] transition-colors text-slate-600"
                >
                  NGO Directory (Barrackpore)
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-[#06571a] transition-colors text-slate-600">
                  Volunteer Fleet Dispatch
                </Link>
              </li>
              <li>
                <Link href="/logistics" className="hover:text-[#06571a] transition-colors text-slate-600">
                  DVRPTW Dynamic Routing
                </Link>
              </li>
              <li>
                <Link href="/enterprise/csr" className="hover:text-[#06571a] transition-colors text-slate-600">
                  Schedule VII CSR SaaS
                </Link>
              </li>
              <li>
                <Link href="/enterprise/carbon-credits" className="hover:text-[#06571a] transition-colors text-slate-600">
                  Verra VM0046 Carbon Offsets
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 DonateFood.in | Republic of India Open Digital Public Infrastructure (DPI)</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#06571a] font-medium">
              <Heart className="w-3.5 h-3.5 fill-[#fe7801] text-[#fe7801]" /> Free Open Public Utility
            </span>
            <span>Zero-Trust Cloudflare Security</span>
            <span>Local Government Directory (LGD) Validated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
