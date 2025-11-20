"use client";
import React from "react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="max-w-5xl mx-auto text-center py-12">
      <p className="text-gray-400 text-lg mb-6">
        No tests available for this subject yet
      </p>
      <Link href="/subjects">
        <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/50">
          Back to Subjects
        </button>
      </Link>
    </div>
  );
}
