import { TransitListing, User, Booking, StewardRequest } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    email: 'elena.rostova@voyageease.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'traveler',
    phone: '+1 (555) 234-8901',
    memberTier: 'Royal Black Elite',
    citizenId: 'CIT-892401-US',
    createdAt: '2025-01-14',
  },
  {
    id: 'user-marcus',
    name: 'Marcus Vance',
    email: 'marcus.vance@voyageease.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'admin',
    phone: '+1 (555) 987-6543',
    memberTier: 'Grand Fleet Director',
    citizenId: 'CIT-110294-CH',
    createdAt: '2024-08-20',
  },
];

export const INITIAL_LISTINGS: TransitListing[] = [
  {
    id: 'transit-alpine-express',
    title: 'The Imperial Alpine Panorama Express',
    operator: 'Swiss Grand Railway Corp',
    transitType: 'train',
    tagline: 'Scenic Alpine Peaks & 4-Course High-Altitude Michelin Gastronomy',
    description: 'Traverse the majestic snow-capped peaks of the Swiss Alps in pure grand-tour luxury. Featuring floor-to-ceiling panoramic glass observation carriages, handcrafted walnut wood suites, and our dedicated onboard culinary kitchen presenting a 4-course seasonal feast prepared fresh while you glide past glacial gorges.',
    origin: {
      city: 'Zurich',
      station: 'Zurich Hauptbahnhof · Royal Terminal',
      code: 'ZRH',
      departureTime: '08:45 AM',
    },
    destination: {
      city: 'Zermatt',
      station: 'Zermatt Alpine Terminal',
      code: 'ZMT',
      arrivalTime: '02:30 PM',
    },
    distanceKm: 248,
    durationFormatted: '5h 45m',
    isOvernight: false,
    basePrice: 420,
    rating: 4.96,
    reviewCount: 318,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Dedicated Personal Cabin Steward',
      'Panoramic 360° Glass Dome Carriage',
      'All-Inclusive 4-Course Michelin Gastronomy',
      'Unlimited Sommelier Grand Cru Wine Pairings',
      'Private High-Speed Starlink Connectivity',
      'Pre-Boarding VIP Station Grand Lounge',
      'Valet Luggage Porterage & Hotel Transfer',
    ],
    hospitalityHighlights: [
      'Welcome chilled Swiss sparkling vintage upon boarding',
      'Warm lavender-scented oshibori towel service',
      'Tableside sommelier consultation and artisanal cheese trolley',
      'Complimentary handcrafted Swiss praline gift box',
      'Dedicated steward call button in every compartment',
    ],
    cabins: [
      {
        id: 'cabin-imperial-suite',
        name: 'The Imperial Panorama Grand Suite',
        transitType: 'train',
        category: 'royal_suite',
        price: 680,
        capacity: 2,
        bedConfig: 'Private Parlor with Twin Reclining Leather Berths & Ensuite Lavatory',
        description: 'An exclusive private carriage suite featuring dual plush leather armchairs, private marble powder room, and floor-to-ceiling panoramic observation glass.',
        features: [
          'Guaranteed Window Observation Table',
          'Private En-Suite Restroom & Bvlgari Toiletries',
          'Dedicated Personal Carriage Steward',
          'In-Suite Champagne & Caviar Welcome Service',
        ],
        availableCount: 4,
        seats: [
          { id: 'S1-A', row: 1, col: 'A', status: 'available' },
          { id: 'S1-B', row: 1, col: 'B', status: 'available' },
          { id: 'S2-A', row: 2, col: 'A', status: 'reserved' },
          { id: 'S2-B', row: 2, col: 'B', status: 'available' },
        ],
      },
      {
        id: 'cabin-panoramic-first',
        name: 'First Class Observation Parlor',
        transitType: 'train',
        category: 'panoramic_first',
        price: 420,
        capacity: 1,
        bedConfig: 'Spacious 2+1 Rotational Recliner with 45° Incline & Ottoman',
        description: 'Generous ergonomic seating with unobstructed mountain views, individual reading lamps, USB-C 100W ports, and dining service brought directly to your swivel table.',
        features: [
          'Generous 48-inch Legroom with Footrest',
          'Dining Car Priority Reservation',
          'Noise-Canceling Bang & Olufsen Headphones',
          'Complimentary High Tea Hamper',
        ],
        availableCount: 16,
        seats: [
          { id: 'P3-A', row: 3, col: 'A', status: 'available' },
          { id: 'P3-C', row: 3, col: 'C', status: 'available' },
          { id: 'P4-A', row: 4, col: 'A', status: 'reserved' },
          { id: 'P4-C', row: 4, col: 'C', status: 'available' },
          { id: 'P5-A', row: 5, col: 'A', status: 'available' },
          { id: 'P5-C', row: 5, col: 'C', status: 'reserved' },
        ],
      },
    ],
    diningMenu: {
      serviceWindow: '11:30 AM – 01:15 PM (Mid-Journey Alpine Vista)',
      includedService: 'All-inclusive 4-course lunch prepared fresh by Executive Chef Julian Mercier',
      courses: [
        {
          id: 'dish-1',
          category: 'starter',
          name: 'Alpine Truffle & Porcini Velouté',
          description: 'Velvety wild mountain mushroom broth finished with shaved black winter truffles, crème fraîche, and toasted brioche croutons.',
          dietary: ['Chef Special', 'Vegetarian'],
          pairing: '2022 Petite Arvine du Valais',
        },
        {
          id: 'dish-2',
          category: 'main',
          name: 'Seared Simmental Beef Tenderloin',
          description: 'Grass-fed Swiss beef paired with potato mousseline, butter-poached baby carrots, and a rich Pinot Noir reduction jus.',
          dietary: ['Chef Special', 'Gluten-Free'],
          pairing: '2019 Grand Cru Cornalin',
        },
        {
          id: 'dish-2b',
          category: 'main',
          name: 'Glacial Lake Char with Saffron Emulsion',
          description: 'Crisp-skinned mountain trout caught locally, wild fennel purée, and white wine saffron beurre blanc.',
          dietary: ['Gluten-Free'],
          pairing: '2021 Fendant de Sion',
        },
        {
          id: 'dish-3',
          category: 'dessert',
          name: 'Grand Cru Swiss Dark Chocolate Sphere',
          description: 'Warm salted caramel ganache poured tableside over a Valrhona chocolate dome with wild raspberry coulis.',
          dietary: ['Chef Special', 'Vegetarian'],
          pairing: 'Late Harvest Riesling',
        },
      ],
      refreshmentBar: [
        'Artisanal Barista Espresso & Cappuccino',
        'Sparkling & Still Mineral Water from Gotthard Spring',
        'Seasonal Fruit & Macaron Tiers',
        'Curated Selection of 12 Rare Swiss Herbal Teas',
      ],
    },
    itineraryStops: [
      { station: 'Zurich Hauptbahnhof', city: 'Zurich', arrival: '—', departure: '08:45 AM' },
      { station: 'Chur Old Town Station', city: 'Chur', arrival: '10:15 AM', departure: '10:22 AM', scenicHighlight: 'Crossing the historic Rhine Gorge' },
      { station: 'Andermatt Pass', city: 'Andermatt', arrival: '12:05 PM', departure: '12:12 PM', scenicHighlight: 'Summit view of Oberalp Pass at 2,044m' },
      { station: 'Brig Terminal', city: 'Brig', arrival: '01:25 PM', departure: '01:30 PM' },
      { station: 'Zermatt Alpine Terminal', city: 'Zermatt', arrival: '02:30 PM', departure: '—', scenicHighlight: 'Matterhorn peak emergence' },
    ],
    stewardTeam: {
      headSteward: 'Beatrix von Bergen',
      executiveChef: 'Chef Julian Mercier (Michelin 2-Star Alum)',
      sommelier: 'Henri Chamonix',
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Lord Jonathan Sterling',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        date: 'September 12, 2026',
        rating: 5,
        comment: 'Unsurpassed journey. The beef tenderloin was restaurant-grade perfection and our cabin steward Beatrix anticipated our every need. The views through the glass dome while dining on white linen is unforgettable.',
        routeTaken: 'Zurich to Zermatt',
        transitType: 'train',
      },
      {
        id: 'rev-2',
        author: 'Dr. Vivienne Moreau',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        date: 'August 28, 2026',
        rating: 5,
        comment: 'Traveling by train should always feel like this. Smooth, whisper-quiet, exceptional hospitality, and the wine pairings matched each course exquisitely.',
        routeTaken: 'Zurich to Zermatt',
        transitType: 'train',
      },
    ],
    occupancyRate: 94,
    totalRevenue: 284000,
    status: 'active',
  },
  {
    id: 'transit-pacific-sleeper-bus',
    title: 'Aura Grand Horizon Sleeper Motorcoach',
    operator: 'Aura Luxury Motorways',
    transitType: 'bus',
    tagline: 'Overnight Lie-Flat Pod Suites & Farm-to-Table Midnight Nocturne',
    description: 'Reinventing highway travel with the comfort of a five-star boutique hotel. Depart at bedtime in San Francisco and arrive refreshed at sunrise in Los Angeles. Individual acoustic sleeping pods with memory foam mattresses, organic bamboo linens, circadian sleep lighting, and a nightcap service curated by our onboard steward.',
    origin: {
      city: 'San Francisco',
      station: 'Transbay Terminal VIP Lounge',
      code: 'SFO',
      departureTime: '10:30 PM (Overnight)',
    },
    destination: {
      city: 'Los Angeles',
      station: 'Century City Executive Terminal',
      code: 'LAX',
      arrivalTime: '06:45 AM',
    },
    distanceKm: 615,
    durationFormatted: '8h 15m (Overnight)',
    isOvernight: true,
    basePrice: 285,
    rating: 4.92,
    reviewCount: 420,
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Full 180° Horizontal Memory Foam Lie-Flat Bed',
      'Acoustic Privacy Pod with Noise Cancellation',
      'Onboard Culinary Steward & Host',
      'Evening Farm-to-Table Supper & Sunrise Hamper',
      'Circadian Sleep Amber Lighting & White Noise',
      'High-Speed In-Seat Wi-Fi & 4K OLED Screen',
      'Direct Hotel Curbside Luggage Transfer Option',
    ],
    hospitalityHighlights: [
      'Curated bedtime herbal chamomile and magnesium nightcap',
      'Egyptian cotton 600-thread sheets and silk eye mask',
      'Sunrise pour-over espresso and hot pain au chocolat',
      'Aromatherapy pillow mist (lavender and bergamot)',
      'Dedicated attendant throughout the night for quiet requests',
    ],
    cabins: [
      {
        id: 'cabin-solo-pod',
        name: 'Private Solo Lie-Flat Cocoon Suite',
        transitType: 'bus',
        category: 'sleeper_pod',
        price: 285,
        capacity: 1,
        bedConfig: '6ft 8in Memory Foam Bed with Adjustable Lumbar',
        description: 'A completely enclosed private cabin with magnetic privacy door, dimmable amber circadian lighting, and wireless charging pad.',
        features: [
          'Full Flat Bed with Egyptian Cotton Linens',
          'Sliding Sound-Dampening Privacy Door',
          'Warm Evening Supper & Sunrise Breakfast Included',
          '32-inch 4K OLED Entertainment Display',
        ],
        availableCount: 8,
        seats: [
          { id: 'POD-1', row: 1, col: 'L', status: 'available' },
          { id: 'POD-2', row: 1, col: 'R', status: 'reserved' },
          { id: 'POD-3', row: 2, col: 'L', status: 'available' },
          { id: 'POD-4', row: 2, col: 'R', status: 'available' },
          { id: 'POD-5', row: 3, col: 'L', status: 'available' },
          { id: 'POD-6', row: 3, col: 'R', status: 'reserved' },
        ],
      },
      {
        id: 'cabin-couples-suite-bus',
        name: 'Royal Duo Master Suite (Double Pod)',
        transitType: 'bus',
        category: 'royal_suite',
        price: 490,
        capacity: 2,
        bedConfig: 'Double-Wide Memory Foam Suite with Retractable Partition',
        description: 'Adjoining sleeper suite ideal for travelling couples or partners wanting shared space, dual entertainment systems, and shared culinary courses.',
        features: [
          'Double Lie-Flat Suite Configuration',
          'Dual Gourmet Dinner & Breakfast Trays',
          'Bvlgari Sleep Kits & Scented Pillows',
          'Private Curated Sommelier Wine Split',
        ],
        availableCount: 2,
        seats: [
          { id: 'DUO-1A', row: 4, col: 'L', status: 'available' },
          { id: 'DUO-1B', row: 4, col: 'R', status: 'available' },
        ],
      },
    ],
    diningMenu: {
      serviceWindow: '11:00 PM (Supper) & 06:00 AM (Sunrise Breakfast)',
      includedService: 'Two-stage dining service prepared by Onboard Culinary Steward',
      courses: [
        {
          id: 'bus-dish-1',
          category: 'starter',
          name: 'California Burrata & Heirloom Peach Carpaccio',
          description: 'Point Reyes artisan burrata, compressed stone fruit, aged balsamic glaze, and micro basil on toasted seeded levain.',
          dietary: ['Vegetarian', 'Gluten-Free'],
        },
        {
          id: 'bus-dish-2',
          category: 'main',
          name: 'Slow-Braised Short Rib Sliders or Truffle Gnocchi',
          description: 'Tender braised beef with caramelized shallot jam, or hand-rolled ricotta gnocchi with summer black truffles.',
          dietary: ['Chef Special', 'Halal'],
        },
        {
          id: 'bus-dish-3',
          category: 'breakfast',
          name: 'Sunrise Gourmet Continental Hamper',
          description: 'Flaky warm pain au chocolat, Greek yogurt parfait with wild blackberries and organic granola, and fresh-squeezed Valencia orange juice.',
          dietary: ['Vegetarian'],
        },
      ],
      refreshmentBar: [
        'Single-Origin Pour-Over Coffee & Espresso',
        'Sparkling Botanical Tonics & Kombucha',
        'Bedtime Sleep Elixirs & Valerian Infusions',
        'Gourmet Dark Chocolate Truffles',
      ],
    },
    itineraryStops: [
      { station: 'Salesforce Transit Lounge', city: 'San Francisco', arrival: '—', departure: '10:30 PM' },
      { station: 'Silicon Valley Executive Stop', city: 'San Jose', arrival: '11:20 PM', departure: '11:25 PM' },
      { station: 'Tejon Pass Vista', city: 'Grapevine', arrival: '04:45 AM', departure: '04:50 AM', scenicHighlight: 'Quiet rest & sunrise mountain glow' },
      { station: 'Century City Executive Terminal', city: 'Los Angeles', arrival: '06:45 AM', departure: '—' },
    ],
    stewardTeam: {
      headSteward: 'Carlos Santana-Reyes',
      executiveChef: 'Chef Nicole Fontaine',
      sommelier: 'Maya Lin',
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Sarah Chen, Tech Founder',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        date: 'September 18, 2026',
        rating: 5,
        comment: 'I will never fly SF to LA again. I boarded at 10:30pm, had a delicious burrata supper, slept uninterrupted for 7 hours in a real lie-flat bed, woke up to hot espresso and arrived right at Century City fresh for my 8am meeting!',
        routeTaken: 'San Francisco to Los Angeles',
        transitType: 'bus',
      },
    ],
    occupancyRate: 98,
    totalRevenue: 198000,
    status: 'active',
  },
  {
    id: 'transit-kyoto-shinkansen-gran',
    title: 'The Royal Sakura Imperial Shinkansen',
    operator: 'Central Imperial Railways',
    transitType: 'train',
    tagline: 'Gran Class Luxury High-Speed Rail & Kyoto Kaiseki Multi-Course Bento',
    description: 'Experience bullet train velocity at 320 km/h wrapped in traditional Japanese craftsmanship and refined hospitality. Our Gran Class carriage features genuine leather shell recliners, Hinoki cypress aromatic details, and an exquisite seasonal Kaiseki bento crafted by a Kyoto master chef accompanied by premium sake.',
    origin: {
      city: 'Tokyo',
      station: 'Tokyo Station · Gran Class Private Lounge',
      code: 'TYO',
      departureTime: '11:15 AM',
    },
    destination: {
      city: 'Kyoto',
      station: 'Kyoto Station Imperial Platform',
      code: 'KYO',
      arrivalTime: '01:25 PM',
    },
    distanceKm: 476,
    durationFormatted: '2h 10m',
    isOvernight: false,
    basePrice: 310,
    rating: 4.98,
    reviewCount: 580,
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Gran Class Automated Shell Recliner',
      'Traditional Multi-Course Seasonal Kaiseki Meal',
      'Dedicated Attendant in Kimono Uniform',
      'Junmai Daiginjo Sake & Uji Green Tea Tasting',
      'Starlink High-Speed Connectivity',
      'Mt. Fuji Vista Guaranteed Seating (South Track)',
      'Kyoto Station Valet Hotel Transfer',
    ],
    hospitalityHighlights: [
      'Oshibori hot towel scented with natural cedar & yuzu',
      'Handcrafted Yamanaka lacquerware dining presentation',
      'Welcome chilled Sencha green tea and seasonal wagashi confection',
      'Complimentary wool travel blanket & velvet slippers',
      'Steward baggage escort straight to your taxi rank or hotel',
    ],
    cabins: [
      {
        id: 'cabin-gran-class',
        name: 'Gran Class Luxury Shell Suite',
        transitType: 'train',
        category: 'panoramic_first',
        price: 310,
        capacity: 1,
        bedConfig: 'Electrically Reclining Shell Seat with Footrest & Dining Console',
        description: 'Only 18 seats per carriage in a 1+2 configuration with generous 51-inch pitch, personal cocktail tray, and private steward service.',
        features: [
          'Full Power Recline with Memory Presets',
          'Traditional Bento Box Prepared Fresh by Kyoto Master Chef',
          'Unlimited Free-Flow Sake, Wine, and Regional Teas',
          'Noise-Isolated Carriage Bodywork',
        ],
        availableCount: 6,
        seats: [
          { id: '1A', row: 1, col: 'A', status: 'available' },
          { id: '1B', row: 1, col: 'B', status: 'available' },
          { id: '1C', row: 1, col: 'C', status: 'reserved' },
          { id: '2A', row: 2, col: 'A', status: 'available' },
          { id: '2B', row: 2, col: 'B', status: 'available' },
        ],
      },
    ],
    diningMenu: {
      serviceWindow: '11:45 AM (Departing Tokyo toward Mt. Fuji)',
      includedService: 'Autumn 12-Delicacy Kyoto Kaiseki Box by Master Chef Kenzo Takahashi',
      courses: [
        {
          id: 'jp-1',
          category: 'starter',
          name: 'Zensai Appetizer Taster (5 Seasonal Bites)',
          description: 'Simmered octopus with sweet daikon, glazed sweet potato with chestnuts, grilled ginkgo nuts, and dashi tamagoyaki.',
          dietary: ['Chef Special', 'Gluten-Free'],
        },
        {
          id: 'jp-2',
          category: 'main',
          name: 'A5 Wagyu Beef over Niigata Koshihikari Rice',
          description: 'Thinly sliced A5 Miyazaki Wagyu simmered in rich sweet soy mirin broth with kinome herbs and pickled seasonal ginger.',
          dietary: ['Chef Special', 'Halal'],
        },
        {
          id: 'jp-3',
          category: 'dessert',
          name: 'Kyoto Uji Matcha & Gold Leaf Mochi',
          description: 'Stone-ground ceremonial green tea cake paired with sweet red azuki bean paste and edible 24k gold leaf.',
          dietary: ['Vegetarian'],
        },
      ],
      refreshmentBar: [
        'Dassai 23 Junmai Daiginjo Sake',
        'Suntory Yamazaki 12-Year Single Malt Highball',
        'Ippodo Uji Gyokuro Cold Brew Green Tea',
        'Sparkling Mineral Water with Sudachi Citrus',
      ],
    },
    itineraryStops: [
      { station: 'Tokyo Station Gran Lounge', city: 'Tokyo', arrival: '—', departure: '11:15 AM' },
      { station: 'Shinagawa Station', city: 'Tokyo', arrival: '11:22 AM', departure: '11:24 AM' },
      { station: 'Shin-Yokohama', city: 'Yokohama', arrival: '11:35 AM', departure: '11:37 AM' },
      { station: 'Shizuoka Fuji Vista Point', city: 'Shizuoka', arrival: '12:05 PM', departure: '12:05 PM', scenicHighlight: 'Unmatched 300km/h vista of Mount Fuji' },
      { station: 'Kyoto Imperial Platform', city: 'Kyoto', arrival: '01:25 PM', departure: '—' },
    ],
    stewardTeam: {
      headSteward: 'Aoi Minamoto',
      executiveChef: 'Chef Kenzo Takahashi',
      sommelier: 'Hiroshi Takeda',
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Julian Thorne',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        date: 'September 5, 2026',
        rating: 5,
        comment: 'Dining on A5 Wagyu and sipping cold-brewed gyokuro tea while gliding past Mount Fuji at 300 km/h is the gold standard of world transit. The steward Aoi bowed with such genuine warmth and elegance.',
        routeTaken: 'Tokyo to Kyoto',
        transitType: 'train',
      },
    ],
    occupancyRate: 99,
    totalRevenue: 340000,
    status: 'active',
  },
  {
    id: 'transit-riviera-night-bus',
    title: 'The Mediterranean Grand Cruiser Sleeper',
    operator: 'Azure Horizon Motorway Corp',
    transitType: 'bus',
    tagline: 'Coastal Highway Serenity, Lie-Flat Luxury & Italian Antipasti',
    description: 'A moonlit overnight glide down the Ligurian and Côte d’Azur coastlines. Board in fashion-capital Milan, drift off to slumber in your private acoustic pod, and awaken to golden sunrise reflections over the turquoise Mediterranean in Nice, greeted with fresh warm brioche and rich Italian espresso.',
    origin: {
      city: 'Milan',
      station: 'Milano Centrale Horizon Lounge',
      code: 'MIL',
      departureTime: '11:00 PM (Overnight)',
    },
    destination: {
      city: 'Nice',
      station: 'Nice Promenade des Anglais Port Gate',
      code: 'NCE',
      arrivalTime: '06:30 AM',
    },
    distanceKm: 320,
    durationFormatted: '7h 30m (Overnight)',
    isOvernight: true,
    basePrice: 245,
    rating: 4.91,
    reviewCount: 265,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Ergonomic 180° Memory Foam Flat Berth',
      'Tuscan Antipasti Platter & Prosecco Nightcap',
      'Morning French Croissant & Cappuccino Service',
      'High-Speed Wi-Fi & Tablet Entertainment',
      'Individual Climate & Ambient Color Control',
      'Port-to-Yacht Private Luggage Drop',
    ],
    hospitalityHighlights: [
      'Welcome flute of Franciacorta sparkling wine',
      'Aqua di Parma personal travel amenity kit',
      'Soft cashmere travel throw and silk eye mask',
      'Sunrise arrival along the azure coast with fresh coffee',
      'Private concierge assisting with Cannes or Monaco connections',
    ],
    cabins: [
      {
        id: 'cabin-riviera-sleeper',
        name: 'Executive Riviera Sleeper Pod',
        transitType: 'bus',
        category: 'sleeper_pod',
        price: 245,
        capacity: 1,
        bedConfig: '180° Flat Memory Foam Recliner with Acoustic Partition',
        description: 'Private single compartment designed for deep rest along the highway, featuring individual airflow, USB-C ports, and privacy drape.',
        features: [
          'Full Horizontal Lie-Flat Bed',
          'Complimentary Midnight Antipasti Board',
          'Sunrise Coastal Espresso & Croissant',
          'Private Bluetooth Sound System',
        ],
        availableCount: 10,
        seats: [
          { id: 'R1-A', row: 1, col: 'A', status: 'available' },
          { id: 'R1-B', row: 1, col: 'B', status: 'available' },
          { id: 'R2-A', row: 2, col: 'A', status: 'reserved' },
          { id: 'R2-B', row: 2, col: 'B', status: 'available' },
          { id: 'R3-A', row: 3, col: 'A', status: 'available' },
        ],
      },
    ],
    diningMenu: {
      serviceWindow: '11:30 PM (Midnight Aperitivo) & 06:00 AM (Sunrise Breakfast)',
      includedService: 'Curated 2-Course Italian & French Riviera Night Service',
      courses: [
        {
          id: 'riv-1',
          category: 'starter',
          name: 'Ligurian Focaccia & San Daniele Prosciutto Platter',
          description: 'Rosemary sea-salt focaccia, 24-month cured prosciutto, castelvetrano olives, and aged parmigiano-reggiano chunks.',
          dietary: ['Chef Special'],
        },
        {
          id: 'riv-2',
          category: 'dessert',
          name: 'Torta Caprese & Pistachio Biscotti',
          description: 'Flourless almond dark chocolate cake served with Sicilian pistachio cream and amaretto liqueur.',
          dietary: ['Vegetarian', 'Gluten-Free'],
        },
        {
          id: 'riv-3',
          category: 'breakfast',
          name: 'Cote d’Azur Sunrise Hamper',
          description: 'Warm all-butter croissant from Boulangerie artisanale, Corsican strawberry preserves, and fresh double espresso.',
          dietary: ['Vegetarian'],
        },
      ],
      refreshmentBar: [
        'Bellavista Alma Gran Cuvée Franciacorta',
        'San Pellegrino Sparkling Mineral Water',
        'Freshly Brewed Illy Espresso',
        'Wild Chamomile and Citrus Verbena Nightcap',
      ],
    },
    itineraryStops: [
      { station: 'Milano Centrale Horizon Lounge', city: 'Milan', arrival: '—', departure: '11:00 PM' },
      { station: 'Genoa Coastline Gate', city: 'Genoa', arrival: '01:10 AM', departure: '01:15 AM' },
      { station: 'Sanremo Harbor Rest', city: 'Sanremo', arrival: '03:40 AM', departure: '03:45 AM' },
      { station: 'Monaco-Monte Carlo Link Point', city: 'Monaco', arrival: '05:40 AM', departure: '05:45 AM', scenicHighlight: 'Pre-dawn lights over the Mediterranean' },
      { station: 'Nice Promenade des Anglais', city: 'Nice', arrival: '06:30 AM', departure: '—' },
    ],
    stewardTeam: {
      headSteward: 'Matteo Bellini',
      executiveChef: 'Chef Francesca Morandi',
      sommelier: 'Luca Sforza',
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Camilla D’Angelo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        date: 'August 14, 2026',
        rating: 5,
        comment: 'The most civilized way to travel between Milan and the French Riviera. The bed was remarkably soft and waking up to fresh espresso as the Mediterranean Sea appears outside the window was heavenly.',
        routeTaken: 'Milan to Nice',
        transitType: 'bus',
      },
    ],
    occupancyRate: 91,
    totalRevenue: 165000,
    status: 'active',
  },
  {
    id: 'transit-highland-sleeper-train',
    title: 'The Royal Highland Starlight Express',
    operator: 'Caledonian Crown Rail',
    transitType: 'train',
    tagline: 'London to Scottish Highlands Sleeper, Whisky Lounge & 3-Course Feast',
    description: 'Travel through the heart of Great Britain as you slumber. Departing London Euston at nightfall, enjoy a gourmet 3-course dinner in the Club Car with rare single malts, then wake up to sweeping Scottish lochs and heather-covered glens while a hot Scottish breakfast is served in your private en-suite suite.',
    origin: {
      city: 'London',
      station: 'London Euston · First Class First Lounge',
      code: 'EUS',
      departureTime: '09:15 PM (Overnight)',
    },
    destination: {
      city: 'Edinburgh',
      station: 'Edinburgh Waverley Station',
      code: 'EDB',
      arrivalTime: '07:20 AM',
    },
    distanceKm: 632,
    durationFormatted: '10h 05m (Overnight)',
    isOvernight: true,
    basePrice: 380,
    rating: 4.97,
    reviewCount: 472,
    heroImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527281400683-1aae777175f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private Caledonian Double En-Suite Cabin',
      'Exclusive Club Dining Car Access',
      'Included 3-Course Dinner & Scottish Breakfast',
      'Complimentary Single Malt Whisky Tasting Flight',
      'En-Suite Shower with Arran Aromatics Toiletries',
      'Gleneagles Mattress & 400-Thread Linens',
      'Dedicated Sleeper Steward Service',
    ],
    hospitalityHighlights: [
      'Welcome dram of 15-Year Glenmorangie or vintage champagne',
      'Warm shortbread and bedtime hot toddy delivered to your cabin',
      'Pillow menu with goose down or ergonomic memory foam',
      'Fresh piping hot Scottish breakfast delivered at chosen hour',
      'Priority luggage handling at Edinburgh Waverley',
    ],
    cabins: [
      {
        id: 'cabin-caledonian-double',
        name: 'The Royal Caledonian Double Suite',
        transitType: 'train',
        category: 'royal_suite',
        price: 520,
        capacity: 2,
        bedConfig: 'Double Bed with Gleneagles Mattress & En-Suite Shower',
        description: 'The pinnacle of British rail travel. A proper fixed double bed, ensuite power shower, bespoke tartan throws, and window views of the Highlands.',
        features: [
          'Fixed Double Bed (Not Bunk)',
          'Private En-Suite Shower & WC',
          'Guaranteed Table in Club Car',
          '3-Course Dinner & Full Highland Breakfast Included',
        ],
        availableCount: 4,
        seats: [
          { id: 'CS-1', row: 1, col: 'A', status: 'available' },
          { id: 'CS-2', row: 1, col: 'B', status: 'available' },
          { id: 'CS-3', row: 2, col: 'A', status: 'reserved' },
          { id: 'CS-4', row: 2, col: 'B', status: 'available' },
        ],
      },
      {
        id: 'cabin-club-solo',
        name: 'Solo En-Suite Starlight Room',
        transitType: 'train',
        category: 'sleeper_pod',
        price: 380,
        capacity: 1,
        bedConfig: 'Generous Single Sleeper Berth with En-Suite Shower',
        description: 'Ideal for the discerning solo citizen traveler. Private en-suite bathroom, reading desk, USB charging, and complimentary room service.',
        features: [
          'Private En-Suite Bathroom',
          'Full Breakfast in Bed or Club Car',
          'Complimentary Club Car Tasting Flight',
          'Arran Scottish Toiletries',
        ],
        availableCount: 8,
        seats: [
          { id: 'SOLO-1', row: 3, col: 'A', status: 'available' },
          { id: 'SOLO-2', row: 3, col: 'B', status: 'available' },
          { id: 'SOLO-3', row: 4, col: 'A', status: 'reserved' },
          { id: 'SOLO-4', row: 4, col: 'B', status: 'available' },
        ],
      },
    ],
    diningMenu: {
      serviceWindow: '09:45 PM – 11:30 PM (Dinner) & 06:15 AM – 07:00 AM (Breakfast)',
      includedService: 'Three-Course Caledonian Dinner & Full Highland Breakfast',
      courses: [
        {
          id: 'cal-1',
          category: 'starter',
          name: 'Loch Fyne Oak-Smoked Salmon',
          description: 'Scottish salmon carved thin with pickled shallots, caperberries, watercress, and warm soda farl bread.',
          dietary: ['Chef Special', 'Gluten-Free'],
        },
        {
          id: 'cal-2',
          category: 'main',
          name: 'Highland Venison Loin Wellington',
          description: 'Wild Scottish venison wrapped in butter puff pastry with wild forest mushroom duxelles, parsnip purée, and blackberry jus.',
          dietary: ['Chef Special'],
        },
        {
          id: 'cal-2b',
          category: 'main',
          name: 'Isle of Mull Cheddar & Leek Tart',
          description: 'Aged sharp cheddar custard tart with braised baby leeks, herb garden salad, and spiced pear chutney.',
          dietary: ['Vegetarian'],
        },
        {
          id: 'cal-3',
          category: 'dessert',
          name: 'Traditional Cranachan Sundae',
          description: 'Scottish raspberries folded with toasted pinhead oatmeal, heather honey, double cream, and a splash of malt whisky.',
          dietary: ['Vegetarian'],
        },
        {
          id: 'cal-4',
          category: 'breakfast',
          name: 'Full Scottish Morning Plate',
          description: 'Ayrshire bacon, Cumberland sausage, Stornoway black pudding, potato scone, grilled vine tomatoes, and poached free-range eggs.',
          dietary: ['Chef Special'],
        },
      ],
      refreshmentBar: [
        'Tasting Flight of 3 Rare Highland & Islay Single Malts',
        'Edinburgh Gin & Botanical Tonic',
        'Loose Leaf Scottish Breakfast & Earl Grey Tea',
        'Fresh Pressed Scottish Apple & Pear Juice',
      ],
    },
    itineraryStops: [
      { station: 'London Euston Station', city: 'London', arrival: '—', departure: '09:15 PM' },
      { station: 'Crewe Interchange', city: 'Crewe', arrival: '11:20 PM', departure: '11:25 PM' },
      { station: 'Carlisle Border Gate', city: 'Carlisle', arrival: '02:40 AM', departure: '02:45 AM' },
      { station: 'Carstairs Junction', city: 'Carstairs', arrival: '05:30 AM', departure: '05:35 AM' },
      { station: 'Edinburgh Waverley Station', city: 'Edinburgh', arrival: '07:20 AM', departure: '—', scenicHighlight: 'Sunrise over Arthur’s Seat' },
    ],
    stewardTeam: {
      headSteward: 'Alistair MacLeod',
      executiveChef: 'Chef Callum Stewart',
      sommelier: 'Fiona Ross',
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Sir Archibald Sterling',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        date: 'September 22, 2026',
        rating: 5,
        comment: 'Boarded at Euston after a chaotic day in London, and was instantly in another era. The venison Wellington was tender as butter, and waking up to the mist-shrouded Scottish glens while enjoying a warm pot of tea was sheer bliss.',
        routeTaken: 'London to Edinburgh',
        transitType: 'train',
      },
    ],
    occupancyRate: 96,
    totalRevenue: 310000,
    status: 'active',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-alpine-001',
    bookingCode: 'TR-8921-ALPINE',
    transitId: 'transit-alpine-express',
    transitTitle: 'The Imperial Alpine Panorama Express',
    transitType: 'train',
    operator: 'Swiss Grand Railway Corp',
    originCity: 'Zurich',
    originStation: 'Zurich Hauptbahnhof · Royal Terminal',
    destinationCity: 'Zermatt',
    destinationStation: 'Zermatt Alpine Terminal',
    departureDate: '2026-10-18',
    departureTime: '08:45 AM',
    arrivalDate: '2026-10-18',
    arrivalTime: '02:30 PM',
    durationFormatted: '5h 45m',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    userId: 'user-elena',
    userName: 'Elena Rostova',
    userEmail: 'elena.rostova@voyageease.com',
    userPhone: '+1 (555) 234-8901',
    citizenId: 'CIT-892401-US',
    selectedCabinId: 'cabin-imperial-suite',
    selectedCabinName: 'The Imperial Panorama Grand Suite',
    selectedSeatId: 'Carriage 1 · Suite S1-A',
    guestsCount: 2,
    diningChoice: {
      starter: 'Alpine Truffle & Porcini Velouté',
      main: 'Seared Simmental Beef Tenderloin',
      dessert: 'Grand Cru Swiss Dark Chocolate Sphere',
      beverage: '2019 Grand Cru Cornalin & Gotthard Sparkling Water',
      diningLocation: 'panoramic_dining_car',
      dietaryRequests: 'No shellfish; table preference facing Matterhorn side',
    },
    hospitalityChoice: {
      turndownService: true,
      morningCall: false,
      wakeUpTime: '07:30 AM',
      pillowPreference: 'Organic goose down',
      fragranceMist: 'Alpine Lavender & Swiss Pine',
      stationLoungeAccess: true,
      luggagePorterCount: 2,
    },
    pricing: {
      baseFare: 420,
      cabinPrice: 680,
      diningIncludedValue: 180,
      conciergeFee: 35,
      taxes: 54,
      discount: 0,
      totalAmount: 769,
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: {
      type: 'credit_card',
      brand: 'Visa Infinite',
      last4: '4242',
    },
    stewardAssigned: 'Beatrix von Bergen',
    createdAt: '2026-09-24T14:32:00Z',
  },
  {
    id: 'book-shinkansen-002',
    bookingCode: 'TR-4109-SAKURA',
    transitId: 'transit-kyoto-shinkansen-gran',
    transitTitle: 'The Royal Sakura Imperial Shinkansen',
    transitType: 'train',
    operator: 'Central Imperial Railways',
    originCity: 'Tokyo',
    originStation: 'Tokyo Station · Gran Class Private Lounge',
    destinationCity: 'Kyoto',
    destinationStation: 'Kyoto Station Imperial Platform',
    departureDate: '2026-11-04',
    departureTime: '11:15 AM',
    arrivalDate: '2026-11-04',
    arrivalTime: '01:25 PM',
    durationFormatted: '2h 10m',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    userId: 'user-elena',
    userName: 'Elena Rostova',
    userEmail: 'elena.rostova@voyageease.com',
    userPhone: '+1 (555) 234-8901',
    citizenId: 'CIT-892401-US',
    selectedCabinId: 'cabin-gran-class',
    selectedCabinName: 'Gran Class Luxury Shell Suite',
    selectedSeatId: 'Carriage Gran · Seat 1A',
    guestsCount: 1,
    diningChoice: {
      starter: 'Zensai Appetizer Taster (5 Seasonal Bites)',
      main: 'A5 Wagyu Beef over Niigata Koshihikari Rice',
      dessert: 'Kyoto Uji Matcha & Gold Leaf Mochi',
      beverage: 'Dassai 23 Junmai Daiginjo Sake',
      diningLocation: 'panoramic_dining_car',
      dietaryRequests: 'Mt. Fuji view window requested',
    },
    hospitalityChoice: {
      turndownService: false,
      morningCall: false,
      wakeUpTime: '10:00 AM',
      pillowPreference: 'Hinoki cedar contour pillow',
      fragranceMist: 'Natural Cedar & Yuzu',
      stationLoungeAccess: true,
      luggagePorterCount: 1,
    },
    pricing: {
      baseFare: 310,
      cabinPrice: 310,
      diningIncludedValue: 120,
      conciergeFee: 25,
      taxes: 38,
      discount: 0,
      totalAmount: 373,
    },
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: {
      type: 'credit_card',
      brand: 'Amex Centurion',
      last4: '8888',
    },
    stewardAssigned: 'Aoi Minamoto',
    createdAt: '2026-09-27T08:15:00Z',
  },
];

