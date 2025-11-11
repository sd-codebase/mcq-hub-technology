"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const MDEditorRenderer = dynamic(
  () => import("../../../../../components/MDEditorRenderer"),
  { ssr: false }
);
import { useSearchParams } from "next/navigation";
import TestHeader from "../../../../../components/TestHeader";

const MCQ_TIMER =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_MCQ_TIMER
    ? parseInt(process.env.NEXT_PUBLIC_MCQ_TIMER)
    : 60;

export default function McqTestContentPage({ subject }: { subject: string }) {
  const searchParams = useSearchParams();
  const subtopic = searchParams.get("subtopic");
  const subtopicName = decodeURIComponent(
    searchParams.get("subtopicName") || ""
  );

  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(MCQ_TIMER);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (!subtopic || !subject) return;
    setShowLoader(true);
    // Using the new MongoDB API
    fetch(`/api/questions/mcq?topicId=${subtopic}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          setQuestions(response.data || []);
        } else {
          setQuestions([]);
        }
        setShowLoader(false);
      })
      .catch((err) => {
        setError("Failed to load questions.");
        setShowLoader(false);
      });
  }, [subtopic, subject]);

  // Timer logic
  useEffect(() => {
    if (showResult || !questions.length) return;
    setTimer(MCQ_TIMER);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, questions.length, showResult]);

  useEffect(() => {
    if (timer === 0 && !showResult) {
      setSelected(null);
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        if (current + 1 < questions.length) setCurrent((c) => c + 1);
        else setShowResult(true);
      }, 1000);
    }
  }, [timer]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!subtopic)
    return <div className="text-red-500">No subtopic selected.</div>;

  if (!questions.length) return <div>Loading questions...</div>;

  // Use subtopicName from query params
  const testType = "MCQ Test";
  const q = questions[current];

  function handleSelect(idx: number) {
    setSelected(idx);
  }

  function handleNext() {
    // Record answer
    setUserAnswers((prev) => {
      const arr = [...prev];
      arr[current] = selected ?? -1;
      return arr;
    });
    // New API uses 0-based index for correct_answer
    if (selected === q.correct_answer) setScore((s) => s + 1);
    setSelected(null);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      if (current + 1 < questions.length) setCurrent((c) => c + 1);
      else setShowResult(true);
    }, 1000);
  }

  if (showResult && !reviewMode)
    return (
      <div
        className="max-w-4xl mx-auto p-8 rounded-xl bg-gray-800 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          Test Complete! 🎉
        </h2>
        <div className="mb-6 text-xl text-gray-200">
          Your score: <span className="text-indigo-400 font-bold">{score}</span>{" "}
          / {questions.length}
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-full text-white font-semibold cursor-pointer
                     bg-gradient-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-700 hover:to-purple-700
                     transition-all duration-300 shadow-lg shadow-indigo-500/20
                     transform hover:scale-105"
            onClick={() => setReviewMode(true)}
          >
            Review Test
          </button>
          <button
            className="px-6 py-3 rounded-full font-semibold cursor-pointer
                     bg-gray-900/50 text-gray-300 border border-gray-700
                     hover:border-indigo-500/30 hover:text-white
                     transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10
                     transform hover:scale-105"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setShowResult(false);
              setTimer(MCQ_TIMER);
              setUserAnswers([]);
              setReviewMode(false);
            }}
          >
            Restart
          </button>
          <a
            href={`/subjects/${subject}/topics`}
            className="px-6 py-3 rounded-full font-semibold cursor-pointer
                     bg-gradient-to-r from-teal-500 to-green-500
                     hover:from-teal-600 hover:to-green-600
                     text-white transition-all duration-300 
                     shadow-lg shadow-teal-500/20
                     transform hover:scale-105"
          >
            Choose New Topic
          </a>
        </div>
      </div>
    );

  if (showResult && reviewMode)
    return (
      <div className="max-w-4xl mx-auto p-8 mt-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Review Answers</h2>
        <div className="space-y-8">
          {questions.map((q, idx) => {
            const userAns = userAnswers[idx];
            // New API uses 0-based index for correct_answer
            const isCorrect = userAns === q.correct_answer;
            return (
              <div
                key={q._id || idx}
                className="p-6 rounded-xl shadow-2xl border border-gray-700"
                style={{
                  background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
                }}
              >
                <div className="mb-4 text-lg font-semibold text-gray-800 bg-white p-5 rounded-lg border border-gray-200 shadow-md">
                  Q{idx + 1}. <MDEditorRenderer value={q.question} />
                </div>
                <div className="space-y-3">
                  {q.options.map((opt: string, oidx: number) => (
                    <div
                      key={oidx}
                      className={`px-4 py-3 rounded-lg flex items-center gap-3 text-base
                        ${
                          oidx === q.correct_answer
                            ? "bg-green-50 border border-green-500 text-green-700"
                            : userAns === oidx
                            ? "bg-red-50 border border-red-500 text-red-700"
                            : "bg-white border border-gray-200 text-gray-700"
                        }
                      `}
                    >
                      <span className="text-lg">
                        {oidx === q.correct_answer
                          ? "✓"
                          : userAns === oidx
                          ? "✗"
                          : ""}
                      </span>
                      <MDEditorRenderer value={opt} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-gray-700 bg-white p-5 rounded-lg border border-gray-200 shadow-md">
                  <div className="text-indigo-700 font-semibold text-lg mb-3">
                    Explanation:
                  </div>
                  <div className="text-gray-800">
                    <MDEditorRenderer value={q.explanation} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-8">
          <button
            className="px-8 py-3 rounded-full text-white font-semibold cursor-pointer
                     bg-gradient-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-700 hover:to-purple-700
                     transition-all duration-300 shadow-lg shadow-indigo-500/20
                     transform hover:scale-105"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setShowResult(false);
              setTimer(MCQ_TIMER);
              setUserAnswers([]);
              setReviewMode(false);
            }}
          >
            Restart Test
          </button>
          <a
            href={`/subjects/${subject}/topics`}
            className="px-8 py-3 rounded-full font-semibold cursor-pointer
                     bg-gradient-to-r from-teal-500 to-green-500
                     hover:from-teal-600 hover:to-green-600
                     text-white transition-all duration-300 
                     shadow-lg shadow-teal-500/20
                     transform hover:scale-105"
          >
            Choose New Topic
          </a>
        </div>
      </div>
    );

  // Progress bar logic (fill from 0 to 100%)
  const percent = ((MCQ_TIMER - timer) / MCQ_TIMER) * 100;
  let barColor = "bg-blue-500";
  if (percent < 80) barColor = "bg-blue-500";
  else if (percent < 90) barColor = "bg-yellow-400";
  else barColor = "bg-red-500";

  return (
    <div
      className="max-w-4xl mx-auto p-8 rounded-xl mt-8 relative bg-gray-50 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20 rounded-xl backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-indigo-400 mb-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span className="text-indigo-300 font-semibold text-lg">
              Loading next question...
            </span>
          </div>
        </div>
      )}

      <TestHeader
        subtopicName={subtopicName}
        testType={testType}
        currentQuestion={current + 1}
        totalQuestions={questions.length}
      />

      {/* Second row: progress bar and question count */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 w-full h-4 rounded-full bg-gray-900/50 border border-gray-700/50 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-in-out ${
              percent < 80
                ? "bg-gradient-to-r from-teal-500 to-green-500"
                : percent < 90
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-red-500 to-pink-500"
            }`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="text-2xl font-bold mb-6 text-gray-800 bg-white p-6 rounded-lg border border-gray-200 shadow-md">
        <MDEditorRenderer value={q.question} />
      </div>
      <div className="space-y-3 mb-6">
        {q.options.map((opt: string, idx: number) => (
          <button
            key={idx}
            className={`block w-full text-left px-6 py-4 rounded-lg border-2 font-medium transition-all duration-300 cursor-pointer ${
              selected === idx
                ? "bg-indigo-100 border-indigo-500 text-indigo-700 shadow-lg scale-[1.02] font-bold ring-2 ring-indigo-500/50 ring-offset-2"
                : "bg-white border-gray-200 hover:border-indigo-300 text-gray-700 hover:shadow-md hover:scale-[1.01]"
            }`}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
          >
            <MDEditorRenderer value={opt} />
          </button>
        ))}
      </div>
      <button
        className={`mt-6 px-8 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105
                   ${
                     selected === null
                       ? "bg-gray-700 cursor-not-allowed"
                       : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 cursor-pointer"
                   }`}
        onClick={handleNext}
        disabled={selected === null}
      >
        {current + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
