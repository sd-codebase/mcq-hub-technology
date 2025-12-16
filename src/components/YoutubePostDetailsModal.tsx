"use client";

import React, { useState, useEffect } from "react";
import CopyPromptButton from "./CopyPromptButton";

interface YoutubePostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  subtopicId: string;
  questionType: "mcq" | "output" | "interview";
  metadata: {
    subjectName: string;
    topicName: string;
    subtopicName: string;
    topicIndex: number;
    subtopicIndex: number;
  };
}

interface YoutubePostData {
  title: string;
  description: string;
  tags: string[];
  pinned_comment: string;
  playlist_name: string;
}

export default function YoutubePostDetailsModal({
  isOpen,
  onClose,
  subtopicId,
  questionType,
  metadata,
}: YoutubePostDetailsModalProps) {
  const [jsonInput, setJsonInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [youtubeData, setYoutubeData] = useState<YoutubePostData | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing YouTube post details
  const fetchYoutubeData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/youtube-post-details/${subtopicId}/${questionType}`
      );
      const result = await response.json();

      if (result.success && result.data) {
        // Only set data if there's actual content (not empty default structure)
        const hasContent = result.data.title || result.data.description ||
                          result.data.tags?.length > 0 || result.data.pinned_comment ||
                          result.data.playlist_name;
        if (hasContent) {
          setYoutubeData(result.data);
        }
      }
    } catch (err) {
      console.error("Error fetching YouTube data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form when modal opens and fetch data
  useEffect(() => {
    if (isOpen) {
      setJsonInput("");
      setError(null);
      setSuccessMessage(null);
      setYoutubeData(null);
      fetchYoutubeData();
    }
  }, [isOpen]);

  const validateAndParseJson = (jsonString: string): YoutubePostData | null => {
    try {
      const parsed = JSON.parse(jsonString);

      // Validate required fields
      const requiredFields = ["title", "description", "tags", "pinned_comment", "playlist_name"];
      const missingFields = requiredFields.filter((field) => !(field in parsed));

      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(", ")}`);
        return null;
      }

      // Validate tags is an array
      if (!Array.isArray(parsed.tags)) {
        setError("Field 'tags' must be an array");
        return null;
      }

      return {
        title: String(parsed.title || ""),
        description: String(parsed.description || ""),
        tags: parsed.tags.map((tag: any) => String(tag)),
        pinned_comment: String(parsed.pinned_comment || ""),
        playlist_name: String(parsed.playlist_name || ""),
      };
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      return null;
    }
  };

  // Copy to clipboard handler
  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Generate filename from metadata
  const getFilename = () => {
    const formattedName = metadata.subtopicName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen

    return `${metadata.topicIndex}.${metadata.subtopicIndex}-${formattedName}`;
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    // Validate and parse JSON
    const parsedData = validateAndParseJson(jsonInput);
    if (!parsedData) {
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/youtube-post-details/${subtopicId}/${questionType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("YouTube post details saved successfully!");
        // Refresh the data to show copy buttons
        fetchYoutubeData();
        // Close modal after brief success message
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setError(result.error || "Failed to save data");
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Failed to save data");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-indigo-700/30">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center border-b border-indigo-700/50 z-10">
          <div>
            <h2 className="text-2xl font-bold">YouTube Post Details</h2>
            <p className="text-sm text-indigo-100 mt-1">
              {metadata.subtopicName} - {questionType.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Copy Buttons - Show when data exists */}
          {youtubeData && (
            <div className="mb-6 bg-gray-800/50 border border-indigo-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">📋 Copy SEO Data</h3>
              <div className="grid grid-cols-2 gap-2">
                {/* Title Button */}
                {youtubeData.title && (
                  <button
                    onClick={() => handleCopy(youtubeData.title, "title")}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg text-sm"
                  >
                    {copiedField === "title" ? "✓ Copied!" : "📋 Copy Title"}
                  </button>
                )}

                {/* Description Button */}
                {youtubeData.description && (
                  <button
                    onClick={() => handleCopy(youtubeData.description, "description")}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg text-sm"
                  >
                    {copiedField === "description" ? "✓ Copied!" : "📝 Copy Description"}
                  </button>
                )}

                {/* Tags Button */}
                {youtubeData.tags && youtubeData.tags.length > 0 && (
                  <button
                    onClick={() => handleCopy(youtubeData.tags.join(", "), "tags")}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg text-sm"
                  >
                    {copiedField === "tags" ? "✓ Copied!" : "🏷️ Copy Tags"}
                  </button>
                )}

                {/* Pinned Comment Button */}
                {youtubeData.pinned_comment && (
                  <button
                    onClick={() => handleCopy(youtubeData.pinned_comment, "pinned_comment")}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg text-sm"
                  >
                    {copiedField === "pinned_comment" ? "✓ Copied!" : "📌 Copy Pinned Comment"}
                  </button>
                )}

                {/* Playlist Name Button */}
                {youtubeData.playlist_name && (
                  <button
                    onClick={() => handleCopy(youtubeData.playlist_name, "playlist_name")}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg text-sm"
                  >
                    {copiedField === "playlist_name" ? "✓ Copied!" : "📚 Copy Playlist"}
                  </button>
                )}

                {/* Filename Button */}
                <button
                  onClick={() => handleCopy(getFilename(), "filename")}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-lg text-sm"
                >
                  {copiedField === "filename" ? "✓ Copied!" : "📄 Copy Filename"}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-900/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}

            {/* JSON Input Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                YouTube Post JSON
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 resize-vertical font-mono text-sm"
                placeholder={`{
  "title": "Your video title",
  "description": "Your video description",
  "tags": ["tag1", "tag2", "tag3"],
  "pinned_comment": "Your pinned comment",
  "playlist_name": "Your playlist name"
}`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-indigo-700/30 p-6 flex justify-between items-center">
          <div>
            <CopyPromptButton
              questionType={questionType}
              count={10}
              subjectName={metadata.subjectName}
              chapterName={metadata.topicName}
              topicName={metadata.subtopicName}
              language="JavaScript"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-lg font-semibold text-gray-300 bg-gray-700 hover:bg-gray-600 transition-colors"
              disabled={saving}
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? "Saving..." : "Save Details"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
