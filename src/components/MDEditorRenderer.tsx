"use client";
import dynamic from "next/dynamic";
import React, { CSSProperties } from "react";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface MDEditorRendererProps {
  value: string;
  style?: CSSProperties;
}

export default function MDEditorRenderer({
  value,
  style,
}: MDEditorRendererProps) {
  return (
    <div data-color-mode="light">
      <MarkdownPreview
        source={value}
        style={{ background: "none", ...style }}
      />
    </div>
  );
}
