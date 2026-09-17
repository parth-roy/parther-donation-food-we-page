"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Flame,
  Droplets,
  Truck,
  Building,
  Radio,
  MapPin,
  ShieldAlert,
  Clock,
  PhoneCall,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function EmergencyDisasterPage() {
  const [activeZone, setActiveZone] = useState("Zone-East-WB");

  const crisisZones = [
    {
      id: "Zone-East-WB",
      name: "Ganga Lowlands / Sundarbans Coastal Belt",
      disasterType: "Severe Cyclonic Inundation",
      alertLevel: "RED ALERT",
      ndrfBattalionAssigned: "2nd Bn NDRF Haringhata",
      displacedCount: "85,400 persons",
      potableWaterRemainingLiters: "142,000 L",
      mealsRequiredToday: "170,000 meals",
      operationalKitchens: 24,
      heavyTransportTrucksActive: 18,
      leadRescueCoordinator: "Collectorate Disaster Management Cell",
      helpline: "1077 (Toll-Free District Emergency)",
    },
    {
      id: "Zone-West-MH",
      name: "Konkan Flood Corridors / Chiplun Basin",
      disasterType: "Heavy Monsoon Flash Flood",
      alertLevel: "ORANGE ALERT",
      ndrfBattalionAssigned: "5th Bn NDRF Pune",
      displacedCount: "32,100 persons",
      potableWaterRemainingLiters: "85,000 L",
      mealsRequiredToday: "64,000 meals",
      operationalKitchens: 14,
      heavyTransportTrucksActive: 11,
      leadRescueCoordinator: "State Disaster Management Authority (SDMA)",
      helpline: "1070 (State Emergency Operations)",
    },
  ];

  const currentZone = crisisZones.find((z) => z.id === activeZone) || crisisZones[0];

  const liveSupplyDispatches = [
    {
      id: "DSP-091",
      carrier: "ULIP-FASTag VAHAN ID: WB-25-C-8812 (16-Tonne Carrier)",
      cargo: "12,000 kg Fortified Grain, Ready-To-Eat (RTE) Packets",
      origin: "Central Warehouse, Dankuni",
      destination: "Barrackpore Relief Camp #4",
      status: "In Transit (ETA 22 mins)",
      driverSarathiVerified: true,
    },
    {
      id: "DSP-092",
      carrier: "ULIP-FASTag VAHAN ID: WB-19-E-4190 (Cold-Chain Reefer)",
      cargo: "3,500 L Potable Filtered Water + Infant Nutrition",
      origin: "Kolkata Hub Community Kitchen",
      destination: "Hasnabad Sundarban Transit Point",
      status: "Dispatched (ETA 48 mins)",
      driverSarathiVerified: true,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Emergency Alert Banner (White/Light Mode) */}
        <div className="bg-gradient-to-r from-red-50 via-red-100/60 to-amber-50 border-2 border-red-400 rounded-2xl p-5 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-red-600 text-white rounded-xl shadow-md shadow-red-600/30 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-800">
                  National Disaster Management Protocol (NDMA Section 34)
                </span>
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.2 rounded-full uppercase">
                  ACTIVE CRISIS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 font-serif mt-0.5">
                Centralized Logistics Command Center
              </h1>
              <p className="text-xs text-red-900/80 mt-1">
                Decentralized peer-to-peer routing overridden for real-time state disaster coordination.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block font-mono">
              <span className="text-[10px] text-red-700 block">NDRF INCIDENT FREQUENCY</span>
              <span className="text-sm font-bold text-slate-900">CH-14 VFH SECURE</span>
            </div>
            <a
              href="tel:1077"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>SOS Helpline (1077)</span>
            </a>
          </div>
        </div>

        {/* Zone Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {crisisZones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeZone === zone.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/25 border border-red-500"
                  : "bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-2xs"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{zone.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                {zone.alertLevel}
              </span>
            </button>
          ))}
        </div>

        {/* Real-time Heatmap & Statistics Command Grid (Clean White Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
            <span className="text-slate-500 text-xs block mb-1">Displaced Population</span>
            <div className="text-2xl font-black font-mono text-amber-600">
              {currentZone.displacedCount}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">In acute relief shelters</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
            <span className="text-slate-500 text-xs block mb-1">Daily Meal Requirement</span>
            <div className="text-2xl font-black font-mono text-emerald-700">
              {currentZone.mealsRequiredToday}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">82% supply matched via DPI</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
            <span className="text-slate-500 text-xs block mb-1">Potable Water Reserves</span>
            <div className="text-2xl font-black font-mono text-blue-700">
              {currentZone.potableWaterRemainingLiters}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Mobile tankers deployed</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
            <span className="text-slate-500 text-xs block mb-1">NDRF Unit Mobilized</span>
            <div className="text-sm font-bold font-mono text-slate-900 mt-1">
              {currentZone.ndrfBattalionAssigned}
            </div>
            <span className="text-[11px] text-red-600 mt-1 block font-mono font-medium">
              Lead: {currentZone.leadRescueCoordinator}
            </span>
          </div>
        </div>

        {/* Live ULIP Supply Dispatches */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-950">
                Live ULIP Heavy Transport Supply Dispatches
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              FASTag &amp; VAHAN GPS SYNCED
            </span>
          </div>

          <div className="space-y-3">
            {liveSupplyDispatches.map((dsp) => (
              <div
                key={dsp.id}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-emerald-800 font-bold">{dsp.carrier}</span>
                  <span className="bg-emerald-100 text-emerald-900 font-mono px-2 py-0.5 rounded text-[11px] border border-emerald-200 self-start font-bold">
                    {dsp.status}
                  </span>
                </div>
                <p className="text-slate-700">
                  <strong>Supplies:</strong> {dsp.cargo}
                </p>
                <div className="flex flex-wrap items-center justify-between text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-200/60">
                  <span>Origin: {dsp.origin}</span>
                  <span>Destination: {dsp.destination}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
