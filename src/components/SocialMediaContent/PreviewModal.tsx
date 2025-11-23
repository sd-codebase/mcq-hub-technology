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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="relative rounded-lg overflow-hidden shadow-2xl"
        style={{
          width: "520px",
          height: "920px",
          background: "linear-gradient(135deg, #a855f7, #ec4899)",
          overflow: "hidden",
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

        {/* TextDisplay Component */}
        <TextDisplay
          text={text}
          isVisible={true}
          type={type}
          animationDuration={1000}
          textPosition="30%"
          containerHeight="auto"
          backgroundImage="/assets/bg-img-1.png"
        />
      </div>
    </div>
  );
}
