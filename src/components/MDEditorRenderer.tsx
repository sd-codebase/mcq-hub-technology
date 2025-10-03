"use client";
import dynamic from "next/dynamic";
import React from "react";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

export default function MDEditorRenderer({ value }: { value: string }) {
  return (
    <div data-color-mode="light">
      <MarkdownPreview source={value} style={{ background: "none" }} />
    </div>
  );
}
