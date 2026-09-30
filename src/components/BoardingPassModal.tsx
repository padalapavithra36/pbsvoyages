import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Compass,
  QrCode,
  Train,
  Bus,
  Calendar,
  Clock,
  MapPin,
  Bed,
  UserCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const BoardingPassModal: React.FC = () => {
  const { ticketModalBooking, setTicketModalBooking } = useApp();

  if (!ticketModalBooking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        {/* Top Controls */}
        <div className="px-6 py-3.5 bg-[#faf8f5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
              Verified Citizen Boarding Pass
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={() => setTicketModalBooking(null)}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Pass Container */}
        <div id="printable-boarding-pass" className="p-6 sm:p-8 space-y-6 bg-white">
          <div className="rounded-3xl border-2 border-stone-900 overflow-hidden bg-gradient-to-b from-[#faf8f5] to-white shadow-md">
            {/* Pass Header */}
            <div className="bg-stone-950 text-stone-100 px-6 py-5 flex items-center justify-between border-b-2 border-amber-500/40">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 to-stone-900 flex items-center justify-center text-amber-200 border border-amber-400/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold tracking-tight text-white">
                    VoyageEase
                  </div>
                  <div className="text-[10px] tracking-widest uppercase font-mono text-amber-400">
                    Grand Overland Luxury Transit
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                  BOOKING CODE
                </span>
                <span className="font-mono text-base font-bold text-amber-300">
                  {ticketModalBooking.bookingCode}
                </span>
              </div>
            </div>

            {/* Pass Core Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Route Banner */}
              <div className="space-y-1">
                <div className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider">
                  {ticketModalBooking.operator}
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {ticketModalBooking.transitTitle}
                </h3>
              </div>

              {/* Station Segment */}
              <div className="grid grid-cols-2 gap-6 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    ORIGIN CORRIDOR
                  </span>
                  <div className="font-serif text-lg font-bold text-stone-900">
                    {ticketModalBooking.originCity}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {ticketModalBooking.originStation}
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-700 pt-1">
                    Scheduled: {ticketModalBooking.departureDate} at {ticketModalBooking.departureTime}
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    DESTINATION TERMINAL
                  </span>
                  <div className="font-serif text-lg font-bold text-stone-900">
                    {ticketModalBooking.destinationCity}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">
                    {ticketModalBooking.destinationStation}
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-700 pt-1">
                    Scheduled: {ticketModalBooking.arrivalDate} at {ticketModalBooking.arrivalTime}
                  </div>
                </div>
              </div>

              {/* Passenger & Suite Allocation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Citizen Passenger
                  </span>
                  <span className="font-bold text-stone-900 block">{ticketModalBooking.userName}</span>
                  <span className="text-[10px] font-mono text-stone-500">{ticketModalBooking.citizenId}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Cabin Class
                  </span>
                  <span className="font-bold text-stone-900 block truncate">
                    {ticketModalBooking.selectedCabinName}
                  </span>
                  <span className="text-[10px] text-stone-500">Berth {ticketModalBooking.selectedSeatId}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Dedicated Steward
                  </span>
                  <span className="font-bold text-stone-900 block">{ticketModalBooking.stewardAssigned}</span>
                  <span className="text-[10px] text-emerald-700 font-medium">Assigned Service</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Dining Course
                  </span>
                  <span className="font-bold text-stone-900 block truncate">
                    {ticketModalBooking.diningChoice.main}
                  </span>
                  <span className="text-[10px] text-amber-900 font-medium">All-Inclusive</span>
                </div>
              </div>

              {/* Barcode & Security Strip */}
              <div className="pt-6 border-t-2 border-dashed border-stone-300 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="h-10 w-48 bg-[repeating-linear-gradient(90deg,#000,#000_2px,#fff_2px,#fff_4px)] rounded-xs" />
                  <div className="text-[10px] font-mono text-stone-500 tracking-widest">
                    VOYAGE-SECURE-CRYPTO · {ticketModalBooking.bookingCode}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-[10px] text-stone-500 font-mono hidden sm:block">
                    <div>SCAN FOR BOARDING GATE</div>
                    <div>VIP LOUNGE VERIFIED</div>
                  </div>
                  <div className="p-2 bg-stone-100 rounded-xl border border-stone-200">
                    <QrCode className="w-12 h-12 text-stone-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 text-center">
            Present this digital or printed boarding pass at the Royal Terminal VIP lounge for complimentary champagne & luggage valet.
          </p>
        </div>
      </div>
    </div>
  );
};
