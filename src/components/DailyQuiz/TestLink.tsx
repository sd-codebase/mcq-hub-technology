"use client";
import React from "react";
import Link from "next/link";

interface Test {
  _id: string;
  testName: string;
  questionType: string;
  questionCount: number;
}

interface TestLinkProps {
  test: Test;
}

const getTypeColor = (questionType: string) => {
  switch (questionType.toLowerCase()) {
    case "mcq":
      return "bg-indigo-600 text-white";
    case "output":
      return "bg-teal-600 text-white";
    case "interview":
      return "bg-pink-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export default function TestLink({ test }: TestLinkProps) {
  // Hide interview tests
  if (test.questionType.toLowerCase() === "interview") {
    return null;
  }

  return (
    <Link href={`/review/${test._id}`} target="_blank" rel="noopener noreferrer">
      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
        <span
          className={`px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold whitespace-nowrap ${getTypeColor(
            test.questionType
          )}`}
        >
          {test.questionType.toUpperCase()}
        </span>

        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold text-xs sm:text-base truncate group-hover:text-indigo-400 transition-colors">
            {test.testName}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">
            {test.questionCount} q{test.questionCount !== 1 ? "s" : ""}
          </p>
        </div>

        <span className="text-indigo-400 text-lg sm:text-xl group-hover:translate-x-1 transition-transform min-w-fit flex-shrink-0">
          →
        </span>
      </div>
    </Link>
  );
}
