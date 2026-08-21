"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId?: string | null;
  postTitle: string;
  itemType?: string;
  onSuccess?: (deletedId: string) => void;
  onConfirm?: () => Promise<void> | void;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  postId,
  postTitle,
  itemType = "Post",
  onSuccess,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (onConfirm) {
        await onConfirm();
        onClose();
        return;
      }

      if (!postId) return;

      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(`${itemType} deleted successfully!`);
        if (onSuccess) onSuccess(postId);
        onClose();
      } else {
        toast.error(data.error || `Failed to delete ${itemType.toLowerCase()}.`);
      }
    } catch {
      toast.error(`An error occurred while deleting the ${itemType.toLowerCase()}.`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-md rounded-2xl min-h-full">
      <div
        className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Delete {itemType}?</h3>
              <p className="text-xs text-neutral-400">Confirm {itemType.toLowerCase()} removal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-neutral-300">
          Are you sure you want to delete &quot;<span className="text-white font-medium">{postTitle}</span>&quot;? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>{deleting ? "Deleting..." : `Delete ${itemType}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
