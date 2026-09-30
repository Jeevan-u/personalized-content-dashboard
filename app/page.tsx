"use client";
import Feed from "@/components/feed/Feed";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import PreferencesPanel from "@/components/preferences/PreferencesPanel";
import usePreferencesPersistence from "@/hooks/usePreferencesPersistence";

export default function Home() {
  usePreferencesPersistence();

  return (
    <main className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <section className="p-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back
              </h1>

              <p className="mt-2 text-gray-600">
                Explore content based on your interests.
              </p>
            </div>

            <PreferencesPanel />
            <Feed />
          </div>
        </section>
      </div>
    </main>
  );
}