import React, { useState } from 'react';
import { Search, X, Plane, Calendar, Users, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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

  // Mock search function - Replace with actual API call
  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(false);

    try {
      // TODO: Replace with actual API call to booking.com API
      // const response = await fetch('/api/flights/search', {
      //   method: 'POST',
      //   body: JSON.stringify(searchParams)
      // });
      // const data = await response.json();

      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults: Flight[] = [
        {
          id: '1',
          airline: 'American Airlines',
          flightNumber: 'AA-829',
          flightClass: searchParams.flightClass,
          departureTime: '08:35',
          arrivalTime: '09:55',
          date: searchParams.departureDate || 'Sun, 20 Aug',
          duration: '1h 45m',
          origin: searchParams.origin || 'LOS',
          destination: searchParams.destination || 'SIN',
          price: '₦ 123,450.00',
          baggage: '20kg',
          cabinBaggage: '8kg'
        },
        {
          id: '2',
          airline: 'Delta Airlines',
          flightNumber: 'DL-456',
          flightClass: searchParams.flightClass,
          departureTime: '10:15',
          arrivalTime: '11:45',
          date: searchParams.departureDate || 'Sun, 20 Aug',
          duration: '1h 30m',
          origin: searchParams.origin || 'LOS',
          destination: searchParams.destination || 'SIN',
          price: '₦ 145,200.00',
          baggage: '23kg',
          cabinBaggage: '10kg'
        },
        {
          id: '3',
          airline: 'Emirates',
          flightNumber: 'EK-783',
          flightClass: searchParams.flightClass,
          departureTime: '14:20',
          arrivalTime: '16:00',
          date: searchParams.departureDate || 'Sun, 20 Aug',
          duration: '1h 40m',
          origin: searchParams.origin || 'LOS',
          destination: searchParams.destination || 'SIN',
          price: '₦ 198,750.00',
          baggage: '30kg',
          cabinBaggage: '12kg'
        }
      ];

      setSearchResults(mockResults);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToItinerary = (flight: Flight) => {
    onAddFlight(flight);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Search Flights</DialogTitle>
        </DialogHeader>

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
                  onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
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
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.departureDate}
                  onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Return Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Return (Optional)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.returnDate}
                  onChange={(e) => setSearchParams({ ...searchParams, returnDate: e.target.value })}
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
                  onChange={(e) => setSearchParams({ ...searchParams, passengers: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Class</label>
              <select
                value={searchParams.flightClass}
                onChange={(e) => setSearchParams({ ...searchParams, flightClass: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Flights
              </>
            )}
          </Button>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Available Flights ({searchResults.length})
            </h3>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Plane className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>No flights found. Try adjusting your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <div
                    key={flight.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      {/* Airline */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-800 rounded"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{flight.airline}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{flight.flightNumber}</span>
                            <Badge className="bg-blue-600 text-white text-xs">
                              {flight.flightClass}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Flight Info */}
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

                      {/* Price and Action */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-2">{flight.price}</div>
                        <Button
                          onClick={() => handleAddToItinerary(flight)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Add to Itinerary
                        </Button>
                      </div>
                    </div>

                    {/* Baggage Info */}
                    <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                      Baggage: {flight.baggage} • Cabin: {flight.cabinBaggage}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FlightSearchModal;