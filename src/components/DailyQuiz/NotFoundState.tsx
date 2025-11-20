"use client";
import React from "react";
import Link from "next/link";

export default function NotFoundState() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Not Found</h1>
        <p className="text-gray-400 text-lg mb-6">Subject not found</p>
        <Link href="/subjects">
          <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
            Back to Subjects
          </button>
        </Link>
      </div>
    </div>
  );
}
