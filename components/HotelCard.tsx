import React from "react";
import {
  MapPin,
  Star,
  Bed,
  Waves,
  Wine,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Image from "next/image";

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
  onClose,
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
    Bar: <Wine className="w-4 h-4" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 relative flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex gap-6">
          {/* Image Gallery */}
          <div className="relative w-64 h-48 shrink-0 rounded-lg overflow-hidden group">
            <Image
              src={images[currentImageIndex]}
              alt={name}
              width={256}
              height={192}
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
          <div className="flex-1 flex flex-col">
            {/* Top Section: Name, Address, Details, Price */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-sm font-medium text-gray-600 mb-3">{address}</p>

                <div className="flex items-center gap-4">
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
              </div>

              {/* Price Section */}
              <div className="text-right shrink-0 ml-6">
                <div className="text-xl font-bold text-gray-900 mb-1">
                  {price}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Total Price: {totalPrice}
                </div>
                <div className="text-sm text-gray-600">
                  {rooms} room x {nights} nights incl. taxes
                </div>
              </div>
            </div>

            {/* Full Width Border */}
            <div className="border-b border-gray-200 mb-4"></div>

            {/* Facilities Section - Full Width */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              {/* LEFT: Facilities */}
              <div className="flex items-center gap-2">
                <span className="font-medium">Facilities:</span>
                <div className="flex items-center gap-4">
                  {facilities.map((facility, index) => (
                    <span key={index} className="flex items-center gap-1">
                      {facilityIcons[facility]}
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Check In / Check Out */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Check In: {checkIn}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Check Out: {checkOut}</span>
                </div>
              </div>
            </div>

            {/* Full Width Border */}
            <div className="border-b border-gray-200 mb-4"></div>

            {/* Action Links */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Hotel details
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ">
                  Price details
                </button>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Red Close Strip */}
      {onClose && (
        <div 
          onClick={onClose}
          className="w-8 bg-[#FBEAE9] rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors"
        >
          <X className="w-6 h-6 text-[#9E0A05]" />
        </div>
      )}
    </div>
  );
};

export default HotelCard;