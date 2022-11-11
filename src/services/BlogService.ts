import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IArticle } from "../types/IArticle";
import { INewUser } from "../types/INewUser";
import { IUser } from "../types/IUser";

export const ARTICLES_PER_PAGE = 20;

const BASE_URL = "https://blog.kata.academy/api";

function applyToken(token?: string): { [key: string]: string } {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export const api = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getArticles: build.mutation<
      { articles: IArticle[]; articlesCount: number },
      { token?: string; page: number }
    >({
      query: ({ token, page = 0 }) => {
        return {
          url: `/articles?offset=${(page - 1) * ARTICLES_PER_PAGE}`,
          headers: applyToken(token),
        };
      },
    }),

    getArticleBySlug: build.mutation<
      { article: IArticle },
      { token?: string; slug: string }
    >({
      query: ({ token, slug }) => {
        return {
          url: `/articles/${slug}`,
          headers: applyToken(token),
        };
      },
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

    getCurrentUser: build.mutation<{ user: IUser }, { token: string }>({
      query: ({ token }) => {
        return {
          url: "/user",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    editUser: build.mutation<
      { user: IUser },
      {
        token: string;
        username?: string;
        email?: string;
        password?: string;
        image?: string;
      }
    >({
      query: ({ token, ...restData }) => {
        const body = {
          user: {
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

    createArticle: build.mutation<
      { article: IArticle },
      {
        token: string;
        title: string;
        description: string;
        body: string;
        tagList?: string[];
      }
    >({
      query: ({ token, tagList = [], ...restData }) => {
        const body = {
          article: {
            tagList,
            ...restData,
          },
        };

        return {
          url: "/articles",
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
    }),

    deleteArticle: build.mutation<void, { token: string; slug: string }>({
      query: ({ token, slug }) => {
        return {
          url: `/articles/${slug}`,
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    editArticle: build.mutation<
      { article: IArticle },
      {
        token: string;
        slug: string;
        title: string;
        description: string;
        body: string;
        tagList?: string[];
      }
    >({
      query: ({ token, slug, ...restData }) => {
        const body = { article: { ...restData } };
        return {
          url: `/articles/${slug}`,
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
    }),

    favoriteArticle: build.mutation<
      { article: IArticle },
      { token: string; slug: string }
    >({
      query: ({ token, slug }) => {
        return {
          url: `/articles/${slug}/favorite`,
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),

    unfavoriteArticle: build.mutation<
      { article: IArticle },
      { token: string; slug: string }
    >({
      query: ({ token, slug }) => {
        return {
          url: `/articles/${slug}/favorite`,
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetArticlesMutation,
  useGetArticleBySlugMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserMutation,
  useEditUserMutation,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
  util: { updateQueryData },
} = api;
