import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows?page=1", {
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error("Failed to fetch shows");
    const shows = await response.json();

    const recommendations = shows.slice(0, 12).map((show: {
      id: number;
      name: string;
      summary: string | null;
      image: { medium: string | null } | null;
      url: string;
      rating: { average: number | null };
    }) => ({
      id: show.id,
      title: show.name,
      description: show.summary?.replace(/<[^>]*>/g, "") || "No description available.",
      image: show.image?.medium || null,
      rating: show.rating?.average ?? null,
      link: show.url,
    }));

    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("TVMaze API error:", error);
    return NextResponse.json({ message: "Unable to fetch recommendations" }, { status: 500 });
  }
}
