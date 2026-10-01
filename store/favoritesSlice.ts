import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavoriteItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link?: string;
};

type FavoritesState = { items: FavoriteItem[] };

const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const item = action.payload;
      const exists = state.items.some((favorite) => favorite.id === item.id);
      state.items = exists
        ? state.items.filter((favorite) => favorite.id !== item.id)
        : [...state.items, item];
    },
    setFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
