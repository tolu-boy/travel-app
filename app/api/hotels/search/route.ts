import { NextResponse } from 'next/server';


interface BookingComHotel {
  property: {
    id: number;
    name: string;
    address?: string;
    reviewScore?: number;
    reviewCount?: number;
    priceBreakdown?: { grossPrice?: { value: number } };
    photoUrls?: string[];
  };
}

interface BookingComResponse {
  status: string;
  data?: {
    hotels: BookingComHotel[];
  };
}

interface HotelSearchRequestBody {
  dest_id: string | number;
  search_type: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
}

export async function POST(request: Request) {
  // const body = await request.json();
  const body: HotelSearchRequestBody = await request.json();
  const { dest_id, search_type, checkIn, checkOut, rooms, adults } = body;
  
  console.log('Request body:', body);
  if (!dest_id || !search_type || !checkIn || !checkOut || !rooms || !adults) {
    console.error('Missing required fields', { dest_id, search_type, checkIn, checkOut, rooms, adults });
    return NextResponse.json({ error: 'Missing required fields', hotels: [] }, { status: 400 });
  }
  try {
    // Build query params
    const params = new URLSearchParams({
      dest_id: dest_id.toString(),
      search_type: search_type,
      arrival_date: checkIn,
      departure_date: checkOut,
      adults: adults.toString(),
      room_qty: rooms.toString(),
      units: 'metric',
      temperature_unit: 'c',
      languagecode: 'en-us',
      currency_code: 'USD'
    });

    const response = await fetch(
      `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?${params}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
          'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: BookingComResponse  = await response.json();

    console.log('Booking.com API response:', data);
    
    if (!data.status || !data.data?.hotels) {
      return NextResponse.json({ hotels: [] });
    }
    
    // Calculate nights
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Transform API response to match your Hotel interface
    const hotels = data.data.hotels.map((item) => {
      const prop = item.property;
      const price = prop.priceBreakdown?.grossPrice?.value || 0;
      
      return {
        id: prop.id.toString(),
        name: prop.name || 'Hotel Name',
        address: prop.name || 'Address not available',
        rating: prop.reviewScore || 0,
        reviewCount: prop.reviewCount || 0,
        roomType: 'Standard Room',
        price: `₦ ${price.toLocaleString('en-NG', { maximumFractionDigits: 2 })}`,
        totalPrice: `NGN ${price.toLocaleString('en-NG', { maximumFractionDigits: 2 })}`,
        nights: nights,
        rooms,
        facilities: ['WiFi', 'Pool', 'Restaurant'], // Default facilities
        checkIn: checkIn,
        checkOut: checkOut,
        images: prop.photoUrls && prop.photoUrls.length > 0 
          ? prop.photoUrls.map((url: string) => url.replace('square60', 'max1024x768'))
          : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop']
      };
    });
    
    return NextResponse.json({ hotels });
  } catch (error) {
    console.error('Hotel search failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels', hotels: [] },
      { status: 500 }
    );
  }
}