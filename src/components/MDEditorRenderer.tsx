"use client";
import dynamic from "next/dynamic";
import React, { CSSProperties } from "react";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface MDEditorRendererProps {
  value: string;
  dataColorMode?: string;
  style?: CSSProperties;
}

export default function MDEditorRenderer({
  value,
  style,
  dataColorMode = "light",
}: MDEditorRendererProps) {
  return (
    <div data-color-mode={dataColorMode}>
      <MarkdownPreview
        source={value}
        style={{ background: "none", ...style }}
      />
    </div>
  );
}
