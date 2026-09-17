"use client";

import React, { useState } from "react";
import { calculateCarbonOffset } from "@/data/carbon";
import { formatNumber } from "@/utils/format";
import {
  Leaf,
  Droplets,
  Award,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Download,
  Info,
} from "lucide-react";

export default function CarbonCreditsPage() {
  const [foodKg, setFoodKg] = useState(25000); // default 25 tonnes
  const metrics = calculateCarbonOffset(foodKg);

  return (
    <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Leaf className="w-3.5 h-3.5 text-teal-600" />
          <span>Verra VM0046 &amp; Gold Standard DOWMER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-2">
          ESG Carbon Offset &amp; Methane Reduction Ledger
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          When organic food waste is diverted from open landfills, anaerobic methane emissions are
          prevented. DonateFood.in quantifies and certifies this climate action into tradable carbon
          credits to fund national hunger relief.
        </p>
      </div>

      {/* Interactive Carbon Calculator */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-md mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Interactive Methane Avoidance Calculator
            </h2>
            <p className="text-xs text-gray-500">
              Adjust the volume of surplus food recovered to calculate carbon credits and water savings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">Volume:</span>
            <input
              type="number"
              min="100"
              max="1000000"
              step="500"
              value={foodKg}
              onChange={(e) => setFoodKg(Math.max(0, Number(e.target.value)))}
              className="text-sm font-mono font-bold w-32 p-2 border border-gray-300 rounded-lg text-emerald-800 text-right focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span className="text-xs font-bold text-gray-500">Kg</span>
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="500"
          max="200000"
          step="500"
          value={foodKg}
          onChange={(e) => setFoodKg(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600 mb-8"
        />

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100">
            <span className="text-[10px] uppercase font-bold text-teal-800 block mb-1">
              CO₂e Avoided (Landfill Methane)
            </span>
            <div className="text-2xl font-black font-mono text-teal-900">
              {metrics.co2eAvoidedTonnes} MT
            </div>
            <span className="text-[11px] text-teal-700 block mt-1">
              {formatNumber(metrics.methaneAvoidedKg)} kg pure CH₄
            </span>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
              Tradable Carbon Credits
            </span>
            <div className="text-2xl font-black font-mono text-emerald-900">
              {metrics.carbonCreditsGenerated} Credits
            </div>
            <span className="text-[11px] text-emerald-700 block mt-1">1 Credit = 1 MT CO₂e</span>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
            <span className="text-[10px] uppercase font-bold text-blue-800 block mb-1">
              Water Footprint Conserved
            </span>
            <div className="text-2xl font-black font-mono text-blue-900">
              {formatNumber(metrics.waterFootprintConservedLiters / 1000)} kL
            </div>
            <span className="text-[11px] text-blue-700 block mt-1">Virtual water saved</span>
          </div>

          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
            <span className="text-[10px] uppercase font-bold text-amber-800 block mb-1">
              Voluntary Market Value
            </span>
            <div className="text-2xl font-black font-mono text-amber-900">
              ₹{formatNumber(metrics.monetaryCreditValueInr)}
            </div>
            <span className="text-[11px] text-amber-700 block mt-1">100% Funds Hunger Relief</span>
          </div>
        </div>
      </div>

      {/* Methodology Standards Description */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4 text-xs">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          <span>International Carbon Crediting Methodologies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <strong className="text-gray-900 block text-sm">Verra VM0046 Standard</strong>
            <p className="text-gray-600 leading-relaxed">
              Standardized baseline for quantifying the reduction of food loss and waste across retail,
              hospitality, and manufacturing sectors. Validates diversion away from municipal solid waste
              dumpsites where anaerobic conditions create powerful methane gas.
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <strong className="text-gray-900 block text-sm">Gold Standard DOWMER</strong>
            <p className="text-gray-600 leading-relaxed">
              Decentralized organic waste processing framework accounting for rapid food rescue and localized
              composting, ensuring zero leakages in cold-chain transport corridors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
