import { NextResponse } from 'next/server';


interface BookingComDestination {
    dest_id: string;
    name: string;
    label: string;
    dest_type: string;
    city_name: string;
    country: string;
    latitude?: number;
    longitude?: number;
    image_url?: string;
    nr_hotels?: number;
  }
  
  interface DestinationResponse {
    data?: BookingComDestination[];
  }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST!
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json: DestinationResponse  = await response.json();

    // Transform to simpler format
    const destinations = json.data?.map((dest) => ({
      dest_id: dest.dest_id,
      name: dest.name,
      label: dest.label,
      dest_type: dest.dest_type,
      city_name: dest.city_name,
      country: dest.country,
      latitude: dest.latitude,
      longitude: dest.longitude,
      image_url: dest.image_url,
      nr_hotels: dest.nr_hotels
    })) || [];

    return NextResponse.json({ destinations, status: true });
  } catch (error) {
    console.error('Destination search failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations', destinations: [], status: false },
      { status: 500 }
    );
  }
}
