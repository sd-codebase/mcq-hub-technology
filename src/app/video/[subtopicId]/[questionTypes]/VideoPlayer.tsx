"use client";

import { useState, useEffect, useRef } from "react";
import MDEditorRenderer from "@/components/MDEditorRenderer";

type Phase = "question" | "answer" | "completed";

interface Question {
  _id: string;
  question: string;
  explanation: string;
  options?: string[];
  correct_answer?: number;
  output?: string;
  answer?: string;
}

interface VideoPlayerProps {
  questions: Question[];
  metadata: {
    subjectName: string;
    topicName: string;
    subtopicName: string;
  };
  questionType: string;
  subtopicId: string;
}

export default function VideoPlayer({
  questions,
  metadata,
  questionType,
  subtopicId,
}: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [timer, setTimer] = useState(0);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const currentQuestion = questions[currentIndex];

  // Get timing based on question type and phase
  const getPhaseTime = () => {
    if (phase === "question") {
      return questionType === "interview" ? 5 : 10; // 5s for interview, 10s for mcq/output
    }
    // Answer phase timing
    if (questionType === "mcq") return 10;
    if (questionType === "output") return 15;
    if (questionType === "interview") return 15;
    return 10;
  };

  // Get total time for progress calculation
  const getTotalPhaseTime = () => {
    return getPhaseTime();
  };

  // Calculate progress percentage (0-100)
  // Returns percentage of time remaining (100% = full, 0% = empty)
  const getProgressPercentage = () => {
    const total = getTotalPhaseTime();
    return (timer / total) * 100;
  };

  // Initialize timer when phase changes
  useEffect(() => {
    setTimer(getPhaseTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex]);

  // Auto-scroll left column based on phase
  useEffect(() => {
    if (leftColumnRef.current) {
      if (phase === "answer") {
        // Scroll to bottom when answer state starts
        leftColumnRef.current.scrollTo({
          top: leftColumnRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else if (phase === "question") {
        // Scroll to top when new question starts
        leftColumnRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [phase]);

  // Auto-scroll right column after delay when answer phase starts
  useEffect(() => {
    if (phase === "answer" && rightColumnRef.current) {
      // Determine scroll delay based on question type
      const scrollDelay = questionType === "interview" ? 10000 : 7000; // 10s for interview, 7s for mcq/output

      const timeoutId = setTimeout(() => {
        if (rightColumnRef.current) {
          rightColumnRef.current.scrollTo({
            top: rightColumnRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, scrollDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [phase, questionType]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          advancePhase();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex]);

  // Phase advancement
  const advancePhase = () => {
    if (phase === "question") {
      setPhase("answer");
    } else if (phase === "answer") {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setPhase("question");
      } else {
        setPhase("completed");
      }
    }
  };

  // Render answer box based on question type
  const renderAnswerBox = () => {
    switch (questionType) {
      case "mcq":
        return (
          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-400">
            <div className="text-green-900 font-semibold text-lg mb-3">
              Correct Answer:
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold text-2xl">✓</span>
              <div className="flex-1">
                <MDEditorRenderer
                  value={currentQuestion.options![currentQuestion.correct_answer!]}
                  dataColorMode="light"
                />
              </div>
            </div>
          </div>
        );

      case "output":
        return (
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-400">
            <div className="text-purple-900 font-semibold text-lg mb-3">
              Expected Output:
            </div>
            <div className="text-gray-900 font-mono">
              <MDEditorRenderer
                value={currentQuestion.output!}
                dataColorMode="light"
              />
            </div>
          </div>
        );

      case "interview":
        return (
          <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-400">
            <div className="text-indigo-900 font-semibold text-lg mb-3">
              Answer:
            </div>
            <div className="text-gray-800">
              <MDEditorRenderer
                value={currentQuestion.answer!}
                dataColorMode="light"
              />
            </div>
          </div>
        );
    }
  };

  // Restart function
  const restartTest = () => {
    setCurrentIndex(0);
    setPhase("question");
  };

  // Completed screen
  if (phase === "completed") {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)" }}>
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-6">
            Test Complete! 🎉
          </h2>
          <p className="text-2xl text-gray-200 mb-8">
            You reviewed {questions.length} questions
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={restartTest}
              className="px-8 py-4 rounded-lg font-bold text-white text-lg
                         bg-gradient-to-r from-indigo-600 to-purple-600
                         hover:from-indigo-700 hover:to-purple-700
                         transition-all duration-300 shadow-lg
                         transform hover:scale-105"
            >
              Restart Test
            </button>
            <a
              href={`/video/${subtopicId}/${questionType}/review`}
              className="px-8 py-4 rounded-lg font-bold text-white text-lg
                         bg-gradient-to-r from-gray-600 to-gray-700
                         hover:from-gray-700 hover:to-gray-800
                         transition-all duration-300 shadow-lg
                         transform hover:scale-105"
            >
              Back to Review
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)" }}>
      {/* 2-Column Grid */}
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Left Column: Question and Answer */}
          <div ref={leftColumnRef} className="space-y-6 overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            {/* Question Block */}
            <div className="bg-white p-8 rounded-lg border-2 border-gray-300 shadow-md">
              {/* Topic and Subtopic Name */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {metadata.subtopicName}
                </h1>
                <p className="text-gray-600 text-sm">
                  {metadata.subjectName} › {metadata.topicName} ›{" "}
                  {questionType.toUpperCase()}
                </p>
              </div>

              {/* Question Header with Progress */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-indigo-600 font-bold text-lg">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>
                {/* Circular Progress Bar */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#e5e7eb"
                      strokeWidth="5"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke={phase === "answer" ? "#22c55e" : "#6366f1"}
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - getProgressPercentage() / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xl font-bold ${phase === "answer" ? "text-green-500" : "text-indigo-600"}`}>{timer}</span>
                  </div>
                </div>
              </div>
              <div className="text-gray-900 text-xl mb-6">
                <MDEditorRenderer
                  value={currentQuestion.question}
                  dataColorMode="light"
                />
              </div>

              {/* Show options for MCQ */}
              {questionType === "mcq" && currentQuestion.options && (
                <div className="mt-6 space-y-3">
                  {currentQuestion.options.map((option, idx) => {
                    const isCorrect = idx === currentQuestion.correct_answer;
                    const showAnswer = phase === "answer";

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                          showAnswer && isCorrect
                            ? "bg-green-50 border-green-500 shadow-lg"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {showAnswer && isCorrect && (
                            <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
                          )}
                          <div className={`flex-1 ${showAnswer && isCorrect ? "text-green-900 font-semibold" : "text-gray-800"}`}>
                            <MDEditorRenderer value={option} dataColorMode="light" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Answer Box (Output only - show below question in left column) */}
            {phase === "answer" && questionType === "output" && (
              <div>
                {renderAnswerBox()}
              </div>
            )}
          </div>

          {/* Right Column: Explanation (only show in answer phase) */}
          {phase === "answer" && (
            <div ref={rightColumnRef} className={`space-y-6 overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full ${questionType === "interview" ? "" : "md:pt-0"}`}>
              {/* For Interview, show answer box here */}
              {questionType === "interview" && (
                <div>
                  {renderAnswerBox()}
                </div>
              )}

              {/* Explanation Box */}
              <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
                <div className="text-blue-900 font-semibold text-lg mb-3">
                  Explanation:
                </div>
                <div className="text-gray-800">
                  <MDEditorRenderer
                    value={currentQuestion.explanation}
                    dataColorMode="light"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
