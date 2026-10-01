"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ContentCard from "@/components/cards/ContentCard";
import type { RootState } from "@/store/store";
import { useGetNewsQuery, type NewsArticle } from "@/store/apiSlice";

type FeedProps = { searchQuery: string; mode?: "personalized" | "trending" };

export default function Feed({ searchQuery, mode = "personalized" }: FeedProps) {
  const categories = useSelector((state: RootState) => state.preferences.categories);
  const categoryKey = useMemo(() => categories.join(","), [categories]);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const draggingId = useRef<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const skip = mode === "personalized" && categories.length === 0 && !searchQuery;
  const { data, isLoading, isFetching, error } = useGetNewsQuery(
    { categories, search: searchQuery, page, mode },
    { skip }
  );

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
  }, [categoryKey, searchQuery, mode]);

  useEffect(() => {
    if (!data) return;
    setHasMore(data.hasMore);
    setArticles((current) => {
      if (page === 1) return data.articles;
      const known = new Set(current.map((article) => article.url));
      return [...current, ...data.articles.filter((article) => !known.has(article.url))];
    });
  }, [data, page]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore || isFetching) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setPage((current) => current + 1);
    }, { rootMargin: "500px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  function dropOn(targetId: string) {
    const sourceId = draggingId.current;
    draggingId.current = null;
    if (!sourceId || sourceId === targetId) return;

    setArticles((current) => {
      const sourceIndex = current.findIndex((article) => article.url === sourceId);
      const targetIndex = current.findIndex((article) => article.url === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      localStorage.setItem(`feed-order:${mode}:${searchQuery}`, JSON.stringify(next.map((article) => article.url)));
      return next;
    });
  }

  useEffect(() => {
    if (page !== 1 || !data) return;
    const saved = localStorage.getItem(`feed-order:${mode}:${searchQuery}`);
    if (!saved) return;
    try {
      const order = new Map((JSON.parse(saved) as string[]).map((id, index) => [id, index]));
      setArticles((current) => [...current].sort((a, b) =>
        (order.get(a.url) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.url) ?? Number.MAX_SAFE_INTEGER)
      ));
    } catch {
      localStorage.removeItem(`feed-order:${mode}:${searchQuery}`);
    }
  }, [data, mode, searchQuery, page]);

  const title = searchQuery ? `Search results for "${searchQuery}"` : mode === "trending" ? "Trending now" : "Recommended for you";

  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {searchQuery ? "Articles matching your search." : mode === "trending" ? "Current headlines from the news feed." : "News based on your selected interests."}
        </p>
      </div>

      {isLoading && <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{[1,2,3].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />)}</div>}

      {!isLoading && error && <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">Unable to load the feed right now.</div>}

      {!isLoading && !error && articles.length === 0 && <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900"><p className="text-sm text-gray-500 dark:text-gray-400">{searchQuery ? "No articles found for your search." : "No articles found for the current preferences."}</p></div>}

      {!isLoading && !error && articles.length > 0 && (
        <>
          <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
            <span>Drag cards to reorder them.</span>
            {isFetching && <span>Loading more...</span>}
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <ContentCard
                key={article.url}
                id={article.url}
                title={article.title}
                description={article.description || "No description available."}
                category={article.category}
                image={article.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80"}
                draggable
                onDragStart={() => { draggingId.current = article.url; }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropOn(article.url)}
              />
            ))}
          </div>
          <div ref={sentinelRef} className="h-16" />
          {!hasMore && <p className="pb-4 text-center text-xs text-gray-400">You have reached the end of this feed.</p>}
        </>
      )}
    </section>
  );
}
