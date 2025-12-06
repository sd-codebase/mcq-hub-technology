"use client";
import { useState, useEffect } from "react";

// SVG Icon Components
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

interface TestData {
  _id: string;
  testName: string;
  subtopicName: string;
  questionType: string;
}

export default function SocialMediaPublishPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const [testId, setTestId] = useState<string>("");
  const [testData, setTestData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [videoExists, setVideoExists] = useState<boolean>(false);
  const [checkingVideo, setCheckingVideo] = useState<boolean>(false);

  // Extract testId from params
  useEffect(() => {
    params.then((p) => setTestId(p.testId));
  }, [params]);

  // Fetch test data
  useEffect(() => {
    if (!testId) return;

    async function fetchTest() {
      try {
        const response = await fetch(`/api/tests/${testId}`);
        const result = await response.json();

        if (result.success) {
          setTestData(result.data);
        } else {
          setError("Failed to fetch test data");
        }
      } catch (err) {
        setError("Error loading test");
      } finally {
        setLoading(false);
      }
    }

    fetchTest();
  }, [testId]);

  // Check if video exists
  useEffect(() => {
    if (!testData) return;

    async function checkVideoExists() {
      setCheckingVideo(true);
      try {
        const formatText = (text: string) =>
          text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        const filename = `${testData.questionType}-${formatText(testData.testName)}-${formatText(testData.subtopicName)}`;

        const response = await fetch(`/api/videos/check/${filename}`);
        const result = await response.json();

        if (result.success) {
          setVideoExists(result.exists);
        }
      } catch (err) {
        console.error("Error checking video:", err);
      } finally {
        setCheckingVideo(false);
      }
    }

    checkVideoExists();
  }, [testData]);

  // Copy handler
  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Generate filename using same logic as TestActions
  const generateFilename = () => {
    if (!testData) return "";

    const formatText = (text: string) =>
      text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    return `${testData.questionType}-${formatText(testData.testName)}-${formatText(testData.subtopicName)}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-400">Loading test data...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-2 text-xl font-semibold">Error</div>
          <div className="text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  const filename = generateFilename();

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Social Media Publish</h1>

        {/* Copyable Fields */}
        <div className="space-y-4">
          {/* Test ID Field */}
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex-1">
              <label className="text-sm text-gray-400 block mb-1">Test ID</label>
              <p className="text-white font-mono text-sm break-all">{testData?._id}</p>
            </div>
            <button
              onClick={() => handleCopy(testData?._id || "", "testId")}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              title="Copy Test ID"
            >
              {copiedField === "testId" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>

          {/* Filename Field */}
          <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <label className="text-sm text-gray-400">Filename</label>
                {!checkingVideo && (
                  videoExists ? (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-600 text-white">
                      Available
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded bg-red-600 text-white">
                      NA
                    </span>
                  )
                )}
              </div>
              <p className="text-white font-mono text-sm break-all">{filename}</p>
            </div>
            <button
              onClick={() => handleCopy(filename, "filename")}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              title="Copy Filename"
            >
              {copiedField === "filename" ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
