import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Utensils,
  Wine,
  Sparkles,
  Clock,
  CheckCircle2,
  Train,
  Bus,
  ArrowRight,
  Coffee,
  HeartHandshake,
  Award,
} from 'lucide-react';

export const DiningShowcaseView: React.FC = () => {
  const { listings, openBookingModal } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState(listings[0].id);

  const activeListing = listings.find((l) => l.id === selectedRouteId) || listings[0];
  const { diningMenu, stewardTeam } = activeListing;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-20">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-stone-100 p-8 sm:p-14 shadow-xl border border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=80"
          alt="Fine Dining"
          className="absolute inset-0 w-full h-full object-cover filter brightness-50"
        />

        <div className="relative z-20 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>Michelin-Inspired Haute Cuisine at 300 km/h</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            The Golden Age of <br />
            <span className="italic font-normal text-amber-200">Overland Gastronomy.</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Every VoyageEase ticket includes a four-course seasonal menu prepared fresh in our onboard
            galleys by master chefs, paired with unlimited Grand Cru vintages and served on crisp linen
            as dramatic landscapes sweep past your window.
          </p>
        </div>
      </div>

      {/* Corridor Dining Selector Pills */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
          Select Scenic Corridor Menu
        </label>
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {listings.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedRouteId(item.id)}
              className={`px-4 py-3 rounded-2xl border text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedRouteId === item.id
                  ? 'bg-stone-900 text-amber-100 border-stone-900 shadow-md ring-2 ring-amber-600/30'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              {item.transitType === 'train' ? (
                <Train className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Bus className="w-3.5 h-3.5 text-amber-600" />
              )}
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Corridor Culinary Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800">
              {activeListing.operator} · Culinary Program
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {diningMenu.includedService}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Service Window: {diningMenu.serviceWindow}</span>
            </div>
          </div>

          <button
            onClick={() => openBookingModal(activeListing)}
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-amber-100 rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
          >
            <span>Book Route with This Menu</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* Master Chef & Culinary Stewards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#faf8f5] p-5 rounded-2xl border border-stone-200/80">
          <div>
            <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
              Executive Chef
            </div>
            <div className="font-serif text-base font-bold text-stone-900 mt-1">
              {stewardTeam.executiveChef}
            </div>
            <p className="text-xs text-stone-600 mt-0.5 font-light">
              Crafts seasonal tasting menus based on regional local harvests.
            </p>
          </div>

          <div>
            <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
              Head Sommelier
            </div>
            <div className="font-serif text-base font-bold text-stone-900 mt-1">
              {stewardTeam.sommelier}
            </div>
            <p className="text-xs text-stone-600 mt-0.5 font-light">
              Curates private cellars, vintage sparkling, and artisanal digestifs.
            </p>
          </div>

          <div>
            <div className="text-[11px] text-stone-400 font-bold uppercase tracking-wider">
              Head Carriage Steward
            </div>
            <div className="font-serif text-base font-bold text-stone-900 mt-1">
              {stewardTeam.headSteward}
            </div>
            <p className="text-xs text-stone-600 mt-0.5 font-light">
              Oversees linen service, cheese trolleys, and personal requests.
            </p>
          </div>
        </div>

        {/* Course Menu Grid */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-stone-900">
            Four-Course Tasting Portfolio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {diningMenu.courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#fcfaf7] p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {course.dietary.map((d, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-full"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {course.name}
                  </h4>

                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {course.pairing && (
                  <div className="pt-3 border-t border-amber-900/10 flex items-center gap-2 text-xs font-semibold text-amber-950">
                    <Wine className="w-4 h-4 text-amber-700" />
                    <span>Sommelier Pairing: {course.pairing}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Refreshment Bar */}
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Coffee className="w-4 h-4" />
            <span>Continuous Carriage Bar & Herbal Infusions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {diningMenu.refreshmentBar.map((ref, idx) => (
              <div
                key={idx}
                className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60 flex items-start gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-200">{ref}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service Rituals Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Lavender Oshibori Ritual
            </h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Warm steamed towels infused with pure essential oils presented prior to every dining service.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Wine className="w-4 h-4 text-amber-700" />
              Artisanal Cheese Trolley
            </h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Wheels of aged raw milk cheeses presented and carved table-side with honeycomb and dried figs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              Midnight Nightcap Delivery
            </h4>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Custom herbal valerian sleep elixirs or single malt flights delivered to your private berth before bed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
