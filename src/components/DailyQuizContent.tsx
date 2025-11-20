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

        // Fetch subject data
        const subjectResponse = await fetch(
          `/api/subjects/by-shortname?shortname=${shortname}`
        );

        if (!subjectResponse.ok) {
          throw new Error("Subject not found");
        }

        const subjectData = await subjectResponse.json();

        if (!subjectData.success || !subjectData.data) {
          throw new Error("Invalid subject data");
        }

        setSubject(subjectData.data);

        // Fetch all tests for each subtopic in parallel
        const allTests: Test[] = [];

        const subtopicTestPromises = subjectData.data.topics.flatMap(
          (topic: Topic) =>
            topic.subtopics.map((subtopic: Subtopic) =>
              fetch(`/api/tests?subtopicId=${subtopic.id}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.success && data.data && Array.isArray(data.data)) {
                    const testsWithTopicInfo = data.data.map((test: any) => ({
                      ...test,
                      topicName: topic.name,
                      subtopicId: subtopic.id,
                      subtopicName: subtopic.name,
                    }));
                    allTests.push(...testsWithTopicInfo);
                  }
                })
                .catch((err) => console.error("Error fetching tests:", err))
            )
        );

        await Promise.all(subtopicTestPromises);

        // Sort tests: by topic, by subtopic, then by name descending
        const sortedTests = allTests.sort((a, b) => {
          const topicAIndex = subjectData.data.topics.findIndex(
            (t: Topic) => t.name === a.topicName
          );
          const topicBIndex = subjectData.data.topics.findIndex(
            (t: Topic) => t.name === b.topicName
          );

          if (topicAIndex !== topicBIndex) {
            return topicAIndex - topicBIndex;
          }

          const topicA = subjectData.data.topics[topicAIndex];
          const subtopicAIndex = topicA.subtopics.findIndex(
            (s: Subtopic) => s.id === a.subtopicId
          );
          const subtopicBIndex = topicA.subtopics.findIndex(
            (s: Subtopic) => s.id === b.subtopicId
          );

          if (subtopicAIndex !== subtopicBIndex) {
            return subtopicAIndex - subtopicBIndex;
          }

          // Sort by test name descending (handle "Part X" format)
          const aMatch = a.testName.match(/Part\s*(\d+)/);
          const bMatch = b.testName.match(/Part\s*(\d+)/);

          if (aMatch && bMatch) {
            // Both are "Part X" format, sort numerically descending
            return parseInt(bMatch[1]) - parseInt(aMatch[1]);
          }

          // Fallback to alphabetical descending
          return b.testName.localeCompare(a.testName);
        });

        setTests(sortedTests);

        // Expand first topic by default (last one in original order since we reverse)
        if (subjectData.data.topics.length > 0) {
          const firstTopicName = subjectData.data.topics[subjectData.data.topics.length - 1].name;
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

  const getTestsByTopicAndSubtopic = () => {
    const grouped: {
      [topicName: string]: {
        [subtopicId: string]: {
          subtopicName: string;
          tests: Test[];
        };
      };
    } = {};

    tests.forEach((test) => {
      if (!grouped[test.topicName]) {
        grouped[test.topicName] = {};
      }
      if (!grouped[test.topicName][test.subtopicId]) {
        grouped[test.topicName][test.subtopicId] = {
          subtopicName: test.subtopicName,
          tests: [],
        };
      }
      grouped[test.topicName][test.subtopicId].tests.push(test);
    });

    return grouped;
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

  const groupedTests = getTestsByTopicAndSubtopic();

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
        {subject.topics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No topics available</p>
          </div>
        ) : (
          subject.topics
            .map((topic, index) => ({ topic, index }))
            .reverse()
            .map(({ topic }) => (
              <TopicSection
                key={topic.name}
                topic={topic}
                isExpanded={expandedTopics.has(topic.name)}
                onToggle={toggleTopic}
                groupedTests={groupedTests}
              />
            ))
        )}
      </div>

      {/* No tests message */}
      {tests.length === 0 && <EmptyState />}
    </div>
  );
}
