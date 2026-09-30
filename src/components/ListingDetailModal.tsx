import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  Clock,
  MapPin,
  Utensils,
  Wine,
  Sparkles,
  UserCheck,
  CheckCircle2,
  Train,
  Bus,
  ChevronRight,
  Shield,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const {
    selectedListing,
    setSelectedListing,
    openBookingModal,
    isFavorite,
    toggleFavorite,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'dining' | 'cabins' | 'stops' | 'reviews'>('overview');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!selectedListing) return null;

  const favorited = isFavorite(selectedListing.id);
  const photos = selectedListing.galleryImages.length > 0
    ? selectedListing.galleryImages
    : [selectedListing.heroImage];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200 relative">
        {/* Sticky Header with Title and Close Button */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#faf8f5] flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300/60">
              {selectedListing.transitType === 'train' ? (
                <Train className="w-5 h-5" />
              ) : (
                <Bus className="w-5 h-5" />
              )}
            </span>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                {selectedListing.title}
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {selectedListing.origin.city} ({selectedListing.origin.code}) to {selectedListing.destination.city} ({selectedListing.destination.code}) · {selectedListing.durationFormatted}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleFavorite(selectedListing.id)}
              className="p-2 rounded-xl text-stone-500 hover:text-rose-500 hover:bg-stone-100 transition-colors cursor-pointer"
              title="Save journey"
            >
              <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedListing(null)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-900 shadow-md">
              <img
                src={photos[selectedPhotoIndex]}
                alt={selectedListing.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                    Grand Panoramic Corridor
                  </span>
                  <div className="text-lg sm:text-xl font-serif font-bold text-white mt-0.5">
                    {selectedListing.tagline}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedListing.rating}</span>
                  <span className="text-stone-300 font-normal">({selectedListing.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Photo thumbnails */}
            {photos.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedPhotoIndex === idx
                        ? 'border-amber-600 ring-2 ring-amber-500/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'overview'
                  ? 'bg-stone-900 text-amber-100'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Corridor Overview
            </button>
            <button
              onClick={() => setActiveTab('dining')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeTab === 'dining'
                  ? 'bg-stone-900 text-amber-100'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              Gastronomy & Wine
            </button>
            <button
              onClick={() => setActiveTab('cabins')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'cabins'
                  ? 'bg-stone-900 text-amber-100'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Cabin Suites & Berths ({selectedListing.cabins.length})
            </button>
            <button
              onClick={() => setActiveTab('stops')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'stops'
                  ? 'bg-stone-900 text-amber-100'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Itinerary Stops ({selectedListing.itineraryStops.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-stone-900 text-amber-100'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              Guest Testimonials ({selectedListing.reviews.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  The Journey Experience
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-light">
                  {selectedListing.description}
                </p>
              </div>

              {/* Corridor Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#fcfaf7] p-5 rounded-2xl border border-amber-900/10 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Signature Hospitality Rituals
                  </div>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {selectedListing.hospitalityHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#fcfaf7] p-5 rounded-2xl border border-amber-900/10 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-700" />
                    Grand Fleet Inclusions
                  </div>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {selectedListing.amenities.map((am, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{am}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dedicated Service Team */}
              <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" /> Dedicated Carriage Hospitality Team
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400">Head Carriage Steward</div>
                    <div className="text-sm font-bold text-white mt-1">
                      {selectedListing.stewardTeam.headSteward}
                    </div>
                    <p className="text-[11px] text-amber-200/80 mt-1">
                      White-glove turn-down & in-suite refreshments
                    </p>
                  </div>
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400">Executive Chef</div>
                    <div className="text-sm font-bold text-white mt-1">
                      {selectedListing.stewardTeam.executiveChef}
                    </div>
                    <p className="text-[11px] text-amber-200/80 mt-1">
                      All courses prepared fresh in onboard galley
                    </p>
                  </div>
                  <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700/60">
                    <div className="text-[11px] text-stone-400">Lead Sommelier</div>
                    <div className="text-sm font-bold text-white mt-1">
                      {selectedListing.stewardTeam.sommelier}
                    </div>
                    <p className="text-[11px] text-amber-200/80 mt-1">
                      Grand Cru wine cellar pairings & digestifs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DINING & GASTRONOMY */}
          {activeTab === 'dining' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                  <Utensils className="w-4 h-4 text-amber-700" />
                  <span>{selectedListing.diningMenu.includedService}</span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Service Window: {selectedListing.diningMenu.serviceWindow}
                </p>
              </div>

              {/* Menu Courses */}
              <div className="space-y-4">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Featured 4-Course Tasting Selection
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedListing.diningMenu.courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-2 hover:border-amber-400 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                          {course.dietary.map((d, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-stone-600 bg-stone-100 px-1.5 py-0.5 rounded"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h5 className="font-serif text-base font-bold text-stone-900">
                        {course.name}
                      </h5>

                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        {course.description}
                      </p>

                      {course.pairing && (
                        <div className="pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-amber-900 font-medium">
                          <Wine className="w-3.5 h-3.5 text-amber-700" />
                          <span>Pairing: {course.pairing}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Complimentary Refreshment Bar */}
              <div className="bg-[#faf8f5] p-5 rounded-2xl border border-stone-200">
                <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">
                  All-Day Sommelier Bar & Refreshments
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {selectedListing.diningMenu.refreshmentBar.map((ref, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{ref}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CABINS & SUITES */}
          {activeTab === 'cabins' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedListing.cabins.map((cabin) => (
                  <div
                    key={cabin.id}
                    className="bg-white rounded-2xl border-2 border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                            {cabin.category.replace('_', ' ')}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-stone-900 mt-1">
                            {cabin.name}
                          </h4>
                          <p className="text-xs text-stone-500 font-medium">{cabin.bedConfig}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-serif text-xl font-bold text-stone-900">
                            ${cabin.price}
                          </span>
                          <span className="text-xs block text-stone-500">/ berth</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-light">
                        {cabin.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                        {cabin.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-stone-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Seat Map Availability */}
                      <div className="pt-3 border-t border-stone-100">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2">
                          Carriage Berth Allocation Status
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cabin.seats.map((seat) => (
                            <span
                              key={seat.id}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium flex items-center gap-1 ${
                                seat.status === 'available'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                                  : 'bg-stone-100 text-stone-400 line-through'
                              }`}
                            >
                              {seat.id} {seat.status === 'available' ? '· Ready' : '· Booked'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-emerald-700 font-semibold">
                        {cabin.availableCount} suites currently available
                      </span>
                      <button
                        onClick={() => {
                          setSelectedListing(null);
                          openBookingModal(selectedListing, cabin.id);
                        }}
                        className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-amber-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Select This Cabin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STOPS & SCENIC HIGHLIGHTS */}
          {activeTab === 'stops' && (
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-stone-900">
                Scheduled Station Timetable & Scenic Vistas
              </h4>
              <div className="relative pl-6 border-l-2 border-amber-600/40 space-y-6 my-4">
                {selectedListing.itineraryStops.map((stop, idx) => (
                  <div key={idx} className="relative group">
                    {/* Station dot indicator */}
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-amber-600 group-hover:scale-125 transition-transform" />

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-stone-900 text-sm">
                          {stop.station} ({stop.city})
                        </span>
                        <span className="text-xs font-mono font-semibold text-stone-600">
                          {stop.arrival !== '—' ? `Arr: ${stop.arrival}` : ''}{' '}
                          {stop.departure !== '—' ? `· Dep: ${stop.departure}` : '· Terminal'}
                        </span>
                      </div>
                      {stop.scenicHighlight && (
                        <p className="text-xs text-amber-900 font-medium flex items-center gap-1.5 pt-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Scenic View: {stop.scenicHighlight}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-base font-bold text-stone-900">
                  Citizen Traveler Reviews
                </h4>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-900">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{selectedListing.rating} average</span>
                </div>
              </div>

              <div className="space-y-4">
                {selectedListing.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-stone-300"
                        />
                        <div>
                          <div className="text-xs font-bold text-stone-900">{rev.author}</div>
                          <div className="text-[11px] text-stone-500">{rev.date} · Verified Citizen</div>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-700 leading-relaxed font-light italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom CTA Bar */}
        <div className="px-6 py-4 border-t border-stone-200 bg-[#faf8f5] flex items-center justify-between z-10">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              Total All-Inclusive Fare
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-serif text-2xl font-bold text-stone-900">
                ${selectedListing.basePrice}
              </span>
              <span className="text-xs text-stone-500">
                / passenger (includes 4-course Michelin dining)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedListing(null)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                const listing = selectedListing;
                setSelectedListing(null);
                openBookingModal(listing);
              }}
              className="px-6 py-2.5 bg-gradient-to-r from-stone-900 to-amber-950 hover:from-amber-900 hover:to-stone-900 text-amber-100 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Book Journey & Select Berths</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
