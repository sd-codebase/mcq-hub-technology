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

const RefreshIcon = () => (
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
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
  </svg>
);

const SendIcon = () => (
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
    <line x1="22" x2="11" y1="2" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
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
  const [socialMediaData, setSocialMediaData] = useState({
    fb: "",
    ig: "",
    yt: "",
    li: "",
    wa: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

    const data = testData; // Store in local variable for TypeScript

    async function checkVideoExists() {
      setCheckingVideo(true);
      try {
        const formatText = (text: string) =>
          text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

        const filename = `${data.questionType}-${formatText(data.testName)}-${formatText(data.subtopicName)}`;

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

  // Fetch social media data
  useEffect(() => {
    if (!testId) return;

    async function fetchSocialMediaData() {
      try {
        const response = await fetch(`/api/social-media-publishing/${testId}`);
        const result = await response.json();

        if (result.success) {
          setSocialMediaData(result.data.socialMediaData);
        }
      } catch (err) {
        console.error("Error fetching social media data:", err);
      }
    }

    fetchSocialMediaData();
  }, [testId]);

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

  // Handle input change for social media fields
  const handleInputChange = (platform: string, value: string) => {
    setSocialMediaData((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };

  // Save social media data
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch(`/api/social-media-publishing/${testId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ socialMediaData }),
      });

      const result = await response.json();

      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle publish (open link in new tab)
  const handlePublish = (url: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Refresh all data
  const handleRefresh = async () => {
    if (!testId) return;

    setIsRefreshing(true);
    setError(null);

    try {
      // Fetch test data
      const testResponse = await fetch(`/api/tests/${testId}`);
      const testResult = await testResponse.json();

      if (testResult.success) {
        setTestData(testResult.data);

        // Check video exists
        const formatText = (text: string) =>
          text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        const filename = `${testResult.data.questionType}-${formatText(testResult.data.testName)}-${formatText(testResult.data.subtopicName)}`;

        const videoResponse = await fetch(`/api/videos/check/${filename}`);
        const videoResult = await videoResponse.json();

        if (videoResult.success) {
          setVideoExists(videoResult.exists);
        }
      } else {
        setError("Failed to fetch test data");
      }

      // Fetch social media data
      const socialResponse = await fetch(`/api/social-media-publishing/${testId}`);
      const socialResult = await socialResponse.json();

      if (socialResult.success) {
        setSocialMediaData(socialResult.data.socialMediaData);
      }
    } catch (err) {
      console.error("Error refreshing:", err);
      setError("Error refreshing data");
    } finally {
      setIsRefreshing(false);
    }
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Social Media Publish</h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshIcon />
            <span className="text-sm font-semibold">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </button>
        </div>

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

        {/* Social Media Links Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Social Media Publishing Links</h2>

          <div className="space-y-3">
            {/* Facebook */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex-1">
                <label className="text-sm text-gray-400 block mb-1">Facebook</label>
                <input
                  type="text"
                  value={socialMediaData.fb}
                  onChange={(e) => handleInputChange("fb", e.target.value)}
                  placeholder="Enter Facebook link"
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handlePublish(socialMediaData.fb)}
                disabled={!socialMediaData.fb}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open Facebook link"
              >
                <SendIcon />
              </button>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex-1">
                <label className="text-sm text-gray-400 block mb-1">Instagram</label>
                <input
                  type="text"
                  value={socialMediaData.ig}
                  onChange={(e) => handleInputChange("ig", e.target.value)}
                  placeholder="Enter Instagram link"
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handlePublish(socialMediaData.ig)}
                disabled={!socialMediaData.ig}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open Instagram link"
              >
                <SendIcon />
              </button>
            </div>

            {/* YouTube Shorts */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex-1">
                <label className="text-sm text-gray-400 block mb-1">YouTube Shorts</label>
                <input
                  type="text"
                  value={socialMediaData.yt}
                  onChange={(e) => handleInputChange("yt", e.target.value)}
                  placeholder="Enter YouTube Shorts link"
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handlePublish(socialMediaData.yt)}
                disabled={!socialMediaData.yt}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open YouTube Shorts link"
              >
                <SendIcon />
              </button>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex-1">
                <label className="text-sm text-gray-400 block mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={socialMediaData.li}
                  onChange={(e) => handleInputChange("li", e.target.value)}
                  placeholder="Enter LinkedIn link"
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handlePublish(socialMediaData.li)}
                disabled={!socialMediaData.li}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open LinkedIn link"
              >
                <SendIcon />
              </button>
            </div>

            {/* WhatsApp */}
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex-1">
                <label className="text-sm text-gray-400 block mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={socialMediaData.wa}
                  onChange={(e) => handleInputChange("wa", e.target.value)}
                  placeholder="Enter WhatsApp link"
                  className="w-full bg-gray-900 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => handlePublish(socialMediaData.wa)}
                disabled={!socialMediaData.wa}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Open WhatsApp link"
              >
                <SendIcon />
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Links"}
              </button>
              {saveSuccess && (
                <span className="text-green-400 text-sm">✓ Saved successfully!</span>
              )}
            </div>
            {videoExists && (
              <button
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Move Video to Drive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
