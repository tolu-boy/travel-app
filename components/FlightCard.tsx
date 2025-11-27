import React from 'react';
import {  Briefcase, Tv, Utensils, Usb, X, PlaneTakeoff, PlaneLanding, Clapperboard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from "next/image";

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
    <div className="bg-white rounded-lg shadow-md mb-4 relative flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Main Flight Info */}
        <div className="flex items-center justify-between mb-4">
          {/* Airline Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/Group.png" alt="Logo" width={20} height={20} />
              <div>
                <h3 className="font-semibold text-gray-900">{airline}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{flightNumber}</span>
                  <Badge className="bg-[#0A369D] py-1 text-white text-xs rounded-sm">
                    {flightClass}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Timeline Section */}
          <div className="flex items-center gap-6 flex-1 max-w-2xl mx-12 pl-6">
            {/* Departure Time */}
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-gray-900">{departureTime}</div>
              <div className="text-sm text-[#676E7E] mt-1">{date}</div>
            </div>

            {/* Route Indicator */}
            <div className="flex-1 flex flex-col">
              {/* Duration and Progress Bar */}
              <div className="flex items-center gap-2 mb-2">
                <PlaneTakeoff className="w-5 h-5 text-[#676E7E]" />
                <div className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-[#676E7E] font-medium">Duration: {duration}</div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full w-2/3 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <PlaneLanding className="w-5 h-5 text-[#676E7E]" />
              </div>
              
              {/* Origin, Direct, Destination */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900">{origin}</span>
                <span className="text-xs text-[#676E7E]">Direct</span>
                <span className="font-semibold text-gray-900">{destination}</span>
              </div>
            </div>

            {/* Arrival Time */}
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-gray-900">{arrivalTime}</div>
              <div className="text-sm text-[#676E7E] mt-1">{date}</div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right ml-6">
            <div className="text-xl font-bold text-gray-900">{price}</div>
          </div>
        </div>

        <div className="border-b border-gray-200 mt-2 mb-4"> </div>

        {/* Facilities */}
        <div className="flex items-center gap-6 text-sm text-[#647995] font-medium pb-4 border-b border-gray-200">
  
         <p className='text-[#647995]'>Facilities:</p>

          <span className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Baggage: {baggage}, Cabin Baggage: {cabinBaggage}
          </span>
          <span className="flex items-center gap-2">
            <Clapperboard className="w-4 h-4" />
            In flight entertainment
          </span>
          <span className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            In flight meal
          </span>
          <span className="flex items-center gap-2">
            <Usb className="w-4 h-4 rotate-40" />
            USB Port
          </span>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4">
            <button className="text-[#0D6EFD] hover:text-blue-700 text-sm font-medium">
              Flight details
            </button>
            <button className="text-[#0D6EFD] hover:text-blue-700 text-sm font-medium">
              Price details
            </button>
          </div>
          <button className="text-[#0D6EFD] hover:text-blue-700 text-sm font-medium">
            Edit details
          </button>
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

export default FlightCard;