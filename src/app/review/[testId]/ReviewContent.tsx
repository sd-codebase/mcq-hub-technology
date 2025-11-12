"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MDEditorRenderer = dynamic(() => import("@/components/MDEditorRenderer"), {
  ssr: false,
});

interface MCQQuestion {
  _id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

interface ReviewContentProps {
  subjectName: string;
  topicName: string;
  subtopicName: string;
  testName: string;
  questions: MCQQuestion[];
}

export default function ReviewContent({
  subjectName,
  topicName,
  subtopicName,
  testName,
  questions,
}: ReviewContentProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm border-b border-gray-700 shadow-lg"
        style={{
          backgroundColor: "rgba(28, 28, 60, 0.95)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-2">
            {subjectName} <span className="mx-2">›</span> {topicName} <span className="mx-2">›</span> {subtopicName}
          </div>
          {/* Test Name */}
          <h1 className="text-3xl font-bold text-white">{testName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Questions Container */}
        <div className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Question Number */}
              <div className="text-sm font-semibold text-indigo-600 mb-3">
                Question {index + 1} of {questions.length}
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  <MDEditorRenderer value={question.question} />
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === question.correct_answer;
                  return (
                    <div
                      key={optionIndex}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        isCorrect
                          ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                              isCorrect
                                ? "border-green-500 bg-green-500 text-white"
                                : "border-gray-300 text-gray-600"
                            }`}
                          >
                            {isCorrect && "✓"}
                            {!isCorrect && String.fromCharCode(65 + optionIndex)}
                          </div>
                        </div>
                        <div className="flex-1 text-gray-700">
                          <MDEditorRenderer value={option} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3 text-lg">
                  Explanation
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <MDEditorRenderer value={question.explanation} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Go to Home Link */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
