import { configureStore } from "@reduxjs/toolkit";

import { articlesReducer } from "./reducers/articlesSlice";
import { authReducer } from "./reducers/authSlice";
import { api } from "../services/BlogService";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
