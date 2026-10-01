import { NextRequest, NextResponse } from "next/server";

const categoryMap: Record<string, string> = {
  Tech: "technology",
  Sports: "sports",
  Finance: "business",
  Movies: "entertainment",
  Gaming: "technology",
};

const pageNumber = (value: string | null) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : 1;
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return NextResponse.json({ message: "NEWS_API_KEY is not configured" }, { status: 500 });

  const search = request.nextUrl.searchParams.get("search")?.trim() || "";
  const categories = (request.nextUrl.searchParams.get("categories") || "").split(",").map((item) => item.trim()).filter(Boolean);
  const mode = request.nextUrl.searchParams.get("mode") || "personalized";
  const page = pageNumber(request.nextUrl.searchParams.get("page"));
  const pageSize = search ? 12 : 6;

  if (!search && mode === "personalized" && categories.length === 0) {
    return NextResponse.json({ articles: [], totalResults: 0, page, pageSize, hasMore: false });
  }

  try {
    if (search) {
      const params = new URLSearchParams({
        q: search.slice(0, 100),
        language: "en",
        sortBy: "publishedAt",
        pageSize: String(pageSize),
        page: String(page),
      });
      const response = await fetch(`https://newsapi.org/v2/everything?${params}`, { headers: { "X-Api-Key": apiKey }, next: { revalidate: 60 } });
      const data = await response.json();
      if (!response.ok || data.status !== "ok") throw new Error(data.message || "Failed to search news");

      const articles = data.articles.map((article: {title:string;description:string|null;url:string;urlToImage:string|null;source:{name:string};publishedAt:string}) => ({
        title: article.title, description: article.description, url: article.url, image: article.urlToImage,
        source: article.source.name, publishedAt: article.publishedAt, category: "Search",
      }));
      return NextResponse.json({ articles, totalResults: data.totalResults, page, pageSize, hasMore: page * pageSize < data.totalResults });
    }

    if (mode === "trending") {
      const params = new URLSearchParams({ country: "us", category: "general", pageSize: String(pageSize), page: String(page) });
      const response = await fetch(`https://newsapi.org/v2/top-headlines?${params}`, { headers: { "X-Api-Key": apiKey }, next: { revalidate: 60 } });
      const data = await response.json();
      if (!response.ok || data.status !== "ok") throw new Error(data.message || "Failed to fetch trending news");
      const articles = data.articles.map((article: {title:string;description:string|null;url:string;urlToImage:string|null;source:{name:string};publishedAt:string}) => ({
        title: article.title, description: article.description, url: article.url, image: article.urlToImage,
        source: article.source.name, publishedAt: article.publishedAt, category: "Trending",
      }));
      return NextResponse.json({ articles, totalResults: data.totalResults || articles.length, page, pageSize, hasMore: articles.length === pageSize });
    }

    const results = await Promise.all(categories.map(async (category) => {
      const params = new URLSearchParams({ country: "us", category: categoryMap[category] || "technology", pageSize: String(pageSize), page: String(page) });
      const response = await fetch(`https://newsapi.org/v2/top-headlines?${params}`, { headers: { "X-Api-Key": apiKey }, next: { revalidate: 60 } });
      const data = await response.json();
      if (!response.ok || data.status !== "ok") throw new Error(data.message || `Failed to fetch ${category} news`);
      return {
        totalResults: data.totalResults || 0,
        articles: data.articles.map((article: {title:string;description:string|null;url:string;urlToImage:string|null;source:{name:string};publishedAt:string}) => ({
          title: article.title, description: article.description, url: article.url, image: article.urlToImage,
          source: article.source.name, publishedAt: article.publishedAt, category,
        })),
      };
    }));

    const articles = results.flatMap((result) => result.articles);
    const totalResults = results.reduce((total, result) => total + result.totalResults, 0);
    return NextResponse.json({ articles, totalResults, page, pageSize, hasMore: results.some((result) => result.articles.length === pageSize) });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json({ message: "Unable to fetch news" }, { status: 500 });
  }
}
