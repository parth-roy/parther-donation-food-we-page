"use client";

import React, { useState } from "react";
import { getAllCities } from "@/data/geography";
import {
  Users,
  Truck,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  Shield,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function VolunteerPage() {
  const cities = getAllCities();
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    citySlug: "barrackpore",
    role: "Pickup & Transport Volunteer" as const,
    vehicleType: "Motorcycle / Scooter" as const,
    insulatedBoxAvailable: true,
    availableDays: "Weekends & Evenings",
  });

  const activeSurplusTasks = [
    {
      id: "task-01",
      location: "Royal Palace Banquets, Barrackpore Trunk Road",
      destination: "Bengal Annapurna Kitchen Hub, Riverside Road",
      quantity: "35 kg (Approx. 80 meals)",
      dietary: "Vegetarian Cooked",
      timeRemaining: "42 mins left in time window",
      urgency: "HIGH",
      distance: "3.4 km",
    },
    {
      id: "task-02",
      location: "Sector V IT Park Cafeteria, Salt Lake",
      destination: "Sealdah Night Shelter Distribution Point",
      quantity: "60 kg (Approx. 135 meals)",
      dietary: "Mix Veg & Rice",
      timeRemaining: "1 hr 15 mins left",
      urgency: "NORMAL",
      distance: "6.8 km",
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section: Full-Bleed Edge-to-Edge Panoramic Display */}
      <section className="w-full p-0 m-0 border-b border-gray-200/80 bg-white overflow-hidden">
        <img
          src="/images/volunteer.webp"
          alt="DonateFood.in Volunteer Network - Join the Food Rescue Fleet"
          className="w-full h-auto object-cover block"
          loading="eager"
          fetchPriority="high"
        />
      </section>

      {/* Main Volunteer Content Section */}
      <div className="py-12 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06571a]/10 text-[#06571a] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-[#fe7801]" />
            <span>Citizen Logistics Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 font-serif mb-2">
            Join the Volunteer Food Rescue Fleet
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Transform grassroots volunteerism into an algorithmically coordinated rescue force. Help
            transport surplus food during critical time windows before spoilage occurs.
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Registration or Volunteer Dashboard */}
        <div className="lg:col-span-2">
          {!registered ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-md">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600" />
                <span>Volunteer Onboarding</span>
              </h2>

              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Debjit Mukherjee"
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Mobile Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98300 00000"
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Preferred City Zone *</label>
                    <select
                      value={formData.citySlug}
                      onChange={(e) => setFormData({ ...formData, citySlug: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      {cities.map((city) => (
                        <option key={city.slug} value={city.slug}>
                          {city.name} ({city.stateName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Vehicle Available</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleType: e.target.value as typeof formData.vehicleType,
                        })
                      }
                      className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Motorcycle / Scooter">Two-Wheeler (Motorcycle / Scooter)</option>
                      <option value="Four-Wheeler / Car">Four-Wheeler / Hatchback / SUV</option>
                      <option value="Commercial Cargo Van">Commercial Van / Tempo</option>
                      <option value="On Foot / Bicycle">Bicycle / Neighborhood Walking</option>
                    </select>
                  </div>
                </div>

                <div className="bg-teal-50 p-3 rounded-xl border border-teal-200">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-teal-900">
                    <input
                      type="checkbox"
                      checked={formData.insulatedBoxAvailable}
                      onChange={(e) =>
                        setFormData({ ...formData, insulatedBoxAvailable: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>I possess or can carry an insulated cooler box / thermal container</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md transition-all uppercase tracking-wider text-xs active:scale-95"
                >
                  Complete Registration &amp; Enter Dispatch Pool
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-teal-500 p-6 sm:p-8 shadow-lg">
              <div className="flex items-center gap-3 text-teal-700 mb-4">
                <CheckCircle2 className="w-8 h-8 text-teal-600" />
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Welcome to the Fleet, {formData.fullName || "Volunteer"}!
                  </h3>
                  <p className="text-xs text-gray-500">
                    Volunteer ID: VOL-IND-{Math.floor(10000 + Math.random() * 90000)} | Zone:{" "}
                    {formData.citySlug}
                  </p>
                </div>
              </div>

              <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-200 text-xs text-teal-900 mb-6">
                <p className="font-semibold mb-1">Live DVRPTW Route Matching Active</p>
                When a surplus donation is confirmed in your zone, you will receive an instant dispatch ping
                with pickup address, batch verification code, and destination community kitchen.
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Live Surplus Rescue Broadcasts
              </h4>
              <div className="space-y-3">
                {activeSurplusTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl border border-gray-200 bg-slate-50 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">{task.quantity}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                        {task.timeRemaining}
                      </span>
                    </div>
                    <div className="text-gray-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>From: {task.location}</span>
                    </div>
                    <div className="text-gray-600 flex items-start gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>To: {task.destination}</span>
                    </div>
                    <button
                      onClick={() => alert(`Pickup assigned! SMS dispatched with delivery passcode.`)}
                      className="w-full mt-2 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs"
                    >
                      Accept This Pickup Route
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Volunteer Safety & Perks */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs text-xs space-y-3">
            <h3 className="font-bold text-gray-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Volunteer Benefits</span>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Verified digital certificate of community service for academic/work credit</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Fuel subsidy reimbursement on commercial FBO corporate pickups</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>Good Samaritan legal immunity during all authorized rescue trips</span>
              </li>
            </ul>
          </div>

          <div className="bg-teal-50 text-teal-950 rounded-2xl p-5 border border-teal-200 text-xs shadow-2xs">
            <span className="text-teal-800 font-mono text-[10px] uppercase font-bold block mb-1">
              Robin Hood Army Model Synergy
            </span>
            <p className="text-teal-900/80 leading-relaxed text-[11px]">
              DonateFood.in does not replace volunteer networks. It arms self-organized volunteer teams with
              route optimization, temperature tracking, and legal liability protection so they can focus on
              distributing meals safely.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
