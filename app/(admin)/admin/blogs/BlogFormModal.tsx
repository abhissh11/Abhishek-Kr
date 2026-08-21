"use client";

import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { X, Plus, Save } from "lucide-react";
import { toast } from "react-toastify";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-48 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-500 text-xs">
      Loading CKEditor...
    </div>
  ),
});




export interface PostItem {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  content: string;
  published: boolean;
  createdAt: string;
}

interface BlogFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: PostItem | null;
}

export default function BlogFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: BlogFormModalProps) {
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [categoriesList, setCategoriesList] = useState<{ _id: string; name: string }[]>([]);
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/categories")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.categories) {
            setCategoriesList(data.categories);
            if (!initialData && data.categories.length > 0) {
              setCategory(data.categories[0].name);
            }
          }
        })
        .catch(() => {});
    }

    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setCategory(initialData.category || "General");
      setContent(initialData.content);
      setPublished(initialData.published);
    } else {
      setTitle("");
      setSlug("");
      setContent("");
      setPublished(true);
    }
  }, [initialData, isOpen]);


  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !content.trim()) {
      toast.error("Title, slug, and content are required.");
      return;
    }

    setSubmitting(true);
    try {
      const isEdit = Boolean(initialData?._id);
      const url = isEdit ? `/api/posts/${initialData!._id}` : "/api/posts";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, category, content, published }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(isEdit ? "Post updated successfully!" : "Post created successfully!");
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || "Operation failed.");
      }
    } catch {
      toast.error("An error occurred while saving the post.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-10 bg-black/75 backdrop-blur-md rounded-2xl">
      <div
        className="bg-neutral-900 border border-neutral-800 w-full h-full flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed on Top */}
        <div className="shrink-0 flex items-center justify-between border-b border-neutral-800 p-5 md:p-6 bg-neutral-900">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {initialData ? (
              <>
                <Save className="w-5 h-5 text-emerald-400" />
                <span>Edit Blog Post</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Create New Blog Post</span>
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Full Available Content Height */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden min-h-0">
          <div className="flex-1 flex flex-col p-5 md:p-6 space-y-4 overflow-hidden min-h-0">
            <div className="shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Building Scalable Apps with Next.js"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1.5">
                  Slug (URL identifier) *
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. building-scalable-apps"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                  required
                >
                  <option value="General">General</option>
                  {categoriesList
                    .filter((cat) => cat.name !== "General")
                    .map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </select>

              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <label className="shrink-0 block text-sm font-medium text-neutral-400 mb-1.5">
                Content (Markdown HTML) *
              </label>
              <RichTextEditor content={content} onChange={setContent} />
            </div>
          </div>



          {/* Footer - Fixed at Bottom */}
          <div className="shrink-0 border-t border-neutral-800 p-4 md:p-5 bg-neutral-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="modal-published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-neutral-800 accent-emerald-500 cursor-pointer"
              />
              <label
                htmlFor="modal-published"
                className="text-sm text-neutral-300 cursor-pointer select-none"
              >
                Publish immediately
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : initialData
                    ? "Update Post"
                    : "Publish Post"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}
