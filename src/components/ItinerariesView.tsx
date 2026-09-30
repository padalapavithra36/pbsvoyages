import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Ticket,
  Train,
  Bus,
  Calendar,
  Clock,
  MapPin,
  Utensils,
  Wine,
  UserCheck,
  Bell,
  Printer,
  XCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Bed,
} from 'lucide-react';
import { Booking } from '../types';

export const ItinerariesView: React.FC = () => {
  const {
    bookings,
    currentUser,
    setTicketModalBooking,
    setStewardModalBooking,
    cancelBooking,
    setActiveView,
  } = useApp();

  const userBookings = bookings.filter(
    (b) => b.userId === currentUser.id || b.userEmail === currentUser.email
  );

  // Countdown timer for next departure
  const nextBooking = userBookings.find((b) => b.status === 'confirmed');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 18,
    hours: 5,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      {/* Top Banner & Active Citizen Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-500/20"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {currentUser.memberTier}
              </span>
              <span className="text-xs font-mono text-stone-500">{currentUser.citizenId}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              {currentUser.name}’s Grand Itineraries
            </h1>
            <p className="text-xs text-stone-500 font-medium">
              Registered email: {currentUser.email} · Phone: {currentUser.phone}
            </p>
          </div>
        </div>

        {nextBooking && (
          <div className="bg-[#faf8f5] p-4 rounded-2xl border border-amber-900/10 flex items-center space-x-4 shrink-0">
            <div className="p-3 bg-amber-900 text-amber-100 rounded-xl">
              <Clock className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                Next Departure Countdown
              </div>
              <div className="font-mono text-sm font-bold text-stone-900 mt-0.5">
                {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
              </div>
              <div className="text-[11px] text-stone-500 truncate max-w-[200px]">
                {nextBooking.transitTitle}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Active & Upcoming Reservations
            </h2>
            <p className="text-xs text-stone-500">
              Manage your confirmed journeys, download official boarding passes, and call cabin stewards
            </p>
          </div>

          <button
            onClick={() => setActiveView('explore')}
            className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
          >
            <span>Book Another Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {userBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs max-w-lg mx-auto">
            <Ticket className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-stone-800">
              No Active Itineraries
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-6">
              You haven't reserved any luxury journeys yet. Explore our scenic alpine rails and sleeper motorcoaches.
            </p>
            <button
              onClick={() => setActiveView('explore')}
              className="px-5 py-2.5 bg-stone-900 text-amber-100 rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Explore Scenic Corridors
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => {
              const isConfirmed = booking.status === 'confirmed';

              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm transition-all ${
                    isConfirmed
                      ? 'border-stone-200/80 hover:border-amber-500/40 hover:shadow-md'
                      : 'border-stone-200 opacity-60'
                  }`}
                >
                  {/* Top card banner */}
                  <div className="bg-[#faf8f5] px-6 py-4 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300/50">
                        {booking.transitType === 'train' ? (
                          <Train className="w-4 h-4" />
                        ) : (
                          <Bus className="w-4 h-4" />
                        )}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-amber-900">
                            {booking.bookingCode}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isConfirmed
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="font-serif text-lg font-bold text-stone-900 mt-0.5">
                          {booking.transitTitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setTicketModalBooking(booking)}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Boarding Pass</span>
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => setStewardModalBooking(booking)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300/70 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Bell className="w-3.5 h-3.5 text-amber-800" />
                          <span>Call Steward</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Main card content */}
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Journey & Schedule */}
                    <div className="space-y-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Departure & Station Timetable
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-stone-900">
                              {booking.originCity} ({booking.originStation})
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Departing: {booking.departureDate} at {booking.departureTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-xs font-bold text-stone-900">
                              {booking.destinationCity} ({booking.destinationStation})
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Arriving: {booking.arrivalDate} at {booking.arrivalTime} · ({booking.durationFormatted})
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-700">
                        <span>Passenger: <strong>{booking.userName}</strong></span>
                        <span>Party: <strong>{booking.guestsCount} guest{booking.guestsCount > 1 ? 's' : ''}</strong></span>
                      </div>
                    </div>

                    {/* Column 2: Cabin & Allocated Berth */}
                    <div className="space-y-4 lg:border-l lg:border-stone-100 lg:pl-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Carriage Berth & Steward
                      </div>

                      <div className="bg-[#fcfaf7] p-4 rounded-2xl border border-stone-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">
                            {booking.selectedCabinName}
                          </span>
                          <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            {booking.selectedSeatId}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-600 flex items-center gap-1.5 pt-1">
                          <UserCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>Dedicated Steward: <strong>{booking.stewardAssigned}</strong></span>
                        </div>

                        <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>Pillow Menu: {booking.hospitalityChoice.pillowPreference}</span>
                        </div>

                        {booking.hospitalityChoice.fragranceMist && (
                          <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                            <span>Mist: {booking.hospitalityChoice.fragranceMist}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Column 3: In-Transit Dining & Payment */}
                    <div className="space-y-4 lg:border-l lg:border-stone-100 lg:pl-6">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        Curated Gastronomy Selection
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-700">
                        <div className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">Starter: {booking.diningChoice.starter}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">Main: {booking.diningChoice.main}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">Dessert: {booking.diningChoice.dessert}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-amber-900 font-medium pt-1">
                          <Wine className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="truncate">Pairing: {booking.diningChoice.beverage}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-stone-400 uppercase tracking-wider">
                            Total Settled
                          </div>
                          <div className="font-serif text-base font-bold text-stone-900">
                            ${booking.pricing.totalAmount}
                          </div>
                        </div>

                        {isConfirmed && (
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you wish to cancel this reservation? Full refund will be disbursed.')) {
                                cancelBooking(booking.id);
                              }
                            }}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                          >
                            Cancel Ticket
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
