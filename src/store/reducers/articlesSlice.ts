import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ArticlesState {
  currentPage: number;
}

const initialState: ArticlesState = { currentPage: 1 };

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
