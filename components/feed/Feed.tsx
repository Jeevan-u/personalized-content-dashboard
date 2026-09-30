"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "@/components/cards/ContentCard";
import type { RootState } from "@/store/store";
import { getNews, type NewsArticle } from "@/services/newsApi";

export default function Feed() {
  const categories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const news = await getNews(categories);
        setArticles(news);
      } catch (err) {
        console.error(err);
        setError("Unable to load news right now.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, [categories]);

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Recommended for you
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          News based on your selected interests.
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Loading your feed...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          No news articles found for your selected interests.
        </div>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <ContentCard
              key={article.url}
              title={article.title}
              description={
                article.description || "No description available."
              }
              category={article.source}
              image={
                article.image ||
                "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80"
              }
              link={article.url}
            />
          ))}
        </div>
      )}
    </section>
  );
}