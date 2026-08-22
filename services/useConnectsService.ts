"use client";

import useSWR, { mutate } from "swr";
import { swrFetcher } from "@/lib/swrFetcher";

export interface ConnectItem {
  _id: string;
  email: string;
  selectedOption: string;
  note?: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

export function useConnects(fallbackData?: any) {
  const url = "/api/connects";

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
    connects: (data?.connects || []) as ConnectItem[],
    isLoading,
    isValidating,
    error,
    mutateConnects: mutateSelf,
  };
}

export function revalidateAllConnects() {
  mutate("/api/connects");
}

export async function updateConnectStatus(id: string, status: ConnectItem["status"]) {
  const res = await fetch(`/api/connects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to update status");
  }
  revalidateAllConnects();
  return data.connect;
}

export async function deleteConnect(id: string) {
  const res = await fetch(`/api/connects/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to delete submission");
  }
  revalidateAllConnects();
  return data;
}
