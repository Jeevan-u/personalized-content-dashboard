"use client";

import { useGetShowsQuery } from "@/store/apiSlice";
import ShowCard from "./ShowCard";

export default function ShowRecommendations() {
  const { data = [], isLoading, isError } = useGetShowsQuery();

  return (
    <section className="mt-12">
      <div className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Second content source</p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Show recommendations</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Entertainment picks from TVMaze.</p>
      </div>
      {isLoading && <div className="h-80 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900" />}
      {isError && <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">Recommendations are temporarily unavailable.</div>}
      {!isLoading && !isError && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((show) => <ShowCard key={show.id} {...show} />)}
        </div>
      )}
    </section>
  );
}
