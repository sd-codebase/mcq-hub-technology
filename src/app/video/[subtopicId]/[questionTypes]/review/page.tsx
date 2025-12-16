import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";
import MDEditorRenderer from "@/components/MDEditorRenderer";
import Link from "next/link";
import GoToTopButton from "./GoToTopButton";
import YoutubePostDetailsButton from "./YoutubePostDetailsButton";
import { RestrictedAccess } from "@/components/RestrictedAccess";

interface Question {
  _id: string;
  question: string;
  explanation: string;
  options?: string[];
  correct_answer?: number;
  output?: string;
  answer?: string;
}

export default async function VideoReviewPage({
  params,
}: {
  params: Promise<{ subtopicId: string; questionTypes: string }>;
}) {
  if (process.env.NEXT_PUBLIC_ACTOR_MODE !== "ADMIN") {
    return <RestrictedAccess />;
  }
  const { subtopicId, questionTypes } = await params;

  // Validate questionTypes
  const validTypes = ["mcq", "output", "interview"];
  if (!validTypes.includes(questionTypes)) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">
          Invalid question type. Must be mcq, output, or interview.
        </div>
      </div>
    );
  }

  // 1. Fetch questions
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;

  try {
    const questionsResponse = await fetch(
      `${baseUrl}/api/questions/${questionTypes}?topicId=${subtopicId}`,
      { cache: "no-store" }
    );

    const result = await questionsResponse.json();
    const questions: Question[] = result.data || [];

    // 2. Fetch metadata
    await connectDB();
    const subject = await Subject.findOne({
      "topics.subtopics.id": subtopicId,
    });

    let metadata = {
      subjectName: "Unknown Subject",
      topicName: "Unknown Topic",
      subtopicName: "Unknown Subtopic",
      topicIndex: 0,
      subtopicIndex: 0,
    };

    if (subject) {
      for (let topicIdx = 0; topicIdx < subject.topics.length; topicIdx++) {
        const topic = subject.topics[topicIdx];
        const subtopicIdx = topic.subtopics.findIndex(
          (st: any) => st.id === subtopicId
        );
        if (subtopicIdx !== -1) {
          metadata.subjectName = subject.name;
          metadata.topicName = topic.name;
          metadata.subtopicName = topic.subtopics[subtopicIdx].name;
          metadata.topicIndex = topicIdx + 1; // 1-based indexing
          metadata.subtopicIndex = subtopicIdx + 1; // 1-based indexing
          break;
        }
      }
    }

    // Check if no questions found
    if (!questions || questions.length === 0) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">
            No questions found for this subtopic.
          </div>
        </div>
      );
    }

    // 3. Render page with questions
    return (
      <div className="min-h-screen bg-gray-900 p-8">
        {/* Header with metadata */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {metadata.subtopicName}
              </h1>
              <p className="text-gray-400">
                {metadata.subjectName} › {metadata.topicName} ›{" "}
                {questionTypes.toUpperCase()}
              </p>
              <p className="text-gray-500 mt-2">{questions.length} questions</p>
            </div>

            {/* Button Group */}
            <div className="flex gap-3">
              <YoutubePostDetailsButton
                subtopicId={subtopicId}
                questionType={questionTypes as "mcq" | "output" | "interview"}
                metadata={metadata}
              />

              {/* Start Test Button */}
              <Link
                href={`/video/${subtopicId}/${questionTypes}`}
                className="px-8 py-4 rounded-lg font-bold text-white text-lg
                           bg-gradient-to-r from-indigo-600 to-purple-600
                           hover:from-indigo-700 hover:to-purple-700
                           transition-all duration-300 shadow-lg
                           transform hover:scale-105"
              >
                Start Test
              </Link>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="max-w-7xl mx-auto space-y-6">
          {questions.map((question, index) => (
            <div key={question._id} className="bg-gray-800 rounded-lg p-6">
              {/* Question Number */}
              <div className="mb-4">
                <span className="text-indigo-400 font-bold">
                  Question {index + 1}
                </span>
              </div>

              {/* Question Text */}
              <div className="mb-6 text-xl text-white">
                <MDEditorRenderer
                  value={question.question}
                  dataColorMode="dark"
                />
              </div>

              {/* Render based on question type */}
              {questionTypes === "mcq" && question.options && (
                <>
                  {/* MCQ Options */}
                  <div className="space-y-3 mb-6">
                    {question.options.map((option: string, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 ${
                          idx === question.correct_answer
                            ? "bg-green-500/20 border-green-500"
                            : "bg-gray-700/50 border-gray-600"
                        }`}
                      >
                        {idx === question.correct_answer && (
                          <span className="text-green-400 font-bold mr-2">
                            ✓
                          </span>
                        )}
                        <MDEditorRenderer value={option} dataColorMode="dark" />
                      </div>
                    ))}
                  </div>
                  {/* Explanation */}
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <div className="text-blue-300 font-semibold mb-2">
                      Explanation:
                    </div>
                    <div className="text-gray-300">
                      <MDEditorRenderer
                        value={question.explanation}
                        dataColorMode="dark"
                      />
                    </div>
                  </div>
                </>
              )}

              {questionTypes === "output" && question.output && (
                <>
                  {/* Expected Output */}
                  <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg mb-6">
                    <div className="text-purple-300 font-semibold mb-2">
                      Expected Output:
                    </div>
                    <div className="text-white font-mono">
                      <MDEditorRenderer
                        value={question.output}
                        dataColorMode="dark"
                      />
                    </div>
                  </div>
                  {/* Explanation */}
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <div className="text-blue-300 font-semibold mb-2">
                      Explanation:
                    </div>
                    <div className="text-gray-300">
                      <MDEditorRenderer
                        value={question.explanation}
                        dataColorMode="dark"
                      />
                    </div>
                  </div>
                </>
              )}

              {questionTypes === "interview" && question.answer && (
                <>
                  {/* Answer */}
                  <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg mb-6">
                    <div className="text-indigo-300 font-semibold mb-2">
                      Answer:
                    </div>
                    <div className="text-gray-300">
                      <MDEditorRenderer
                        value={question.answer}
                        dataColorMode="dark"
                      />
                    </div>
                  </div>
                  {/* Explanation */}
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <div className="text-blue-300 font-semibold mb-2">
                      Additional Notes:
                    </div>
                    <div className="text-gray-300">
                      <MDEditorRenderer
                        value={question.explanation}
                        dataColorMode="dark"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Go to Top Button */}
        <GoToTopButton />
      </div>
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">
          Error loading questions. Please try again later.
        </div>
      </div>
    );
  }
}
