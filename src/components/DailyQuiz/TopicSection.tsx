"use client";
import React from "react";
import SubtopicGroup from "./SubtopicGroup";

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  name: string;
  subtopics: Subtopic[];
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

interface TopicSectionProps {
  topic: Topic;
  isExpanded: boolean;
  onToggle: (topicName: string) => void;
  groupedTests: {
    [topicName: string]: {
      [subtopicId: string]: {
        subtopicName: string;
        tests: Test[];
      };
    };
  };
}

export default function TopicSection({
  topic,
  isExpanded,
  onToggle,
  groupedTests,
}: TopicSectionProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700">
      {/* Topic Header */}
      <button
        onClick={() => onToggle(topic.name)}
        className="w-full px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center justify-between"
      >
        <div className="text-left">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {topic.name}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span className="text-gray-400 text-2xl min-w-fit ml-4">
          {isExpanded ? "▼" : "▶"}
        </span>
      </button>

      {/* Subtopics and Tests */}
      {isExpanded && (
        <div className="bg-gray-900/30 border-t border-gray-700">
          {[...topic.subtopics].reverse().map((subtopic) => (
            <SubtopicGroup
              key={subtopic.id}
              subtopic={subtopic}
              tests={groupedTests[topic.name]?.[subtopic.id]?.tests || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
