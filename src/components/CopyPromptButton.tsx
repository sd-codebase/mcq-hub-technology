"use client";

import React, { useEffect, useState } from "react";

type QuestionType = "mcq" | "output" | "interview";
type PromptType = "question" | "video";

const QuestionPrompt = `
For context please read the prompt file named "{prompt_file_name}" attached in the project, and follow the instructions strictly mentioned in the prompt file.
Response should be **copyable code block of valid json** only. Response should be valid JSON only.
Return only json array of given format in attached "{prompt_file_name}" file. Do not wrap the response in object. Source key not needed.
Generate {type} for the following inputs:

**Programming Language/Technology:** {technology}
**Count:** {count}
**Subject:** {subject_name}
**Chapter:** {chapter_name}
**Topic:** {topic_name}`;

const VideoPrompt = `
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

const QUESTION_TYPES: Record<QuestionType, string> = {
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
  promptType?: PromptType;
  count?: number;
  subjectName?: string;
  chapterName?: string;
  topicName?: string;
  language?: string;
  topicNumber?: number;
  subtopicNumber?: number;
  onCopied?: () => void;
}

export default function CopyPromptButton({
  questionType,
  promptType = "question",
  count,
  subjectName,
  chapterName,
  topicName,
  language,
  topicNumber,
  subtopicNumber,
  onCopied,
}: CopyPromptButtonProps) {
  const [copied, setCopied] = useState(false);

  // Replace placeholders in prompt with actual values
  const replacePlaceholders = (prompt: string): string => {
    let result = prompt;

    if (promptType === "video") {
      // Video prompt replacements
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
    } else {
      // Question prompt replacements
      const type = QUESTION_TYPES[questionType];
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
      }
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

  function speakSlow(text: string) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Get all available voices
    const voices = synth.getVoices();

    // 1. Look for an Indian English or Hindi female voice
    // We look for names containing 'India' or 'Google' (often high quality)
    const indianVoice =
      voices.find(
        (voice) =>
          (voice.lang === "en-IN" || voice.lang === "hi-IN") &&
          (voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("woman"))
      ) || voices.find((voice) => voice.lang === "en-IN"); // Fallback to any Indian voice

    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    // 2. Set the speed to "Slow"
    // 1.0 is normal, 0.5 is half speed, 0.7 is a nice 'slow' pace.
    utterance.rate = 0.7;

    // 3. Optional: Adjust pitch for a clearer tone
    utterance.pitch = 1.5;

    synth.speak(utterance);
  }

  const handleCopy = async () => {
    try {
      let prompt = promptType === "video" ? VideoPrompt : QuestionPrompt;

      // Replace placeholders with dynamic data
      prompt = replacePlaceholders(prompt);

      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      playSuccessSound();
      onCopied?.();

      // Reset "Copied!" feedback after 2 seconds
      setTimeout(() => setCopied(false), 2000);

      setTimeout(() => {
        const speakText =
          subtopicNumber === 1 && [6, 11, 16, 21, 26].includes(topicNumber ?? 0)
            ? "CDE"
            : "GPT";
        speakSlow(speakText);
      }, 5000);
    } catch (error) {
      console.error("Failed to copy prompt:", error);
    }
  };

  useEffect(() => {
    console.log({ chapterName, topicName });
    const timer = setTimeout(handleCopy, 500);
    return () => clearTimeout(timer);
  }, [
    questionType,
    promptType,
    count,
    subjectName,
    chapterName,
    topicName,
    language,
  ]);

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg"
    >
      {copied ? "✓ Copied!" : "📋 Copy Prompt"}
    </button>
  );
}
