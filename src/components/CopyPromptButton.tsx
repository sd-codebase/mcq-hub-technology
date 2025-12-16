"use client";

import React, { useEffect, useState } from "react";

type QuestionType = "mcq" | "output" | "interview";

const Prompt = `
Read the prompt file attached in the project, and give me the output as stated

Video Details:
- Video Topic: {subject_name}
- Subtopic (if any): {topic_name}
- Programming Language / Technology: {technology}
- Target Audience: Beginners / Students / Interview Candidates / Developers
- Video Type: {video_type}
- Language: English
- Brand: QuizzyDock
- Platform Goal: Rank in YouTube Search and Suggested Videos`;

const VIDEO_TYPES: Record<QuestionType, string> = {
  mcq: "MCQ Quiz",
  output: "Output Question",
  interview: "Interview Question",
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
    const videoType = VIDEO_TYPES[questionType];

    if (videoType) {
      result = result.replace(/{video_type}/g, videoType);
    }
    // Video Topic = chapterName (metadata.topicName)
    if (chapterName) {
      result = result.replace(/{subject_name}/g, chapterName);
    }
    // Subtopic = topicName (metadata.subtopicName)
    if (topicName) {
      result = result.replace(/{topic_name}/g, topicName);
    }
    // Technology = subjectName (metadata.subjectName)
    if (subjectName) {
      result = result.replace(/{technology}/g, subjectName);
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
