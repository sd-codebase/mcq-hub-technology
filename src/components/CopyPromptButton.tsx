"use client";

import React, { useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

const PROMPTS: Record<QuestionType, string> = {
  mcq: `
Generate multiple-choice questions (MCQ) for the following inputs:
**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {technology}
**Count:** {count}`,

  output: `
Generate code output prediction questions for the following inputs:

**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {technology}
**Count:** {count}`,

  interview: `
Generate interview questions with detailed answers for the following inputs:

**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}
**Programming Language/Technology:** {technology}
**Count:** {count}`,
};

interface CopyPromptButtonProps {
  questionType: QuestionType;
  count?: number;
  subjectName?: string;
  chapterName?: string;
  topicName?: string;
  language?: string;
  onCopied?: () => void;
}

export default function CopyPromptButton({
  questionType,
  count,
  subjectName,
  chapterName,
  topicName,
  language,
  onCopied,
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  // Replace placeholders in prompt with actual values
  const replacePlaceholders = (prompt: string): string => {
    let result = prompt;

    if (count !== undefined) {
      result = result.replace(/{count}/g, String(count));
    }
    if (subjectName) {
      result = result.replace(/{subject_name}/g, subjectName);
    }
    if (chapterName) {
      result = result.replace(/{chapter_name}/g, chapterName);
    }
    if (topicName) {
      result = result.replace(/{topic_name}/g, topicName);
    }
    if (language) {
      result = result.replace(/{technology}/g, language);
      // Also replace {language.lower()} with lowercase version
      // result = result.replace(/{language\.lower\(\)}/g, language.toLowerCase());
    }

    return result;
  };

  const handleCopy = async () => {
    try {
      let prompt = PROMPTS[questionType];

      // Replace placeholders with dynamic data
      prompt = replacePlaceholders(prompt);

      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      onCopied?.();

      // Reset "Copied!" feedback after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
    >
      {copied ? "✓ Copied!" : "📋 Copy Prompt"}
    </button>
  );
}
