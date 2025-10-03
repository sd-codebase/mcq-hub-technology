interface TestHeaderProps {
  subtopicName: string;
  testType: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function TestHeader({
  subtopicName,
  testType,
  currentQuestion,
  totalQuestions,
}: TestHeaderProps) {
  return (
    <>
      {/* Top row: topic, test type, question count */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div
          className="font-semibold text-base text-gray-800 truncate text-center w-full"
          title={subtopicName || ""}
        >
          {subtopicName}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-2 mb-2 whitespace-nowrap">
        <div className="text-sm text-blue-700 font-semibold bg-blue-50 rounded px-2 py-1 shrink-0">
          {testType}
        </div>
        <div className="text-md font-mono text-sm text-blue-700 font-semibold bg-blue-50 rounded px-2 py-1 shrink-0">
          {currentQuestion} / {totalQuestions}
        </div>
      </div>
    </>
  );
}
