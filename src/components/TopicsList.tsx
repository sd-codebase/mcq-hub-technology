// Client component for rendering topics
"use client";
import React, { useEffect, useState } from "react";

import SubtopicActions from "./SubtopicActions";
import SubtopicAdminActions from "./SubtopicAdminActions";

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  name: string;
  subtopics: Subtopic[];
}

interface SubjectResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    topics: Topic[];
  };
}

export default function TopicsList({ subject }: { subject: string }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectMetadata, setSubjectMetadata] = useState<any>(null);
  const isAdminMode = process.env.NEXT_PUBLIC_ACTOR_MODE === "ADMIN";

  useEffect(() => {
    if (!subject) return;

    setLoading(true);
    setError(null);

    // Fetch topics
    fetch(`/api/subjects/by-shortname?shortname=${subject}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }
        return res.json();
      })
      .then((data: SubjectResponse) => {
        setTopics(data.data.topics || []);
      })
      .catch(() => setError("Failed to load topics."))
      .finally(() => setLoading(false));

    // Fetch subject metadata to get status
    fetch(`/api/subjects`)
      .then((res) => res.json())
      .then((data) => {
        // Find the subject metadata by shortname
        const metadata = data.data.find((s: any) => s.shortName === subject);
        setSubjectMetadata(metadata);
      })
      .catch((err) => console.error("Failed to fetch subject metadata:", err));
  }, [subject]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-400">Loading topics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 text-center py-20">
        <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sticky Go to Subjects Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <a
          href="/#subjects"
          className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 block"
        >
          ← Go to Subjects
        </a>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 px-4 ">
        {topics.map((topic, topicIndex) => (
        <div
          key={topicIndex}
          className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700"
          style={{
            background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            {`${topicIndex + 1}. ${topic.name}`}
          </h3>
          <div className="space-y-6">
            {topic.subtopics.map((sub: Subtopic, subIndex: number) => (
              <div
                key={sub.id}
                className="p-6 bg-gray-900/50 rounded-lg border border-gray-700/50 
                         hover:border-indigo-500/30 transition-all duration-300
                         hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="font-medium text-lg mb-3 text-gray-200">
                  {`${topicIndex + 1}.${subIndex + 1} ${sub.name}`}
                </div>
                {isAdminMode ? (
                  <SubtopicAdminActions subtopic={sub} subject={subject} topicName={topic.name} allSubtopics={topic.subtopics} topicIndex={topicIndex} subtopicIndex={subIndex} allTopics={topics} />
                ) : (
                  <SubtopicActions
                    subtopic={sub}
                    subject={subject}
                    subjectStatus={subjectMetadata?.status}
                    subjectQuestions={subjectMetadata?.questions}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
