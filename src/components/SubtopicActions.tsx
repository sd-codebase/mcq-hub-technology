"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TestStartModal from "./TestStartModal";
import ComingSoonModal from "./ComingSoonModal";

export default function SubtopicActions({
  subtopic,
  subject,
  subjectStatus,
  subjectQuestions,
}: {
  subtopic: any;
  subject: string;
  subjectStatus?: "active" | "inactive";
  subjectQuestions?: string;
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const encoded = encodeURIComponent(subtopic.id);
  const encodedName = encodeURIComponent(subtopic.name);

  const handleTestClick = (testType: string) => {
    // Check if subject is inactive
    if (subjectStatus === 'inactive') {
      setShowComingSoonModal(true);
      return; // Don't proceed to modal
    }

    // Proceed normally for active subjects
    setSelectedTest(testType);
    setShowModal(true);
  };

  const handleProceed = () => {
    if (!selectedTest) return;

    let href = "";
    if (selectedTest === "mcq") {
      href = `/subjects/${subject}/test/mcq/${encoded}/${encodedName}`;
    } else if (selectedTest === "output") {
      href = `/subjects/${subject}/test/output/${encoded}/${encodedName}`;
    } else if (selectedTest === "interview") {
      href = `/subjects/${subject}/test/interview/${encoded}/${encodedName}`;
    }

    setShowModal(false);
    router.push(href);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedTest(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mt-3">
        <button
          onClick={() => handleTestClick("mcq")}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-700 hover:to-purple-700
                     transition-all duration-300 shadow-lg shadow-indigo-500/20
                     transform hover:scale-105 cursor-pointer"
        >
          Multiple Choice Questions
        </button>
        <button
          onClick={() => handleTestClick("output")}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white
                     bg-gradient-to-r from-teal-500 to-green-500
                     hover:from-teal-600 hover:to-green-600
                     transition-all duration-300 shadow-lg shadow-teal-500/20
                     transform hover:scale-105 cursor-pointer"
        >
          Output Questions
        </button>
        <button
          onClick={() => handleTestClick("interview")}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white
                     bg-gradient-to-r from-pink-500 to-purple-500
                     hover:from-pink-600 hover:to-purple-600
                     transition-all duration-300 shadow-lg shadow-purple-500/20
                     transform hover:scale-105 cursor-pointer"
        >
          Interview Questions
        </button>
      </div>

      <TestStartModal
        isOpen={showModal}
        testType={selectedTest || ""}
        onProceed={handleProceed}
        onCancel={handleCancel}
      />

      <ComingSoonModal
        isOpen={showComingSoonModal}
        onClose={() => setShowComingSoonModal(false)}
        message={`This subject will be live soon with ${subjectQuestions}+ questions`}
      />
    </>
  );
}
