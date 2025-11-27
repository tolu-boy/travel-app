import React from 'react';
import { MapPin, Star, Bed, Waves, Wine, Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HotelCardProps {
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
  images: string[];
  onClose?: () => void;
}

const HotelCard: React.FC<HotelCardProps> = ({
  name,
  address,
  rating,
  reviewCount,
  roomType,
  price,
  totalPrice,
  nights,
  rooms,
  facilities,
  checkIn,
  checkOut,
  images,
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const facilityIcons: { [key: string]: React.ReactNode } = {
    Pool: <Waves className="w-4 h-4" />,
    Bar: <Wine className="w-4 h-4" />
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      <div className="flex gap-6">
        {/* Image Gallery */}
        <div className="relative w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden group">
          <img
            src={images[currentImageIndex]}
            alt={name}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Hotel Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
              <p className="text-sm text-gray-600 mb-2">{address}</p>
              
              <div className="flex items-center gap-4 mb-3">
                <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                  <MapPin className="w-4 h-4" />
                  Show in map
                </button>
                
                <div className="flex items-center gap-1 text-gray-700">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="text-sm text-gray-500">({reviewCount})</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <Bed className="w-4 h-4" />
                  <span className="text-sm">{roomType}</span>
                </div>
              </div>

              {/* Facilities */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <span className="font-medium">Facilities:</span>
                {facilities.map((facility, index) => (
                  <span key={index} className="flex items-center gap-1">
                    {facilityIcons[facility]}
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            {/* Price Section */}
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">{price}</div>
              <div className="text-sm text-gray-600 mb-1">Total Price: {totalPrice}</div>
              <div className="text-sm text-gray-600">{rooms} room x {nights} nights incl. taxes</div>
            </div>
          </div>

          {/* Check In/Out */}
          <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Check In: {checkIn}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Check Out: {checkOut}</span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex gap-4">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Hotel details
              </button>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline">
                Price details
              </button>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Edit details
            </button>
          </div>
        </div>

        {/* Close Button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 hover:bg-red-50"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
};


export default HotelCard;