export const INITIAL_STEWARD_REQUESTS: StewardRequest[] = [
  {
    id: 'req-001',
    bookingId: 'book-alpine-001',
    bookingCode: 'TR-8921-ALPINE',
    passengerName: 'Elena Rostova',
    seatOrCabin: 'Carriage 1 · Suite S1-A',
    requestType: 'Chilled Champagne & Flutes',
    customNotes: 'Please bring 2 glasses of chilled Swiss vintage sparkling before entering Oberalp Pass',
    timestamp: '10:45 AM',
    status: 'dispatched',
    assignedSteward: 'Beatrix von Bergen',
  },
  {
    id: 'req-002',
    bookingId: 'book-alpine-001',
    bookingCode: 'TR-8921-ALPINE',
    passengerName: 'Lord Jonathan Sterling',
    seatOrCabin: 'Carriage 1 · Suite S2-A',
    requestType: 'Warm Lavender Oshibori Towels',
    timestamp: '11:10 AM',
    status: 'attended',
    assignedSteward: 'Beatrix von Bergen',
  },
  {
    id: 'req-003',
    bookingId: 'book-shinkansen-002',
    bookingCode: 'TR-4109-SAKURA',
    passengerName: 'Sarah Chen',
    seatOrCabin: 'Carriage Gran · Seat 1C',
    requestType: 'Cold Brew Gyokuro Tea Refill',
    timestamp: '11:50 AM',
    status: 'pending',
    assignedSteward: 'Aoi Minamoto',
  },
];

