"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import TestHeader from "../../../components/TestHeader";

const MDEditorRenderer = dynamic(
  () => import("../../../components/MDEditorRenderer"),
  { ssr: false }
);

export default function TestContent() {
  const searchParams = useSearchParams();
  const subtopic = searchParams.get("subtopic");
  const subtopicName = decodeURIComponent(
    searchParams.get("subtopicName") || ""
  );
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (!subtopic) return;
    const subject = process.env.NEXT_PUBLIC_SUBJECT;

    fetch(`/api/questions/${subject}/output/${subtopic}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data?.data?.output_questions || []);
      })
      .catch(() => setError("Failed to load questions."));
  }, [subtopic]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!subtopic)
    return <div className="text-red-500">No subtopic selected.</div>;
  if (!questions.length) return <div>Loading questions...</div>;

  const q = questions[current];
  const testType = "Output Test";

  function handleCheck() {
    setShowExplanation(true);
    if (userAnswer.trim() === q.output.replace(/```|\n/g, "").trim()) {
      setScore((s) => s + 1);
    }
  }

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
          Your score: {score} / {questions.length}
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-green-600 text-white font-semibold"
          onClick={() => {
            setCurrent(0);
            setScore(0);
            setShowResult(false);
          }}
        >
          Restart
        </button>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-4 relative">
      <TestHeader
        subtopicName={subtopicName}
        testType={testType}
        currentQuestion={current + 1}
        totalQuestions={questions.length}
      />

      <div className="bg-gray-100 rounded p-4 mb-2 text-sm overflow-x-auto">
        <MDEditorRenderer value={q.question} />
      </div>
      <input
        className="w-full border px-3 py-2 rounded mb-2"
        placeholder="Your output..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={showExplanation}
      />
      {showExplanation && (
        <div className="mb-4 text-sm text-gray-700">
          <div>Expected Output:</div>
          <div className="bg-gray-50 rounded p-2 inline-block">
            <MDEditorRenderer value={q.output} />
          </div>
          <div className="italic mt-3">
            <MDEditorRenderer value={q.explanation} />
          </div>
        </div>
      )}
      {!showExplanation ? (
        <button
          className="mt-2 px-4 py-2 rounded bg-green-600 text-white font-semibold"
          onClick={handleCheck}
        >
          Check Answer
        </button>
      ) : (
        <button
          className="mt-2 px-4 py-2 rounded bg-green-600 text-white font-semibold"
          onClick={handleNext}
        >
          {current + 1 === questions.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}
