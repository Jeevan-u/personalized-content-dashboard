"use client";

type SidebarProps = {
  activeView: string;
  onChangeView: (view: string) => void;
  mobileOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { label: "For You", icon: "⌂" },
  { label: "Trending", icon: "↗" },
  { label: "Favorites", icon: "♡" },
  { label: "Settings", icon: "⚙" },
];

export default function Sidebar({ activeView, onChangeView, mobileOpen, onClose }: SidebarProps) {
  const navigation = (
    <>
      <div className="mb-9 px-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white shadow-sm dark:bg-white dark:text-gray-900">P</div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-gray-900 dark:text-white">PulseBoard</h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Personalized content</p>
          </div>
        </div>
      </div>
      <nav className="space-y-1.5" aria-label="Main navigation">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Workspace</p>
        {menuItems.map((item) => {
          const active = activeView === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onChangeView(item.label)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-gray-900 text-white shadow-sm dark:bg-white dark:text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
              }`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-base ${
                active ? "bg-white/10 dark:bg-gray-900/10" : "bg-gray-100 dark:bg-gray-900"
              }`}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Make it yours</p>
        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">Choose interests to shape your feed.</p>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-5 md:flex dark:border-gray-800 dark:bg-gray-950">
        {navigation}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button type="button" className="absolute inset-0 bg-gray-950/50 backdrop-blur-[2px]" onClick={onClose} aria-label="Close navigation" />
          <aside className="relative flex h-full w-80 flex-col border-r border-gray-200 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-950">
            <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900" aria-label="Close navigation">✕</button>
            {navigation}
          </aside>
        </div>
      )}
    </>
  );
}
