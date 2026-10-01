import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type NewsArticle = {
  title: string;
  description: string | null;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
  category: string;
};

export type NewsResponse = {
  articles: NewsArticle[];
  totalResults: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

type NewsQuery = {
  categories: string[];
  search: string;
  page: number;
  mode: "personalized" | "trending";
};

export type RecommendedShow = {
  id: number;
  title: string;
  description: string;
  image: string | null;
  rating: number | null;
  link: string;
};

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, NewsQuery>({
      query: ({ categories, search, page, mode }) => ({
        url: "api/news",
        params: {
          categories: categories.join(","),
          search,
          page: String(page),
          mode,
        },
      }),
    }),
    getShows: builder.query<RecommendedShow[], void>({
      query: () => "api/shows",
    }),
  }),
});

export const { useGetNewsQuery, useGetShowsQuery } = contentApi;
