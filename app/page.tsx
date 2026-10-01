"use client";

import { useEffect, useState } from "react";
import Feed from "@/components/feed/Feed";
import ShowRecommendations from "@/components/shows/ShowRecommendations";
import Favorites from "@/components/favorites/Favorites";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import PreferencesPanel from "@/components/preferences/PreferencesPanel";
import usePreferencesPersistence from "@/hooks/usePreferencesPersistence";
import useFavoritesPersistence from "@/hooks/useFavoritesPersistence";

export default function Home() {
  const [activeView, setActiveView] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  usePreferencesPersistence();
  useFavoritesPersistence();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setDarkMode(localStorage.getItem("pulseboard-theme") === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("pulseboard-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function changeView(view: string) {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view !== "For You") setSearchQuery("");
  }

  return (
    <main className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="flex min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
        <Sidebar
          activeView={activeView}
          onChangeView={changeView}
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            activeView={activeView}
            onOpenSettings={() => changeView("Settings")}
            onOpenMenu={() => setMobileMenuOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((current) => !current)}
          />
          <section className="flex-1 p-4 sm:p-6">
            <div className="mx-auto max-w-7xl">
              {activeView === "For You" && (
                <>
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Personalized dashboard</p>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Welcome back</h1>
                    <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">Explore news and entertainment picked around your interests.</p>
                  </div>
                  <PreferencesPanel />
                  <Feed searchQuery={debouncedSearch} />
                  <ShowRecommendations />
                </>
              )}

              {activeView === "Trending" && (
                <>
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">What is getting attention</p>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Trending</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Current general headlines from the news feed.</p>
                  </div>
                  <Feed searchQuery="" mode="trending" />
                </>
              )}

              {activeView === "Favorites" && <Favorites />}

              {activeView === "Settings" && (
                <>
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Personalize your dashboard</p>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your interests and display preferences.</p>
                  </div>
                  <div className="space-y-6">
                    <PreferencesPanel />
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose how PulseBoard looks on your device.</p>
                      <button
                        type="button"
                        onClick={() => setDarkMode((current) => !current)}
                        className="mt-5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                      >
                        {darkMode ? "Use light mode" : "Use dark mode"}
                      </button>
                    </section>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}