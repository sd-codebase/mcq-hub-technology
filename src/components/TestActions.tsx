"use client";
import React, { useState } from "react";
import Link from "next/link";

type QuestionType = "mcq" | "output" | "interview";

interface Test {
  _id: string;
  testName: string;
  questionCount: number;
  questionType?: QuestionType;
}

interface TestActionsProps {
  test: Test;
  subtopicName: string;
}

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

const ExternalLinkIcon = () => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" x2="21" y1="14" y2="3"></line>
  </svg>
);

const SocialMediaIcon = () => (
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
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
  </svg>
);

export default function TestActions({ test, subtopicName }: TestActionsProps) {
  const [copied, setCopied] = useState(false);
  const questionType = test.questionType || "mcq";

  // Interview tests don't have actions
  if (questionType === "interview") {
    return null;
  }

  const handleCopy = async () => {
    try {
      // Format text: lowercase, replace spaces with hyphens, remove special chars
      const formatText = (text: string) =>
        text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      const copyText = `${questionType}-${formatText(test.testName)}-${formatText(subtopicName)}`;

      await navigator.clipboard.writeText(copyText);
      setCopied(true);

      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const buttonBaseClass = "flex items-center justify-center w-10 h-10 rounded-lg font-semibold text-white transition-all duration-300";
  const copyButtonClass = `${buttonBaseClass} bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700`;
  const reviewButtonClass = `${buttonBaseClass} bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700`;
  const socialMediaButtonClass = `${buttonBaseClass} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700`;

  return (
    <div className="flex gap-2 mt-4">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={copyButtonClass}
        title="Copy test metadata"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      {/* Review Button */}
      <Link
        href={`/auto-test/${test._id}/review`}
        target="_blank"
        rel="noopener noreferrer"
        className={reviewButtonClass}
        title="Open review page"
      >
        <ExternalLinkIcon />
      </Link>

      {/* Social Media Publish Button */}
      <Link
        href={`/social-media-publish/${test._id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={socialMediaButtonClass}
        title="Publish to social media"
      >
        <SocialMediaIcon />
      </Link>
    </div>
  );
}
