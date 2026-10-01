"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "@/store/preferencesSlice";
import type { RootState, AppDispatch } from "@/store/store";

const categories = [
  { name: "Tech", icon: "⌘", note: "AI & technology" },
  { name: "Sports", icon: "◉", note: "Games & teams" },
  { name: "Finance", icon: "↗", note: "Markets & business" },
  { name: "Movies", icon: "▶", note: "Film & entertainment" },
  { name: "Gaming", icon: "◇", note: "Games & releases" },
] as const;

export default function PreferencesPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategories = useSelector((state: RootState) => state.preferences.categories);

  return (
    <section className="card-surface rounded-2xl p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-sm dark:bg-gray-800">✦</span>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Your interests</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pick the topics that should shape your feed.</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">{selectedCategories.length}/5</span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => {
          const selected = selectedCategories.includes(category.name);
          return (
            <button
              key={category.name}
              type="button"
              onClick={() => dispatch(toggleCategory(category.name))}
              aria-pressed={selected}
              className={`group rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                selected
                  ? "border-gray-900 bg-gray-900 text-white shadow-sm dark:border-white dark:bg-white dark:text-gray-900"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:bg-gray-900"
              }`}
            >
              <span className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                selected ? "bg-white/10 dark:bg-gray-900/10" : "bg-white dark:bg-gray-900"
              }`}>{category.icon}</span>
              <span className="block text-sm font-semibold">{category.name}</span>
              <span className={`mt-0.5 block text-[11px] ${selected ? "text-white/65 dark:text-gray-900/60" : "text-gray-400"}`}>{category.note}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Selected: <span className="font-medium text-gray-800 dark:text-gray-200">{selectedCategories.length ? selectedCategories.join(", ") : "None yet"}</span>
        </p>
      </div>
    </section>
  );
}
