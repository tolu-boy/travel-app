"use client";

import { Ellipsis, MoveLeft, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import CategoryCard from "./CategoryCard";
import FlightCard from "@/components/FlightCard";
import HotelCard from "./HotelCard";
import ActivityCard from "@/components/ActivityCard";
import { useItineraryStore } from "@/store/itineraryStore";
import FlightSearchModal from "./FlightSearchModal";

export default function TripDetail() {
  const [activeTab, setActiveTab] = useState("all");
  const handleAddActivities = () => console.log("Activities clicked");
  const handleAddHotels = () => console.log("Hotels clicked");
  const handleAddFlights = () => console.log("Flights clicked");

  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);

  const sampleImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
  ];
  return (
    <div className="bg-white rounded-xl shadow-sm py-2 px-6 space-y-2 ">
      {/* Trip Header with Beach Background */}
      <div className="pt-5">
        <div className="relative w-full rounded-sm overflow-hidden mb-2">
          <Image
            src="/images/banner.png"
            alt="banner-image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
          <button className="absolute top-4 left-4 z-10 rounded-sm p-2 hover:bg-white transition-colors">
            <MoveLeft size={20} className="text-gray-900" />
          </button>
        </div>

        {/* Date & Actions Bar */}
        <div className="flex justify-between items-center ">
          {/* Trip Info */}
          <div className="bg-[#FEF4E6] text-[#7A4504] px-3 py-1 rounded-md text-xs font-medium">
            📅 21 March 2024 → 2 April 2024
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="bg-[#E7F0FF] rounded-md px-6 py-2 hover:bg-blue-100 transition-colors flex items-center justify-center">
              <UserPlus size={16} className="text-[#0e6efd]" />
            </button>
            <button className="bg-gray-50 border border-gray-100 rounded-md p-2 hover:bg-gray-100 text-gray-600">
              <Ellipsis size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* ✅ END WRAPPER */}

      {/* Trip Title and Details */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Bahamas Family Trip</h1>
            <p className="text-sm text-gray-600">
              New York, United States of America · Solo Trip
            </p>
          </div>
          <div className="flex">
            <Image
              width={10}
              height={10}
              src="/images/box.svg"
              alt="Traveler"
              className="w-5  rounded-full"
            />

            <Image
              width={10}
              height={10}
              src="/images/xx.svg"
              alt="Traveler"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* ✅ category card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-3xl pb-5">
        {/* 1. Activities */}
        <CategoryCard
          title="Activities"
          description="Build, personalize, and optimize your itineraries with our trip planner."
          buttonText="Add Activities"
          bgColor="bg-[#000031]"
          textColor="text-white"
          btnBgColor="bg-[#0D6EFD]"
          btnTextColor="text-white"
          onClick={handleAddActivities}
        />

        {/* 2. Hotels */}
        <CategoryCard
          title="Hotels"
          description="Build, personalize, and optimize your itineraries with our trip planner."
          buttonText="Add Hotels"
          bgColor="bg-[#E7F0FF]"
          textColor="text-gray-900"
          btnBgColor="bg-[#0D6EFD]"
          btnTextColor="text-white"
          onClick={handleAddHotels}
        />

        {/* 3. Flights */}
        <CategoryCard
          title="Flights"
          description="Build, personalize, and optimize your itineraries with our trip planner."
          buttonText="Add Flights"
          bgColor="bg-[#0D6EFD]"
          textColor="text-white"
          btnBgColor="bg-white"
          btnTextColor="text-[#0D6EFD]"
          onClick={handleAddFlights}
        />
      </div>

      {/* Trip Itineraries Section */}
      <div className="py-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Trip Itineraries</h2>
          <p className="text-sm text-gray-500">
            Your trip itineraries are placed here.
          </p>
        </div>

        {/* Flights Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <span>
                <Image
                  width={10}
                  height={10}
                  src="/icons/AirplaneInFlight.svg"
                  alt="Traveler"
                  className="w-5 h-5 rounded-full"
                />
              </span>{" "}
              Flights
            </h3>
            <Button
              onClick={() => setIsFlightModalOpen(true)}
              className="text-[#0D6EFD] text-sm bg-white hover:bg-white/45"
            >
              Add Flights
            </Button>
          </div>

          {/* Flight Items */}
          {[1, 2].map((i) => (
            // <FlightCard key={i} />

            <FlightCard
              key={i}
              airline="American Airlines"
              flightNumber="AA-829"
              flightClass="First Class"
              departureTime="08:35"
              arrivalTime="09:55"
              date="Sun, 20 Aug"
              duration="1h 45m"
              origin="LOS"
              destination="SIN"
              price="₦ 123,450.00"
              baggage="20kg"
              cabinBaggage="8kg"
              onClose={() => console.log("Close clicked")}
            />
          ))}
        </div>

        {/* Hotels Section */}
        <div className="bg-gray-800 text-white rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">🏨 Hotels</h3>
            <Button className="bg-white hover:bg-gray-100 text-gray-800 text-sm">
              Add Hotels
            </Button>
          </div>

          {/* Hotel Items */}
          {[1, 2].map((i) => (
            <HotelCard
              key={i}
              name="Riviera Resort, Lekki"
              address="18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1"
              rating={8.5}
              reviewCount={436}
              roomType="King size room"
              price="₦ 123,450.00"
              totalPrice="NGN 560,000"
              nights={10}
              rooms={1}
              facilities={["Pool", "Bar"]}
              checkIn="20-04-2024"
              checkOut="29-04-2024"
              images={sampleImages}
              onClose={() => console.log("Close clicked")}
            />
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-blue-600 rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <h1 className="text-2xl font-bold">Activities</h1>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium">
              Add Activities
            </Button>
          </div>

          {/* Activity Cards */}
          <ActivityCard
            name="The Museum of Modern Art"
            description="Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant"
            rating={4.5}
            reviewCount={436}
            duration="1 Hour"
            price="₦ 123,450.00"
            dateTime="10:30 AM on Mar 19"
            whatsIncluded="Admission to the Empire State Building"
            dayLabel="Day 1"
            images={sampleImages}
            onClose={() => console.log("Close clicked")}
            onIncrement={() => console.log("Increment")}
            onDecrement={() => console.log("Decrement")}
          />
        </div>
      </div>
    </div>
  );
}
