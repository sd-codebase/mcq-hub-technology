"use client";

import dynamic from "next/dynamic";

const TextDisplay = dynamic(() => import("../TextDisplay"), { ssr: false });

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  type: "thumbnail" | "hook" | "cta";
}

export default function PreviewModal({
  isOpen,
  onClose,
  text,
  type,
}: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dark overlay - pointer-events-none so it doesn't block interactions */}
      <div className="fixed inset-0 bg-black/30 z-40 pointer-events-none"></div>

      {/* Preview panel on right side - Strict 520x920 dimensions */}
      <div
        className="fixed shadow-2xl z-50"
        style={{
          width: "520px",
          height: "920px",
          right: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          overflow: "hidden",
          borderRadius: "12px",
          pointerEvents: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          title="Close preview"
        >
          ✕
        </button>

        {/* Preview Container */}
        <div
          className="relative w-full h-full"
          style={{
            overflow: "hidden",
          }}
        >
          {/* TextDisplay Component */}
          <TextDisplay
            text={text}
            isVisible={true}
            type={type}
            animationDuration={1000}
            textPosition="30%"
            containerHeight="auto"
            backgroundImage="/assets/bg-img-1.png"
            isPreview={true}
          />
        </div>
      </div>
    </>
  );
}
