"use client";
import React from "react";
import Link from "next/link";
import { Zap } from "../zap";

interface DailyQuizHeaderProps {
  subjectName: string;
  testCount: number;
}

export default function DailyQuizHeader({
  subjectName,
  testCount,
}: DailyQuizHeaderProps) {
  return (
    <>
      {/* Logo */}
      <div className="w-full flex justify-center py-3 mb-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-indigo-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white tracking-tight -mb-1">
                Quizzy<span className="text-indigo-400">Dock</span>
              </span>
              <span className="text-[12px] font-medium text-gray-400 tracking-wider">
                TECH SKILLS
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <span className="text-gray-300">Daily Quiz</span>
          <span>→</span>
          <span className="text-indigo-400">{subjectName}</span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          {subjectName}
        </h1>
      </div>
    </>
  );
}
