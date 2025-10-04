// Client component for rendering topics
"use client";
import React, { useEffect, useState } from "react";

import SubtopicActions from "./SubtopicActions";

export default function TopicsList({ subject }: { subject: string }) {
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subject) return;
    fetch(`/api/${subject}/topics`)
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics || []);
      })
      .catch(() => setError("Failed to load topics."));
  }, [subject]);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {topics.map((topic, topicIndex) => (
        <div
          key={topic.id}
          className="bg-white rounded-lg shadow p-6 border border-gray-200"
        >
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: "var(--color-secondary)" }}
          >
            {`${topicIndex + 1}. ${topic.topic}`}
          </h3>
          <div className="space-y-2">
            {topic.subtopics.map((sub: any, subIndex: number) => (
              <div
                key={sub.id}
                className="mb-4 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="font-medium text-base mb-2"
                  style={{ color: "var(--color-primary)" }}
                >
                  {`${topicIndex + 1}.${subIndex + 1} ${sub.name}`}
                </div>
                <SubtopicActions subtopic={sub} subject={subject} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
