import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import ShareButton from "./ShareButton";
import ArticleContent from "./ArticleContent";
import AuthorCard from "@/components/author/AuthorCard";

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/&nbsp;/g, " ").trim();
}

function calculateReadingTime(content: string): string {
  const text = stripHtml(content);
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(numberOfWords / wordsPerMinute);
  return `${minutes || 1} min read`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const rawPost = await Post.findOne({ slug, published: true }).lean();

  if (!rawPost) {
    return {
      title: "Article Not Found | Abhishek Kumar",
    };
  }

  const post = JSON.parse(JSON.stringify(rawPost));
  const excerpt = stripHtml(post.content).slice(0, 160);

  return {
    title: `${post.title} | Abhishek Kumar`,
    description: excerpt || "Technical article by Abhishek Kumar",
    openGraph: {
      title: post.title,
      description: excerpt,
      type: "article",
      publishedTime: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
    },
  };
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await dbConnect();

  const rawPost = await Post.findOne({ slug, published: true }).lean();

  if (!rawPost) {
    notFound();
  }

  const post = JSON.parse(JSON.stringify(rawPost));

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const readTime = calculateReadingTime(post.content);

  return (
    <main className="w-full min-h-screen bg-zinc-900 text-neutral-100 pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="w-[calc(100%-2rem)] max-w-5xl mx-auto space-y-10">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-neutral-800/80 pb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 uppercase tracking-wider">
              <Tag className="w-3 h-3" />
              {post.category || "General"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs md:text-sm text-neutral-400 font-medium pt-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>{readTime}</span>
            </div>
            <span>•</span>
            <ShareButton />
          </div>
        </header>

        {/* Article Body Content */}
        <ArticleContent content={post.content} />

        {/* Author Profile Card */}
        <div className="pt-6">
          <AuthorCard />
        </div>
      </div>
    </main>
  );
}
