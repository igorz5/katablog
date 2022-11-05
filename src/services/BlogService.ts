import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../types/IArticle";
import { INewUser } from "../types/INewUser";
import { IUser } from "../types/IUser";

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

    registerUser: build.mutation<
      { user: INewUser },
      { username: string; email: string; password: string }
    >({
      query: (data) => {
        const body = {
          user: data,
        };

        return {
          url: "/users",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),

    loginUser: build.mutation<
      { user: IUser },
      { email: string; password: string }
    >({
      query: (data) => {
        const body = {
          user: data,
        };

        return {
          url: "/users/login",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        };
      },
    }),

    editUser: build.mutation<
      { user: IUser },
      {
        username?: string;
        email?: string;
        password?: string;
        imageUrl?: string;
        token: string;
      }
    >({
      query: (data) => {
        const { token, imageUrl, ...restData } = data;
        const body = {
          user: {
            image: imageUrl,
            ...restData,
          },
        };

        return {
          url: "/user",
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleBySlugQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useEditUserMutation,
} = api;
