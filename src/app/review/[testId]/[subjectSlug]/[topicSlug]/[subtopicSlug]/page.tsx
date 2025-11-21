import ReviewContent from "../../../ReviewContent";

interface Question {
  _id: string;
  question: string;
  options?: string[];
  correct_answer?: number;
  output?: string;
  explanation: string;
}

interface TestResponse {
  success: boolean;
  data: {
    _id: string;
    subjectName: string;
    topicName: string;
    subtopicName: string;
    testName: string;
    questionType: string;
    questions: Question[];
    questionCount: number;
  };
}

interface ReviewPageProps {
  params: Promise<{
    testId: string;
  }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { testId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    // Fetch test data with all questions included
    const testResponse = await fetch(`${baseUrl}/api/tests/${testId}`, {
      cache: "no-store",
    });

    if (!testResponse.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Test Not Found</h1>
            <p className="text-xl mb-6">
              The test with ID {testId} could not be found.
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    const testData: TestResponse = await testResponse.json();

    // Support MCQ and OUTPUT question types
    const supportedTypes = ["mcq", "output"];
    const questionTypeNormalized = testData.data.questionType.toLowerCase();
    if (!supportedTypes.includes(questionTypeNormalized)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-600">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
            <p className="text-xl mb-6">
              Review for {testData.data.questionType.toUpperCase()} tests is not
              available yet.
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    const { subjectName, topicName, subtopicName, testName, questions } =
      testData.data;

    // Validate questions exist
    if (!questions || questions.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-orange-600">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">No Questions Found</h1>
            <p className="text-xl mb-6">
              This test has no questions associated with it.
            </p>
            <a
              href="/"
              className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    return (
      <ReviewContent
        subjectName={subjectName}
        topicName={topicName}
        subtopicName={subtopicName}
        testName={testName}
        questions={questions}
      />
    );
  } catch (error) {
    console.error("Error loading review page:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-red-600">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Error Loading Test</h1>
          <p className="text-xl mb-6">
            An error occurred while loading the test review.
          </p>
          <a
            href="/"
            className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
}
