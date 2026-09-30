"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "@/store/preferencesSlice";
import type { RootState, AppDispatch } from "@/store/store";

const categories = [
  "Tech",
  "Sports",
  "Finance",
  "Movies",
  "Gaming",
] as const;

export default function PreferencesPanel() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedCategories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Your interests
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Choose the topics you want to see in your feed.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const selected = selectedCategories.includes(category);

          return (
            <button
              key={category}
              onClick={() => dispatch(toggleCategory(category))}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-gray-500">
        Selected:{" "}
        <span className="font-medium text-gray-800">
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "None"}
        </span>
      </p>
    </section>
  );
}