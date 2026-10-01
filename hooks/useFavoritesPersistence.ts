"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setFavorites } from "@/store/favoritesSlice";

export default function useFavoritesPersistence() {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("content-favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) dispatch(setFavorites(parsed));
      } catch {
        localStorage.removeItem("content-favorites");
      }
    }
    setLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (loaded) localStorage.setItem("content-favorites", JSON.stringify(favorites));
  }, [favorites, loaded]);
}
