"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ContentCard from "@/components/cards/ContentCard";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <section>
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Saved for later</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Favorites</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Articles you saved from your feed.</p>
      </div>
      {favorites.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">You haven't saved anything yet.</p>
          <p className="mt-1 text-xs text-gray-400">Click the heart on an article to save it here.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => <ContentCard key={item.id} {...item} />)}
        </div>
      )}
    </section>
  );
}
