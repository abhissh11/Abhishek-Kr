"use client";

import useSWR, { mutate } from "swr";
import { swrFetcher } from "@/lib/swrFetcher";

export interface PostItem {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UsePostsOptions {
  page?: number;
  limit?: number;
  category?: string;
  publishedOnly?: boolean;
  fallbackData?: any;
}

export function usePosts(options: UsePostsOptions = {}) {
  const { page = 1, limit = 10, category, publishedOnly, fallbackData } = options;

  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (limit) queryParams.set("limit", limit.toString());
  if (category && category !== "All") queryParams.set("category", category);
  if (publishedOnly) queryParams.set("publishedOnly", "true");

  const url = `/api/posts?${queryParams.toString()}`;

  const { data, error, isLoading, isValidating, mutate: mutateSelf } = useSWR(
    url,
    swrFetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
    }
  );

  return {
    posts: (data?.posts || []) as PostItem[],
    pagination: data?.pagination || { totalPosts: 0, totalPages: 1, currentPage: page, limit },
    isLoading,
    isValidating,
    error,
    mutatePosts: mutateSelf,
  };
}

export function usePost(slugOrId: string | null, fallbackData?: any) {
  const url = slugOrId ? `/api/posts/${slugOrId}` : null;

  const { data, error, isLoading, isValidating, mutate: mutateSelf } = useSWR(
    url,
    swrFetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  return {
    post: (data?.post || null) as PostItem | null,
    isLoading,
    isValidating,
    error,
    mutatePost: mutateSelf,
  };
}

export function revalidateAllPosts() {
  mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
}
