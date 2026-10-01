"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import ContentCard from "@/components/cards/ContentCard";

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <section className="animate-fade-up">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">Saved for later</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Favorites</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Keep the stories you want to come back to.</p>
        </div>
        {favorites.length > 0 && <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:bg-gray-900 dark:text-gray-300">{favorites.length} saved</span>}
      </div>
      {favorites.length === 0 ? (
        <div className="card-surface rounded-2xl p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-gray-800">♡</div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Nothing saved yet</h2>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">Tap the heart on an article you want to keep. Your saved stories will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((item) => <ContentCard key={item.id} {...item} />)}
        </div>
      )}
    </section>
  );
}
