import React from "react";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import Category from "@/models/Category";
import BlogsClientView from "./BlogsClientView";

export const metadata: Metadata = {
  title: "Technical Thoughts & Experiences | Abhishek Kumar",
  description:
    "Deep dives into software architecture, AI leverage, full-stack engineering, and personal insights by Abhishek Kumar.",
  openGraph: {
    title: "Technical Thoughts & Experiences | Abhishek Kumar",
    description:
      "Deep dives into software architecture, AI leverage, full-stack engineering, and personal insights by Abhishek Kumar.",
    type: "website",
  },
};

// Cache categories for 1 hour — rarely changes
const getCachedCategories = unstable_cache(
  async () => {
    await dbConnect();
    const raw = await Category.find().sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(raw));
  },
  ["blog-categories"],
  { tags: ["categories"], revalidate: 3600 }
);

// Cache posts per page+category for 5 minutes
const getCachedPosts = unstable_cache(
  async (page: number, category: string, limit: number) => {
    await dbConnect();
    const query: any = { published: true };
    if (category !== "All") query.category = category;

    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit) || 1;
    const rawPosts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      posts: JSON.parse(JSON.stringify(rawPosts)),
      totalPosts,
      totalPages,
    };
  },
  ["blog-posts"],
  { tags: ["posts"], revalidate: 300 } // 5 minutes
);

interface PublicBlogsPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function PublicBlogsPage({
  searchParams,
}: PublicBlogsPageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || "All";
  const currentPage = parseInt(resolvedParams.page || "1", 10) || 1;
  const limit = 10;

  const [categories, { posts, totalPosts, totalPages }] = await Promise.all([
    getCachedCategories(),
    getCachedPosts(currentPage, activeCategory, limit),
  ]);

  const initialPostsData = {
    success: true,
    posts,
    pagination: { totalPosts, totalPages, currentPage, limit },
  };

  const initialCategoriesData = { success: true, categories };

  return (
    <main className="w-full min-h-screen bg-zinc-900 text-neutral-100 pt-28 md:pt-36 pb-16 md:pb-24">
      <BlogsClientView
        initialPostsData={initialPostsData}
        initialCategoriesData={initialCategoriesData}
        initialCategory={activeCategory}
        initialPage={currentPage}
      />
    </main>
  );
}