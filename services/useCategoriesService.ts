"use client";

import useSWR, { mutate } from "swr";
import { swrFetcher } from "@/lib/swrFetcher";

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useCategories(fallbackData?: any) {
  const url = "/api/categories";

  const { data, error, isLoading, isValidating, mutate: mutateSelf } = useSWR(
    url,
    swrFetcher,
    {
      fallbackData,
      revalidateOnFocus: false,
      dedupingInterval: 15000,
    }
  );

  return {
    categories: (data?.categories || []) as CategoryItem[],
    isLoading,
    isValidating,
    error,
    mutateCategories: mutateSelf,
  };
}

export function revalidateAllCategories() {
  mutate("/api/categories");
}
