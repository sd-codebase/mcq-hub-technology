"use client";
import React from "react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="text-center py-8">
      <h2 className="text-lg font-semibold text-white mb-4">No Tests Found</h2>
      <Link href="/">
        <button className="px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
          Go Home
        </button>
      </Link>
    </div>
  );
}
