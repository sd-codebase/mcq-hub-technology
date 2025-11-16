"use client";

import React, { useEffect, useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

const Prompt = `
Read the attached Prompt file in the project for context, and follow the instructions strictly mentioned in the promt file.
Response should be **copyable code block of valid json** only. Only **valid json**.
Generate {type} for the following inputs:

**Programming Language/Technology:** {technology}
**Count:** {count}
**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}`;

const PROMPTS: Record<QuestionType, string> = {
  mcq: "multiple-choice questions (MCQ)",

  output: "code output prediction questions",

  interview: "interview questions with detailed answers",
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
    const type = PROMPTS[questionType];

    if (type) {
      result = result.replace(/{type}/g, type);
    }
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
      let prompt = Prompt;

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

  useEffect(() => {
    console.log({ chapterName, topicName });
    const timer = setTimeout(handleCopy, 500);
    return () => clearTimeout(timer);
  }, [questionType, count, subjectName, chapterName, topicName, language]);

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
    >
      {copied ? "✓ Copied!" : "📋 Copy Prompt"}
    </button>
  );
}
