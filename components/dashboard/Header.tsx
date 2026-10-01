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
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/90 px-4 py-3.5 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/90 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        <button type="button" onClick={onOpenMenu} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-gray-50 md:hidden dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800" aria-label="Open navigation">☰</button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-base font-semibold tracking-tight text-gray-900 dark:text-white sm:text-lg">
              {activeView === "For You" ? "Your Feed" : activeView}
            </h2>
            {activeView === "For You" && categories.length > 0 && (
              <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500 sm:inline-flex dark:bg-gray-900 dark:text-gray-400">
                {categories.length} {categories.length === 1 ? "interest" : "interests"}
              </span>
            )}
          </div>
          <p className="hidden truncate text-xs text-gray-500 sm:block dark:text-gray-400">
            {categories.length ? categories.join(" · ") : "Choose interests to personalize your feed"}
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          {activeView === "For You" && (
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search your feed"
                className="w-60 rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:bg-gray-900"
                aria-label="Search your feed"
              />
            </div>
          )}
          <button type="button" onClick={onToggleDarkMode} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-sm transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800" aria-label="Toggle dark mode">
            {darkMode ? "☀" : "☾"}
          </button>
          <button type="button" onClick={onOpenSettings} className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
            Settings
          </button>
        </div>
      </div>
      {activeView === "For You" && (
        <div className="mx-auto mt-3 flex max-w-7xl gap-2 sm:hidden">
          <div className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search your feed"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              aria-label="Search your feed"
            />
          </div>
          <button type="button" onClick={onToggleDarkMode} className="rounded-xl border border-gray-200 bg-white px-3 dark:border-gray-800 dark:bg-gray-900" aria-label="Toggle dark mode">
            {darkMode ? "☀" : "☾"}
          </button>
        </div>
      )}
    </header>
  );
}
