import { useQuery } from '@tanstack/react-query';
import { Hotel } from '@/store/itineraryStore';

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

const fetchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  // 1. Get destination id
  const destRes = await fetch(`/api/hotels/searchDestination?query=${encodeURIComponent(params.location)}`);
  const destData = await destRes.json();

  if (!destData.destinations || destData.destinations.length === 0) {
    return [];
  }

  const { dest_id, dest_type } = destData.destinations[0];

  // 2. Fetch hotels
  const res = await fetch('/api/hotels/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dest_id,
      search_type: dest_type,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      rooms: params.rooms,
      adults: params.guests,
    }),
  });

  const data = await res.json();
  return data.hotels;
};

export const useHotelSearch = (params: SearchParams, enabled = false) =>
  useQuery({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(params),
    enabled, // only fetch when explicitly triggered
  });
