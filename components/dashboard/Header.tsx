"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Header() {
  const categories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Your Feed
        </h2>
        <p className="text-sm text-gray-500">
          Based on: {categories.join(", ")}
        </p>
      </div>

      <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
        Settings
      </button>
    </header>
  );
}