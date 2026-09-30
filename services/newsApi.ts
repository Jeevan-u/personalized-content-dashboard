export type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
  category: string;
};

export async function getNews(
  categories: string[]
): Promise<NewsArticle[]> {
  if (categories.length === 0) {
    return [];
  }

  const params = new URLSearchParams({
    categories: categories.join(","),
  });

  const response = await fetch(`/api/news?${params.toString()}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch news");
  }

  return data;
}