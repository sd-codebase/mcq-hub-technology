"use client";

import React from "react";
import FollowUsOnSocialMedia from "./FollowUsOnSocialMedia";

interface TestStartModalProps {
  isOpen: boolean;
  testType: string;
  onProceed: () => void;
  onCancel: () => void;
}

export default function TestStartModal({
  isOpen,
  testType,
  onProceed,
  onCancel,
}: TestStartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-indigo-700/30">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center border-b border-indigo-700/50">
          <h2 className="text-2xl font-bold">Before You Start</h2>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Follow Us Component */}
          <FollowUsOnSocialMedia
            title="Stay Connected With Us"
            variant="with-labels"
            size="md"
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-indigo-700/30 p-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onProceed}
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Proceed with Test
          </button>
        </div>
      </div>
    </div>
  );
}
