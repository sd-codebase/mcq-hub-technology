"use client";

import React, { useEffect, useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

const Prompt = `
For context please read the prompt file named "{prompt_file_name}" attached in the project, and follow the instructions strictly mentioned in the prompt file.
Response should be **copyable code block of valid json** only. Response should be valid JSON only.
Return only json array of given format in attached "{prompt_file_name}" file. Do not wrap the response in object. Source key not needed.
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

const PROMPTS_FILE_NAME: Record<QuestionType, string> = {
  mcq: "Prompt for MCQ",

  output: "Prompt for OUTPUT",

  interview: "Prompt for INTERVIEW",
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
    const promptFileName = PROMPTS_FILE_NAME[questionType];

    if (promptFileName) {
      result = result.replace(/{prompt_file_name}/g, promptFileName);
    }
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

  // Play success sound using Web Audio API
  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Set sound properties
      oscillator.frequency.value = 800; // 800 Hz frequency
      oscillator.type = "sine"; // Sine wave for smooth sound

      // Set volume
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
      );

      // Play for 200ms
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      console.error("Failed to play sound:", error);
    }
  };

  const handleCopy = async () => {
    try {
      let prompt = Prompt;

      // Replace placeholders with dynamic data
      prompt = replacePlaceholders(prompt);

      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      playSuccessSound();
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
