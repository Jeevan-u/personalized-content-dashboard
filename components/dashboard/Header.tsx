"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

type HeaderProps = {
  activeView: string;
  onOpenSettings: () => void;
  onOpenMenu: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function Header({
  activeView,
  onOpenSettings,
  onOpenMenu,
  searchQuery,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const categories = useSelector((state: RootState) => state.preferences.categories);

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:px-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onOpenMenu} className="rounded-lg border border-gray-200 px-3 py-2 text-sm md:hidden dark:border-gray-800" aria-label="Open navigation">☰</button>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
            {activeView === "For You" ? "Your Feed" : activeView}
          </h2>
          <p className="hidden truncate text-sm text-gray-500 sm:block dark:text-gray-400">
            {categories.length ? `Based on: ${categories.join(", ")}` : "No interests selected"}
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {activeView === "For You" && (
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search your feed..."
              className="w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              aria-label="Search your feed"
            />
          )}
          <button type="button" onClick={onToggleDarkMode} className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-800" aria-label="Toggle dark mode">
            {darkMode ? "☀" : "☾"}
          </button>
          <button type="button" onClick={onOpenSettings} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium dark:border-gray-800">
            Settings
          </button>
        </div>
      </div>
      {activeView === "For You" && (
        <div className="mt-3 flex gap-2 sm:hidden">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search your feed..."
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            aria-label="Search your feed"
          />
          <button type="button" onClick={onToggleDarkMode} className="rounded-lg border border-gray-200 px-3 dark:border-gray-800" aria-label="Toggle dark mode">
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      )}
    </header>
  );
}
