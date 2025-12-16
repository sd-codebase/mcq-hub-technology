import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";
import VideoPlayer from "./VideoPlayer";
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

export default async function VideoPage({
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">
          Invalid question type. Must be mcq, output, or interview.
        </div>
      </div>
    );
  }

  // Fetch questions
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

    // Fetch metadata
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-900 text-xl">
            No questions found for this subtopic.
          </div>
        </div>
      );
    }

    // Fetch YouTube post details
    let youtubePostDetails = null;
    try {
      const youtubeResponse = await fetch(
        `${baseUrl}/api/youtube-post-details/${subtopicId}/${questionTypes}`,
        { cache: "no-store" }
      );
      const youtubeResult = await youtubeResponse.json();
      if (youtubeResult.success) {
        youtubePostDetails = youtubeResult.data;
      }
    } catch (error) {
      console.error("Error fetching YouTube post details:", error);
    }

    // Pass to client component
    return (
      <VideoPlayer
        questions={questions}
        metadata={metadata}
        questionType={questionTypes}
        subtopicId={subtopicId}
        youtubePostDetails={youtubePostDetails}
      />
    );
  } catch (error) {
    console.error("Error fetching questions:", error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">
          Error loading questions. Please try again later.
        </div>
      </div>
    );
  }
}
