"use client";

import React, { useState, useEffect } from "react";
import {
  Truck,
  Clock,
  MapPin,
  Thermometer,
  ShieldCheck,
  RefreshCw,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Activity,
  Layers,
} from "lucide-react";

interface LogisticsNode {
  id: string;
  sourceName: string;
  location: string;
  quantityKg: number;
  dietaryType: string;
  perishableTimeWindowMin: number;
  tempCelsius: number;
  assignedVehicleId: string | null;
  status: "Optimizing Route" | "Assigned to Fleet" | "En Route to Hub";
  transitHubDarkStore: string;
}

export default function LogisticsSimulationPage() {
  const [nodes, setNodes] = useState<LogisticsNode[]>([
    {
      id: "NODE-101",
      sourceName: "Grand Palace Banquets (Barrackpore)",
      location: "Barrackpore Trunk Road, WB",
      quantityKg: 45,
      dietaryType: "100% Pure Veg Cooked",
      perishableTimeWindowMin: 38,
      tempCelsius: 5.2,
      assignedVehicleId: "FLEET-WB-04",
      status: "Assigned to Fleet",
      transitHubDarkStore: "Blinkit Dark Store #09 (Palta Hub)",
    },
    {
      id: "NODE-102",
      sourceName: "Park Street Italian Bistro",
      location: "Park Street, Kolkata",
      quantityKg: 28,
      dietaryType: "Mixed Pastas & Bakery",
      perishableTimeWindowMin: 52,
      tempCelsius: 4.8,
      assignedVehicleId: "FLEET-WB-01",
      status: "En Route to Hub",
      transitHubDarkStore: "Swiggy Instamart Pod #14 (Camac St)",
    },
    {
      id: "NODE-103",
      sourceName: "Corporate IT Park Cafeteria",
      location: "Sector V, Salt Lake",
      quantityKg: 85,
      dietaryType: "Rice, Dal & Seasonal Veg",
      perishableTimeWindowMin: 24,
      tempCelsius: 6.1,
      assignedVehicleId: null,
      status: "Optimizing Route",
      transitHubDarkStore: "Zepto Micro-fulfillment Center #03",
    },
  ]);

  const [activeVehicles] = useState([
    {
      id: "FLEET-WB-01",
      carrierType: "Insulated Electric Van (Cold-Chain ≤7°C)",
      driverSarathi: "SARATHI-DL-98214-WB",
      vahanPlate: "WB-02-AK-9122",
      currentCapacityKg: 180,
      maxCapacityKg: 400,
      ulipFastagStatus: "ACTIVE (LGD Zone 1)",
      etaNextStopMin: 14,
    },
    {
      id: "FLEET-WB-04",
      carrierType: "Refrigerated Cargo Tempo",
      driverSarathi: "SARATHI-DL-11842-WB",
      vahanPlate: "WB-24-B-3310",
      currentCapacityKg: 95,
      maxCapacityKg: 800,
      ulipFastagStatus: "ACTIVE (LGD Zone 2)",
      etaNextStopMin: 22,
    },
  ]);

  // Recalculate DVRPTW simulation
  const handleRecalculate = () => {
    setNodes((prev) =>
      prev.map((node) => ({
        ...node,
        assignedVehicleId: node.assignedVehicleId || "FLEET-WB-04",
        status: "Assigned to Fleet",
      }))
    );
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Truck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Algorithmic Supply Chain Optimization</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif mb-2">
          Dynamic Vehicle Routing with Time Windows (DVRPTW)
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Unlike standard e-commerce logistics, cooked food decay enforces strict perishable time
          windows. Our heuristic ant colony algorithms dynamically insert new surplus alerts into active
          vehicle routes without breaching SLAs.
        </p>
      </div>

      {/* Integration Status Bar (White Mode) */}
      <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-emerald-700 font-bold">ULIP API:</span>
            <span className="text-slate-600">PM Gati Shakti Master Plan Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-700 font-bold">VAHAN/SARATHI:</span>
            <span className="text-slate-600">Commercial Fleet Verified</span>
          </div>
        </div>

        <button
          onClick={handleRecalculate}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all text-xs active:scale-95 shadow-2xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Trigger DVRPTW Recalculation</span>
        </button>
      </div>

      {/* Grid: Live Surplus Nodes vs Active Fleet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Dynamic Nodes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Dynamic Food Surplus Nodes (Inflow)</span>
            </h2>
            <span className="text-xs font-mono text-gray-400">{nodes.length} Active Nodes</span>
          </div>

          <div className="space-y-3">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                      {node.id}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1">{node.sourceName}</h3>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" /> {node.location}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                      node.status === "Optimizing Route"
                        ? "bg-amber-100 text-amber-900 animate-pulse"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {node.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs font-mono">
                  <div>
                    <span className="text-gray-400 text-[10px] block">Quantity:</span>
                    <strong className="text-gray-800">{node.quantityKg} Kg</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Perishable Window:</span>
                    <strong className="text-amber-700">{node.perishableTimeWindowMin} min left</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">Temperature:</span>
                    <strong className="text-emerald-700">{node.tempCelsius}°C</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                  <span className="text-[11px]">
                    Transit Hub: <strong>{node.transitHubDarkStore}</strong>
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">
                    {node.assignedVehicleId ? `Assigned: ${node.assignedVehicleId}` : "Unassigned"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Transport Fleet */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>ULIP VAHAN &amp; FASTag Synced Fleets</span>
            </h2>
            <span className="text-xs font-mono text-gray-400">
              {activeVehicles.length} Vehicles Tracking
            </span>
          </div>

          <div className="space-y-3">
            {activeVehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-700">{v.id}</span>
                    <h3 className="text-sm font-bold text-gray-900">{v.carrierType}</h3>
                  </div>
                  <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                    {v.ulipFastagStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl font-mono">
                  <div>
                    <span className="text-gray-400 text-[10px] block">VAHAN Plate:</span>
                    <strong className="text-gray-800">{v.vahanPlate}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">SARATHI Driver ID:</span>
                    <strong className="text-gray-800">{v.driverSarathi}</strong>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Payload Load Factor:</span>
                    <span className="font-mono font-bold text-gray-800">
                      {v.currentCapacityKg} / {v.maxCapacityKg} kg (
                      {Math.round((v.currentCapacityKg / v.maxCapacityKg) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(v.currentCapacityKg / v.maxCapacityKg) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[11px]">Next Pickup Handover:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    ETA {v.etaNextStopMin} minutes
                  </span>
                </div>
              </div>
            ))}

            {/* Quick-Commerce Dark Store Transit Pod Integration Note */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-2">
              <strong className="text-gray-900 flex items-center gap-1.5 text-sm">
                <Layers className="w-4 h-4 text-emerald-600" />
                Quick-Commerce Dark Store Hub Integration
              </strong>
              <p className="text-gray-600 leading-relaxed">
                Using idle cold-storage racks in urban dark stores (Blinkit, Swiggy Instamart, Zepto) as
                temporary micro-transit nodes for surplus food staging before final evening meal distribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
