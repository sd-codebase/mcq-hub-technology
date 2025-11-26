"use client";

import React from "react";

interface VideoFrameProps {
  width: number;
  height?: number;
  onClick?: () => void;
  children?: React.ReactNode;
  backgroundImage?: string;
}

export default function VideoFrame({
  width,
  height,
  onClick,
  children,
  backgroundImage,
}: VideoFrameProps) {
  const frameHeight = height || width;
  const padding = Math.min(width, frameHeight) * 0.05;
  const background = backgroundImage
    ? `url('${backgroundImage}')`
    : "linear-gradient(to bottom, #a855f7, #ec4899)";
  const backgroundSize = backgroundImage ? "cover" : "auto";

  return (
    <div className="group relative z-30">
      <div
        className="rounded-lg overflow-hidden cursor-pointer transform transition duration-300 group-hover:scale-105 flex items-center justify-center"
        style={{
          // width: `${width}px`,
          // height: `${frameHeight}px`,
          // background: background,
          // backgroundSize: backgroundSize,
          // backgroundPosition: "center",
          padding: `${padding}px`,
          boxSizing: "border-box",
          borderRadius: "12px",
        }}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
