/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { ExploreView } from './components/ExploreView';
import { DiningShowcaseView } from './components/DiningShowcaseView';
import { ItinerariesView } from './components/ItinerariesView';
import { HostDashboardView } from './components/HostDashboardView';
import { ListingDetailModal } from './components/ListingDetailModal';
import { BookingModal } from './components/BookingModal';
import { BoardingPassModal } from './components/BoardingPassModal';
import { StewardCallModal } from './components/StewardCallModal';
import { SchemaInspectorModal } from './components/SchemaInspectorModal';
import {
  Compass,
  Sparkles,
  Shield,
  Utensils,
  MapPin,
  Heart,
  Database,
  ArrowUpRight,
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView, setActiveView, toastMessage, setSchemaModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-900 selection:text-amber-50">
      {/* Primary Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'explore' && <ExploreView />}
        {activeView === 'dining' && <DiningShowcaseView />}
        {activeView === 'itinerary' && <ItinerariesView />}
        {activeView === 'host' && <HostDashboardView />}
      </main>

      {/* Luxury Footer */}
      <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-stone-900 flex items-center justify-center text-amber-200 border border-amber-400/30">
                  <Compass className="w-5 h-5 text-amber-300" />
                </div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">
                  VoyageEase
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Modern overland hospitality management and travel enrollment platform featuring luxury
                accommodations, Michelin-partnered dining, and personal cabin stewards.
              </p>
              <div className="flex items-center space-x-3 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Golden Age of Overland Transit</span>
              </div>
            </div>

            {/* Col 2: Corridors */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                Scenic Corridors
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li
                  onClick={() => setActiveView('explore')}
                  className="hover:text-amber-200 cursor-pointer transition-colors"
                >
                  The Imperial Alpine Panorama (Zurich to Zermatt)
                </li>
                <li
                  onClick={() => setActiveView('explore')}
                  className="hover:text-amber-200 cursor-pointer transition-colors"
                >
                  Aura Grand Horizon Motorcoach (SF to LA)
                </li>
                <li
                  onClick={() => setActiveView('explore')}
                  className="hover:text-amber-200 cursor-pointer transition-colors"
                >
                  The Royal Sakura Shinkansen (Tokyo to Kyoto)
                </li>
                <li
                  onClick={() => setActiveView('explore')}
                  className="hover:text-amber-200 cursor-pointer transition-colors"
                >
                  The Mediterranean Sleeper (Milan to Nice)
                </li>
                <li
                  onClick={() => setActiveView('explore')}
                  className="hover:text-amber-200 cursor-pointer transition-colors"
                >
                  The Royal Highland Starlight (London to Edinburgh)
                </li>
              </ul>
            </div>

            {/* Col 3: Hospitality Services */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                Signature Amenities
              </h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li
                  onClick={() => setActiveView('dining')}
                  className="hover:text-amber-200 cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Utensils className="w-3 h-3 text-amber-500" /> All-Inclusive 4-Course Menus
                </li>
                <li className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-amber-500" /> Dedicated Carriage Stewards
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Circadian Lighting & Aromatherapy
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-amber-500" /> VIP Station Grand Lounges
                </li>
                <li>
                  <button
                    onClick={() => setSchemaModalOpen(true)}
                    className="text-amber-400 hover:text-amber-300 underline text-xs font-mono flex items-center gap-1 cursor-pointer mt-1"
                  >
                    <Database className="w-3 h-3" /> Inspect Relational Schema
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Citizen Concierge */}
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                Citizen Concierge
              </h4>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                24/7 dedicated travel support for Royal Black Elite and verified citizen passengers worldwide.
              </p>
              <div className="bg-stone-900 p-3.5 rounded-xl border border-stone-800 text-xs space-y-1">
                <div className="text-stone-300 font-medium">Headquarters Terminal:</div>
                <div className="text-amber-300 font-mono text-[11px]">
                  Royal Terminal · Zurich HB & Transbay Tower
                </div>
                <div className="text-stone-400 text-[11px] pt-1">
                  concierge@voyageease.com · +1 (800) 892-EASE
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <div>
              © 2026 VoyageEase Hospitality Management Systems. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-stone-400">
              <span className="hover:text-stone-200 cursor-pointer">Terms of Carriage</span>
              <span className="hover:text-stone-200 cursor-pointer">Citizen Privacy Notice</span>
              <span className="hover:text-stone-200 cursor-pointer">Galley Safety Standards</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ListingDetailModal />
      <BookingModal />
      <BoardingPassModal />
      <StewardCallModal />
      <SchemaInspectorModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-stone-900 text-amber-100 px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-600/40 text-xs font-semibold flex items-center space-x-3">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-spin" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
