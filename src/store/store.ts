import { configureStore } from "@reduxjs/toolkit";

import { articlesReducer } from "./reducers/articlesSlice";
import { api } from "../services/BlogService";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
