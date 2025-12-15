"use client";
import React, { useState, useEffect } from "react";
import CopyPromptButton from "./CopyPromptButton";
import TestActions from "./TestActions";
import { debounce } from "lodash";

type QuestionType = "mcq" | "output" | "interview";

interface SubtopicAdminActionsProps {
  subtopic: {
    id: string;
    name: string;
  };
  subject: string;
  topicName: string;
  allSubtopics?: Array<{
    id: string;
    name: string;
  }>;
  topicIndex?: number;
  subtopicIndex?: number;
}

const EXAMPLE_JSON = {
  mcq: `[
  {
    "question": "What is JavaScript?",
    "options": ["A language", "A framework", "A library", "A tool"],
    "correct_answer": 0,
    "explanation": "JavaScript is a programming language"
  }
]`,
  output: `[
  {
    "question": "console.log(typeof null)",
    "output": "object",
    "explanation": "typeof null returns 'object' in JavaScript"
  }
]`,
  interview: `[
  {
    "question": "What is closure?",
    "answer": "A closure is a function that has access to variables from its outer scope",
    "explanation": "Closures are created when a function is defined inside another function"
  }
]`,
};

const ExpectedKeysInJson = {
  mcq: ["question", "options", "correct_answer", "explanation"],
  output: ["question", "output", "explanation"],
  interview: ["question", "answer", "explanation"],
};

const API_ENDPOINTS = {
  mcq: "/api/questions/mcq",
  output: "/api/questions/output",
  interview: "/api/questions/interview",
};

const BUTTON_STYLES = {
  mcq: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/20",
  output:
    "bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 shadow-teal-500/20",
  interview:
    "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-purple-500/20",
};

const MODAL_TITLES = {
  mcq: "Add Multiple Choice Questions",
  output: "Add Output Questions",
  interview: "Add Interview Questions",
};

// Subject to Language mapping
const SUBJECT_LANGUAGE_MAP: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  nodejs: "javascript",
  reactjs: "javascript",
  angular: "typescript",
  vuejs: "javascript",
  html: "html",
  css: "css",
  sass: "css",
};

const getLanguageFromSubject = (subjectName: string): string => {
  const normalized = subjectName.toLowerCase().trim();
  return SUBJECT_LANGUAGE_MAP[normalized] || subjectName;
};

