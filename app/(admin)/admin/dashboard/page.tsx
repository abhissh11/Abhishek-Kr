"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Database, FileText, ShieldCheck, Cpu } from "lucide-react";

import { usePosts } from "@/services/usePostsService";
import { useCategories } from "@/services/useCategoriesService";

export default function AdminDashboardPage() {
  const { user, authenticated, loading } = useAuth();
  const router = useRouter();

  const { posts, isLoading: postsLoading, error } = usePosts({ page: 1, limit: 100 });
  const { categories } = useCategories();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/admin/login");
    }
  }, [authenticated, loading, router]);

  const dbStatus = error
    ? `Database status: ${error.message}`
    : postsLoading
    ? "Checking database connection..."
    : "MongoDB Connected & Active";

  const postsCount = posts.length;


  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center p-12 text-neutral-400">
        Verifying admin credentials...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-neutral-400">
          Welcome back, {user?.name || "Admin"}. System status and metrics.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Database Connection
            </span>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-lg font-semibold text-emerald-400">{dbStatus}</p>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Total Blog Posts
            </span>
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">
            {postsCount !== null ? postsCount : "-"}
          </p>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-neutral-900/60 border border-neutral-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Single-Admin System Security
        </h3>
        <ul className="space-y-3 text-sm text-neutral-300">
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            Google OAuth Token verified via Firebase Admin SDK
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            Session authenticated via HttpOnly JWT Cookie (<code className="text-amber-300 font-mono text-xs">admin_token</code>)
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            Restricted to single admin email (<code className="text-amber-300 font-mono text-xs">{user?.email}</code>)
          </li>
          <li className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            MongoDB Atlas cluster connected via Mongoose connection cache
          </li>
        </ul>
      </div>
    </div>
  );
}