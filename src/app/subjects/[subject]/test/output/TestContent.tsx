"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import TestHeader from "../../../../../components/TestHeader";

const MDEditorRenderer = dynamic(
  () => import("../../../../../components/MDEditorRenderer"),
  { ssr: false }
);

export default function TestContent({ subject }: { subject: string }) {
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
    if (!subtopic || !subject) return;

    fetch(`/api/${subject}/questions/output/${subtopic}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data?.data?.output_questions || []);
      })
      .catch(() => setError("Failed to load questions."));
  }, [subtopic, subject]);

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
      <div
        className="max-w-4xl mx-auto p-8 mt-8 rounded-xl bg-gray-800 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">
          Test Complete! 🎉
        </h2>
        <div className="mb-6 text-xl text-gray-200">
          Your score: <span className="text-indigo-400 font-bold">{score}</span> / {questions.length}
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-full text-white font-semibold cursor-pointer
                     bg-gradient-to-r from-indigo-600 to-purple-600 
                     hover:from-indigo-700 hover:to-purple-700
                     transition-all duration-300 shadow-lg shadow-indigo-500/20
                     transform hover:scale-105"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setShowResult(false);
            }}
          >
            Restart Test
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

  return (
    <div
      className="max-w-4xl mx-auto p-8 rounded-xl mt-8 relative bg-gray-50 shadow-2xl"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      <TestHeader
        subtopicName={subtopicName}
        testType={testType}
        currentQuestion={current + 1}
        totalQuestions={questions.length}
      />

      <div className="text-2xl font-bold mb-6 text-gray-800 bg-white p-6 rounded-lg border border-gray-200 shadow-md">
        <MDEditorRenderer value={q.question} />
      </div>

      <div className="space-y-6 mb-6">
        <input
          className="w-full border-2 px-6 py-4 rounded-lg text-gray-700 bg-white shadow-md
                   border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2
                   transition-all duration-300 text-lg"
          placeholder="Type the output here..."
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showExplanation}
        />

        {showExplanation && (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="text-indigo-700 font-semibold text-lg mb-3">Expected Output:</div>
              <div className="text-gray-800 font-mono bg-gray-50 p-3 rounded border border-gray-100">
                <MDEditorRenderer value={q.output} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="text-indigo-700 font-semibold text-lg mb-3">Explanation:</div>
              <div className="text-gray-700">
                <MDEditorRenderer value={q.explanation} />
              </div>
            </div>
          </div>
        )}
      </div>

      {!showExplanation ? (
        <button
          className="px-8 py-3 rounded-full text-white font-semibold text-lg cursor-pointer
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-700 hover:to-purple-700
                   transition-all duration-300 shadow-lg shadow-indigo-500/20
                   transform hover:scale-105"
          onClick={handleCheck}
        >
          Check Answer
        </button>
      ) : (
        <button
          className="px-8 py-3 rounded-full text-white font-semibold text-lg cursor-pointer
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-700 hover:to-purple-700
                   transition-all duration-300 shadow-lg shadow-indigo-500/20
                   transform hover:scale-105"
          onClick={handleNext}
        >
          {current + 1 === questions.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
}
