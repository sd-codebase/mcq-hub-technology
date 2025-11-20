"use client";
import React from "react";

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4"></div>
        <p className="text-gray-400 text-lg">Loading answer keys...</p>
      </div>
    </div>
  );
}
