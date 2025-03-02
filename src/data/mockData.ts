// Mock data for the application

// Mock Flights
export const mockFlights = [
  {
    id: "flight-1",
    airline: "Delta Airlines",
    flightNumber: "DL1234",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureTime: "2023-12-15T08:00:00",
    arrivalTime: "2023-12-15T11:30:00",
    duration: 330, // in minutes
    price: 349,
    stops: 0,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/1200px-Delta_logo.svg.png",
  },
  {
    id: "flight-2",
    airline: "American Airlines",
    flightNumber: "AA789",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureTime: "2023-12-15T10:15:00",
    arrivalTime: "2023-12-15T14:25:00",
    duration: 370, // in minutes
    price: 299,
    stops: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/American_Airlines_logo_2013.svg/1200px-American_Airlines_logo_2013.svg.png",
  },
  {
    id: "flight-3",
    airline: "United Airlines",
    flightNumber: "UA456",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureTime: "2023-12-15T14:30:00",
    arrivalTime: "2023-12-15T18:15:00",
    duration: 345, // in minutes
    price: 329,
    stops: 0,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/United_Airlines_Logo.svg/1200px-United_Airlines_Logo.svg.png",
  },
  {
    id: "flight-4",
    airline: "JetBlue",
    flightNumber: "B6789",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureTime: "2023-12-15T16:45:00",
    arrivalTime: "2023-12-15T20:30:00",
    duration: 345, // in minutes
    price: 289,
    stops: 0,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/JetBlue_Airways_Logo.svg/1200px-JetBlue_Airways_Logo.svg.png",
  },
  {
    id: "flight-5",
    airline: "Southwest Airlines",
    flightNumber: "WN123",
    origin: "New York (JFK)",
    destination: "Los Angeles (LAX)",
    departureTime: "2023-12-15T07:30:00",
    arrivalTime: "2023-12-15T13:15:00",
    duration: 405, // in minutes
    price: 259,
    stops: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Southwest_Airlines_logo_2014.svg/1200px-Southwest_Airlines_logo_2014.svg.png",
  },
]

// Mock Hotels
export const mockHotels = [
  {
    id: "hotel-1",
    name: "Grand Luxury Hotel",
    location: "Los Angeles, CA",
    price: 299,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Parking"],
    description:
      "Experience luxury at its finest in the heart of Los Angeles. Our 5-star hotel offers spacious rooms with stunning city views, a rooftop pool, and world-class dining options.",
  },
  {
    id: "hotel-2",
    name: "Seaside Resort & Spa",
    location: "Malibu, CA",
    price: 459,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: [
      "Beachfront",
      "Free WiFi",
      "Swimming Pool",
      "Spa",
      "Fitness Center",
      "Restaurant",
      "Bar",
      "Room Service",
    ],
    description:
      "Escape to our beachfront paradise in Malibu. Enjoy direct beach access, ocean-view rooms, and a full-service spa. Perfect for a relaxing getaway.",
  },
  {
    id: "hotel-3",
    name: "Downtown Boutique Hotel",
    location: "Los Angeles, CA",
    price: 199,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Parking", "Business Center"],
    description:
      "Our stylish boutique hotel is located in the vibrant downtown area, walking distance to shopping, dining, and entertainment. Featuring modern rooms with unique design elements.",
  },
  {
    id: "hotel-4",
    name: "Family-Friendly Suites",
    location: "Anaheim, CA",
    price: 179,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Free WiFi", "Swimming Pool", "Kitchenette", "Free Breakfast", "Parking", "Kids Club"],
    description:
      "Perfect for family vacations, our spacious suites include kitchenettes and separate living areas. Located near major attractions with a free shuttle service to Disneyland.",
  },
  {
    id: "hotel-5",
    name: "Budget Inn & Suites",
    location: "Los Angeles, CA",
    price: 89,
    rating: 3.8,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    amenities: ["Free WiFi", "Free Parking", "Free Breakfast", "Air Conditioning"],
    description:
      "Clean, comfortable, and affordable accommodations for travelers on a budget. Conveniently located with easy access to highways and public transportation.",
  },
]

// Mock Activities
export const mockActivities = [
  {
    id: "activity-1",
    name: "Hollywood Stars Tour",
    location: "Hollywood, CA",
    price: 49,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1608507777998-7b1a2266e7a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    duration: "3 hours",
    category: "Tour",
    description:
      "Explore the famous Hollywood Walk of Fame, see the Hollywood sign, and visit celebrity homes on this guided tour of Los Angeles' most iconic landmarks.",
  },
  {
    id: "activity-2",
    name: "Universal Studios VIP Experience",
    location: "Universal City, CA",
    price: 299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1569516449771-41c89ee14ca3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duration: "Full day",
    category: "Theme Park",
    description:
      "Skip the lines with VIP access to Universal Studios Hollywood. Includes a guided tour, priority access to all rides and attractions, and a gourmet lunch.",
  },
  {
    id: "activity-3",
    name: "Santa Monica Bike Tour",
    location: "Santa Monica, CA",
    price: 39,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1630567803042-3b128d91bd0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    duration: "2 hours",
    category: "Adventure",
    description:
      "Cruise along the beautiful Santa Monica beach boardwalk on this guided bike tour. See the famous pier, Muscle Beach, and enjoy stunning ocean views.",
  },
  {
    id: "activity-4",
    name: "Los Angeles Food Tour",
    location: "Downtown LA, CA",
    price: 79,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    duration: "4 hours",
    category: "Food & Drink",
    description:
      "Sample the diverse culinary scene of Los Angeles on this walking food tour. Visit 6 different eateries and taste everything from gourmet tacos to artisanal desserts.",
  },
  {
    id: "activity-5",
    name: "Griffith Observatory Stargazing",
    location: "Los Angeles, CA",
    price: 25,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1566490595448-a9b6da8c7471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    duration: "2 hours",
    category: "Cultural",
    description:
      "Join an expert astronomer for an evening of stargazing at the famous Griffith Observatory. Learn about the night sky and view celestial objects through telescopes.",
  },
]

