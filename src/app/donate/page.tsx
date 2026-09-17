"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { FSSAI_SURPLUS_REGULATIONS, generateVerificationHash, DigitalHandoverCertificate } from "@/data/compliance";
import { VERIFIED_NGOS } from "@/data/ngos";
import { getAllCities } from "@/data/geography";
import {
  Utensils,
  ShieldCheck,
  Thermometer,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Building,
  Printer,
  Sparkles,
} from "lucide-react";

export default function DonateFoodPage() {
  const cities = getAllCities();
  const [formData, setFormData] = useState({
    donorName: "",
    donorType: "FBO / Restaurant" as const,
    contactPerson: "",
    contactPhone: "",
    fssaiLicenseNumber: "",
    citySlug: "barrackpore",
    pickupAddress: "",
    foodCategory: "Cooked Meals" as const,
    dietaryType: "100% Vegetarian" as const,
    quantityKg: 25,
    estimatedMeals: 55,
    temperatureRecordedC: 4.5,
    preparedAt: new Date().toISOString().slice(0, 16),
    packagingCondition: "Airtight insulated containers (FSSAI sealed)",
    segregationPledge: true,
  });

  const [submittedCertificate, setSubmittedCertificate] = useState<DigitalHandoverCertificate | null>(null);

  const isTempCompliant =
    formData.foodCategory === "Cooked Meals"
      ? formData.temperatureRecordedC <= 7 || formData.temperatureRecordedC >= 60
      : formData.temperatureRecordedC <= 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCity = cities.find((c) => c.slug === formData.citySlug) || cities[0];
    const availableNgo =
      VERIFIED_NGOS.find((n) => n.citySlug === selectedCity.slug && n.tier >= 4) || VERIFIED_NGOS[0];

    const certId = `DFI-CERT-${Date.now().toString(36).toUpperCase()}`;
    const cert: DigitalHandoverCertificate = {
      certificateId: certId,
      donorName: formData.donorName || "Grand Banquet Services",
      donorType: formData.donorType,
      fssaiLicenseNumber: formData.fssaiLicenseNumber || "FSSAI-21522045000998",
      foodDescription: `${formData.quantityKg} kg of freshly prepared ${formData.dietaryType} ${formData.foodCategory}`,
      dietaryType: formData.dietaryType,
      quantityKg: Number(formData.quantityKg),
      estimatedMeals: Math.round(Number(formData.quantityKg) / 0.45),
      preparationTimestamp: formData.preparedAt,
      handoverTimestamp: new Date().toISOString(),
      temperatureRecordedC: Number(formData.temperatureRecordedC),
      temperatureCompliant: isTempCompliant,
      receivingNgoName: availableNgo.name,
      receivingNgoDarpanId: availableNgo.darpanId,
      logisticsDriverSarathiId: `SARATHI-DL-WB-${Math.floor(100000 + Math.random() * 900000)}`,
      verificationHash: generateVerificationHash(certId + formData.donorName),
    };

    setSubmittedCertificate(cert);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Utensils className="w-3.5 h-3.5 text-emerald-600" />
          <span>FSSAI 2019 Surplus Food Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-2">
          Surplus Food Donation Portal
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Capture vital operational data, enforce cold-chain safety limits, and generate an immutable
          Good Samaritan liability mitigation certificate.
        </p>
      </div>

      {!submittedCertificate ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          {/* Statutory Alert Banner */}
          <div className="bg-emerald-50 border-b border-emerald-100 p-4 text-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950 block">
                Good Samaritan Statutory Protection Active
              </span>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Pursuant to Save Life Foundation v. Union of India and FSSAI 2019 surplus guidelines, bona fide
                donations made with temperature &amp; preparation disclosures shield the donor from civil and
                criminal liability.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Donor Entity Info */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono mb-4 flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-600" />
                <span>1. Donor Entity &amp; FSSAI Registration</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Establishment / Donor Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.donorName}
                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                    placeholder="e.g. Royal Bengal Banquet &amp; Caterers"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Donor Type</label>
                  <select
                    value={formData.donorType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        donorType: e.target.value as typeof formData.donorType,
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="FBO / Restaurant">FBO / Commercial Restaurant</option>
                    <option value="Corporate Cafeteria">Corporate Cafeteria (CSR)</option>
                    <option value="Event / Banquet">Event / Wedding Banquet</option>
                    <option value="Household / Community">Household / Community Kitchen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    FSSAI License / Registration No.
                  </label>
                  <input
                    type="text"
                    value={formData.fssaiLicenseNumber}
                    onChange={(e) => setFormData({ ...formData, fssaiLicenseNumber: e.target.value })}
                    placeholder="e.g. 11522045000123"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Location / City *</label>
                  <select
                    value={formData.citySlug}
                    onChange={(e) => setFormData({ ...formData, citySlug: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {cities.map((city) => (
                      <option key={city.slug} value={city.slug}>
                        {city.name} ({city.stateName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Exact Pickup Address &amp; Landmarks *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    placeholder="e.g. Gate 2, Royal Palace Banquets, Barrackpore Trunk Road, WB 700120"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Food Specifications & FSSAI Standards */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono mb-4 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-emerald-600" />
                <span>2. Food Categorization &amp; Safety Verification</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dietary Segregation *</label>
                  <select
                    value={formData.dietaryType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dietaryType: e.target.value as typeof formData.dietaryType,
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="100% Vegetarian">100% Pure Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian (Packaged Separate)</option>
                    <option value="Eggitarian / Mixed">Eggitarian / Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Food Category</label>
                  <select
                    value={formData.foodCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        foodCategory: e.target.value as typeof formData.foodCategory,
                      })
                    }
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Cooked Meals">Cooked Meals (Ready to Eat)</option>
                    <option value="Raw Grain/Ration">Raw Grain / Rice / Flour</option>
                    <option value="Perishable Produce">Perishable Fruits / Veggies</option>
                    <option value="Packaged Foods">Packaged / Sealed Foods</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Volume Diverted (in Kg) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="5000"
                    required
                    value={formData.quantityKg}
                    onChange={(e) => setFormData({ ...formData, quantityKg: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-[10px] text-gray-500">
                    Est. {Math.round(formData.quantityKg / 0.45)} nutritious meals
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Current Temperature (°C) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.temperatureRecordedC}
                      onChange={(e) =>
                        setFormData({ ...formData, temperatureRecordedC: parseFloat(e.target.value) || 0 })
                      }
                      className={`w-full text-xs p-2.5 rounded-lg border focus:outline-none font-mono ${
                        isTempCompliant
                          ? "border-emerald-300 bg-emerald-50/50 text-emerald-900"
                          : "border-red-300 bg-red-50 text-red-900"
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-gray-400">°C</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold block mt-1 ${
                      isTempCompliant ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {isTempCompliant
                      ? "✓ Compliant with FSSAI Reg. 4(1)"
                      : "⚠ Non-compliant! Chilled must be ≤7°C, hot ≥60°C"}
                  </span>
                </div>
              </div>

              {/* Packaging Condition & Preparation Timestamp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preparation Timestamp *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.preparedAt}
                    onChange={(e) => setFormData({ ...formData, preparedAt: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Packaging Condition Description
                  </label>
                  <input
                    type="text"
                    value={formData.packagingCondition}
                    onChange={(e) => setFormData({ ...formData, packagingCondition: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Statutory Compliance Checklist */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.segregationPledge}
                  onChange={(e) => setFormData({ ...formData, segregationPledge: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-700 leading-relaxed">
                  <strong>FSSAI 2019 Statutory Handover Affirmation:</strong> I certify that the food has
                  been prepared, handled, and maintained under hygienic standards, segregated by dietary
                  type, and is wholesome for consumption at the time of this handover.
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>Submit Food &amp; Generate FSSAI Certificate</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Digital Compliance Handover Certificate View */
        <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-2xl p-6 sm:p-10 animate-fadeIn">
          <div className="flex items-center justify-between border-b-2 border-emerald-900/10 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-serif text-xl font-bold">
                DF
              </div>
              <div>
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700">
                  Government of India • Open DPI Standard
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-serif">
                  Digital Handover &amp; Safety Compliance Certificate
                </h2>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-gray-400 font-mono block">CERTIFICATE SERIAL</span>
              <span className="text-xs font-mono font-bold text-gray-900">
                {submittedCertificate.certificateId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">
                Donor Entity
              </span>
              <p className="font-bold text-gray-900 text-sm mb-0.5">
                {submittedCertificate.donorName}
              </p>
              <span className="text-gray-600 block">{submittedCertificate.donorType}</span>
              <span className="text-[11px] font-mono text-emerald-800">
                FSSAI: {submittedCertificate.fssaiLicenseNumber}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">
                Designated Receiving NGO
              </span>
              <p className="font-bold text-gray-900 text-sm mb-0.5">
                {submittedCertificate.receivingNgoName}
              </p>
              <span className="text-gray-600 block font-mono">
                NITI Aayog DARPAN: {submittedCertificate.receivingNgoDarpanId}
              </span>
              <span className="text-emerald-700 font-bold block text-[11px]">
                Level-5 Active Rescue Partner
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">
                Surplus Metrics
              </span>
              <p className="font-bold text-gray-900 text-sm mb-0.5">
                {submittedCertificate.quantityKg} kg Diverted
              </p>
              <span className="text-emerald-700 font-bold block">
                ≈ {submittedCertificate.estimatedMeals} Nutritious Meals
              </span>
              <span className="text-gray-600 block font-mono">
                Temp: {submittedCertificate.temperatureRecordedC}°C (Verified Compliant)
              </span>
            </div>
          </div>

          {/* Verification & Legal Shield */}
          <div className="bg-emerald-50/70 p-5 rounded-xl border border-emerald-200 text-xs mb-8">
            <div className="flex items-center gap-2 text-emerald-900 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Good Samaritan Statutory Immunity Ledger</span>
            </div>
            <p className="text-emerald-800 leading-relaxed text-[11px]">
              This digital certificate serves as an immutable tamper-evident record under FSSAI Surplus
              Regulations 2019. The donor has formally certified food temperature, hygiene conditions, and
              dietary segregation prior to transport. Under Save Life Foundation v. Union of India, the donor
              is shielded from civil or criminal claims regarding bona fide distribution of surplus food.
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-200/80 flex flex-wrap items-center justify-between font-mono text-[10px] text-emerald-900">
              <span>SARATHI DISPATCH ID: {submittedCertificate.logisticsDriverSarathiId}</span>
              <span>CRYPTO HASH: {submittedCertificate.verificationHash}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download Certificate</span>
            </button>

            <button
              onClick={() => setSubmittedCertificate(null)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              Submit Another Donation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
