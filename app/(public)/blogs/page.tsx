import React from "react";
import type { Metadata } from "next";
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

  await dbConnect();

  const rawCategories = await Category.find().sort({ name: 1 }).lean();
  const categories = JSON.parse(JSON.stringify(rawCategories));

  const query: any = { published: true };
  if (activeCategory !== "All") {
    query.category = activeCategory;
  }

  const skip = (currentPage - 1) * limit;
  const totalPosts = await Post.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / limit) || 1;

  const rawPosts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const posts = JSON.parse(JSON.stringify(rawPosts));

  const initialPostsData = {
    success: true,
    posts,
    pagination: {
      totalPosts,
      totalPages,
      currentPage,
      limit,
    },
  };

  const initialCategoriesData = {
    success: true,
    categories,
  };

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