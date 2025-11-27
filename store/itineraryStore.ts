import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  flightClass: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  duration: string;
  origin: string;
  destination: string;
  price: string;
  baggage: string;
  cabinBaggage: string;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  roomType: string;
  price: string;
  totalPrice: string;
  nights: number;
  rooms: number;
  facilities: string[];
  checkIn: string;
  checkOut: string;
  images?: string[];
}

interface Activity {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: string;
  dateTime: string;
  whatsIncluded: string;
  dayLabel?: string;
  images?: string[];
}

interface ItineraryStore {
  // State
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  
  // Flight Actions
  addFlight: (flight: Flight) => void;
  removeFlight: (id: string) => void;
  updateFlight: (id: string, flight: Partial<Flight>) => void;
  clearFlights: () => void;
  
  // Hotel Actions
  addHotel: (hotel: Hotel) => void;
  removeHotel: (id: string) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  clearHotels: () => void;
  
  // Activity Actions
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  clearActivities: () => void;
  
  // General Actions
  clearItinerary: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useItineraryStore = create<ItineraryStore>()(
  persist(
    (set, get) => ({
      // Initial State
      flights: [],
      hotels: [],
      activities: [],
      
      // Flight Actions
      addFlight: (flight) =>
        set((state) => ({
          flights: [...state.flights, flight],
        })),
      
      removeFlight: (id) =>
        set((state) => ({
          flights: state.flights.filter((f) => f.id !== id),
        })),
      
      updateFlight: (id, updatedFlight) =>
        set((state) => ({
          flights: state.flights.map((f) =>
            f.id === id ? { ...f, ...updatedFlight } : f
          ),
        })),
      
      clearFlights: () => set({ flights: [] }),
      
      // Hotel Actions
      addHotel: (hotel) =>
        set((state) => ({
          hotels: [...state.hotels, hotel],
        })),
      
      removeHotel: (id) =>
        set((state) => ({
          hotels: state.hotels.filter((h) => h.id !== id),
        })),
      
      updateHotel: (id, updatedHotel) =>
        set((state) => ({
          hotels: state.hotels.map((h) =>
            h.id === id ? { ...h, ...updatedHotel } : h
          ),
        })),
      
      clearHotels: () => set({ hotels: [] }),
      
      // Activity Actions
      addActivity: (activity) =>
        set((state) => ({
          activities: [...state.activities, activity],
        })),
      
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        })),
      
      updateActivity: (id, updatedActivity) =>
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, ...updatedActivity } : a
          ),
        })),
      
      clearActivities: () => set({ activities: [] }),
      
      // General Actions
      clearItinerary: () =>
        set({
          flights: [],
          hotels: [],
          activities: [],
        }),
      
      getTotalPrice: () => {
        const state = get();
        let total = 0;
        
        // Sum flight prices
        state.flights.forEach((flight) => {
          const price = parseFloat(flight.price.replace(/[₦,\s]/g, ''));
          if (!isNaN(price)) total += price;
        });
        
        // Sum hotel prices
        state.hotels.forEach((hotel) => {
          const price = parseFloat(hotel.totalPrice.replace(/[NGN,\s]/g, ''));
          if (!isNaN(price)) total += price;
        });
        
        // Sum activity prices
        state.activities.forEach((activity) => {
          const price = parseFloat(activity.price.replace(/[₦,\s]/g, ''));
          if (!isNaN(price)) total += price;
        });
        
        return total;
      },
      
      getItemCount: () => {
        const state = get();
        return state.flights.length + state.hotels.length + state.activities.length;
      },
    }),
    {
      name: 'itinerary-storage', // LocalStorage key
      version: 1,
    }
  )
);

// Export types for use in components
export type { Flight, Hotel, Activity };