"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setCategories } from "@/store/preferencesSlice";

export default function usePreferencesPersistence() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(
    (state: RootState) => state.preferences.categories
  );

  useEffect(() => {
    const savedPreferences = localStorage.getItem("content-preferences");

    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);

        if (Array.isArray(parsedPreferences)) {
          dispatch(setCategories(parsedPreferences));
        }
      } catch {
        console.log("Could not load saved preferences");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "content-preferences",
      JSON.stringify(categories)
    );
  }, [categories]);
}