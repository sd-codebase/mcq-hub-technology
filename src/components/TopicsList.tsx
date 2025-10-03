// Client component for rendering topics
"use client";
import React, { useEffect, useState } from "react";

import SubtopicActions from "./SubtopicActions";

export default function TopicsList() {
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/topics")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.javascript_syllabus || []);
      })
      .catch(() => setError("Failed to load topics."));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="bg-white rounded-lg shadow p-6 border border-gray-200"
        >
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: "var(--color-secondary)" }}
          >
            {topic.topic}
          </h3>
          <div className="space-y-2">
            {topic.subtopics.map((sub: any) => (
              <div key={sub.id} className="mb-2">
                <div
                  className="font-medium text-base mb-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  {sub.name}
                </div>
                <SubtopicActions subtopic={sub} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
