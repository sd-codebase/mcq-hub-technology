"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Zap } from "./zap";

const MDEditorRenderer = dynamic(
  () => import("./MDEditorRenderer"),
  { ssr: false }
);

interface ReviewContentProps {
  subjectName: string;
  topicName: string;
  subtopicName: string;
  testName: string;
  questions: any[];
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
      className="min-h-screen pb-8 px-4 sm:px-6 lg:px-8 pt-20"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
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

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{testName}</h1>
          <p className="text-gray-400 text-lg">
            {subjectName} → {topicName} → {subtopicName}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 text-sm font-semibold">
              {questions.length} Questions
            </span>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6 mb-12">
          {questions.map((question, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                {/* Question Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <p className="text-indigo-600 text-sm font-semibold">
                    Question {index + 1} of {questions.length}
                  </p>
                </div>

                {/* Question Content */}
                <div className="p-6 space-y-6">
                  {/* Full Question */}
                  <div>
                    <p className="text-gray-800 text-base font-semibold mb-3">
                      {question.question && (
                        <MDEditorRenderer value={question.question} />
                      )}
                    </p>
                  </div>

                  {/* MCQ Options */}
                  {question.options && (
                    <div>
                      <div className="space-y-3">
                        {question.options.map((option: string, optionIdx: number) => {
                          const isCorrect = optionIdx === question.correct_answer;
                          return (
                            <div
                              key={optionIdx}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                isCorrect
                                  ? "bg-green-50 border-green-500"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`font-bold text-lg min-w-fit ${
                                    isCorrect
                                      ? "text-green-600"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optionIdx)})
                                </span>
                                <div className="flex-1">
                                  <div
                                    className={
                                      isCorrect
                                        ? "text-green-700"
                                        : "text-gray-800"
                                    }
                                  >
                                    <MDEditorRenderer value={option} />
                                  </div>
                                </div>
                                {isCorrect && (
                                  <span className="text-green-600 text-xl font-bold min-w-fit">
                                    ✓
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Output Question Type */}
                  {question.output && !question.options && (
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                        Expected Output
                      </p>
                      <div className="p-4 rounded-lg bg-green-900/30 border-2 border-green-500">
                        <div className="text-green-300 font-mono text-sm whitespace-pre-wrap">
                          <MDEditorRenderer value={question.output} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interview Question Answer */}
                  {question.answer && !question.options && !question.output && (
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                        Answer
                      </p>
                      <div className="p-4 rounded-lg bg-indigo-900/30 border-2 border-indigo-500">
                        <div className="text-indigo-300 text-sm">
                          <MDEditorRenderer value={question.answer} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {question.explanation && (
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                        Explanation
                      </p>
                      <div className="p-4 rounded-lg bg-white border-l-4 border-amber-500">
                        <div className="text-gray-800 text-sm">
                          <MDEditorRenderer value={question.explanation} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
