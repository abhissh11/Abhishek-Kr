"use client";

import React, { useEffect, useRef } from "react";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articleRef.current) return;

    const preElements = articleRef.current.querySelectorAll("pre");
    preElements.forEach((pre) => {
      if (pre.getAttribute("data-has-copy")) return;
      pre.setAttribute("data-has-copy", "true");

      pre.style.position = "relative";
      pre.classList.add("group");

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "absolute top-3 right-3 px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-zinc-800/90 text-zinc-300 border border-zinc-700/80 hover:bg-orange-500 hover:text-zinc-950 hover:border-orange-500 transition-all duration-200 opacity-90 group-hover:opacity-100 flex items-center gap-1.5 cursor-pointer z-10 select-none shadow-md";
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <span>Copy</span>
      `;

      button.addEventListener("click", async () => {
        const codeElem = pre.querySelector("code");
        const textToCopy = codeElem ? codeElem.innerText : pre.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
            <span class="text-emerald-400 font-semibold">Copied!</span>
          `;
          setTimeout(() => {
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              <span>Copy</span>
            `;
          }, 2000);
        } catch {
          // fallback
        }
      });

      pre.appendChild(button);
    });
  }, [content]);

  return (
    <article
      ref={articleRef}
      className="prose prose-invert prose-emerald max-w-none prose-p:text-neutral-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-bold prose-a:text-amber-400 hover:prose-a:underline text-base md:text-lg border-b border-neutral-800 pb-12"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
