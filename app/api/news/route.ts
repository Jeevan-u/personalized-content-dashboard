import { NextRequest, NextResponse } from "next/server";

const categoryQueries: Record<string, string> = {
  Tech: "(technology OR software OR AI OR cybersecurity OR programming)",
  Sports: "(sports OR football OR cricket OR basketball OR tennis)",
  Finance: "(finance OR markets OR stocks OR business OR economy)",
  Movies: "(movies OR cinema OR film OR streaming OR entertainment)",
  Gaming: "(gaming OR videogames OR PlayStation OR Xbox OR Nintendo)",
};

const pageNumber = (value: string | null) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 1;
};

type GdeltArticle = {
  title?: string;
  url?: string;
  seendate?: string;
  socialimage?: string;
  domain?: string;
};

function normalizeArticle(article: GdeltArticle, category: string) {
  return {
    title: article.title || "Untitled article",
    description: article.domain ? `Latest coverage from ${article.domain}.` : "Latest news coverage.",
    url: article.url || "",
    image: article.socialimage || null,
    source: article.domain || "News source",
    publishedAt: article.seendate || new Date().toISOString(),
    category,
  };
}

async function fetchGdelt(query: string, maxRecords: number) {
  const params = new URLSearchParams({
    query,
    mode: "artlist",
    format: "json",
    maxrecords: String(Math.min(maxRecords, 250)),
    timespan: "24h",
    sort: "datedesc",
  });

  const response = await fetch(
    `https://api.gdeltproject.org/api/v2/doc/doc?${params.toString()}`,
    { next: { revalidate: 300 } }
  );

  if (!response.ok) {
    throw new Error(`GDELT returned ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data.articles)) {
    throw new Error(data?.message || "GDELT returned an invalid response");
  }

  return data.articles as GdeltArticle[];
}

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const categories = (request.nextUrl.searchParams.get("categories") || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const mode = request.nextUrl.searchParams.get("mode") || "personalized";
  const page = pageNumber(request.nextUrl.searchParams.get("page"));
  const pageSize = search ? 12 : 6;

  if (!search && mode === "personalized" && categories.length === 0) {
    return NextResponse.json({
      articles: [],
      totalResults: 0,
      page,
      pageSize,
      hasMore: false,
    });
  }

  try {
    if (search) {
      const query = search.slice(0, 100);
      const allArticles = await fetchGdelt(query, Math.min(page * pageSize, 60));
      const start = (page - 1) * pageSize;
      const articles = allArticles
        .slice(start, start + pageSize)
        .map((article) => normalizeArticle(article, "Search"))
        .filter((article) => article.url);

      return NextResponse.json({
        articles,
        totalResults: allArticles.length,
        page,
        pageSize,
        hasMore: start + articles.length < allArticles.length && allArticles.length >= page * pageSize,
      });
    }

    if (mode === "trending") {
      const allArticles = await fetchGdelt(
        "(technology OR sports OR business OR entertainment OR science OR world)",
        Math.min(page * pageSize, 60)
      );
      const start = (page - 1) * pageSize;
      const articles = allArticles
        .slice(start, start + pageSize)
        .map((article) => normalizeArticle(article, "Trending"))
        .filter((article) => article.url);

      return NextResponse.json({
        articles,
        totalResults: allArticles.length,
        page,
        pageSize,
        hasMore: start + articles.length < allArticles.length && allArticles.length >= page * pageSize,
      });
    }

    const selectedCategories = categories.filter((category) => categoryQueries[category]);

    const results = await Promise.all(
      selectedCategories.map(async (category) => {
        const allArticles = await fetchGdelt(
          categoryQueries[category],
          Math.min(page * pageSize, 60)
        );
        const start = (page - 1) * pageSize;
        return {
          totalResults: allArticles.length,
          articles: allArticles
            .slice(start, start + pageSize)
            .map((article) => normalizeArticle(article, category))
            .filter((article) => article.url),
        };
      })
    );

    const articles = results.flatMap((result) => result.articles);

    return NextResponse.json({
      articles,
      totalResults: results.reduce((total, result) => total + result.totalResults, 0),
      page,
      pageSize,
      hasMore: results.some((result) => result.articles.length === pageSize),
    });
  } catch (error) {
    console.error("News feed error:", error);
    return NextResponse.json(
      { message: "Unable to fetch news right now. Please try again." },
      { status: 502 }
    );
  }
}
