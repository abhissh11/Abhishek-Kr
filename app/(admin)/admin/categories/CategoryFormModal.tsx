"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Save } from "lucide-react";
import { toast } from "react-toastify";

export interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
}

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: CategoryItem | null;
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSlug(initialData.slug || "");
    } else {
      setName("");
      setSlug("");
    }
  }, [initialData, isOpen]);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialData) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const isEdit = !!initialData;
    const url = isEdit
      ? `/api/categories/${initialData._id}`
      : "/api/categories";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(
          isEdit
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || "Operation failed.");
      }
    } catch {
      toast.error("An error occurred while saving the category.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md rounded-2xl">
      <div
        className="bg-neutral-900 border border-neutral-800 w-full max-w-lg flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-neutral-800 p-5 bg-neutral-900">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            {initialData ? (
              <>
                <Save className="w-5 h-5 text-emerald-400" />
                <span>Edit Category</span>
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Create New Category</span>
              </>
            )}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. AI & Marketing"
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">
              Slug (URL Identifier) *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. ai-marketing"
              className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : initialData
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
