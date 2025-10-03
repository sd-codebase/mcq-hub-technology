"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MDEditorRenderer = dynamic(
  () => import("../../../components/MDEditorRenderer"),
  { ssr: false }
);
import { useSearchParams } from "next/navigation";
import TestHeader from "../../../components/TestHeader";

export default function InterviewTestPage() {
  const searchParams = useSearchParams();
  const subtopic = searchParams.get("subtopic");
  const subtopicName = decodeURIComponent(
    searchParams.get("subtopicName") || ""
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!subtopic) return;
    // Using the new API route structure
    const subject = process.env.NEXT_PUBLIC_SUBJECT;
    fetch(`/api/questions/${subject}/interview-questions/${subtopic}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((response) => {
        setQuestions(response.data?.interview_questions || []);
      })
      .catch((err) => {
        setError("Failed to load questions.");
      });
  }, [subtopic]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!subtopic)
    return <div className="text-red-500">No subtopic selected.</div>;
  if (!questions.length) return <div>Loading questions...</div>;

  const q = questions[current];

  function handleNext() {
    setUserAnswer("");
    setShowExplanation(false);
    if (current + 1 < questions.length) setCurrent((c) => c + 1);
    else setShowResult(true);
  }

  if (showResult)
    return (
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Test Complete!</h2>
        <div className="mb-2">
          You completed {questions.length} interview questions.
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          onClick={() => {
            setCurrent(0);
            setShowResult(false);
          }}
        >
          Restart
        </button>
      </div>
    );

  const testType = "Interview Questions";

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-4 relative">
      <TestHeader
        subtopicName={subtopicName}
        testType={testType}
        currentQuestion={current + 1}
        totalQuestions={questions.length}
      />

      <div className="mb-2 font-medium">
        <MDEditorRenderer value={q.question} />
      </div>
      <textarea
        className="w-full border px-3 py-2 rounded mb-2"
        placeholder="Your answer..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={showExplanation}
        rows={4}
      />
      {showExplanation && (
        <div className="mb-4 text-sm text-gray-700">
          <div className="font-semibold">Sample Answer:</div>
          <div className="bg-gray-50 rounded p-2 mb-1">
            <MDEditorRenderer value={q.answer} />
          </div>
          <div className="italic mt-3">
            <MDEditorRenderer value={q.explanation} />
          </div>
        </div>
      )}
      {!showExplanation ? (
        <button
          className="mt-2 px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          onClick={() => setShowExplanation(true)}
        >
          Show Answer
        </button>
      ) : (
        <button
          className="mt-2 px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          onClick={handleNext}
        >
          {current + 1 === questions.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}
