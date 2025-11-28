// app/api/flights/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const fromId = searchParams.get("fromId");
  const toId = searchParams.get("toId");
  const departDate = searchParams.get("departDate");

  try {
    const url = new URL("https://booking-com15.p.rapidapi.com/api/v1/flights/search");
    url.searchParams.append("fromId", fromId || "");
    url.searchParams.append("toId", toId || "");
    url.searchParams.append("departDate", departDate || "");

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
        "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
      },
    });

    const data = await res.json();

    console.log("Flight API response:", JSON.stringify(data, null, 2)); // log full response

    return NextResponse.json(data);
  } catch (error) {
    console.error("Flight search failed:", error);
    return NextResponse.json({ error: "Flight search failed", details: error }, { status: 500 });
  }
}
