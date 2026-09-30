import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Category = "Tech" | "Sports" | "Finance" | "Movies" | "Gaming";

interface PreferencesState {
  categories: Category[];
}

const initialState: PreferencesState = {
  categories: ["Tech", "Movies"],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<Category>) => {
      const category = action.payload;

      if (state.categories.includes(category)) {
        state.categories = state.categories.filter(
          (item) => item !== category
        );
      } else {
        state.categories.push(category);
      }
    },

    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { toggleCategory, setCategories } = preferencesSlice.actions;

export default preferencesSlice.reducer;