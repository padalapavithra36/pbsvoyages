import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Bell,
  Train,
  Bus,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { TransitListing } from '../types';

export const HostDashboardView: React.FC = () => {
  const {
    listings,
    updateListing,
    addListing,
    bookings,
    stewardRequests,
    updateStewardRequestStatus,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'routes' | 'manifest' | 'stewards'>('routes');
  const [passengerSearch, setPassengerSearch] = useState('');
  const [isAddRouteModalOpen, setIsAddRouteModalOpen] = useState(false);

  // New route form state
  const [newTitle, setNewTitle] = useState('');
  const [newOperator, setNewOperator] = useState('VoyageEase Royal Rail Corp');
  const [newType, setNewType] = useState<'train' | 'bus'>('train');
  const [newOriginCity, setNewOriginCity] = useState('');
  const [newOriginStation, setNewOriginStation] = useState('');
  const [newDestCity, setNewDestCity] = useState('');
  const [newDestStation, setNewDestStation] = useState('');
  const [newPrice, setNewPrice] = useState('350');
  const [newDuration, setNewDuration] = useState('4h 30m');
  const [newOvernight, setNewOvernight] = useState(false);
  const [newTagline, setNewTagline] = useState('');

  // Fleet stats
  const totalFleetRevenue = listings.reduce((acc, l) => acc + l.totalRevenue, 0);
  const avgOccupancy = Math.round(
    listings.reduce((acc, l) => acc + l.occupancyRate, 0) / listings.length
  );
  const totalPassengers = bookings.length;
  const pendingStewardCalls = stewardRequests.filter((r) => r.status === 'pending').length;

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newOriginCity || !newDestCity) {
      showToast('Please fill out the route title, origin, and destination.');
      return;
    }

    const priceNum = parseInt(newPrice, 10) || 350;
    const newRoute: TransitListing = {
      id: `transit-${Date.now()}`,
      title: newTitle,
      operator: newOperator,
      transitType: newType,
      tagline: newTagline || `${newOriginCity} to ${newDestCity} Luxury Grand Passage`,
      description: `Experience premier bespoke overland travel between ${newOriginCity} and ${newDestCity} with fine dining and personalized cabin steward service.`,
      origin: {
        city: newOriginCity,
        station: newOriginStation || `${newOriginCity} Grand Central`,
        code: newOriginCity.slice(0, 3).toUpperCase(),
        departureTime: '09:00 AM',
      },
      destination: {
        city: newDestCity,
        station: newDestStation || `${newDestCity} Royal Terminal`,
        code: newDestCity.slice(0, 3).toUpperCase(),
        arrivalTime: '01:30 PM',
      },
      distanceKm: 380,
      durationFormatted: newDuration,
      isOvernight: newOvernight,
      basePrice: priceNum,
      rating: 5.0,
      reviewCount: 1,
      heroImage:
        newType === 'train'
          ? 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=1600&q=80'
          : 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: [
        'Dedicated Personal Cabin Steward',
        'All-Inclusive 4-Course Fine Dining',
        'VIP Station Lounge Access',
        'Starlink High-Speed WiFi',
      ],
      hospitalityHighlights: [
        'Welcome vintage champagne flute upon boarding',
        'Lavender scented hot oshibori towel service',
        'Table-side sommelier consultation',
      ],
      cabins: [
        {
          id: `cabin-${Date.now()}-suite`,
          name: 'Grand Royal Observation Suite',
          transitType: newType,
          category: 'royal_suite',
          price: priceNum + 200,
          capacity: 2,
          bedConfig: 'Twin Reclining Berths & Ensuite Lavatory',
          description: 'Spacious private parlor with floor-to-ceiling panoramic glass.',
          features: ['Guaranteed Window View', 'In-Suite Champagne Service', 'Dedicated Steward'],
          availableCount: 4,
          seats: [
            { id: '1A', row: 1, col: 'A', status: 'available' },
            { id: '1B', row: 1, col: 'B', status: 'available' },
          ],
        },
      ],
      diningMenu: {
        serviceWindow: '12:00 PM – 01:30 PM',
        includedService: 'Four-course seasonal tasting menu by Executive Galley Chef',
        courses: [
          {
            id: 'c-1',
            category: 'starter',
            name: 'Local Artisanal Tasting Board',
            description: 'Regional cured meats, local cheeses, and warm brioche.',
            dietary: ['Chef Special'],
          },
          {
            id: 'c-2',
            category: 'main',
            name: 'Pan-Roasted Reserve Tenderloin',
            description: 'Served with seasonal root purée and red wine reduction.',
            dietary: ['Gluten-Free'],
          },
        ],
        refreshmentBar: ['Barista Espresso', 'Reserve Sparkling Wine', 'Still Mineral Springs'],
      },
      itineraryStops: [
        { station: `${newOriginCity} Grand Central`, city: newOriginCity, arrival: '—', departure: '09:00 AM' },
        { station: `${newDestCity} Royal Terminal`, city: newDestCity, arrival: '01:30 PM', departure: '—' },
      ],
      stewardTeam: {
        headSteward: 'Harrison Croft',
        executiveChef: 'Chef Claire Valois',
        sommelier: 'Antoine Mercier',
      },
      reviews: [],
      occupancyRate: 90,
      totalRevenue: priceNum * 12,
      status: 'active',
    };

    addListing(newRoute);
    setIsAddRouteModalOpen(false);
    setNewTitle('');
    setNewOriginCity('');
    setNewDestCity('');
  };

  const filteredManifest = bookings.filter((b) => {
    if (!passengerSearch) return true;
    const q = passengerSearch.toLowerCase();
    return (
      b.userName.toLowerCase().includes(q) ||
      b.bookingCode.toLowerCase().includes(q) ||
      b.citizenId.toLowerCase().includes(q) ||
      b.transitTitle.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      {/* Header */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>VoyageEase Operations & Fleet Command</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-2">
            Host Fleet & Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Real-time control of corridor inventory, pricing models, passenger manifests, and steward dispatch queues.
          </p>
        </div>

        <button
          onClick={() => setIsAddRouteModalOpen(true)}
          className="px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-amber-100 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Scenic Corridor</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Fleet Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-stone-900">
            ${totalFleetRevenue.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">
            +18.4% vs previous quarter
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Average Occupancy</span>
            <TrendingUp className="w-4 h-4 text-amber-700" />
          </div>
          <div className="font-serif text-2xl font-bold text-stone-900">
            {avgOccupancy}%
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Across 5 global corridors
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Active Reservations</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-stone-900">
            {totalPassengers}
          </div>
          <p className="text-[11px] text-stone-500 font-medium">
            Confirmed citizen tickets
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Open Steward Calls</span>
            <Bell className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-2xl font-bold text-stone-900">
            {pendingStewardCalls}
          </div>
          <p className="text-[11px] text-amber-800 font-medium">
            Requires attendant dispatch
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('routes')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
            activeTab === 'routes'
              ? 'bg-stone-900 text-amber-100 shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Corridor Fleet & Inventory ({listings.length})
        </button>

        <button
          onClick={() => setActiveTab('manifest')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
            activeTab === 'manifest'
              ? 'bg-stone-900 text-amber-100 shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Live Passenger Manifest ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('stewards')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'stewards'
              ? 'bg-stone-900 text-amber-100 shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Bell className="w-3.5 h-3.5 text-amber-400" />
          <span>Steward Dispatch Queue</span>
          {pendingStewardCalls > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
              {pendingStewardCalls}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: CORRIDORS & FLEET INVENTORY */}
      {activeTab === 'routes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {listings.map((route) => {
              const isActive = route.status === 'active';

              return (
                <div
                  key={route.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={route.heroImage}
                      alt={route.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 ring-1 ring-stone-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 px-2 py-0.5 rounded flex items-center gap-1">
                          {route.transitType === 'train' ? (
                            <Train className="w-3 h-3" />
                          ) : (
                            <Bus className="w-3 h-3" />
                          )}
                          {route.transitType}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {route.status}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {route.title}
                      </h3>

                      <p className="text-xs text-stone-500">
                        {route.origin.city} ({route.origin.departureTime}) → {route.destination.city} ({route.destination.arrivalTime}) · {route.durationFormatted}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        Base Price
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-serif text-lg font-bold text-stone-900">
                          ${route.basePrice}
                        </span>
                        <button
                          onClick={() => {
                            const newP = prompt('Enter new base price ($):', String(route.basePrice));
                            if (newP && !isNaN(Number(newP))) {
                              updateListing({ ...route, basePrice: Number(newP) });
                            }
                          }}
                          className="text-[11px] text-amber-800 hover:underline cursor-pointer ml-1"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        Occupancy
                      </span>
                      <span className="font-serif text-lg font-bold text-stone-900">
                        {route.occupancyRate}%
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        Gross
                      </span>
                      <span className="font-serif text-lg font-bold text-stone-900">
                        ${route.totalRevenue.toLocaleString()}
                      </span>
                    </div>

                    {/* Toggle Route Active/Maintenance */}
                    <button
                      onClick={() => {
                        const newStatus = isActive ? 'maintenance' : 'active';
                        updateListing({ ...route, status: newStatus });
                      }}
                      className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                      title={isActive ? 'Set to Maintenance' : 'Set to Active'}
                    >
                      {isActive ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-emerald-600" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-stone-400" />
                          <span>Maint</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE PASSENGER MANIFEST */}
      {activeTab === 'manifest' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search passenger name, citizen ID, or booking code..."
                value={passengerSearch}
                onChange={(e) => setPassengerSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-800"
              />
            </div>
            <div className="text-xs text-stone-500 font-medium">
              Showing {filteredManifest.length} manifest records
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf8f5] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Booking Code</th>
                    <th className="py-3 px-4">Passenger</th>
                    <th className="py-3 px-4">Route & Date</th>
                    <th className="py-3 px-4">Cabin & Berth</th>
                    <th className="py-3 px-4">Dining Order</th>
                    <th className="py-3 px-4">Steward</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredManifest.map((b) => (
                    <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-amber-900">
                        {b.bookingCode}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{b.userName}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{b.citizenId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-800">{b.transitTitle}</div>
                        <div className="text-[10px] text-stone-500">
                          {b.departureDate} at {b.departureTime}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-800">{b.selectedCabinName}</div>
                        <div className="text-[10px] font-mono text-amber-800">{b.selectedSeatId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-700 truncate max-w-[150px]">
                          {b.diningChoice.main}
                        </div>
                        <div className="text-[10px] text-amber-900 italic">
                          {b.diningChoice.beverage}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-stone-700">
                        {b.stewardAssigned}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STEWARD DISPATCH QUEUE */}
      {activeTab === 'stewards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Live Carriage Attendant Dispatch Log
              </h3>
              <p className="text-xs text-stone-500">
                Direct in-cabin requests from passengers across all active trains and motorcoaches
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stewardRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {req.bookingCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        req.status === 'pending'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : req.status === 'dispatched'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {req.status}
                    </span>
                    <span className="text-xs text-stone-400">· {req.timestamp}</span>
                  </div>

                  <div className="font-serif text-base font-bold text-stone-900">
                    {req.requestType}
                  </div>

                  <div className="text-xs text-stone-600">
                    Passenger: <strong>{req.passengerName}</strong> · Berth:{' '}
                    <strong>{req.seatOrCabin}</strong>
                  </div>

                  {req.customNotes && (
                    <div className="text-xs text-stone-500 italic bg-stone-50 p-2 rounded-lg border border-stone-100">
                      "{req.customNotes}"
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => updateStewardRequestStatus(req.id, 'dispatched')}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-amber-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Dispatch Steward
                    </button>
                  )}

                  {req.status === 'dispatched' && (
                    <button
                      onClick={() => updateStewardRequestStatus(req.id, 'attended')}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Attended</span>
                    </button>
                  )}

                  {req.status === 'attended' && (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Service Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Route Modal */}
      {isAddRouteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Enroll New Scenic Corridor
              </h3>
              <button
                onClick={() => setIsAddRouteModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRoute} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Corridor Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Bavarian Royal Alpine Glider"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Transit Mode
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  >
                    <option value="train">Scenic Luxury Rail</option>
                    <option value="bus">Sleeper Motorcoach</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Base Fare ($)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Origin City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Munich"
                    value={newOriginCity}
                    onChange={(e) => setNewOriginCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Destination City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salzburg"
                    value={newDestCity}
                    onChange={(e) => setNewDestCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="overnight"
                  checked={newOvernight}
                  onChange={(e) => setNewOvernight(e.target.checked)}
                  className="w-4 h-4 accent-amber-700 rounded"
                />
                <label htmlFor="overnight" className="text-xs text-stone-700 cursor-pointer">
                  Overnight Sleeper Schedule (Lie-flat pods enabled)
                </label>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddRouteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-amber-100 rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Create & Launch Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
