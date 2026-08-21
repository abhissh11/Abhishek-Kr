"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareButton() {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleShareClick = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        toast.success("Article link copied to clipboard!");
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <button
      onClick={handleShareClick}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
    >
      {copiedLink ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-400">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-orange-400" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
