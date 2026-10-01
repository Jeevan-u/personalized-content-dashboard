"use client";

type SidebarProps = {
  activeView: string;
  onChangeView: (view: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
};

const menuItems = ["For You", "Trending", "Favorites", "Settings"];

export default function Sidebar({ activeView, onChangeView, mobileOpen, onClose }: SidebarProps) {
  const navigation = (
    <>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">PulseBoard</h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Personalized content</p>
      </div>
      <nav className="space-y-2" aria-label="Main navigation">
        {menuItems.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChangeView(item)}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${activeView === item ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"}`}
          >
            {item}
          </button>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <aside className="hidden min-h-screen w-60 shrink-0 border-r border-gray-200 bg-white p-5 md:block dark:border-gray-800 dark:bg-gray-950">
        {navigation}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close navigation" />
          <aside className="relative h-full w-72 border-r border-gray-200 bg-white p-5 shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg px-2 py-1" aria-label="Close navigation">✕</button>
            {navigation}
          </aside>
        </div>
      )}
    </>
  );
}
