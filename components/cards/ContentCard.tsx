"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { toggleFavorite, type FavoriteItem } from "@/store/favoritesSlice";

type ContentCardProps = FavoriteItem & {
  draggable?: boolean;
  onDragStart?: () => void;
  onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
  onDrop?: () => void;
};

export default function ContentCard({
  id, title, description, category, image, link,
  draggable = false, onDragStart, onDragOver, onDrop,
}: ContentCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const favorite = favorites.some((item) => item.id === id);

  return (
    <article
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img src={image} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent opacity-70" />
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {category}
        </div>
        <button
          type="button"
          onClick={() => dispatch(toggleFavorite({ id, title, description, image, category, link }))}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/90 text-lg shadow-sm backdrop-blur transition hover:scale-105 dark:bg-gray-950/85"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span className={favorite ? "text-red-500" : "text-gray-700 dark:text-gray-200"}>{favorite ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 min-h-12 text-[17px] font-semibold leading-6 tracking-tight text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gray-900 transition hover:gap-2 dark:text-white">
            Read article <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
