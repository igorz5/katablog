import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../types/IArticle";

export const ARTICLES_PER_PAGE = 20;

const BASE_URL = "https://blog.kata.academy/api";

export const api = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getArticles: build.query<
      { articles: IArticle[]; articlesCount: number },
      number
    >({
      query: (page = 0) => `/articles?offset=${(page - 1) * ARTICLES_PER_PAGE}`,
    }),
    getArticleBySlug: build.query<{ article: IArticle }, string>({
      query: (slug) => `/articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleBySlugQuery } = api;
