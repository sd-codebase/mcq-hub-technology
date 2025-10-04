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
    // Using the new API route structure
    fetch(`/api/${subject}/questions/mcq/${subtopic}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((response) => {
        setQuestions(response.data?.mcqs || []);
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

  // Try to get topic/subtopic name from questions[0] or fallback to subtopic param
  const topicName = questions[0]?.topic || subtopic || "";
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
    if (selected === q.correct_answer - 1) setScore((s) => s + 1);
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
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
        <div className="mb-2">
          Your score: {score} / {questions.length}
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
          onClick={() => setReviewMode(true)}
        >
          Review Test
        </button>
        <button
          className="mt-4 ml-2 px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold border border-gray-300"
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
      </div>
    );

  if (showResult && reviewMode)
    return (
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Review Answers</h2>
        <div className="space-y-8">
          {questions.map((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.correct_answer - 1;
            return (
              <div
                key={q.id}
                className="bg-white rounded shadow p-4 border border-gray-200"
              >
                <div className="mb-2 text-base font-semibold text-gray-900">
                  Q{idx + 1}. <MDEditorRenderer value={q.question} />
                </div>
                <div className="mb-2">
                  {q.options.map((opt: string, oidx: number) => (
                    <div
                      key={oidx}
                      className={`px-3 py-1 rounded mb-1 border text-sm flex items-center gap-2
                        ${
                          oidx === q.correct_answer - 1
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200"
                        }
                        ${
                          userAns === oidx
                            ? isCorrect
                              ? "text-green-700 font-bold"
                              : "text-red-700 font-bold"
                            : "text-gray-900"
                        }
                      `}
                    >
                      <span>
                        {oidx === q.correct_answer - 1
                          ? "✔️"
                          : userAns === oidx
                          ? "❌"
                          : ""}
                      </span>
                      <MDEditorRenderer value={opt} />
                    </div>
                  ))}
                </div>
                <div className="italic mt-3 text-gray-700">
                  <MDEditorRenderer value={q.explanation} />
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="mt-6 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
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
      </div>
    );

  // Progress bar logic (fill from 0 to 100%)
  const percent = ((MCQ_TIMER - timer) / MCQ_TIMER) * 100;
  let barColor = "bg-blue-500";
  if (percent < 80) barColor = "bg-blue-500";
  else if (percent < 90) barColor = "bg-yellow-400";
  else barColor = "bg-red-500";

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-4 relative">
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 rounded">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-500 mb-2"
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
            <span className="text-blue-600 font-semibold text-lg">
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
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 w-full h-3 rounded bg-gray-200 overflow-hidden">
          <div
            className={`h-full transition-all duration-700 ease-in-out ${barColor}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      <div className="text-xl font-bold mb-2 text-gray-900">
        <MDEditorRenderer value={q.question} />
      </div>
      <div className="space-y-2 mb-4">
        {q.options.map((opt: string, idx: number) => (
          <button
            key={idx}
            className={`block w-full text-left px-4 py-2 rounded border font-medium transition-colors ${
              selected === idx
                ? "bg-blue-100 border-blue-600 text-gray-900"
                : "bg-white border-gray-200 hover:bg-gray-50 text-gray-900"
            }`}
            style={{
              borderColor:
                selected === idx ? "var(--color-primary)" : undefined,
            }}
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
          >
            <MDEditorRenderer value={opt} />
          </button>
        ))}
      </div>
      {/* No answer/explanation during test */}
      <button
        className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-semibold"
        style={{ background: "var(--color-primary)" }}
        onClick={handleNext}
        disabled={selected === null}
      >
        {current + 1 === questions.length ? "Finish" : "Next"}
      </button>
    </div>
  );
}
