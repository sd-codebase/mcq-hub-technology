"use client";

import React from "react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  message,
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-indigo-500/30 animate-fadeInUp">
        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h3 className="text-xl font-bold text-white mb-2">Coming Soon!</h3>
          <p className="text-gray-300 mb-6">{message}</p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105 w-full"
          >
            Got it!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
