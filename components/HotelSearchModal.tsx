import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

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

interface HotelSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHotel: (hotel: Hotel) => void;
}

const HotelSearchModal: React.FC<HotelSearchModalProps> = ({
  isOpen,
  onClose,
  onAddHotel
}) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    rooms: '1',
    guests: '2'
  });

  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
        setIsSearching(true);
        setHasSearched(false);
    
        try {
          // TODO: Replace with actual API call to booking.com API
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const mockResults: Hotel[] = [
            {
              id: '1',
              name: 'Riviera Resort, Lekki',
              address: '18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1',
              rating: 8.5,
              reviewCount: 436,
              roomType: 'King size room',
              price: '₦ 123,450.00',
              totalPrice: 'NGN 560,000',
              nights: 10,
              rooms: parseInt(searchParams.rooms),
              facilities: ['Pool', 'Bar', ],
              checkIn: searchParams.checkIn || '20-04-2024',
              checkOut: searchParams.checkOut || '29-04-2024',
              images: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'
              ]
            },
            {
              id: '2',
              name: 'Ocean View Hotel',
              address: 'Victoria Island, Lagos',
              rating: 9.2,
              reviewCount: 892,
              roomType: 'Executive Suite',
              price: '₦ 185,000.00',
              totalPrice: 'NGN 750,000',
              nights: 10,
              rooms: parseInt(searchParams.rooms),
              facilities: ['Pool', 'Bar', ],
              checkIn: searchParams.checkIn || '20-04-2024',
              checkOut: searchParams.checkOut || '29-04-2024',
              images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop'
              ]
            },
            {
              id: '3',
              name: 'Luxury Palace Hotel',
              address: 'Ikoyi, Lagos',
              rating: 8.8,
              reviewCount: 654,
              roomType: 'Deluxe Room',
              price: '₦ 95,000.00',
              totalPrice: 'NGN 450,000',
              nights: 10,
              rooms: parseInt(searchParams.rooms),
              facilities: ['Pool', 'Bar', ],
              checkIn: searchParams.checkIn || '20-04-2024',
              checkOut: searchParams.checkOut || '29-04-2024',
              images: [
                'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
              ]
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
  const handleAddToItinerary = (hotel: Hotel) => {
    onAddHotel(hotel);
    onClose();
  };

  if (!isOpen) return null; // ⛔ don't render when closed

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Search Hotels</h2>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-800">
            Close
          </button>
        </div>

        {/* Search Form */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="City or hotel name"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.checkIn}
                  onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.checkOut}
                  onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Rooms</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={searchParams.rooms}
                  onChange={(e) => setSearchParams({ ...searchParams, rooms: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchParams.location}
            className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Search Hotels
              </>
            )}
          </Button>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Available Hotels ({searchResults.length})
            </h3>

            <div className="space-y-4">
              {searchResults.map((hotel) => (
                <div
                  key={hotel.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-48 h-48 rounded-lg overflow-hidden">
                      <img
                        src={hotel.images?.[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold">{hotel.name}</h4>
                      <p className="text-sm text-gray-600">{hotel.address}</p>

                      <div className="flex gap-4 items-center my-3">
                        <span className="text-yellow-500">⭐ {hotel.rating}</span>
                        <Badge variant="outline">{hotel.roomType}</Badge>
                      </div>

                      <Button
                        onClick={() => handleAddToItinerary(hotel)}
                        className="bg-[#0D6EFD] hover:bg-blue-700 text-white mt-3"
                      >
                        Add to Itinerary
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default HotelSearchModal;
