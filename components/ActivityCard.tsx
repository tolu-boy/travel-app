import React from 'react';
import { MapPin, Star, Clock, ChevronLeft, ChevronRight, X,  ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface ActivityCardProps {
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: string;
  dateTime: string;
  whatsIncluded: string;
  dayLabel?: string;
  images: string[];
  onClose?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  name,
  description,
  rating,
  reviewCount,
  duration,
  price,
  dateTime,
  whatsIncluded,
  dayLabel,
  images,
  onClose,
  onIncrement,
  onDecrement
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 relative flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex gap-6">
          {/* Image Gallery */}
          <div className="relative w-64 h-52 shrink-0 rounded-lg overflow-hidden group">
            <Image
              src={images[currentImageIndex]}
              alt={name}
              width={256}
              height={208}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Activity Info */}
          <div className="flex-1 flex flex-col">
            {/* Top Section */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                
                <div className="flex items-center gap-4 mb-3">
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                    <MapPin className="w-4 h-4" />
                    Directions
                  </button>
                  
                  <div className="flex items-center gap-1 text-gray-700">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{rating}</span>
                    <span className="text-sm text-gray-500">({reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{duration}</span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="text-right shrink-0 ml-6">
                <div className="text-2xl font-bold text-gray-900 mb-1">{price}</div>
                <div className="text-sm text-gray-900">{dateTime}</div>
              </div>
            </div>

            {/* Full Width Border */}
            <div className="border-b border-gray-200 mb-4"></div>

            {/* What's Included and Day Badge Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  <span className="font-medium">Whats Included:</span> {whatsIncluded}{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    See more
                  </button>
                </span>
              </div>

              {/* Day Badge and Controls */}
              <div className="flex items-center gap-3 shrink-0">
                {dayLabel && (
                  <Badge className="bg-[#0A369D] hover:bg-[#0A369D] text-white px-3 py-1.5 text-sm rounded-sm">
                    {dayLabel}
                  </Badge>
                )}

                {/* Increment/Decrement Controls */}
                <div className="">
                  {onIncrement && (
                    <button
                      onClick={onIncrement}
                      className="w-5 h-5 my-1 rounded-full border-2 border-[#98A2B3] hover:border-blue-600 flex items-center justify-center group transition-colors"
                    >
                      <ChevronUp className="w-3 h-3 text-[#98A2B3] group-hover:text-blue-600 transition-colors" />
                    </button>
                    
                  )}
                  {onDecrement && (
                    <button
                      onClick={onDecrement}
                      className="w-5 h-5 rounded-full border-2 border-[#98A2B3] hover:border-blue-600 flex items-center justify-center group transition-colors"
                    >
                      <ChevronDown className="w-3 h-3 text-[#98A2B3] group-hover:text-blue-600 transition-colors" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Border */}
            <div className="border-b border-gray-200 mb-4"></div>

            {/* Action Links */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Activity details
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
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

export default ActivityCard;