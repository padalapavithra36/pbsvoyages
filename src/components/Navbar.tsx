import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  UtensilsCrossed,
  Ticket,
  ShieldCheck,
  Database,
  Heart,
  UserCheck,
  ChevronDown,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    activeView,
    setActiveView,
    bookings,
    favorites,
    setSchemaModalOpen,
  } = useApp();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs transition-all">
      {/* Top subtle golden status ribbon */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-stone-900 text-amber-100 text-xs px-4 py-1 flex items-center justify-between font-sans">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-medium tracking-wide">
            VoyageEase Grand Fleet · Winter & Autumn Luxury Departures Now Enrolling
          </span>
          <span className="hidden md:inline-block text-amber-300/80">|</span>
          <span className="hidden md:inline-block text-amber-200/80">
            Michelin-Partnered Dining & Dedicated Cabin Stewards
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[11px] text-amber-200/90">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-300" /> 5 Global Scenic Corridors
          </span>
          <button
            onClick={() => setSchemaModalOpen(true)}
            className="hover:text-amber-100 underline decoration-amber-400/50 cursor-pointer flex items-center gap-1"
          >
            <Database className="w-3 h-3" /> Relational Architecture
          </button>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => setActiveView('explore')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-800 via-amber-900 to-stone-950 flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform duration-200 border border-amber-500/20">
              <Compass className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
                  VoyageEase
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-amber-100 text-amber-900 rounded border border-amber-300/60">
                  Luxury
                </span>
              </div>
              <p className="text-xs text-stone-700 tracking-wide font-medium">
                Hospitality & Grand Transit Booking
              </p>
            </div>
          </div>

          {/* Central Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-stone-200/60 p-1.5 rounded-2xl border border-stone-300/70">
            <button
              onClick={() => setActiveView('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                activeView === 'explore'
                  ? 'bg-stone-900 text-amber-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Explore Routes</span>
            </button>

            <button
              onClick={() => setActiveView('dining')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                activeView === 'dining'
                  ? 'bg-stone-900 text-amber-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Gastronomy Menus</span>
            </button>

            <button
              onClick={() => setActiveView('itinerary')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer relative ${
                activeView === 'itinerary'
                  ? 'bg-stone-900 text-amber-100 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>My Itineraries</span>
              {activeBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center -mr-1">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('host')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 cursor-pointer ${
                activeView === 'host'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Fleet Operations</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-200/80 text-amber-900 font-semibold rounded">
                Admin
              </span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Schema Inspector Button */}
            <button
              onClick={() => setSchemaModalOpen(true)}
              title="Inspect Prisma Data Architecture"
              className="p-2 rounded-xl text-stone-600 hover:text-amber-900 hover:bg-stone-200/70 border border-stone-300/80 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <Database className="w-4 h-4 text-amber-700" />
              <span className="hidden md:inline">Schema</span>
            </button>

            {/* Saved favorites badge */}
            <button
              onClick={() => setActiveView('explore')}
              title={`${favorites.length} saved journeys`}
              className="p-2.5 rounded-xl text-stone-600 hover:text-rose-700 hover:bg-stone-200/70 border border-stone-300/80 transition-colors relative cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* User Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-2xl bg-white border border-stone-300 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-amber-500/30"
                />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] font-medium text-amber-800 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-amber-600 inline" />
                    {currentUser.memberTier}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-stone-100">
                    <p className="text-xs text-stone-500 font-medium">Logged in citizen account</p>
                    <p className="text-sm font-bold text-stone-900 mt-0.5">{currentUser.name}</p>
                    <p className="text-xs text-amber-800 font-mono mt-0.5">{currentUser.citizenId}</p>
                  </div>

                  <div className="py-1">
                    <p className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      Switch Role Mode
                    </p>
                    <button
                      onClick={() => {
                        switchUserRole('traveler');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        currentUser.role === 'traveler'
                          ? 'bg-amber-50 text-amber-900 font-semibold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div>Elena Rostova</div>
                        <div className="text-[10px] text-stone-500">Royal Black Elite (Traveler)</div>
                      </div>
                      {currentUser.role === 'traveler' && (
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        switchUserRole('admin');
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                        currentUser.role === 'admin'
                          ? 'bg-amber-50 text-amber-900 font-semibold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div>
                        <div>Marcus Vance</div>
                        <div className="text-[10px] text-stone-500">Host Fleet Director (Admin)</div>
                      </div>
                      {currentUser.role === 'admin' && (
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex lg:hidden items-center justify-between py-2 border-t border-stone-200/80 overflow-x-auto space-x-2">
          <button
            onClick={() => setActiveView('explore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeView === 'explore' ? 'bg-stone-900 text-amber-100' : 'text-stone-600'
            }`}
          >
            Explore Routes
          </button>
          <button
            onClick={() => setActiveView('dining')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeView === 'dining' ? 'bg-stone-900 text-amber-100' : 'text-stone-600'
            }`}
          >
            Gastronomy Menus
          </button>
          <button
            onClick={() => setActiveView('itinerary')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeView === 'itinerary' ? 'bg-stone-900 text-amber-100' : 'text-stone-600'
            }`}
          >
            My Itineraries
            {activeBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveView('host')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap cursor-pointer ${
              activeView === 'host' ? 'bg-amber-900 text-amber-50' : 'text-stone-600'
            }`}
          >
            Fleet Ops
          </button>
        </div>
      </div>
    </header>
  );
};
