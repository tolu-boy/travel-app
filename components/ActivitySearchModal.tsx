import React, { useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, Calendar, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: string;
  dateTime: string;
  whatsIncluded: string;
  dayLabel?: string;
  images?: string[];
}

interface ActivitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: Activity) => void;
}

const ActivitySearchModal: React.FC<ActivitySearchModalProps> = ({
  isOpen,
  onClose,
  onAddActivity,
}) => {
  const [searchParams, setSearchParams] = useState({
    location: "",
    date: "",
    category: "all",
    priceRange: "all",
  });

  const [searchResults, setSearchResults] = useState<Activity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(false);

    await new Promise((res) => setTimeout(res, 1200));

    const mockResults: Activity[] = [
      {
        id: "1",
        name: "The Museum of Modern Art",
        description:
          "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & restaurant.",
        rating: 4.5,
        reviewCount: 436,
        duration: "1 Hour",
        price: "₦ 123,450.00",
        dateTime: searchParams.date
          ? `10:30 AM on ${searchParams.date}`
          : "10:30 AM on Mar 19",
        whatsIncluded: "Admission ticket",
        dayLabel: "Day 1",
        images: [
          "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400",
        ],
      },
    ];

    setSearchResults(mockResults);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleAdd = (activity: Activity) => {
    onAddActivity(activity);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-scaleIn p-6">
        <h2 className="text-2xl font-bold mb-4">Search Activities</h2>

        {/* Search Form */}
        <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="City or attraction"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      location: e.target.value,
                    })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, date: e.target.value })
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={searchParams.category}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    category: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="museum">Museums & Art</option>
                <option value="tours">Tours</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Price Range
              </label>
              <select
                value={searchParams.priceRange}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    priceRange: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={isSearching || !searchParams.location}
            className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white"
          >
            {isSearching ? "Searching..." : "Search Activities"}
          </Button>
        </div>

        {/* RESULTS */}
        {hasSearched && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">
              Available Activities ({searchResults.length})
            </h3>

            {searchResults.map((activity) => (
              <div
                key={activity.id}
                className="border rounded-lg p-6 hover:shadow transition"
              >
                <div className="flex gap-6">
                  <div className="w-52 h-52 rounded-lg overflow-hidden">
                    <img
                      src={activity.images?.[0]}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-bold">{activity.name}</h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold">
                          {activity.rating}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({activity.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{activity.duration}</span>
                      </div>
                      {activity.dayLabel && (
                        <Badge className="bg-blue-600 text-white">
                          {activity.dayLabel}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      📅 {activity.dateTime}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold">{activity.price}</div>
                    <p className="text-xs text-gray-500">per person</p>
                    <Button
                      className="mt-3 bg-[#0D6EFD] text-white"
                      onClick={() => handleAdd(activity)}
                    >
                      Add to Itinerary
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .animate-fadeIn { animation: fadeIn .25s ease-out; }
        .animate-scaleIn { animation: scaleIn .25s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default ActivitySearchModal;
