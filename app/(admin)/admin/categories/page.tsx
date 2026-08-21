"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Plus, Edit2, Trash2, Tag, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import CategoryFormModal, { CategoryItem } from "./CategoryFormModal";
import DeleteConfirmModal from "../blogs/DeleteConfirmModal";

import { useCategories, revalidateAllCategories } from "@/services/useCategoriesService";

export default function AdminCategoriesPage() {
  const { categories, isLoading: loading, mutateCategories } = useCategories();

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);

  const handleCreateNew = () => {
    setSelectedCategory(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (category: CategoryItem) => {
    setSelectedCategory(category);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (category: CategoryItem) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleSuccessUpdate = () => {
    mutateCategories();
    revalidateAllCategories();
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      const res = await fetch(`/api/categories/${categoryToDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Category deleted successfully");
        mutateCategories();
        revalidateAllCategories();
      } else {
        toast.error(data.error || "Failed to delete category");
      }
    } catch {
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };


  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Tag className="w-7 h-7 text-emerald-400" />
            <span>Category Management</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Organize your blog posts into distinct categories for easy navigation.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/10 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading categories...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 space-y-4">
          <Tag className="w-12 h-12 text-neutral-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No Categories Found</h3>
          <p className="text-neutral-400 text-sm max-w-md mx-auto">
            You haven&apos;t added any categories yet. Click &quot;New Category&quot; to create your first category.
          </p>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-sm hover:bg-emerald-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Category</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between group hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  slug: {cat.slug}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                  title="Edit category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(cat)}
                  className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSuccess={handleSuccessUpdate}
        initialData={selectedCategory}
      />


      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        postTitle={categoryToDelete?.name || "Category"}
        itemType="Category"
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

    </div>
  );
}
