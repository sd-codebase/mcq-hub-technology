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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setJsonInput("");
      setError(null);
      setSuccessMessage(null);
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

            {/* Instructions */}
            <div className="bg-blue-900/20 border border-blue-500/50 text-blue-300 px-4 py-3 rounded-lg">
              <p className="text-sm">
                📋 Paste your YouTube post details as JSON below with the following fields:
              </p>
              <code className="text-xs block mt-2 text-blue-200">
                {`{ "title", "description", "tags", "pinned_comment", "playlist_name" }`}
              </code>
            </div>

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
