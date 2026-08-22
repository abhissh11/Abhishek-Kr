"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { usePosts } from "@/services/usePostsService";
import { useCategories } from "@/services/useCategoriesService";

interface BlogsClientViewProps {
  initialPostsData: any;
  initialCategoriesData: any;
  initialCategory?: string;
  initialPage?: number;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function calculateReadingTime(content: string): string {
  const text = stripHtml(content);
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes || 1} min read`;
}

export default function BlogsClientView({
  initialPostsData,
  initialCategoriesData,
  initialCategory = "All",
  initialPage = 1,
}: BlogsClientViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const { categories } = useCategories(initialCategoriesData);

  const { posts, pagination, isLoading, isValidating } = usePosts({
    page: currentPage,
    limit: 10,
    category: activeCategory,
    publishedOnly: true,
    fallbackData: initialCategory === "All" && currentPage === 1 ? initialPostsData : undefined,
  });

  const handleCategoryChange = (catName: string) => {
    setActiveCategory(catName);
    setCurrentPage(1);
  };

  return (
    <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="space-y-4 mb-10 border-b border-zinc-800 pb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          Sharing <span className="text-neutral-500">Technical thoughts </span> &amp; <span className="text-neutral-500">Experiences.</span>
        </h1>

        {/* Dynamic Category Pill Filters with SWR Caching */}
        <div className="flex items-center gap-2 flex-wrap pt-4">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${activeCategory === "All"
                ? "bg-orange-500 text-zinc-950 font-semibold shadow-md shadow-orange-500/20"
                : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/50"
              }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${isActive
                    ? "bg-orange-500 text-zinc-950 font-semibold shadow-md shadow-orange-500/20"
                    : "bg-zinc-800/80 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-zinc-700/50"
                  }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blog List Section */}
      {isLoading && posts.length === 0 ? (
        <div className="w-full space-y-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-zinc-800 py-8 first:pt-0">
              <div className="flex items-start justify-between gap-6 w-full">
                <div className="space-y-3 flex-1">
                  <div className="h-3.5 w-20 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-7 w-4/5 bg-zinc-800 rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-zinc-800/70 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-zinc-800/70 rounded animate-pulse" />
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-3 w-14 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-1 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-6 h-6 rounded bg-zinc-800 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <BookOpen className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Articles Published Yet</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Check back soon for new articles in this category.
          </p>
        </div>
      ) : (
        <div className="w-full space-y-0 relative">
          {isValidating && (
            <div className="absolute top-0 right-0 text-[10px] text-orange-400 font-mono flex items-center gap-1 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
              Updating...
            </div>
          )}
          {posts.map((post) => {
            const excerpt = stripHtml(post.content);
            const readTime = calculateReadingTime(post.content);
            const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article
                key={post._id}
                className="group border-b border-zinc-800 py-8 first:pt-0 transition-colors w-full"
              >
                <Link href={`/blogs/${post.slug}`} className="block w-full">
                  <div className="flex items-start justify-between gap-6 w-full">
                    <div className="space-y-3 flex-1">
                      {/* Category Badge */}
                      <span className="text-orange-500 font-bold text-xs md:text-sm tracking-wider uppercase block">
                        {post.category || "General"}
                      </span>

                      {/* Post Title */}
                      <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-500 transition-colors leading-tight">
                        {post.title}
                      </h2>

                      {/* Content Excerpt Preview */}
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                        {excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="pt-1 text-xs text-zinc-500 font-medium flex items-center gap-3">
                        <span>{readTime}</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="shrink-0 pt-1">
                      <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover:text-orange-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-zinc-800 pt-8 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-zinc-700/50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs text-zinc-400 font-mono">
            Page {currentPage} of {pagination.totalPages} ({pagination.totalPosts} articles)
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-sm font-medium hover:bg-zinc-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-zinc-700/50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
