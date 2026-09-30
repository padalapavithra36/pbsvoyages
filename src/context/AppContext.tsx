import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TransitListing,
  Booking,
  User,
  FilterState,
  StewardRequest,
} from '../types';
import {
  INITIAL_LISTINGS,
  INITIAL_BOOKINGS,
  INITIAL_USERS,
  INITIAL_STEWARD_REQUESTS,
} from '../data/mockData';

const STORAGE_KEYS = {
  LISTINGS: 'voyageease_listings_v2',
  BOOKINGS: 'voyageease_bookings_v2',
  FAVORITES: 'voyageease_favorites_v2',
  CURRENT_USER: 'voyageease_user_v2',
  STEWARD_REQUESTS: 'voyageease_steward_requests_v2',
};

const DEFAULT_FILTERS: FilterState = {
  search: '',
  origin: '',
  destination: '',
  transitType: 'all',
  isOvernight: 'all',
  category: 'all',
  sortBy: 'recommended',
  date: '2026-10-18',
  guests: 1,
};

interface BookingModalState {
  isOpen: boolean;
  listing: TransitListing | null;
  initialCabinId?: string;
  initialDate?: string;
  initialGuests?: number;
}

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchUserRole: (role: 'traveler' | 'admin') => void;
  listings: TransitListing[];
  bookings: Booking[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  activeView: 'explore' | 'dining' | 'itinerary' | 'host';
  setActiveView: (view: 'explore' | 'dining' | 'itinerary' | 'host') => void;
  selectedListing: TransitListing | null;
  setSelectedListing: (listing: TransitListing | null) => void;
  bookingModal: BookingModalState;
  openBookingModal: (listing: TransitListing, initialCabinId?: string, initialDate?: string, initialGuests?: number) => void;
  closeBookingModal: () => void;
  schemaModalOpen: boolean;
  setSchemaModalOpen: (open: boolean) => void;
  ticketModalBooking: Booking | null;
  setTicketModalBooking: (booking: Booking | null) => void;
  stewardModalBooking: Booking | null;
  setStewardModalBooking: (booking: Booking | null) => void;
  stewardRequests: StewardRequest[];
  addStewardRequest: (booking: Booking, requestType: string, notes?: string) => void;
  updateStewardRequestStatus: (id: string, status: 'pending' | 'dispatched' | 'attended') => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  createBooking: (newBooking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status' | 'paymentStatus'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  updateListing: (listing: TransitListing) => void;
  addListing: (listing: TransitListing) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  });

  const [listings, setListings] = useState<TransitListing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LISTINGS);
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : ['transit-alpine-express', 'transit-kyoto-shinkansen-gran'];
    } catch {
      return ['transit-alpine-express', 'transit-kyoto-shinkansen-gran'];
    }
  });

  const [stewardRequests, setStewardRequests] = useState<StewardRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STEWARD_REQUESTS);
      return saved ? JSON.parse(saved) : INITIAL_STEWARD_REQUESTS;
    } catch {
      return INITIAL_STEWARD_REQUESTS;
    }
  });

  const [activeView, setActiveView] = useState<'explore' | 'dining' | 'itinerary' | 'host'>('explore');
  const [selectedListing, setSelectedListing] = useState<TransitListing | null>(null);
  const [bookingModal, setBookingModal] = useState<BookingModalState>({
    isOpen: false,
    listing: null,
  });
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [ticketModalBooking, setTicketModalBooking] = useState<Booking | null>(null);
  const [stewardModalBooking, setStewardModalBooking] = useState<Booking | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STEWARD_REQUESTS, JSON.stringify(stewardRequests));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [stewardRequests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const switchUserRole = (role: 'traveler' | 'admin') => {
    const user = role === 'admin' ? INITIAL_USERS[1] : INITIAL_USERS[0];
    setCurrentUser(user);
    if (role === 'admin') {
      setActiveView('host');
      showToast(`Switched to ${user.name} (${user.memberTier} / Host Operations)`);
    } else {
      setActiveView('explore');
      showToast(`Switched to ${user.name} (${user.memberTier} Traveler)`);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      showToast(exists ? 'Removed journey from saved routes' : 'Added journey to saved routes');
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const openBookingModal = (
    listing: TransitListing,
    initialCabinId?: string,
    initialDate?: string,
    initialGuests?: number
  ) => {
    setBookingModal({
      isOpen: true,
      listing,
      initialCabinId,
      initialDate: initialDate || filters.date,
      initialGuests: initialGuests || filters.guests,
    });
  };

  const closeBookingModal = () => {
    setBookingModal({ isOpen: false, listing: null });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const createBooking = (
    newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status' | 'paymentStatus'>
  ): Booking => {
    const codePrefix = newBookingData.transitType === 'train' ? 'TR' : 'MC';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const suffix = newBookingData.destinationCity.slice(0, 3).toUpperCase();
    const bookingCode = `${codePrefix}-${randomNum}-${suffix}`;

    const newBooking: Booking = {
      ...newBookingData,
      id: `booking-${Date.now()}`,
      bookingCode,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update cabin availability in the listing
    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing.id !== newBooking.transitId) return listing;
        return {
          ...listing,
          occupancyRate: Math.min(100, Math.round(listing.occupancyRate + 1)),
          totalRevenue: listing.totalRevenue + newBooking.pricing.totalAmount,
          cabins: listing.cabins.map((cabin) => {
            if (cabin.id !== newBooking.selectedCabinId) return cabin;
            return {
              ...cabin,
              availableCount: Math.max(0, cabin.availableCount - 1),
              seats: cabin.seats.map((seat) => {
                if (seat.id === newBooking.selectedSeatId.split(' · ').pop()) {
                  return { ...seat, status: 'reserved' as const };
                }
                return seat;
              }),
            };
          }),
        };
      })
    );

    showToast(`Reservation confirmed! Boarding pass code: ${bookingCode}`);
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
    showToast('Reservation has been cancelled. Refund has been dispatched.');
  };

  const updateListing = (updated: TransitListing) => {
    setListings((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    showToast(`Route updated: ${updated.title}`);
  };

  const addListing = (newListing: TransitListing) => {
    setListings((prev) => [newListing, ...prev]);
    showToast(`New route added to fleet: ${newListing.title}`);
  };

  const addStewardRequest = (booking: Booking, requestType: string, notes?: string) => {
    const newReq: StewardRequest = {
      id: `req-${Date.now()}`,
      bookingId: booking.id,
      bookingCode: booking.bookingCode,
      passengerName: booking.userName,
      seatOrCabin: `${booking.selectedCabinName} (${booking.selectedSeatId})`,
      requestType,
      customNotes: notes,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
      assignedSteward: booking.stewardAssigned || 'Head Steward',
    };
    setStewardRequests((prev) => [newReq, ...prev]);
    showToast(`Steward request sent to ${newReq.assignedSteward}! Help is en route.`);
  };

  const updateStewardRequestStatus = (id: string, status: 'pending' | 'dispatched' | 'attended') => {
    setStewardRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
    const statusLabel = status === 'dispatched' ? 'dispatched' : status === 'attended' ? 'completed' : 'pending';
    showToast(`Steward call marked as ${statusLabel}`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        listings,
        bookings,
        favorites,
        toggleFavorite,
        isFavorite,
        activeView,
        setActiveView,
        selectedListing,
        setSelectedListing,
        bookingModal,
        openBookingModal,
        closeBookingModal,
        schemaModalOpen,
        setSchemaModalOpen,
        ticketModalBooking,
        setTicketModalBooking,
        stewardModalBooking,
        setStewardModalBooking,
        stewardRequests,
        addStewardRequest,
        updateStewardRequestStatus,
        filters,
        setFilters,
        resetFilters,
        createBooking,
        cancelBooking,
        updateListing,
        addListing,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
