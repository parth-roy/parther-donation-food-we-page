"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/data/translations";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  HeartHandshake,
  AlertTriangle,
  Globe,
  Menu,
  X,
  Truck,
  Building2,
  ShieldCheck,
  MapPin,
  Flame,
} from "lucide-react";

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near top
      if (currentScrollY <= 60) {
        setVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Ignore micro-jitters
      if (Math.abs(diff) < 8) {
        ticking = false;
        return;
      }

      if (diff > 0) {
        // Scrolling down -> hide
        setVisible(false);
      } else {
        // Scrolling up -> reveal with smooth, gentle deceleration
        setVisible(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isEmergencyActive = pathname.startsWith("/emergency");

  return (
    <header
      className={`sticky top-0 z-50 w-full shadow-xs border-b border-gray-200/80 bg-white/95 backdrop-blur-md will-change-transform transition-transform ${
        visible || mobileMenuOpen
          ? "translate-y-0 duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
          : "-translate-y-full duration-300 ease-in"
      }`}
    >
      {/* Upper section commented out per user instruction to remove line and top space */}
      {/*
      <div className="bg-emerald-50/80 text-emerald-950 border-b border-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-bold text-emerald-800">DPI PROTOCOL</span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="hidden sm:inline text-emerald-700 font-medium">
              National Food Rescue &amp; Hunger-Response Infrastructure
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/emergency"
              className="flex items-center gap-1.5 font-bold text-red-700 hover:text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px] transition-all shadow-2xs"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>NDMA Emergency Mode</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-medium transition-colors shadow-2xs"
                aria-label="Select Language"
              >
                <Globe className="w-3 h-3 text-emerald-600" />
                <span>{SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}</span>
                <span className="text-[9px] text-gray-400">▼</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      */}

      {/* Main Navigation Bar - Spacious and vertically prominent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex items-center justify-between min-h-[96px] sm:min-h-[108px] lg:min-h-[116px] gap-4">
        <Link href="/" className="flex items-end group py-1 shrink-0">
          <BrandLogo size="md" showDpiBadge={false} />
        </Link>

        {/* Desktop Navigation Links: 4 core citizen/NGO pathways with 70% blended gradient underline */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
          {[
            { href: "/donate", label: t("haveFood") },
            { href: "/assistance", label: t("needFood") },
            { href: "/volunteer", label: t("wantToHelp") },
            { href: "/ngo", label: t("imAnNgo") },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-3 px-1 text-sm font-semibold transition-colors duration-200 whitespace-nowrap group ${
                  isActive ? "text-[#fe7801] font-bold" : "text-gray-700 hover:text-[#fe7801]"
                }`}
              >
                <span>{item.label}</span>
                {/* 70% Bold Dual-Tone Underline: 55-60% Green fading into Orange */}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[3.5px] rounded-full bg-gradient-to-r from-[#06571a] from-55% via-[#0a7a28] to-[#fe7801] transition-all duration-300 ease-out pointer-events-none ${
                    isActive
                      ? "w-[70%] opacity-100"
                      : "w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Borderless Language Selector & Designer Pill CTA */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          {/* Language Switcher Trigger - Borderless with matching 70% gradient underline */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`relative py-3 px-1 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group cursor-pointer ${
                langDropdownOpen ? "text-[#fe7801]" : "text-gray-700 hover:text-[#fe7801]"
              }`}
              aria-label="Select Language"
            >
              <Globe className="w-4 h-4 text-gray-500 group-hover:text-[#fe7801] transition-colors" />
              <span>{SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}</span>
              <span
                className={`text-[10px] text-gray-400 group-hover:text-[#fe7801] transition-transform duration-200 ${
                  langDropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>

              {/* Matching 70% Dual-Tone Underline */}
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[3.5px] rounded-full bg-gradient-to-r from-[#06571a] from-55% via-[#0a7a28] to-[#fe7801] transition-all duration-300 ease-out pointer-events-none ${
                  langDropdownOpen
                    ? "w-[70%] opacity-100"
                    : "w-0 opacity-0 group-hover:w-[70%] group-hover:opacity-100"
                }`}
              />
            </button>

            {/* Sleek Floating Glass Dropdown Popover */}
            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-3 w-72 max-h-[420px] overflow-y-auto bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-200"
                onMouseLeave={() => setLangDropdownOpen(false)}
              >
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100/80 mb-1.5 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-xs z-10">
                  <span>Select Language (12 Languages)</span>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#06571a] to-[#fe7801]" />
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as SupportedLanguage);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        language === lang.code
                          ? "bg-gradient-to-r from-[#06571a]/10 to-[#fe7801]/10 text-[#06571a] font-bold border border-[#06571a]/20 shadow-2xs"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#fe7801]"
                      }`}
                    >
                      <div>
                        <span className="font-semibold block text-[13px]">{lang.nativeName}</span>
                        <span className="text-[10px] text-gray-400">{lang.name}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md font-bold ${
                          language === lang.code
                            ? "bg-[#06571a] text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {lang.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Button - Designer-grade pill with ambient light sweep & blended brand radiance */}
          <Link
            href="/donate"
            className="relative group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#06571a] via-[#086a20] to-[#0a7a28] text-white font-bold text-sm tracking-wide shadow-md shadow-[#06571a]/25 hover:shadow-xl hover:shadow-[#06571a]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 whitespace-nowrap shrink-0 overflow-hidden border border-[#0a7e28]/40"
          >
            {/* Subtle ambient light sweep on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

            {/* Circular icon chip with smooth color morph to brand orange */}
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/15 group-hover:bg-[#fe7801] transition-colors duration-300 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-[#fe7801] group-hover:text-white transition-colors duration-300" />
            </span>

            <span>Donate Surplus</span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-700 hover:text-[#06571a] hover:bg-gray-100 rounded-xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <Link
            href="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 text-emerald-900 font-bold"
          >
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-sm">{t("haveFood")}</div>
              <div className="text-xs text-emerald-700 font-normal">{t("haveFoodDesc")}</div>
            </div>
          </Link>
          <Link
            href="/assistance"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-800 font-semibold"
          >
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-sm">{t("needFood")}</div>
              <div className="text-xs text-gray-500 font-normal">{t("needFoodDesc")}</div>
            </div>
          </Link>
          <Link
            href="/volunteer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-800 font-semibold"
          >
            <HeartHandshake className="w-5 h-5 text-teal-600" />
            <div>
              <div className="text-sm">{t("wantToHelp")}</div>
              <div className="text-xs text-gray-500 font-normal">{t("wantToHelpDesc")}</div>
            </div>
          </Link>
          <Link
            href="/ngo"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-800 font-semibold"
          >
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-sm">{t("imAnNgo")}</div>
              <div className="text-xs text-gray-500 font-normal">{t("imAnNgoDesc")}</div>
            </div>
          </Link>
          <Link
            href="/emergency"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl bg-red-50 text-red-900 font-bold border border-red-200"
          >
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-sm">{t("emergency")}</div>
              <div className="text-xs text-red-700 font-normal">{t("emergencyDesc")}</div>
            </div>
          </Link>
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            <Link
              href="/logistics"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              DVRPTW Logistics
            </Link>
            <Link
              href="/enterprise/csr"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 px-3 text-xs font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              Enterprise CSR
            </Link>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <div className="text-xs font-bold text-gray-500 mb-2 px-1 flex items-center gap-1.5 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Language / भाषा</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-xs rounded-xl border transition-all ${
                    language === lang.code
                      ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="block font-medium">{lang.nativeName}</span>
                  <span className="text-[10px] text-gray-400 uppercase">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