export default function SubtopicAdminActions({
  subtopic,
  subject,
  topicName,
  allSubtopics = [],
  topicIndex = 0,
  subtopicIndex = 0,
}: SubtopicAdminActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<QuestionType>("mcq");
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [currentSubtopic, setCurrentSubtopic] = useState(subtopic);
  const [currentSubtopicIndex, setCurrentSubtopicIndex] =
    useState(subtopicIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationState, setAnimationState] = useState<
    "idle" | "entering" | "exiting"
  >("idle");

  // Question counts for each type
  const QUESTION_COUNTS = {
    mcq: 20,
    output: 15,
    interview: 10,
  };

  const getQuestionCount = (): number => QUESTION_COUNTS[modalType];

  // Find the next subtopic
  const getNextSubtopic = () => {
    if (!allSubtopics || allSubtopics.length === 0) return null;
    const currentIndex = allSubtopics.findIndex(
      (s) => s.id === currentSubtopic.id
    );
    if (currentIndex === -1 || currentIndex === allSubtopics.length - 1) {
      return null; // No next subtopic
    }
    return allSubtopics[currentIndex + 1];
  };

  // Tests state
  const [tests, setTests] = useState<any[]>([]);
  const [testsLoading, setTestsLoading] = useState(false);
  const [testsError, setTestsError] = useState("");
  const [isTestsModalOpen, setIsTestsModalOpen] = useState(false);

  const handleWindowFocus = () => {
    handlePasteEvent();
  };

  const handlePasteEvent = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      // Check if clipboardText has content
      const hasContent = clipboardText && clipboardText.trim().length > 0;
      console.log("Clipboard has content:", hasContent);

      if (!hasContent) {
        return;
      }

      const questions = JSON.parse(clipboardText);

      // Validate questions against ExpectedKeysInJson
      const expectedKeys = ExpectedKeysInJson[modalType];
      const isValid =
        Array.isArray(questions) &&
        questions.every((question) =>
          expectedKeys.every((key) => key in question)
        );

      console.log("Questions have expected keys:", isValid);

      if (isValid) {
        debouncedPaste();
      }
    } catch (error) {
      console.log("Error: Failed to read clipboard:", error);
    }
  };

  // Detect when user returns to the browser tab using cmd+tab or clicking back
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("focus", handleWindowFocus);
    }

    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, [isOpen]);

  // Fetch tests for this subtopic
  const fetchTests = async () => {
    setTestsLoading(true);
    setTestsError("");

    try {
      // Single API call to fetch all test types
      const response = await fetch(`/api/tests?subtopicId=${subtopic.id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch tests");
      }

      const data = await response.json();
      setTests(data.data || []);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setTestsError("Failed to load tests");
    } finally {
      setTestsLoading(false);
    }
  };

  const openModal = (type: QuestionType) => {
    setModalType(type);
    setIsOpen(true);
    setJsonInput("");
    setError("");
    setSuccess("");
    setAnimationState("entering");
  };

  const openNextSubtopicModalWithAnimation = async (type: QuestionType) => {
    const nextSubtopic = getNextSubtopic();
    if (!nextSubtopic) {
      // No next subtopic, just close
      closeModal();
      return;
    }

    // Start exit animation
    setAnimationState("exiting");

    // Wait for exit animation to complete
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Close modal completely to unmount and destroy old state
    setIsOpen(false);

    // Wait a tick for React to unmount
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Switch to next subtopic and reset state
    setCurrentSubtopic(nextSubtopic);
    setCurrentSubtopicIndex(currentSubtopicIndex + 1);
    setJsonInput("");
    setError("");
    setSuccess("");
    setAnimationState("entering");

    // Reopen modal with fresh state
    setIsOpen(true);

    // Wait for enter animation to complete
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnimationState("idle");
  };

  const closeModal = () => {
    setIsOpen(false);
    setJsonInput("");
    setError("");
    setSuccess("");
    setAnimationState("idle");
    setCurrentSubtopic(subtopic); // Reset to original subtopic
    setCurrentSubtopicIndex(subtopicIndex); // Reset to original index
  };

  const openTestsModal = () => {
    setIsTestsModalOpen(true);
    fetchTests();
  };

  const closeTestsModal = () => {
    setIsTestsModalOpen(false);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setJsonInput(clipboardText);
      setError(""); // Clear any previous errors

      // Auto-save
      handleSave(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard:", error);
      setError("Failed to read clipboard. Please check clipboard permissions.");
    }
  };

  const debouncedPaste = debounce(handlePaste, 100);

  const handleSave = async (clipboardText?: string) => {
    // console.log("called save");
    // return;
    setError("");
    setSuccess("");

    // Validate JSON
    let questions;
    try {
      questions = JSON.parse(clipboardText || jsonInput);
      if (!Array.isArray(questions)) {
        setError("Input must be a JSON array");
        return;
      }
      if (questions.length === 0) {
        setError("Array cannot be empty");
        return;
      }
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS[modalType], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: currentSubtopic.id,
          questions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save questions");
        setLoading(false);
        return;
      }

      // const data = { saved: 25, duplicates: 0, testsCreated : 4};

      // Show success message with details
      setSuccess(
        `Successfully saved ${data.saved} question(s)${
          data.duplicates > 0 ? `, ${data.duplicates} duplicate(s) skipped` : ""
        }${data.testsCreated ? `, ${data.testsCreated} test(s) created` : ""}`
      );

      // Re-fetch tests to show newly created ones
      fetchTests();

      // Close modal after short delay and open next subtopic if available
      setTimeout(() => {
        openNextSubtopicModalWithAnimation(modalType);
      }, 2000);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-3">
        <button
          onClick={() => openModal("mcq")}
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white
                     ${BUTTON_STYLES.mcq}
                     transition-all duration-300 shadow-lg
                     transform hover:scale-105`}
        >
          Multiple Choice Questions
        </button>
        <button
          onClick={() => openModal("output")}
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white
                     ${BUTTON_STYLES.output}
                     transition-all duration-300 shadow-lg
                     transform hover:scale-105`}
        >
          Output Questions
        </button>
        <button
          onClick={() => openModal("interview")}
          className={`px-4 py-2 rounded-full text-sm font-semibold text-white
                     ${BUTTON_STYLES.interview}
                     transition-all duration-300 shadow-lg
                     transform hover:scale-105`}
        >
          Interview Questions
        </button>
        <button
          onClick={openTestsModal}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white
                   bg-gradient-to-r from-amber-600 to-orange-600
                   hover:from-amber-700 hover:to-orange-700
                   transition-all duration-300 shadow-lg shadow-amber-500/20
                   transform hover:scale-105"
        >
          View Tests
        </button>
      </div>

      {/* Add Questions Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 transition-opacity duration-500 ${
            animationState === "exiting" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 transition-all duration-500 ${
              animationState === "entering"
                ? "opacity-100 scale-100"
                : animationState === "exiting"
                ? "opacity-0 scale-95"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {MODAL_TITLES[modalType]}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Paste JSON array of questions for:{" "}
                <strong>
                  {topicIndex + 1}.{currentSubtopicIndex + 1}{" "}
                  {currentSubtopic.name}
                </strong>
              </p>

              {/* Example format */}
              <details className="mb-4">
                <summary className="text-sm text-indigo-400 cursor-pointer hover:text-indigo-300">
                  Show example format
                </summary>
                <pre className="mt-2 p-3 bg-gray-900 rounded text-xs text-gray-300 overflow-x-auto">
                  {EXAMPLE_JSON[modalType]}
                </pre>
              </details>

              {/* Paste Button */}
              <div className="mb-4">
                <button
                  onClick={handlePaste}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                >
                  📋 Paste and Save
                </button>
              </div>

              {/* Textarea */}
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON array here..."
                className="w-full h-64 p-4 bg-gray-900 text-gray-200 border border-gray-700
                         rounded-lg focus:outline-none focus:border-indigo-500 font-mono text-sm
                         resize-none"
              />

              {/* Error message */}
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="mt-4 p-3 bg-green-900/20 border border-green-500 rounded text-green-400 text-sm">
                  {success}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <CopyPromptButton
                  questionType={modalType}
                  count={getQuestionCount()}
                  subjectName={subject}
                  chapterName={topicName}
                  topicName={currentSubtopic.name}
                  language={getLanguageFromSubject(subject)}
                />
                <button
                  onClick={() => handleSave()}
                  disabled={loading || !jsonInput.trim()}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold text-white
                           ${
                             loading || !jsonInput.trim()
                               ? "bg-gray-600 cursor-not-allowed"
                               : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                           }
                           transition-all duration-300`}
                >
                  {loading ? "Saving..." : "Save Questions"}
                </button>
                <button
                  onClick={closeModal}
                  disabled={loading}
                  className="px-6 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700
                           hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tests Modal */}
      {isTestsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              {/* Header with Refresh Button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Tests - {subtopic.name}
                </h2>
                <button
                  onClick={fetchTests}
                  disabled={testsLoading}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white
                           bg-indigo-600 hover:bg-indigo-700
                           transition-all duration-300 disabled:opacity-50"
                >
                  {testsLoading ? "⏳ Loading..." : "🔄 Refresh"}
                </button>
              </div>

              {/* Video Section */}
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Video</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`/video/${subtopic.id}/mcq/review`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg
                               bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                               text-white font-semibold transition-all duration-300 shadow-lg"
                  >
                    <span>MCQ</span>
                  </a>
                  <a
                    href={`/video/${subtopic.id}/output/review`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg
                               bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700
                               text-white font-semibold transition-all duration-300 shadow-lg"
                  >
                    <span>Output</span>
                  </a>
                  <a
                    href={`/video/${subtopic.id}/interview/review`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg
                               bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700
                               text-white font-semibold transition-all duration-300 shadow-lg"
                  >
                    <span>Interview</span>
                  </a>
                </div>
              </div>

              {/* Loading State */}
              {testsLoading && (
                <div className="text-center py-12 text-gray-400">
                  <div className="text-lg">Loading tests...</div>
                </div>
              )}

              {/* Error State */}
              {testsError && (
                <div className="p-4 bg-red-900/20 border border-red-500 rounded text-red-400 text-center">
                  {testsError}
                </div>
              )}

              {/* Empty State */}
              {!testsLoading && !testsError && tests.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-2">
                    No tests created yet
                  </div>
                  <div className="text-gray-600 text-sm">
                    Tests will appear here after you add at least 5 questions of
                    the same type
                  </div>
                </div>
              )}

              {/* Tests Grid */}
              {!testsLoading && !testsError && tests.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {tests.map((test) => {
                    const encodedName = encodeURIComponent(subtopic.name);
                    const questionType = test.questionType || "mcq";
                    const testUrl = `/subjects/${subject}/test/${questionType}/${subtopic.id}/${encodedName}`;

                    // Determine badge color based on question type
                    const badgeColors = {
                      mcq: "bg-indigo-500",
                      output: "bg-teal-500",
                      interview: "bg-pink-500",
                    };
                    const badgeColor =
                      badgeColors[questionType as keyof typeof badgeColors] ||
                      "bg-gray-500";

                    const cardBaseClassName =
                      "p-4 rounded-lg border border-gray-600 bg-gray-700/50 transition-all duration-300";
                    const cardWithHoverClassName =
                      cardBaseClassName + " hover:border-indigo-500";
                    const interviewCardClassName =
                      cardBaseClassName + " cursor-default hover:bg-gray-700/50";

                    // For interview tests, render as div without button
                    if (questionType === "interview") {
                      return (
                        <div
                          key={test._id}
                          className={interviewCardClassName}
                        >
                          <div className="font-semibold text-white text-lg mb-2">
                            {test.testName}
                          </div>
                          <div className="text-sm text-gray-400 mb-3">
                            {test.questionCount} questions
                          </div>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${badgeColor}`}
                          >
                            {questionType.toUpperCase()}
                          </span>
                        </div>
                      );
                    }

                    // For other test types, render as card with Review button
                    return (
                      <div
                        key={test._id}
                        className={cardWithHoverClassName}
                      >
                        <div className="font-semibold text-white text-lg mb-2">
                          {test.testName}
                        </div>
                        <div className="text-sm text-gray-400 mb-3">
                          {test.questionCount} questions
                        </div>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${badgeColor}`}
                        >
                          {questionType.toUpperCase()}
                        </span>
                        <TestActions test={test} subtopicName={subtopic.name} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Close Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeTestsModal}
                  className="px-6 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700
                           hover:bg-gray-600 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
