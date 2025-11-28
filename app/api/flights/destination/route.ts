import { NextResponse } from "next/server";

interface Airport {
  id: string;
  name: string;
  code: string;
  cityName: string;
  countryName: string;
  photoUri?: string;
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ data: [] });
  }

  try {
    const response = await fetch(
      `https://booking-com15.p.rapidapi.com/api/v1/flights/locations?query=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
        },
      }
    );

    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const json: { data: Airport[] } = await response.json();

    const airports: Airport[] =
      json.data?.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        cityName: item.cityName,
        countryName: item.countryName,
        photoUri: item.photoUri,
      })) || [];

    return NextResponse.json({ data: airports });
  } catch (error) {
    console.error("Flight location fetch failed:", error);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
