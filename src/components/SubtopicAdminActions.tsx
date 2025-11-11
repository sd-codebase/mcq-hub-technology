"use client";
import React, { useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

interface SubtopicAdminActionsProps {
  subtopic: {
    id: string;
    name: string;
  };
  subject: string;
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

export default function SubtopicAdminActions({
  subtopic,
  subject,
}: SubtopicAdminActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<QuestionType>("mcq");
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const openModal = (type: QuestionType) => {
    setModalType(type);
    setIsOpen(true);
    setJsonInput("");
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsOpen(false);
    setJsonInput("");
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    // Validate JSON
    let questions;
    try {
      questions = JSON.parse(jsonInput);
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
          topicId: subtopic.id,
          questions,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save questions");
        setLoading(false);
        return;
      }

      // Show success message with details
      setSuccess(
        `Successfully saved ${data.saved} question(s)${
          data.duplicates > 0 ? `, ${data.duplicates} duplicate(s) skipped` : ""
        }`
      );

      // Close modal after short delay
      setTimeout(() => {
        closeModal();
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
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {MODAL_TITLES[modalType]}
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Paste JSON array of questions for: <strong>{subtopic.name}</strong>
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
                <button
                  onClick={handleSave}
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
    </>
  );
}
