"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, FileText, Tag, Inbox, LogOut, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, authenticated, logout } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Connects",
      href: "/admin/connects",
      icon: Inbox,
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: Tag,
    },
  ];



  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans overflow-hidden">
      {/* Top Header Bar with 'Go to Home' button */}
      <header className="w-full bg-neutral-900/90 border-b border-neutral-800 px-6 py-3.5 flex items-center justify-between z-40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 rounded-xl transition-all duration-200 shadow-sm group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Go to Home</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Admin Portal</span>
        </div>
      </header>

      {/* Main Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Render Sidebar only if authenticated and not on login page */}
        {authenticated && !isLoginPage && (
          <aside className="w-64 bg-neutral-900/60 border-r border-neutral-800 flex flex-col justify-between p-4 shrink-0 hidden md:flex h-full">
            <div className="space-y-6">
              {/* Profile card snippet */}
              {user && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.name || "Admin"}
                      width={36}
                      height={36}
                      className="rounded-full border border-neutral-700"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center font-bold text-sm text-neutral-200 border border-neutral-700">
                      {user.name?.[0] || "A"}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.name || "Admin"}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Logout Button */}
            <div className="pt-4 border-t border-neutral-800">
              <button
                onClick={async () => {
                  await logout();
                  router.push("/admin/login");
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20 transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main className="flex-1 h-full overflow-y-auto p-6 md:p-8 relative">

          {/* Mobile navigation tab strip */}
          {authenticated && !isLoginPage && (
            <div className="md:hidden mb-6 flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                      isActive
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-neutral-900 text-neutral-400 border border-neutral-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={async () => {
                  await logout();
                  router.push("/admin/login");
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 shrink-0 ml-auto cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );

}
