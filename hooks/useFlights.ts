import { useQuery } from "@tanstack/react-query";

// ----- Types -----
export interface Airport {
  id: string;
  name: string;
  code: string;
  cityName: string;
  countryName: string;
  photoUri?: string;
}

export interface FlightSegment {
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureTime: string;
  arrivalTime: string;
  cabinClass: string;
}

export interface CarrierData {
  name: string;
  code: string;
  logo: string;
}

export interface LuggageAllowance {
  luggageType: string;
  ruleType?: string;
  maxPiece?: number;
  maxWeightPerPiece?: number;
  massUnit?: string;
  sizeRestrictions?: {
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    sizeUnit: string;
  };
  travellerReference: string;
}

export interface FlightOffer {
  token: string;
  segments: FlightSegment[];
  carriersData: CarrierData[];
  totalTime: number;
  travellerCheckedLuggage?: LuggageAllowance[];
  travellerCabinLuggage?: LuggageAllowance[];
}

// ----- Flight Location Search Hook -----
export const fetchFlightLocations = async (
  query: string
): Promise<Airport[]> => {
  if (!query) return [];

  const res = await fetch(
    `/api/flights/destination?query=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch flight locations");
  }

  const json = await res.json();
  return json.data || [];
};

export const useFlightLocations = (query: string, enabled = false) =>
  useQuery({
    queryKey: ["flightLocations", query],
    queryFn: () => fetchFlightLocations(query),
    enabled: enabled && !!query, // Only fetch if enabled and query exists
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

// ----- Flight Search Hook -----
export interface FlightSearchParams {
  fromId: string;
  toId: string;
  departDate: string;
  returnDate?: string;
  stops?: "none" | "0" | "1" | "2";
  pageNo?: number;
}

export const fetchFlights = async (
  params: FlightSearchParams
): Promise<FlightOffer[]> => {
  const url = new URL("/api/flights/search", window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch flights");
  }

  const json = await res.json();
  return json.data || [];
};

export const useFlightSearch = (params: FlightSearchParams, enabled = false) =>
  useQuery({
    queryKey: ["flights", params],
    queryFn: () => fetchFlights(params),
    enabled, // Only fetch when explicitly enabled
    // keepPreviousData: true, // Keeps previous results during pagination/loading new queries
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
