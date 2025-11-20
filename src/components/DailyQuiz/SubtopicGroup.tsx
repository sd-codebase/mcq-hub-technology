"use client";
import React from "react";
import TestLink from "./TestLink";

interface Subtopic {
  id: string;
  name: string;
}

interface Test {
  _id: string;
  testName: string;
  questionType: string;
  subtopicName: string;
  subtopicId: string;
  topicName: string;
  questionCount: number;
  createdAt: string;
}

interface SubtopicGroupProps {
  subtopic: Subtopic;
  tests: Test[];
}

export default function SubtopicGroup({ subtopic, tests }: SubtopicGroupProps) {
  // Filter out interview tests and group by type
  const visibleTests = tests.filter(
    (test) => test.questionType.toLowerCase() !== "interview"
  );

  if (visibleTests.length === 0) return null;

  // Group tests by type for side-by-side display
  const testsByType = {
    mcq: visibleTests.filter((test) => test.questionType.toLowerCase() === "mcq"),
    output: visibleTests.filter((test) => test.questionType.toLowerCase() === "output"),
  };

  return (
    <div className="px-4 sm:px-6 py-4 border-t border-gray-700 first:border-t-0">
      <h3 className="text-sm sm:text-base font-semibold text-white mb-3">
        {subtopic.name}
      </h3>

      {/* Grid layout: 2 columns on all screen sizes */}
      <div className="grid grid-cols-2 gap-2">
        {/* MCQ Column */}
        {testsByType.mcq.length > 0 && (
          <div className="space-y-2">
            {testsByType.mcq.map((test) => (
              <TestLink key={test._id} test={test} />
            ))}
          </div>
        )}

        {/* Output Column */}
        {testsByType.output.length > 0 && (
          <div className="space-y-2">
            {testsByType.output.map((test) => (
              <TestLink key={test._id} test={test} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
