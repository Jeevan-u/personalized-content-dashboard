"use client";

const menuItems = [
  "For You",
  "Trending",
  "Favorites",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-60 border-r border-gray-200 bg-white p-5 md:block">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">PulseBoard</h1>
        <p className="mt-1 text-xs text-gray-500">
          Personalized content
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={item}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
              index === 0
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}