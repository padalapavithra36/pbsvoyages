import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Utensils,
  Wine,
  Sparkles,
  Shield,
  CreditCard,
  QrCode,
  Printer,
  Calendar,
  User,
  Coffee,
  Bed,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { Cabin, Seat, Booking } from '../types';

export const BookingModal: React.FC = () => {
  const {
    bookingModal,
    closeBookingModal,
    currentUser,
    createBooking,
    setTicketModalBooking,
    setActiveView,
  } = useApp();

  const { isOpen, listing, initialCabinId, initialDate, initialGuests } = bookingModal;

  if (!isOpen || !listing) return null;

  const defaultCabin =
    listing.cabins.find((c) => c.id === initialCabinId) || listing.cabins[0];

  // Multi-step state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1: Cabin & Seat Selection
  const [selectedCabin, setSelectedCabin] = useState<Cabin>(defaultCabin);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(() => {
    return defaultCabin.seats.find((s) => s.status === 'available') || defaultCabin.seats[0];
  });
  const [departureDate, setDepartureDate] = useState(initialDate || '2026-10-18');
  const [guestsCount, setGuestsCount] = useState(initialGuests || 1);

  // Step 2: Dining Selection
  const starters = listing.diningMenu.courses.filter((c) => c.category === 'starter');
  const mains = listing.diningMenu.courses.filter((c) => c.category === 'main');
  const desserts = listing.diningMenu.courses.filter(
    (c) => c.category === 'dessert' || c.category === 'breakfast'
  );

  const [selectedStarter, setSelectedStarter] = useState(
    starters[0]?.name || 'Chef Seasonal Starter'
  );
  const [selectedMain, setSelectedMain] = useState(mains[0]?.name || 'Chef Seasonal Main');
  const [selectedDessert, setSelectedDessert] = useState(
    desserts[0]?.name || 'Artisanal Dessert'
  );
  const [beveragePairing, setBeveragePairing] = useState(
    starters[0]?.pairing || 'Sommelier Grand Cru Pairing'
  );
  const [diningLocation, setDiningLocation] = useState<'panoramic_dining_car' | 'in_suite_service'>(
    'panoramic_dining_car'
  );
  const [dietaryRequests, setDietaryRequests] = useState('');

  // Step 3: Bespoke Hospitality
  const [turndownService, setTurndownService] = useState(true);
  const [morningCall, setMorningCall] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState('07:30 AM');
  const [pillowPreference, setPillowPreference] = useState('Organic goose down');
  const [fragranceMist, setFragranceMist] = useState('Alpine Lavender & Swiss Pine');
  const [stationLoungeAccess, setStationLoungeAccess] = useState(true);
  const [luggagePorterCount, setLuggagePorterCount] = useState(2);

  // Step 4: Passenger info & Payment
  const [passengerName, setPassengerName] = useState(currentUser.name);
  const [passengerEmail, setPassengerEmail] = useState(currentUser.email);
  const [passengerPhone, setPassengerPhone] = useState(currentUser.phone);
  const [citizenId, setCitizenId] = useState(currentUser.citizenId);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'amex' | 'credits'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 5: Completed Booking Result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Pricing calculations
  const baseFare = listing.basePrice * guestsCount;
  const cabinPrice = selectedCabin.price * guestsCount;
  const diningIncludedValue = 180 * guestsCount; // Complimentary value
  const conciergeFee = 35;
  const taxes = Math.round((baseFare + cabinPrice) * 0.08);
  const totalAmount = baseFare + cabinPrice + conciergeFee + taxes;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as any);
    } else if (currentStep === 4) {
      // Execute booking creation
      setIsProcessing(true);
      setTimeout(() => {
        const newBooking = createBooking({
          transitId: listing.id,
          transitTitle: listing.title,
          transitType: listing.transitType,
          operator: listing.operator,
          originCity: listing.origin.city,
          originStation: listing.origin.station,
          destinationCity: listing.destination.city,
          destinationStation: listing.destination.station,
          departureDate: departureDate,
          departureTime: listing.origin.departureTime,
          arrivalDate: departureDate,
          arrivalTime: listing.destination.arrivalTime,
          durationFormatted: listing.durationFormatted,
          heroImage: listing.heroImage,
          userId: currentUser.id,
          userName: passengerName,
          userEmail: passengerEmail,
          userPhone: passengerPhone,
          citizenId: citizenId,
          selectedCabinId: selectedCabin.id,
          selectedCabinName: selectedCabin.name,
          selectedSeatId: `Carriage 1 · ${selectedSeat ? selectedSeat.id : 'Berth A'}`,
          guestsCount: guestsCount,
          diningChoice: {
            starter: selectedStarter,
            main: selectedMain,
            dessert: selectedDessert,
            beverage: beveragePairing,
            diningLocation: diningLocation,
            dietaryRequests: dietaryRequests,
          },
          hospitalityChoice: {
            turndownService: turndownService,
            morningCall: morningCall,
            wakeUpTime: wakeUpTime,
            pillowPreference: pillowPreference,
            fragranceMist: fragranceMist,
            stationLoungeAccess: stationLoungeAccess,
            luggagePorterCount: luggagePorterCount,
          },
          pricing: {
            baseFare,
            cabinPrice,
            diningIncludedValue,
            conciergeFee,
            taxes,
            discount: 0,
            totalAmount,
          },
          paymentMethod: {
            type: paymentMethod === 'card' ? 'credit_card' : paymentMethod === 'amex' ? 'amex_centurion' : 'travel_credits',
            brand: paymentMethod === 'amex' ? 'American Express' : 'Visa Infinite',
            last4: '4242',
          },
          stewardAssigned: listing.stewardTeam.headSteward,
        });

        setIsProcessing(false);
        setConfirmedBooking(newBooking);
        setCurrentStep(5);
      }, 700);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep((prev) => (prev - 1) as any);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[94vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#faf8f5] flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                Multi-Step Reservation
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Step {currentStep} of 5
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
              {listing.title}
            </h2>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-stone-100 h-1.5 w-full">
          <div
            className="bg-amber-700 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step Indicators Ribbon */}
        <div className="px-6 py-3 bg-[#faf8f5]/60 border-b border-stone-100 flex items-center justify-between text-[11px] font-medium text-stone-500 overflow-x-auto">
          <span className={currentStep === 1 ? 'text-amber-900 font-bold' : ''}>
            1. Cabin & Seats
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <span className={currentStep === 2 ? 'text-amber-900 font-bold' : ''}>
            2. Gastronomy
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <span className={currentStep === 3 ? 'text-amber-900 font-bold' : ''}>
            3. Hospitality
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-900 font-bold" />
          <span className={currentStep === 4 ? 'text-amber-900 font-bold' : ''}>
            4. Citizen Details
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />
          <span className={currentStep === 5 ? 'text-amber-900 font-bold' : ''}>
            5. Confirmation
          </span>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* STEP 1: CABIN & SEAT SELECTION */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Select Cabin Class & Carriage Berth
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Choose your compartment category and click an available berth on the interactive carriage map.
                </p>
              </div>

              {/* Date & Guests selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Scheduled Departure Date
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-medium"
                  >
                    <option value={1}>1 Citizen Guest</option>
                    <option value={2}>2 Guests (Twin Suite)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Cabin Options */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Available Suites on This Route
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {listing.cabins.map((cabin) => {
                    const isSelected = selectedCabin.id === cabin.id;
                    return (
                      <div
                        key={cabin.id}
                        onClick={() => {
                          setSelectedCabin(cabin);
                          const firstAvail =
                            cabin.seats.find((s) => s.status === 'available') || cabin.seats[0];
                          setSelectedSeat(firstAvail);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-700 bg-amber-50/50 shadow-sm'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                              {cabin.category.replace('_', ' ')}
                            </span>
                            <span className="font-serif text-lg font-bold text-stone-900">
                              ${cabin.price}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-stone-900 mt-1">
                            {cabin.name}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5">{cabin.bedConfig}</p>
                          <p className="text-xs text-stone-600 font-light mt-2 line-clamp-2">
                            {cabin.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                          <span className="text-emerald-700 font-medium">
                            {cabin.availableCount} berths left
                          </span>
                          {isSelected && (
                            <span className="flex items-center gap-1 font-bold text-amber-900 text-xs">
                              <Check className="w-3.5 h-3.5 text-amber-700" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Seat Map */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-900">
                      Interactive Carriage Berth Plan: {selectedCabin.name}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Click an available berth below to allocate your exact seat.
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-amber-800 inline-block" /> Selected
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded bg-stone-300 inline-block" /> Reserved
                    </span>
                  </div>
                </div>

                {/* Seat Grid visual */}
                <div className="p-4 bg-white rounded-xl border border-stone-200/80 flex items-center justify-center">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md w-full">
                    {selectedCabin.seats.map((seat) => {
                      const isSeatSelected = selectedSeat?.id === seat.id;
                      const isAvailable = seat.status === 'available';

                      return (
                        <button
                          key={seat.id}
                          disabled={!isAvailable && !isSeatSelected}
                          onClick={() => setSelectedSeat(seat)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isSeatSelected
                              ? 'bg-amber-900 text-amber-100 border-amber-900 shadow-sm ring-2 ring-amber-500/40'
                              : isAvailable
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 hover:border-emerald-500'
                              : 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <Bed className="w-4 h-4 mb-1" />
                          <span className="font-mono text-xs font-bold">{seat.id}</span>
                          <span className="text-[10px]">
                            {isSeatSelected
                              ? 'Allocated'
                              : isAvailable
                              ? 'Available'
                              : 'Occupied'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedSeat && (
                  <div className="text-xs text-stone-700 bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span>
                      Allocated Berth:{' '}
                      <strong className="font-mono text-amber-950 font-bold">
                        Carriage 1 · Suite {selectedSeat.id}
                      </strong>
                    </span>
                    <span className="text-stone-500">Window Facing · Quiet Carriage</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: GASTRONOMY CURATION */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Curate Your In-Transit 4-Course Gastronomy
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Complimentary Michelin-inspired fine dining prepared fresh by onboard executive chefs.
                </p>
              </div>

              {/* Dining Location Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setDiningLocation('panoramic_dining_car')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    diningLocation === 'panoramic_dining_car'
                      ? 'border-amber-700 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Utensils className="w-4 h-4 text-amber-800" />
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Panoramic Dining Car Service
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 font-light">
                    White linen table service with floor-to-ceiling glass dome views and table-side sommelier.
                  </p>
                </div>

                <div
                  onClick={() => setDiningLocation('in_suite_service')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    diningLocation === 'in_suite_service'
                      ? 'border-amber-700 bg-amber-50/50 shadow-sm'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Coffee className="w-4 h-4 text-amber-800" />
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      Private In-Suite Tray Service
                    </h4>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 font-light">
                    Discreet courses brought directly to your private cabin by your dedicated steward.
                  </p>
                </div>
              </div>

              {/* Starter Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Course 1: Amuse-Bouche & Starter
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starters.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => {
                        setSelectedStarter(dish.name);
                        if (dish.pairing) setBeveragePairing(dish.pairing);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedStarter === dish.name
                          ? 'border-amber-700 bg-amber-50/40 font-semibold'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900">{dish.name}</div>
                      <div className="text-[11px] text-stone-500 font-light mt-0.5">
                        {dish.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Course Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Course 2: Featured Main Entrée
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mains.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => setSelectedMain(dish.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedMain === dish.name
                          ? 'border-amber-700 bg-amber-50/40 font-semibold'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900">{dish.name}</div>
                      <div className="text-[11px] text-stone-500 font-light mt-0.5">
                        {dish.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dessert / Breakfast Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Course 3: Grand Finale Dessert or Sunrise Hamper
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {desserts.map((dish) => (
                    <div
                      key={dish.id}
                      onClick={() => setSelectedDessert(dish.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedDessert === dish.name
                          ? 'border-amber-700 bg-amber-50/40 font-semibold'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900">{dish.name}</div>
                      <div className="text-[11px] text-stone-500 font-light mt-0.5">
                        {dish.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beverage Pairing */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Sommelier Cellar Pairing / Beverage
                </label>
                <input
                  type="text"
                  value={beveragePairing}
                  onChange={(e) => setBeveragePairing(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs font-medium text-stone-800"
                  placeholder="e.g. 2019 Grand Cru Cornalin & Gotthard Sparkling Water"
                />
              </div>

              {/* Dietary notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Dietary Preferences or Chef Inquiries (Optional)
                </label>
                <input
                  type="text"
                  value={dietaryRequests}
                  onChange={(e) => setDietaryRequests(e.target.value)}
                  placeholder="e.g. No shellfish, gluten-free bread preference, table facing mountain vista"
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800"
                />
              </div>
            </div>
          )}

          {/* STEP 3: BESPOKE HOSPITALITY */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Bespoke In-Transit Hospitality Rituals
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Tailor your sleep amenities, wake-up rituals, and carriage concierge services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Turndown service */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-amber-700" />
                      White-Glove Turndown Service
                    </span>
                    <input
                      type="checkbox"
                      checked={turndownService}
                      onChange={(e) => setTurndownService(e.target.checked)}
                      className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 font-light">
                    Includes 600-thread Egyptian cotton duvet dressing, scented nightcap, and bedside water carafe.
                  </p>
                </div>

                {/* VIP Station Lounge */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-amber-700" />
                      Pre-Boarding VIP Station Lounge
                    </span>
                    <input
                      type="checkbox"
                      checked={stationLoungeAccess}
                      onChange={(e) => setStationLoungeAccess(e.target.checked)}
                      className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 font-light">
                    Private check-in with champagne flute, shower suites, and expedited boarding escort.
                  </p>
                </div>
              </div>

              {/* Pillow Menu */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Carriage Pillow Menu
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Organic goose down',
                    'Ergonomic memory foam',
                    'Hinoki cedar contour pillow',
                  ].map((pillow) => (
                    <button
                      key={pillow}
                      onClick={() => setPillowPreference(pillow)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        pillowPreference === pillow
                          ? 'border-amber-700 bg-amber-50/50 font-bold text-amber-950'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      {pillow}
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Cabin Aromatherapy Fragrance */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  In-Cabin Aromatherapy Mist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Alpine Lavender & Swiss Pine',
                    'Natural Cedar & Yuzu',
                    'Citrus Bergamot & Wild Herb',
                  ].map((frag) => (
                    <button
                      key={frag}
                      onClick={() => setFragranceMist(frag)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        fragranceMist === frag
                          ? 'border-amber-700 bg-amber-50/50 font-bold text-amber-950'
                          : 'border-stone-200 bg-white text-stone-700'
                      }`}
                    >
                      {frag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wake-up Call & Morning Beverage */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">
                    Morning Sunrise Wake-Up & Artisan Brew
                  </span>
                  <input
                    type="checkbox"
                    checked={morningCall}
                    onChange={(e) => setMorningCall(e.target.checked)}
                    className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
                  />
                </div>
                {morningCall && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-1">Wake-Up Time</label>
                      <input
                        type="text"
                        value={wakeUpTime}
                        onChange={(e) => setWakeUpTime(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-stone-500 block mb-1">
                        Beverage Preference
                      </label>
                      <select className="w-full px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs">
                        <option>Double Espresso & Warm Brioche</option>
                        <option>Earl Grey Tea & Scone</option>
                        <option>Cold-Pressed Orange Juice & Pastry</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: PASSENGER INFORMATION & PAYMENT */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Citizen Identification & Luxury Fare Summary
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Review passenger details and finalize your confirmed reservation.
                </p>
              </div>

              {/* Passenger form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Primary Citizen Full Name
                  </label>
                  <input
                    type="text"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Citizen National ID / Passport
                  </label>
                  <input
                    type="text"
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-mono font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Email for Digital Boarding Pass
                  </label>
                  <input
                    type="email"
                    value={passengerEmail}
                    onChange={(e) => setPassengerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Direct Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Transparent Pricing Breakdown */}
              <div className="bg-[#faf8f5] p-5 rounded-2xl border border-stone-200 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  All-Inclusive Fare Breakdown
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>
                    Base Transit Fare ({guestsCount} guest{guestsCount > 1 ? 's' : ''})
                  </span>
                  <span>${baseFare}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>
                    Suite Supplement ({selectedCabin.name})
                  </span>
                  <span>${cabinPrice}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 font-medium">
                  <span>
                    Included 4-Course Fine Gastronomy ($180 value)
                  </span>
                  <span>COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>VIP Station Concierge & Valet Porterage</span>
                  <span>${conciergeFee}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Terminal Fees & Taxes</span>
                  <span>${taxes}</span>
                </div>
                <div className="pt-3 border-t border-stone-200 flex justify-between font-serif text-lg font-bold text-stone-900">
                  <span>Total Amount Due</span>
                  <span className="text-amber-950">${totalAmount}</span>
                </div>
              </div>

              {/* Payment Method Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                  Select Settlement Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-amber-700 bg-amber-50/50 font-bold'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-700 mb-1" />
                    <div className="text-xs">Visa Infinite (•••• 4242)</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('amex')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'amex'
                        ? 'border-amber-700 bg-amber-50/50 font-bold'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-700 mb-1" />
                    <div className="text-xs">Centurion Concierge</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('credits')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'credits'
                        ? 'border-amber-700 bg-amber-50/50 font-bold'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-700 mb-1" />
                    <div className="text-xs">Royal Black Elite Credits</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: INSTANT CONFIRMATION & BOARDING PASS */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Reservation Confirmed & Ticket Issued
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-2">
                  Welcome Aboard, {confirmedBooking.userName}
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Boarding Code: <strong className="text-stone-900">{confirmedBooking.bookingCode}</strong>
                </p>
              </div>

              {/* Digital Boarding Pass Card */}
              <div className="max-w-md mx-auto bg-stone-900 text-stone-100 rounded-3xl p-6 text-left shadow-xl border border-amber-600/30 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-amber-300" />
                    <span className="font-serif font-bold text-amber-100 text-base">
                      VoyageEase
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    FIRST CLASS BOARDING PASS
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-stone-400">{confirmedBooking.transitTitle}</div>
                  <div className="flex items-center justify-between text-base font-serif font-bold text-white">
                    <span>{confirmedBooking.originCity} ({confirmedBooking.departureTime})</span>
                    <span>→</span>
                    <span>{confirmedBooking.destinationCity} ({confirmedBooking.arrivalTime})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-800 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">PASSENGER</span>
                    <span className="font-bold text-white">{confirmedBooking.userName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">BERTH ASSIGNMENT</span>
                    <span className="font-bold text-amber-300">{confirmedBooking.selectedSeatId}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">DEPARTURE DATE</span>
                    <span className="font-bold text-white">{confirmedBooking.departureDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">CARRIAGE STEWARD</span>
                    <span className="font-bold text-white">{confirmedBooking.stewardAssigned}</span>
                  </div>
                </div>

                {/* Simulated Barcode */}
                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-6 w-36 bg-[repeating-linear-gradient(90deg,#fff,#fff_2px,#1c1917_2px,#1c1917_4px)] rounded-xs" />
                    <div className="text-[9px] font-mono text-stone-500 tracking-widest">
                      {confirmedBooking.bookingCode}
                    </div>
                  </div>
                  <QrCode className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    closeBookingModal();
                    setTicketModalBooking(confirmedBooking);
                  }}
                  className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-100 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>View & Print Formal Ticket</span>
                </button>

                <button
                  onClick={() => {
                    closeBookingModal();
                    setActiveView('itinerary');
                  }}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Go to My Itineraries
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Navigation Buttons */}
        {currentStep < 5 && (
          <div className="px-6 py-4 border-t border-stone-200 bg-[#faf8f5] flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-100 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Securing Berth...</span>
              ) : currentStep === 4 ? (
                <span>Confirm & Settle ${totalAmount}</span>
              ) : (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
