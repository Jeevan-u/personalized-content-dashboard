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
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800">
        <img src={image} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
        <button
          type="button"
          onClick={() => dispatch(toggleFavorite({ id, title, description, image, category, link }))}
          className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:scale-105 dark:bg-gray-900/90"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{category}</span>
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        {link && <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium underline underline-offset-4">Read more</a>}
      </div>
    </article>
  );
}
