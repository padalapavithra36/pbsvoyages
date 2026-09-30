export type TransitType = 'train' | 'bus';

export type CabinCategory = 'royal_suite' | 'panoramic_first' | 'sleeper_pod' | 'deluxe_berth';

export interface Seat {
  id: string;
  row: number;
  col: string;
  status: 'available' | 'reserved' | 'selected';
}

export interface Cabin {
  id: string;
  name: string;
  transitType: TransitType;
  category: CabinCategory;
  price: number;
  capacity: number;
  bedConfig: string;
  description: string;
  features: string[];
  availableCount: number;
  seats: Seat[];
}

export interface Dish {
  id: string;
  category: 'starter' | 'main' | 'dessert' | 'breakfast';
  name: string;
  description: string;
  dietary: string[];
  pairing?: string;
}

export interface DiningMenu {
  serviceWindow: string;
  includedService: string;
  courses: Dish[];
  refreshmentBar: string[];
}

export interface ItineraryStop {
  station: string;
  city: string;
  arrival: string;
  departure: string;
  scenicHighlight?: string;
}

export interface StewardTeam {
  headSteward: string;
  executiveChef: string;
  sommelier: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  routeTaken: string;
  transitType: TransitType;
}

export interface TransitListing {
  id: string;
  title: string;
  operator: string;
  transitType: TransitType;
  tagline: string;
  description: string;
  origin: {
    city: string;
    station: string;
    code: string;
    departureTime: string;
  };
  destination: {
    city: string;
    station: string;
    code: string;
    arrivalTime: string;
  };
  distanceKm: number;
  durationFormatted: string;
  isOvernight: boolean;
  basePrice: number;
  rating: number;
  reviewCount: number;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  hospitalityHighlights: string[];
  cabins: Cabin[];
  diningMenu: DiningMenu;
  itineraryStops: ItineraryStop[];
  stewardTeam: StewardTeam;
  reviews: Review[];
  occupancyRate: number;
  totalRevenue: number;
  status: 'active' | 'maintenance';
}

export interface DiningChoice {
  starter: string;
  main: string;
  dessert: string;
  beverage: string;
  diningLocation: 'panoramic_dining_car' | 'in_suite_service';
  dietaryRequests?: string;
}

export interface HospitalityChoice {
  turndownService: boolean;
  morningCall: boolean;
  wakeUpTime: string;
  pillowPreference: string;
  fragranceMist: string;
  stationLoungeAccess: boolean;
  luggagePorterCount: number;
}

export interface BookingPricing {
  baseFare: number;
  cabinPrice: number;
  diningIncludedValue: number;
  conciergeFee: number;
  taxes: number;
  discount: number;
  totalAmount: number;
}

export interface Booking {
  id: string;
  bookingCode: string;
  transitId: string;
  transitTitle: string;
  transitType: TransitType;
  operator: string;
  originCity: string;
  originStation: string;
  destinationCity: string;
  destinationStation: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationFormatted: string;
  heroImage: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  citizenId: string;
  selectedCabinId: string;
  selectedCabinName: string;
  selectedSeatId: string;
  guestsCount: number;
  diningChoice: DiningChoice;
  hospitalityChoice: HospitalityChoice;
  pricing: BookingPricing;
  status: 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
  paymentMethod: {
    type: string;
    brand: string;
    last4: string;
  };
  stewardAssigned: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'traveler' | 'admin';
  phone: string;
  memberTier: string;
  citizenId: string;
  createdAt: string;
}

export interface StewardRequest {
  id: string;
  bookingId: string;
  bookingCode: string;
  passengerName: string;
  seatOrCabin: string;
  requestType: string;
  customNotes?: string;
  timestamp: string;
  status: 'pending' | 'dispatched' | 'attended';
  assignedSteward: string;
}

export interface FilterState {
  search: string;
  origin: string;
  destination: string;
  transitType: 'all' | TransitType;
  isOvernight: 'all' | 'overnight' | 'day';
  category: 'all' | CabinCategory;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'duration';
  date: string;
  guests: number;
}
