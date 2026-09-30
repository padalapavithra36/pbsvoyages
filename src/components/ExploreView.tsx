import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FilterState } from '../types';
import {
  Train,
  Bus,
  Moon,
  Sun,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Heart,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Utensils,
  Shield,
  Coffee,
} from 'lucide-react';

export const ExploreView: React.FC = () => {
  const {
    listings,
    filters,
    setFilters,
    resetFilters,
    setSelectedListing,
    openBookingModal,
    toggleFavorite,
    isFavorite,
    favorites,
  } = useApp();

  // Filter listings based on state
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search text
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesOrigin = item.origin.city.toLowerCase().includes(query);
        const matchesDest = item.destination.city.toLowerCase().includes(query);
        const matchesOperator = item.operator.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrigin && !matchesDest && !matchesOperator) {
          return false;
        }
      }

      // Origin
      if (filters.origin && !item.origin.city.toLowerCase().includes(filters.origin.toLowerCase())) {
        return false;
      }

      // Destination
      if (
        filters.destination &&
        !item.destination.city.toLowerCase().includes(filters.destination.toLowerCase())
      ) {
        return false;
      }

      // Transit type
      if (filters.transitType !== 'all' && item.transitType !== filters.transitType) {
        return false;
      }

      // Overnight vs Day
      if (filters.isOvernight === 'overnight' && !item.isOvernight) {
        return false;
      }
      if (filters.isOvernight === 'day' && item.isOvernight) {
        return false;
      }

      // Category
      if (filters.category !== 'all') {
        const hasCategory = item.cabins.some((c) => c.category === filters.category);
        if (!hasCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.basePrice - b.basePrice;
      if (filters.sortBy === 'price_desc') return b.basePrice - a.basePrice;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'duration') return a.distanceKm - b.distanceKm;
      return 0; // recommended default
    });
  }, [listings, filters]);

  // Extract unique origins and destinations
  const uniqueOrigins = useMemo(
    () => Array.from(new Set(listings.map((l) => l.origin.city))),
    [listings]
  );
  const uniqueDestinations = useMemo(
    () => Array.from(new Set(listings.map((l) => l.destination.city))),
    [listings]
  );

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-stone-900 text-stone-100 shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-stone-950/60 z-10" />
        
        {/* Background Image Banner */}
        <img
          src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=85"
          alt="Scenic Alpine Train"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-60 scale-105 transition-transform duration-1000 ease-out"
        />

        <div className="relative z-20 max-w-5xl px-6 sm:px-12 py-16 sm:py-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="tracking-wide">Grand Overland Hospitality & Dining</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Journey Through Splendor, <br />
            <span className="italic font-normal text-amber-200">Dine Above the Clouds.</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl font-light leading-relaxed">
            Where transit becomes the ultimate destination. Reserve handcrafted sleeper suites,
            panoramic observation domes, and multi-course Michelin-inspired menus with dedicated
            cabin stewards across the world’s most scenic rail and motorway corridors.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-stone-300">
            <div className="flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>All-Inclusive 4-Course Gastronomy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Personal Carriage Steward Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <Coffee className="w-4 h-4 text-amber-400" />
              <span>Private VIP Station Lounges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Search & Filter Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 -mt-8 relative z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Origin City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                Departure Corridor
              </label>
              <select
                value={filters.origin}
                onChange={(e) => setFilters((prev) => ({ ...prev, origin: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              >
                <option value="">All Departure Cities</option>
                {uniqueOrigins.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                Arrival Terminal
              </label>
              <select
                value={filters.destination}
                onChange={(e) => setFilters((prev) => ({ ...prev, destination: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              >
                <option value="">All Destination Cities</option>
                {uniqueDestinations.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Departure Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
            </div>

            {/* Guests */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Guests / Suites
              </label>
              <select
                value={filters.guests}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, guests: parseInt(e.target.value, 10) }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              >
                <option value={1}>1 Citizen Guest (Solo Suite)</option>
                <option value={2}>2 Guests (Royal Duo Suite)</option>
                <option value={3}>3 Guests (Connecting Parlors)</option>
                <option value={4}>4 Guests (Private Carriage Charter)</option>
              </select>
            </div>
          </div>

          {/* Secondary filter chips & quick toggles */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-700 mr-2 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by:
              </span>

              {/* Transit Type Pills */}
              <button
                onClick={() => setFilters((p) => ({ ...p, transitType: 'all' }))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                  filters.transitType === 'all'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All Transits
              </button>
              <button
                onClick={() => setFilters((p) => ({ ...p, transitType: 'train' }))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filters.transitType === 'train'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Train className="w-3.5 h-3.5" /> Scenic Luxury Rail
              </button>
              <button
                onClick={() => setFilters((p) => ({ ...p, transitType: 'bus' }))}
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filters.transitType === 'bus'
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Bus className="w-3.5 h-3.5" /> Sleeper Motorcoach
              </button>

              <div className="h-4 w-px bg-stone-300 mx-1 hidden sm:block" />

              {/* Schedule Type */}
              <button
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    isOvernight: p.isOvernight === 'overnight' ? 'all' : 'overnight',
                  }))
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filters.isOvernight === 'overnight'
                    ? 'bg-indigo-900 text-indigo-100'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" /> Overnight Sleeper Only
              </button>
              <button
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    isOvernight: p.isOvernight === 'day' ? 'all' : 'day',
                  }))
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  filters.isOvernight === 'day'
                    ? 'bg-amber-700 text-amber-100'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" /> Daytime Panoramic
              </button>
            </div>

            {/* Sort & Reset */}
            <div className="flex items-center space-x-3">
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    sortBy: e.target.value as FilterState['sortBy'],
                  }))
                }
                className="text-xs font-medium bg-stone-50 border border-stone-200 text-stone-700 rounded-xl px-3 py-1.5 focus:outline-hidden"
              >
                <option value="recommended">Curated · Recommended</option>
                <option value="price_asc">Fare: Low to High</option>
                <option value="price_desc">Fare: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="duration">Journey Distance</option>
              </select>

              {(filters.origin ||
                filters.destination ||
                filters.transitType !== 'all' ||
                filters.isOvernight !== 'all' ||
                filters.search) && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-amber-800 hover:text-amber-950 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Corridors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Curated Scenic Grand Corridors
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Showing {filteredListings.length} premium routes with live cabin inventory and sommelier dining
            </p>
          </div>
          {favorites.length > 0 && (
            <div className="text-xs text-stone-500 font-medium hidden sm:flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{favorites.length} saved route{favorites.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Listings Cards */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 shadow-xs max-w-xl mx-auto">
            <Train className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-800">
              No matching corridors found
            </h3>
            <p className="text-sm text-stone-500 mt-2 mb-6">
              Try adjusting your departure date or reset your corridor filters to explore our full global fleet.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-stone-900 text-amber-100 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredListings.map((item) => {
              const favorited = isFavorite(item.id);
              const lowestCabinPrice = Math.min(...item.cabins.map((c) => c.price));

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-amber-600/30 transition-all duration-300 flex flex-col group"
                >
                  {/* Card Media Header */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-stone-900/90 text-amber-300 backdrop-blur-md border border-amber-400/30 flex items-center gap-1.5 shadow-md">
                          {item.transitType === 'train' ? (
                            <>
                              <Train className="w-3.5 h-3.5" /> Grand Rail
                            </>
                          ) : (
                            <>
                              <Bus className="w-3.5 h-3.5" /> Sleeper Motorcoach
                            </>
                          )}
                        </span>

                        {item.isOvernight ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/90 text-indigo-200 border border-indigo-500/30 backdrop-blur-md flex items-center gap-1">
                            <Moon className="w-3 h-3 text-indigo-400" /> Overnight
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/90 text-amber-200 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                            <Sun className="w-3 h-3 text-amber-400" /> Panoramic Vista
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="w-9 h-9 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/60 flex items-center justify-center text-stone-200 hover:text-rose-500 transition-colors shadow-md cursor-pointer"
                        title={favorited ? 'Remove from saved' : 'Save route'}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorited ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Route Station Line overlaid on bottom of image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between text-xs text-amber-200 font-mono font-medium mb-1">
                        <span>{item.operator}</span>
                        <span className="flex items-center gap-1 text-stone-300">
                          <Clock className="w-3 h-3" /> {item.durationFormatted} · {item.distanceKm} km
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-serif text-lg sm:text-xl font-bold">
                        <div>
                          <span>{item.origin.city}</span>
                          <span className="text-xs block font-sans font-light text-stone-300">
                            {item.origin.departureTime}
                          </span>
                        </div>
                        <div className="flex-1 px-4 flex items-center justify-center">
                          <div className="w-full border-t border-dashed border-amber-300/40 relative">
                            <ArrowRight className="w-4 h-4 text-amber-300 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1" />
                          </div>
                        </div>
                        <div className="text-right">
                          <span>{item.destination.city}</span>
                          <span className="text-xs block font-sans font-light text-stone-300">
                            {item.destination.arrivalTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-1 bg-amber-50 text-amber-900 px-2 py-1 rounded-lg text-xs font-bold border border-amber-200/80 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{item.rating}</span>
                          <span className="text-stone-400 font-normal">({item.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-xs text-amber-900 font-medium italic mt-1">
                        {item.tagline}
                      </p>

                      <p className="text-xs text-stone-600 line-clamp-2 mt-2.5 leading-relaxed font-light">
                        {item.description}
                      </p>

                      {/* Hospitality Highlights */}
                      <div className="mt-4 pt-4 border-t border-stone-100 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          Signature Hospitality Included
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">4-Course Dining by Chef Mercier</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">Dedicated Carriage Steward</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">Grand Cru Sommelier Flight</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="truncate">VIP Station Lounge Access</span>
                          </div>
                        </div>
                      </div>

                      {/* Cabins options teaser */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.cabins.map((cabin) => (
                          <span
                            key={cabin.id}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-700 font-medium"
                          >
                            <span className="font-semibold text-stone-900 mr-1">{cabin.name}</span>
                            <span className="text-amber-800">${cabin.price}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-stone-400 uppercase tracking-wider">
                          Starting From
                        </div>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-serif text-2xl font-bold text-stone-900">
                            ${lowestCabinPrice}
                          </span>
                          <span className="text-xs text-stone-500 font-medium">/ passenger</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedListing(item)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                        >
                          View Gastronomy
                        </button>

                        <button
                          onClick={() => openBookingModal(item)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-amber-100 bg-gradient-to-r from-stone-900 to-amber-950 hover:from-amber-900 hover:to-stone-900 transition-all shadow-sm hover:shadow cursor-pointer flex items-center gap-1.5 group-hover:scale-102"
                        >
                          <span>Reserve Suite</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
