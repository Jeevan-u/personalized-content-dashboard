import { NextRequest, NextResponse } from "next/server";

const categoryMap: Record<string, string> = {
  Tech: "technology",
  Sports: "sports",
  Finance: "business",
  Movies: "entertainment",
  Gaming: "technology",
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "NEWS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const categoriesParam = request.nextUrl.searchParams.get("categories");

  const categories = categoriesParam
    ? categoriesParam.split(",").filter(Boolean)
    : [];

  if (categories.length === 0) {
    return NextResponse.json([]);
  }

  try {
    const results = await Promise.all(
      categories.map(async (category) => {
        const apiCategory = categoryMap[category] || "technology";

        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${apiCategory}&pageSize=6`,
          {
            headers: {
              "X-Api-Key": apiKey,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || data.status !== "ok") {
          throw new Error(
            data.message || `Failed to fetch ${category} news`
          );
        }

        return data.articles.map(
          (article: {
            title: string;
            description: string | null;
            url: string;
            urlToImage: string | null;
            source: { name: string };
            publishedAt: string;
          }) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage,
            source: article.source.name,
            publishedAt: article.publishedAt,
            category,
          })
        );
      })
    );

    return NextResponse.json(results.flat());
  } catch (error) {
    console.error("News API error:", error);

    return NextResponse.json(
      { message: "Unable to fetch news" },
      { status: 500 }
    );
  }
}