// Mock Flight Details
export const mockFlightDetails = {
  "flight-1": {
    id: "flight-1",
    airline: "Delta Airlines",
    flightNumber: "DL1234",
    aircraft: "Boeing 737-800",
    origin: {
      code: "JFK",
      name: "John F. Kennedy International Airport",
      city: "New York",
      terminal: "Terminal 4",
      gate: "G12",
    },
    destination: {
      code: "LAX",
      name: "Los Angeles International Airport",
      city: "Los Angeles",
      terminal: "Terminal 2",
      gate: "B8",
    },
    departureTime: "2023-12-15T08:00:00",
    arrivalTime: "2023-12-15T11:30:00",
    duration: 330, // in minutes
    price: 349,
    stops: 0,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/1200px-Delta_logo.svg.png",
    baggage: {
      carryOn: "1 personal item + 1 carry-on bag",
      checked: "First checked bag $30",
    },
    amenities: ["WiFi", "Power outlets", "In-flight entertainment", "Complimentary snacks"],
    policies: {
      cancellation: "Cancellation fee: $200",
      changes: "Change fee: $150",
    },
    seatMap: {
      firstClass: {
        available: 8,
        price: 649,
      },
      comfortPlus: {
        available: 24,
        price: 449,
      },
      mainCabin: {
        available: 112,
        price: 349,
      },
    },
  },
}

// Mock Hotel Details
export const mockHotelDetails = {
  "hotel-1": {
    id: "hotel-1",
    name: "Grand Luxury Hotel",
    location: "Los Angeles, CA",
    address: "123 Luxury Blvd, Los Angeles, CA 90001",
    price: 299,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Bar", "Room Service", "Parking"],
    description:
      "Experience luxury at its finest in the heart of Los Angeles. Our 5-star hotel offers spacious rooms with stunning city views, a rooftop pool, and world-class dining options.",
    policies: {
      checkIn: "3:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 48 hours before check-in",
    },
    roomTypes: [
      {
        id: "room-1",
        name: "Deluxe King Room",
        price: 299,
        capacity: "2 adults",
        amenities: ["King Bed", "City View", "Free WiFi", "Flat-screen TV", "Mini Bar"],
        image:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      },
      {
        id: "room-2",
        name: "Premium Suite",
        price: 499,
        capacity: "2 adults, 2 children",
        amenities: [
          "King Bed",
          "Separate Living Area",
          "Panoramic View",
          "Free WiFi",
          "Flat-screen TV",
          "Mini Bar",
          "Jacuzzi",
        ],
        image:
          "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      },
    ],
    reviews: [
      {
        id: "review-1",
        user: "John D.",
        rating: 5,
        date: "2023-10-15",
        comment: "Absolutely stunning hotel with impeccable service. The rooftop pool is a must-visit!",
      },
      {
        id: "review-2",
        user: "Sarah M.",
        rating: 4,
        date: "2023-09-22",
        comment: "Beautiful property and great location. Room service was a bit slow but food was excellent.",
      },
    ],
  },
}

// Mock Activity Details
export const mockActivityDetails = {
  "activity-1": {
    id: "activity-1",
    name: "Hollywood Stars Tour",
    location: "Hollywood, CA",
    price: 49,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1608507777998-7b1a2266e7a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1599320684365-1fde4a83569e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    duration: "3 hours",
    category: "Tour",
    description:
      "Explore the famous Hollywood Walk of Fame, see the Hollywood sign, and visit celebrity homes on this guided tour of Los Angeles' most iconic landmarks.",
    included: [
      "Professional guide",
      "Air-conditioned vehicle",
      "Hotel pickup and drop-off (select hotels)",
      "Bottled water",
    ],
    notIncluded: ["Gratuities", "Food and drinks"],
    meetingPoint: "Hollywood & Highland Center, 6801 Hollywood Blvd, Hollywood, CA 90028",
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      times: ["9:00 AM", "1:00 PM", "5:00 PM"],
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before the start time",
      confirmation: "Confirmation will be received at time of booking",
      accessibility: "Not wheelchair accessible",
      minAge: "No minimum age requirement",
    },
    reviews: [
      {
        id: "review-1",
        user: "Michael T.",
        rating: 5,
        date: "2023-11-05",
        comment:
          "Our guide was knowledgeable and entertaining. We saw so many celebrity homes and got great photos of the Hollywood sign!",
      },
      {
        id: "review-2",
        user: "Emma L.",
        rating: 4,
        date: "2023-10-18",
        comment:
          "Fun tour with lots of interesting facts about Hollywood. The only downside was the traffic, but that's LA for you!",
      },
    ],
  },
}

