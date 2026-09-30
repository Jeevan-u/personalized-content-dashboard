export type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
};

type NewsApiResponse = {
  status: string;
  articles: {
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    source: {
      name: string;
    };
    publishedAt: string;
  }[];
  message?: string;
};

const categoryMap: Record<string, string> = {
  Tech: "technology",
  Sports: "sports",
  Finance: "business",
  Movies: "entertainment",
  Gaming: "technology",
};

export async function getNews(
  categories: string[]
): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error("NEWS_API_KEY is not configured");
  }

  const selectedCategory = categories[0] || "Tech";
  const apiCategory = categoryMap[selectedCategory] || "technology";

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${apiCategory}&pageSize=12`,
    {
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data: NewsApiResponse = await response.json();

  if (data.status !== "ok") {
    throw new Error(data.message || "News API request failed");
  }

  return data.articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.urlToImage,
    source: article.source.name,
    publishedAt: article.publishedAt,
  }));
}