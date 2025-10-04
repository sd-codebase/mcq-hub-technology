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
    <div className="max-w-5xl mx-auto space-y-12 px-4 ">
      {topics.map((topic, topicIndex) => (
        <div
          key={topic.id}
          className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700"
          style={{
            background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            {`${topicIndex + 1}. ${topic.topic}`}
          </h3>
          <div className="space-y-6">
            {topic.subtopics.map((sub: any, subIndex: number) => (
              <div
                key={sub.id}
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 
                         hover:border-indigo-500/30 transition-all duration-300
                         hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="font-medium text-lg mb-3 text-gray-200">
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