export const PRISMA_SCHEMA_STRING = `// VoyageEase Hospitality Management & Travel Booking System
// Production Prisma Relational Schema

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  TRAVELER
  HOST_OPERATOR
  ADMIN
  STEWARD
}

enum TransitType {
  TRAIN
  BUS
}

enum CabinCategory {
  ROYAL_SUITE
  PANORAMIC_FIRST
  SLEEPER_POD
  DELUXE_BERTH
}

enum BookingStatus {
  CONFIRMED
  BOARDED
  COMPLETED
  CANCELLED
}

enum DiningLocation {
  PANORAMIC_DINING_CAR
  IN_SUITE_SERVICE
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  name          String
  avatar        String?
  phone         String?
  role          Role           @default(TRAVELER)
  memberTier    String         @default("Royal Silver")
  citizenId     String         @unique
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  bookings      Booking[]
  stewardCalls  StewardCall[]
  reviews       Review[]
}

model TransitRoute {
  id                    String         @id @default(uuid())
  title                 String
  operator              String
  transitType           TransitType    @default(TRAIN)
  tagline               String
  description           String         @db.Text
  originCity            String
  originStation         String
  originCode            String
  departureTime         String
  destinationCity       String
  destinationStation    String
  destinationCode       String
  arrivalTime           String
  distanceKm            Int
  durationFormatted     String
  isOvernight           Boolean        @default(false)
  basePrice             Decimal        @db.Decimal(10, 2)
  heroImage             String
  galleryImages         String[]
  amenities             String[]
  hospitalityHighlights String[]
  occupancyRate         Decimal        @db.Decimal(5, 2) @default(90.0)
  totalRevenue          Decimal        @db.Decimal(12, 2) @default(0.0)
  status                String         @default("active") // active | maintenance
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt

  cabins                Cabin[]
  diningMenu            DiningMenu?
  itineraryStops        RouteStop[]
  bookings              Booking[]
  reviews               Review[]
}

model RouteStop {
  id              String        @id @default(uuid())
  routeId         String
  route           TransitRoute  @relation(fields: [routeId], references: [id], onDelete: Cascade)
  stopOrder       Int
  station         String
  city            String
  arrival         String
  departure       String
  scenicHighlight String?
}

model Cabin {
  id              String        @id @default(uuid())
  routeId         String
  route           TransitRoute  @relation(fields: [routeId], references: [id], onDelete: Cascade)
  name            String
  category        CabinCategory @default(ROYAL_SUITE)
  price           Decimal       @db.Decimal(10, 2)
  capacity        Int           @default(1)
  bedConfig       String
  description     String        @db.Text
  features        String[]
  availableCount  Int           @default(4)
  seats           Seat[]
  bookings        Booking[]
}

model Seat {
  id          String     @id @default(uuid())
  cabinId     String
  cabin       Cabin      @relation(fields: [cabinId], references: [id], onDelete: Cascade)
  seatLabel   String     // e.g. "Carriage 1 · Suite S1-A"
  row         Int
  col         String
  isOccupied  Boolean    @default(false)
}

model DiningMenu {
  id              String        @id @default(uuid())
  routeId         String        @unique
  route           TransitRoute  @relation(fields: [routeId], references: [id], onDelete: Cascade)
  serviceWindow   String
  includedService String
  refreshmentBar  String[]
  courses         Dish[]
}

model Dish {
  id            String      @id @default(uuid())
  diningMenuId  String
  diningMenu    DiningMenu  @relation(fields: [diningMenuId], references: [id], onDelete: Cascade)
  category      String      // starter | main | dessert | breakfast
  name          String
  description   String      @db.Text
  dietary       String[]
  pairing       String?
}

model Booking {
  id                String         @id @default(uuid())
  bookingCode       String         @unique // "TR-8921-ALPINE"
  routeId           String
  route             TransitRoute   @relation(fields: [routeId], references: [id])
  userId            String
  user              User           @relation(fields: [userId], references: [id])
  cabinId           String
  cabin             Cabin          @relation(fields: [cabinId], references: [id])
  seatAssignment    String         // "Carriage 1 · Suite S1-A"
  departureDate     DateTime
  guestsCount       Int            @default(1)

  // Gastronomy Curation
  starterDish       String?
  mainDish          String?
  dessertDish       String?
  beveragePairing   String?
  diningLocation    DiningLocation @default(PANORAMIC_DINING_CAR)
  dietaryRequests   String?

  // Dedicated In-Transit Hospitality
  turndownService   Boolean        @default(true)
  morningWakeUp     String?        // "07:30 AM"
  pillowPreference  String?        // "Organic Goose Down"
  fragranceMist     String?        // "Alpine Lavender & Swiss Pine"
  stationLounge     Boolean        @default(true)
  luggagePorter     Int            @default(2)
  stewardAssigned   String         // "Beatrix von Bergen"

  // Pricing & Payment
  baseFare          Decimal        @db.Decimal(10, 2)
  cabinSupplement   Decimal        @db.Decimal(10, 2)
  diningValueInc    Decimal        @db.Decimal(10, 2) // Complimentary $180 value
  conciergeFee      Decimal        @db.Decimal(10, 2)
  taxes             Decimal        @db.Decimal(10, 2)
  totalAmount       Decimal        @db.Decimal(10, 2)
  status            BookingStatus  @default(CONFIRMED)
  paymentStatus     String         @default("paid")
  createdAt         DateTime       @default(now())

  stewardCalls      StewardCall[]
}

model StewardCall {
  id            String      @id @default(uuid())
  bookingId     String
  booking       Booking     @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  userId        String
  user          User        @relation(fields: [userId], references: [id])
  requestType   String      // "Chilled Champagne & Flutes", "Turndown Service"
  customNotes   String?
  status        String      @default("dispatched") // pending | dispatched | attended
  stewardName   String
  createdAt     DateTime    @default(now())
}

model Review {
  id          String        @id @default(uuid())
  routeId     String
  route       TransitRoute  @relation(fields: [routeId], references: [id])
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  rating      Int           @default(5)
  comment     String        @db.Text
  createdAt   DateTime      @default(now())
}
`;
