"use client";

import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading,
  Link,
  List,
  BlockQuote,
  CodeBlock,
  Undo,
  Essentials,
  Paragraph,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-48 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-center text-neutral-500 text-xs">
        Loading CKEditor...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col flex-1 min-h-0 border border-neutral-800 rounded-md overflow-hidden shadow-sm bg-neutral-950 text-neutral-100">
      <CKEditor


        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            Heading,
            Link,
            List,
            BlockQuote,
            CodeBlock,
            Undo,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "code",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "codeBlock",
            "link",
          ],
          placeholder: "Write your article content here...",
        }}
        data={content || ""}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}
