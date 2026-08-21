"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Plus, Trash2, Edit3, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import BlogFormModal, { PostItem } from "./BlogFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

import { usePosts, revalidateAllPosts } from "@/services/usePostsService";

export default function AdminBlogsPage() {
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { posts, pagination, isLoading: fetching, mutatePosts } = usePosts({ page: currentPage, limit: 10 });

  // Form Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState<string>("");

  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/admin/login");
    }
  }, [authenticated, loading, router]);

  const handleOpenCreateModal = () => {
    setSelectedPost(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (post: PostItem) => {
    setSelectedPost(post);
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (post: PostItem) => {
    setDeleteTargetId(post._id);
    setDeleteTargetTitle(post.title);
    setIsDeleteModalOpen(true);
  };

  const handleSuccessUpdate = () => {
    mutatePosts();
    revalidateAllPosts();
  };

  const handlePostDeleted = (deletedId: string) => {
    mutatePosts();
    revalidateAllPosts();
  };

  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center p-12 text-neutral-400">
        Authenticating admin status...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            Blog Posts Management
          </h1>
          <p className="text-sm text-neutral-400">
            Create, edit, and publish your portfolio articles
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Blog</span>
        </button>
      </div>

      {/* Blog List Table / Cards */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <h3 className="font-semibold text-white">
            All Posts ({pagination.totalPosts || posts.length})
          </h3>
        </div>

        {fetching ? (
          <div className="p-8 text-center text-neutral-400">Loading blog posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 space-y-3">
            <p>No blog posts found.</p>
            <p className="text-xs">Click &quot;Create New Blog&quot; above to add your first article.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {posts.map((post) => (
              <div
                key={post._id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-white text-base">{post.title}</h4>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                        post.published
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.category && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {post.category}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-500 font-mono">
                    /{post.slug} • {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(post)}
                    className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    title="Edit Post"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(post)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors cursor-pointer"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-900/40">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-neutral-700/50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-neutral-400 font-mono">
              Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalPosts} total articles)
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage === pagination.totalPages}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer border border-zinc-700/50"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Form Modal (Create & Edit) */}
      <BlogFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={handleSuccessUpdate}
        initialData={selectedPost}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        postId={deleteTargetId}
        postTitle={deleteTargetTitle}
        onSuccess={handlePostDeleted}
      />
    </div>
  );
}

