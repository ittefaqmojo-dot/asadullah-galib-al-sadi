import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://asadullahsadi.ct.ws/wp-json/wp/v2/posts?categories=3&per_page=50",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "WordPress API failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to connect to WordPress" },
      { status: 500 }
    );
  }
}
