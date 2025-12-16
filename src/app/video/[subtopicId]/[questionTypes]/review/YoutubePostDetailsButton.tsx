"use client";

import React, { useState } from "react";
import YoutubePostDetailsModal from "@/components/YoutubePostDetailsModal";

interface YoutubePostDetailsButtonProps {
  subtopicId: string;
  questionType: "mcq" | "output" | "interview";
  metadata: {
    subjectName: string;
    topicName: string;
    subtopicName: string;
    topicIndex: number;
    subtopicIndex: number;
  };
}

export default function YoutubePostDetailsButton({
  subtopicId,
  questionType,
  metadata,
}: YoutubePostDetailsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold text-white
                   bg-gradient-to-r from-red-600 to-pink-600
                   hover:from-red-700 hover:to-pink-700
                   transition-all duration-300 shadow-lg
                   transform hover:scale-105"
      >
        📺 YouTube Details
      </button>

      <YoutubePostDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtopicId={subtopicId}
        questionType={questionType}
        metadata={metadata}
      />
    </>
  );
}
