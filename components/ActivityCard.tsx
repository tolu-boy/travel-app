import React from 'react';
import { MapPin, Star, Clock, ChevronLeft, ChevronRight, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      <div className="flex gap-6">
        {/* Image Gallery */}
        <div className="relative w-52 h-52 flex-shrink-0 rounded-lg overflow-hidden group">
          <img
            src={images[currentImageIndex]}
            alt={name}
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
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
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

              {/* What's Included */}
              <div className="mb-4">
                <span className="text-sm text-gray-600">
                  <span className="font-medium">Whats Included:</span> {whatsIncluded}{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    See more
                  </button>
                </span>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Activity details
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Price details
                </button>
              </div>
            </div>

            {/* Price and Controls Section */}
            <div className="flex flex-col items-end gap-3 ml-6">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">{price}</div>
                <div className="text-sm text-gray-600">{dateTime}</div>
              </div>

              {/* Day Counter */}
              {dayLabel && (
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
                  {dayLabel}
                </Badge>
              )}

              {/* Increment/Decrement Controls */}
              <div className="flex flex-col gap-2">
                {onIncrement && (
                  <button
                    onClick={onIncrement}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-600 flex items-center justify-center group"
                  >
                    <Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </button>
                )}
                {onDecrement && (
                  <button
                    onClick={onDecrement}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-600 flex items-center justify-center group"
                  >
                    <Minus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </button>
                )}
              </div>

              {/* Edit Details Link */}
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                Edit details
              </button>
            </div>
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

// Example Usage Component with Blue Container

export default ActivityCard;