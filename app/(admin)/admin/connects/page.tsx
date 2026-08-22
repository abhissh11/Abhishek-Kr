"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Inbox,
  Search,
  RefreshCw,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Package,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  ExternalLink,
  Filter,
  AlertTriangle,
} from "lucide-react";
import {
  useConnects,
  updateConnectStatus,
  deleteConnect,
  ConnectItem,
} from "@/services/useConnectsService";

export default function AdminConnectsPage() {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  const { connects, isLoading, error, mutateConnects } = useConnects();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal states
  const [deleteTarget, setDeleteTarget] = useState<ConnectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/admin/login");
    }
  }, [authenticated, loading, router]);

  // Option display mapping
  const getOptionBadge = (option: string) => {
    switch (option) {
      case "mvp":
        return {
          label: "Build an MVP",
          icon: Package,
          bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "improve":
        return {
          label: "Improve a product",
          icon: TrendingUp,
          bg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };
      case "ai":
        return {
          label: "Explore AI",
          icon: Sparkles,
          bg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        };
      default:
        return {
          label: option || "Something else",
          icon: HelpCircle,
          bg: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
        };
    }
  };

  const getStatusBadge = (status: ConnectItem["status"]) => {
    switch (status) {
      case "new":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-semibold";
      case "read":
        return "bg-sky-500/15 text-sky-400 border-sky-500/30";
      case "replied":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      case "archived":
        return "bg-neutral-800 text-neutral-400 border-neutral-700";
      default:
        return "bg-neutral-800 text-neutral-300 border-neutral-700";
    }
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = connects.length;
    const newCount = connects.filter((c) => c.status === "new").length;
    const readCount = connects.filter((c) => c.status === "read").length;
    const repliedCount = connects.filter((c) => c.status === "replied").length;
    const archivedCount = connects.filter((c) => c.status === "archived").length;
    return { total, newCount, readCount, repliedCount, archivedCount };
  }, [connects]);

  // Filtered list
  const filteredConnects = useMemo(() => {
    return connects.filter((item) => {
      const matchesSearch =
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.note && item.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.selectedOption.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [connects, searchQuery, statusFilter]);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: ConnectItem["status"]) => {
    setUpdatingId(id);
    setActionError(null);
    try {
      await updateConnectStatus(id, newStatus);
    } catch (err: any) {
      setActionError(err.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setActionError(null);
    try {
      await deleteConnect(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err: any) {
      setActionError(err.message || "Failed to delete submission");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center p-12 text-neutral-400">
        Loading connects dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Form Submissions</h1>
            {stats.newCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-black animate-pulse">
                {stats.newCount} New
              </span>
            )}
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            View, manage, and respond to incoming portfolio inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => mutateConnects()}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error alert if any */}
      {actionError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{actionError}</span>
          </div>
          <button
            onClick={() => setActionError(null)}
            className="text-xs text-red-400 underline hover:text-red-300 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-neutral-800/90 border-neutral-700 shadow-md"
              : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Inquiries</span>
            <Inbox className="w-4 h-4 text-neutral-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{stats.total}</p>
        </div>

        <div
          onClick={() => setStatusFilter("new")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "new"
              ? "bg-emerald-950/40 border-emerald-500/40 shadow-md"
              : "bg-neutral-900/60 border-neutral-800 hover:border-emerald-500/30"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              New / Unread
            </span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2">{stats.newCount}</p>
        </div>

        <div
          onClick={() => setStatusFilter("replied")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "replied"
              ? "bg-purple-950/40 border-purple-500/40 shadow-md"
              : "bg-neutral-900/60 border-neutral-800 hover:border-purple-500/30"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Replied
            </span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400 mt-2">{stats.repliedCount}</p>
        </div>

        <div
          onClick={() => setStatusFilter("archived")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "archived"
              ? "bg-neutral-800/90 border-neutral-700 shadow-md"
              : "bg-neutral-900/60 border-neutral-800 hover:border-neutral-700"
          }`}
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Archived</span>
            <Filter className="w-4 h-4 text-neutral-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-300 mt-2">{stats.archivedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["all", "new", "read", "replied", "archived"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-emerald-500 text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {tab === "all" ? `All (${stats.total})` : `${tab}`}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search email, category, or note..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Table / Submissions List */}
      {isLoading ? (
        <div className="py-20 text-center text-neutral-500 text-sm">
          Loading submissions...
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-400 text-sm bg-neutral-900/40 rounded-2xl border border-neutral-800">
          Failed to load submissions. {error.message}
        </div>
      ) : filteredConnects.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500">
            <Inbox size={24} />
          </div>
          <p className="text-base font-semibold text-white">No form submissions found</p>
          <p className="text-xs text-neutral-500 max-w-sm">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search query or filter tab to find submissions."
              : "Submissions from your website contact form will appear here in real-time."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConnects.map((item) => {
            const optionBadge = getOptionBadge(item.selectedOption);
            const OptionIcon = optionBadge.icon;
            const formattedDate = new Date(item.createdAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <div
                key={item._id}
                className={`bg-neutral-900/70 border rounded-2xl p-5 md:p-6 transition-all space-y-4 ${
                  item.status === "new"
                    ? "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)] bg-emerald-950/10"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                {/* Header Row: Email, Category Badge, Date, Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300 border border-neutral-700 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-base text-white">{item.email}</span>
                        <button
                          onClick={() => handleCopyEmail(item.email, item._id)}
                          title="Copy Email"
                          className="text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                        >
                          {copiedId === item._id ? (
                            <Check size={14} className="text-emerald-400" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Category Badge */}
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${optionBadge.bg}`}
                    >
                      <OptionIcon size={14} />
                      <span>{optionBadge.label}</span>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      disabled={updatingId === item._id}
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value as ConnectItem["status"])
                      }
                      className={`px-3 py-1 rounded-xl text-xs border appearance-none focus:outline-none cursor-pointer font-medium transition-colors ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      <option value="new" className="bg-neutral-900 text-white">
                        New
                      </option>
                      <option value="read" className="bg-neutral-900 text-white">
                        Read
                      </option>
                      <option value="replied" className="bg-neutral-900 text-white">
                        Replied
                      </option>
                      <option value="archived" className="bg-neutral-900 text-white">
                        Archived
                      </option>
                    </select>
                  </div>
                </div>

                {/* Body Row: Project Note */}
                <div className="bg-neutral-950/60 rounded-xl p-4 border border-neutral-800/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                    <MessageSquare size={14} />
                    <span>Project Note / Message</span>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
                    {item.note || <span className="italic text-neutral-500">No note provided.</span>}
                  </p>
                </div>

                {/* Footer Row: Action buttons */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${item.email}?subject=Re: Portfolio Inquiry (${optionBadge.label})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-medium transition-all cursor-pointer"
                    >
                      <ExternalLink size={13} />
                      <span>Reply via Email</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === "new" && (
                      <button
                        onClick={() => handleStatusChange(item._id, "read")}
                        disabled={updatingId === item._id}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-2 rounded-xl text-neutral-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                      title="Delete submission"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Submission</h3>
                <p className="text-xs text-neutral-400">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300">
              Are you sure you want to delete the submission from{" "}
              <strong className="text-white">{deleteTarget.email}</strong>?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
