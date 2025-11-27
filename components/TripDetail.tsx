

"use client";

import { Ellipsis, MoveLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import CategoryCard from "./CategoryCard";
import FlightCard from "@/components/FlightCard";
import HotelCard from "./HotelCard";
import ActivityCard from "@/components/ActivityCard";
import { useItineraryStore } from "@/store/itineraryStore";
import FlightSearchModal from "./FlightSearchModal";
import EmptyRequestCard from "./EmptyRequestCard";

export default function TripDetail() {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Get data from Zustand store
  const {
    flights,
    hotels,
    activities,
    addFlight,
    removeFlight,
    removeHotel,
    removeActivity,
  } = useItineraryStore();

  const handleAddFlight = (flight: any) => {
    addFlight(flight);
    console.log("Flight added:", flight);
  };

  const handleAddActivities = () => {
    setIsActivityModalOpen(true);
  };

  const handleAddHotels = () => {
    setIsHotelModalOpen(true);
  };

  const handleAddFlights = () => {
    setIsFlightModalOpen(true);
  };

  const sampleImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm py-2 px-6 space-y-2">
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
        <div className="flex justify-between items-center">
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
              className="w-5 rounded-full"
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

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5">
        {/* Activities */}
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

        {/* Hotels */}
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

        {/* Flights */}
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
                  width={20}
                  height={20}
                  src="/icons/AirplaneInFlight.svg"
                  alt="Flights"
                  className="w-5 h-5"
                />
              </span>
              Flights
            </h3>
            <Button
              onClick={() => setIsFlightModalOpen(true)}
              className="text-[#0D6EFD] text-sm bg-white hover:bg-white/45"
            >
              Add Flights
            </Button>
          </div>

          {/* Flight Items - Show from Zustand store */}
          {flights.length === 0 ? (
            <EmptyRequestCard
              image="/icons/AirplaneInFlight.svg"
              buttonText="Add Flight"
            />
          ) : (
            // <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            //   <div className="text-gray-400 text-4xl mb-3">✈️</div>
            //   <p className="text-gray-600 mb-3">No flights added yet</p>
            //   <Button
            //     onClick={() => setIsFlightModalOpen(true)}
            //     className="bg-[#0D6EFD] hover:bg-blue-700 text-white"
            //   >
            //     Add Your First Flight
            //   </Button>
            // </div>
            <div className="space-y-3">
              {flights.map((flight: any) => (
                <FlightCard
                  key={flight.id}
                  airline={flight.airline}
                  flightNumber={flight.flightNumber}
                  flightClass={flight.flightClass}
                  departureTime={flight.departureTime}
                  arrivalTime={flight.arrivalTime}
                  date={flight.date}
                  duration={flight.duration}
                  origin={flight.origin}
                  destination={flight.destination}
                  price={flight.price}
                  baggage={flight.baggage}
                  cabinBaggage={flight.cabinBaggage}
                  onClose={() => removeFlight(flight.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hotels Section */}
        <div className="bg-[#344054] text-white rounded-lg p-4 space-y-3 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <span className="text-xl">🏨</span> Hotels
            </h3>
            <Button
              onClick={() => setIsHotelModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-gray-800 text-sm"
            >
              Add Hotels
            </Button>
          </div>

          {/* Hotel Items - Show from Zustand store */}
          {hotels.length === 0 ? (
            <EmptyRequestCard
              image="/icons/AirplaneInFlight.svg"
              buttonText="Add Flight"
            />
          ) : (
            <div className="space-y-3">
              {hotels.map((hotel: any) => (
                <HotelCard
                  key={hotel.id}
                  name={hotel.name}
                  address={hotel.address}
                  rating={hotel.rating}
                  reviewCount={hotel.reviewCount}
                  roomType={hotel.roomType}
                  price={hotel.price}
                  totalPrice={hotel.totalPrice}
                  nights={hotel.nights}
                  rooms={hotel.rooms}
                  facilities={hotel.facilities}
                  checkIn={hotel.checkIn}
                  checkOut={hotel.checkOut}
                  images={hotel.images || sampleImages}
                  onClose={() => removeHotel(hotel.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Activities Section */}
        <div className="bg-[#0D6EFD] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <span className="text-xl">🎭</span> Activities
            </h3>
            <Button
              onClick={() => setIsActivityModalOpen(true)}
              className="bg-white text-[#0D6EFD] hover:bg-gray-100 font-medium"
            >
              Add Activities
            </Button>
          </div>

          {/* Activity Items - Show from Zustand store */}
          {activities.length === 0 ? (
            <EmptyRequestCard
              image="/icons/AirplaneInFlight.svg"
              buttonText="Add Flight"
            />
          ) : (
            <div className="space-y-3">
              {activities.map((activity: any) => (
                <ActivityCard
                  key={activity.id}
                  name={activity.name}
                  description={activity.description}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  duration={activity.duration}
                  price={activity.price}
                  dateTime={activity.dateTime}
                  whatsIncluded={activity.whatsIncluded}
                  dayLabel={activity.dayLabel}
                  images={activity.images || sampleImages}
                  onClose={() => removeActivity(activity.id)}
                  onIncrement={() => console.log("Increment")}
                  onDecrement={() => console.log("Decrement")}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FlightSearchModal
        isOpen={isFlightModalOpen}
        onClose={() => setIsFlightModalOpen(false)}
        onAddFlight={handleAddFlight}
      />

      {/* TODO: Add these modals when created */}
      {/* <HotelSearchModal
        isOpen={isHotelModalOpen}
        onClose={() => setIsHotelModalOpen(false)}
        onAddHotel={handleAddHotel}
      />
      <ActivitySearchModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onAddActivity={handleAddActivity}
      /> */}
    </div>
  );
}
