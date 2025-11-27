import React from 'react';
import { Plane, Briefcase, Tv, Utensils, Usb, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlightCardProps {
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
  onClose?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({
  airline,
  flightNumber,
  flightClass,
  departureTime,
  arrivalTime,
  date,
  duration,
  origin,
  destination,
  price,
  baggage,
  cabinBaggage,
  onClose
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 relative">
      {/* Main Flight Info */}
      <div className="flex items-center justify-between mb-4">
        {/* Airline Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-800 rounded"></div>
            <div>
              <h3 className="font-semibold text-gray-900">{airline}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{flightNumber}</span>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                  {flightClass}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Timeline */}
        <div className="flex items-center gap-8 flex-1 mx-12">
          {/* Departure */}
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{departureTime}</div>
            <div className="text-sm text-gray-600">{date}</div>
          </div>

          {/* Route Indicator */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-2 w-full">
              <Plane className="w-4 h-4 text-gray-400 rotate-90" />
              <div className="flex-1 flex flex-col items-center">
                <div className="text-xs text-gray-600 mb-1">Duration: {duration}</div>
                <div className="w-full h-1 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full w-3/4 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <Plane className="w-4 h-4 text-gray-400 -rotate-45" />
            </div>
            <div className="flex items-center justify-between w-full mt-2">
              <span className="text-sm font-semibold text-gray-900">{origin}</span>
              <span className="text-xs text-gray-500">Direct</span>
              <span className="text-sm font-semibold text-gray-900">{destination}</span>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-left">
            <div className="text-2xl font-bold text-gray-900">{arrivalTime}</div>
            <div className="text-sm text-gray-600">{date}</div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{price}</div>
        </div>

        {/* Close Button */}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Facilities */}
      <div className="flex items-center gap-6 text-sm text-gray-600 pb-4 border-b border-gray-200">
        <span className="flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Baggage: {baggage}, Cabin Baggage: {cabinBaggage}
        </span>
        <span className="flex items-center gap-2">
          <Tv className="w-4 h-4" />
          In flight entertainment
        </span>
        <span className="flex items-center gap-2">
          <Utensils className="w-4 h-4" />
          In flight meal
        </span>
        <span className="flex items-center gap-2">
          <Usb className="w-4 h-4" />
          USB Port
        </span>
      </div>

      {/* Action Links */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Flight details
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
  );
};



export default FlightCard