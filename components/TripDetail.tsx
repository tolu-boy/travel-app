"use client";

import { Ellipsis, MoveLeft, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import CategoryCard from "./CategoryCard";
import FlightCard from "@/components/FlightCard";
import HotelCard from "./HotelCard";
import ActivityCard from "@/components/ActivityCard";
import {
  useItineraryStore,
  Flight,
  Hotel,
  Activity,
} from "@/store/itineraryStore";
import FlightSearchModal from "./FlightSearchModal";
import EmptyRequestCard from "./EmptyRequestCard";
import ActivitySearchModal from "./ActivitySearchModal";
import HotelSearchModal from "./HotelSearchModal";
import { categories, sampleImages } from "@/data/TripConstants";
export default function TripDetail() {
  const [openModal, setOpenModal] = useState<
    "flight" | "hotel" | "activity" | null
  >(null);

  const {
    flights,
    hotels,
    activities,
    addFlight,
    removeFlight,
    removeHotel,
    removeActivity,
    addHotel,
    addActivity,
  } = useItineraryStore();

  const handleAddFlight = (flight: Flight) => {
    addFlight(flight);
    console.log("Flight added:", flight);
  };

  const handleAddHotel = (hotel: Hotel) => {
    addHotel(hotel);
    console.log("Hotel added:", hotel);
  };

  const handleAddActivity = (activity: Activity) => {
    addActivity(activity);
    console.log("Activity added:", activity);
  };

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
        {categories.map((cat) => (
          <CategoryCard
            buttonText={cat.btnText}
            key={cat.title}
            {...cat}
            description="Build, personalize, and optimize your itineraries with our trip planner."
          />
        ))}
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
              // onClick={() => setIsFlightModalOpen(true)}
              onClick={() => setOpenModal("flight")}
              className="text-[#0D6EFD] text-sm bg-white hover:bg-white/45"
            >
              Add Flights
            </Button>
          </div>

          {/* Flight Items - Show from Zustand store */}
          {flights.length === 0 ? (
            <EmptyRequestCard
              type="flight"
              buttonText="Add Flight"
              onClick={() => setOpenModal("flight")}
            />
          ) : (
            <div className="space-y-3">
              {flights.map((flight: Flight) => (
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
              <span className="text-xl">
                <Image
                  src="/icons/hotelIcon.svg"
                  alt="hotel icon"
                  width={0}
                  height={0}
                  className="w-full h-full object-cover"
                />
              </span>{" "}
              Hotels
            </h3>
            <Button
              onClick={() => setOpenModal("hotel")}
              className="bg-white hover:bg-gray-100 text-gray-800 text-sm rounded-sm"
            >
              Add Hotels
            </Button>
          </div>

          {/* Hotel Items - Show from Zustand store */}
          {hotels.length === 0 ? (
            <EmptyRequestCard
              type="hotel"
              buttonText="Add Hotel"
              onClick={() => setOpenModal("hotel")}
            />
          ) : (
            <div className="space-y-3">
              {hotels.map((hotel: Hotel, id: number) => (
                <HotelCard
                  key={id}
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
              <Image
                src="/icons/activityIcon.svg"
                alt="hotel icon"
                width={0}
                height={0}
                className="w-full h-full object-cover"
              />
              Activities
            </h3>
            <Button
              // onClick={() => setIsActivityModalOpen(true)}
              onClick={() => setOpenModal("activity")}
              className="bg-white text-[#0D6EFD] hover:bg-gray-100 font-medium rounded-sm"
            >
              Add Activities
            </Button>
          </div>

          {/* Activity Items - Show from Zustand store */}
          {activities.length === 0 ? (
            <EmptyRequestCard
              type="activity"
              buttonText="Add Activities"
              onClick={() => setOpenModal("activity")}
            />
          ) : (
            <div className="space-y-3">
              {activities.map((activity: Activity) => (
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
        isOpen={openModal === "flight"}
        onClose={() => setOpenModal(null)}
        onAddFlight={handleAddFlight}
      />

      {/* TODO: Add these modals when created */}
      <HotelSearchModal
        isOpen={openModal === "hotel"}
        onClose={() => setOpenModal(null)}
        onAddHotel={handleAddHotel}
      />
      <ActivitySearchModal
        isOpen={openModal === "activity"}
        onClose={() => setOpenModal(null)}
        onAddActivity={handleAddActivity}
      />
    </div>
  );
}
