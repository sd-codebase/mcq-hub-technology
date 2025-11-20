"use client";
import React, { useState, useEffect } from "react";
import DailyQuizHeader from "./DailyQuiz/DailyQuizHeader";
import TopicSection from "./DailyQuiz/TopicSection";
import LoadingState from "./DailyQuiz/LoadingState";
import ErrorState from "./DailyQuiz/ErrorState";
import NotFoundState from "./DailyQuiz/NotFoundState";
import EmptyState from "./DailyQuiz/EmptyState";

interface Subtopic {
  id: string;
  name: string;
}

interface Topic {
  name: string;
  subtopics: Subtopic[];
}

interface Subject {
  name: string;
  topics: Topic[];
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

interface DailyQuizContentProps {
  shortname: string;
}

export default function DailyQuizContent({
  shortname,
}: DailyQuizContentProps) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch published tests grouped by topic and subtopic
        const response = await fetch(
          `/api/subjects/${shortname}/published-tests`
        );

        if (!response.ok) {
          throw new Error("Subject not found");
        }

        const data = await response.json();

        if (!data.success || !data.data) {
          throw new Error("Invalid subject data");
        }

        const subjectData = data.data;
        setSubject(subjectData);

        // Flatten tests from grouped structure for compatibility
        const allTests: Test[] = [];
        subjectData.topics.forEach((topic) => {
          topic.subtopics.forEach((subtopic) => {
            allTests.push(...subtopic.tests);
          });
        });

        setTests(allTests);

        // Expand first topic by default (last one in original order since we reverse)
        if (subjectData.topics.length > 0) {
          const firstTopicName = subjectData.topics[subjectData.topics.length - 1].name;
          setExpandedTopics(new Set([firstTopicName]));
        } else {
          setExpandedTopics(new Set());
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load subject data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shortname]);

  const toggleTopic = (topicName: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicName)) {
      newExpanded.delete(topicName);
    } else {
      newExpanded.add(topicName);
    }
    setExpandedTopics(newExpanded);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!subject) {
    return <NotFoundState />;
  }

  return (
    <div
      className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 pt-20"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      <DailyQuizHeader subjectName={subject.name} testCount={tests.length} />

      {/* Topics and Tests */}
      <div className="max-w-5xl mx-auto space-y-4 mb-8">
        {subject.topics
          .map((topic, index) => ({ topic, index }))
          .reverse()
          .map(({ topic }) => (
            <TopicSection
              key={topic.name}
              topic={topic}
              isExpanded={expandedTopics.has(topic.name)}
              onToggle={toggleTopic}
              groupedTests={{
                [topic.name]: {
                  ...Object.fromEntries(
                    topic.subtopics.map((subtopic) => [
                      subtopic.id,
                      {
                        subtopicName: subtopic.name,
                        tests: subtopic.tests,
                      },
                    ])
                  ),
                },
              }}
            />
          ))}
      </div>

      {/* No tests message */}
      {tests.length === 0 && <EmptyState />}
    </div>
  );
}
