import React, { useState } from 'react';
import { Search, X, Plane, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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

interface FlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFlight: (flight: Flight) => void;
}

const FlightSearchModal: React.FC<FlightSearchModalProps> = ({
  isOpen,
  onClose,
  onAddFlight
}) => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    flightClass: 'Economy'
  });

  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(false);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults: Flight[] = [
      {
        id: '1',
        airline: 'American Airlines',
        flightNumber: 'AA-829',
        flightClass: searchParams.flightClass,
        departureTime: '08:35',
        arrivalTime: '09:55',
        date: searchParams.departureDate,
        duration: '1h 45m',
        origin: searchParams.origin,
        destination: searchParams.destination,
        price: '₦ 123,450.00',
        baggage: '20kg',
        cabinBaggage: '8kg'
      }
    ];

    setSearchResults(mockResults);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleAddToItinerary = (flight: Flight) => {
    onAddFlight(flight);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-[95vw] max-h-[90vh] overflow-y-auto p-6 z-50">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Search Flights</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search Form */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Origin */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Origin (e.g., LOS)"
                  value={searchParams.origin}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, origin: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Destination (e.g., SIN)"
                  value={searchParams.destination}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      destination: e.target.value
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Departure */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.departureDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      departureDate: e.target.value
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Return */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Return (Optional)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.returnDate}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      returnDate: e.target.value
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Passengers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Passengers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={searchParams.passengers}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      passengers: e.target.value
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Class</label>
              <select
                value={searchParams.flightClass}
                onChange={(e) =>
                  setSearchParams({ ...searchParams, flightClass: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchParams.origin || !searchParams.destination}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSearching ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Flights
              </div>
            )}
          </Button>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Available Flights ({searchResults.length})
            </h3>

            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Plane className="w-16 h-16 mx-auto mb-4 opacity-20" />
                No flights found.
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <div
                    key={flight.id}
                    className="border p-6 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-800 rounded"></div>
                        <div>
                          <h4 className="font-semibold">{flight.airline}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{flight.flightNumber}</span>
                            <Badge className="bg-blue-600 text-white text-xs">
                              {flight.flightClass}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 flex-1 mx-8">
                        <div className="text-center">
                          <div className="text-xl font-bold">{flight.departureTime}</div>
                          <div className="text-sm text-gray-600">{flight.origin}</div>
                        </div>

                        <div className="flex-1 text-center">
                          <div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
                          <div className="w-full h-1 bg-gray-200 rounded-full">
                            <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Direct</div>
                        </div>

                        <div className="text-center">
                          <div className="text-xl font-bold">{flight.arrivalTime}</div>
                          <div className="text-sm text-gray-600">{flight.destination}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold mb-2">{flight.price}</div>
                        <Button
                          onClick={() => handleAddToItinerary(flight)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Add to Itinerary
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                      Baggage: {flight.baggage} • Cabin: {flight.cabinBaggage}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchModal;
