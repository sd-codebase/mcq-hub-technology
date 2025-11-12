"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "@/components/zap";

const MDEditorRenderer = dynamic(
  () => import("../../../components/MDEditorRenderer"),
  { ssr: false }
);

type Phase = "intro" | "question" | "answer" | "outro";

interface TestData {
  _id: string;
  subjectName: string;
  topicName: string;
  subtopicName: string;
  testName: string;
  questionType: string;
  questions: any[];
  questionCount: number;
}

interface AutoTestContentProps {
  testData: TestData;
}

export default function AutoTestContent({ testData }: AutoTestContentProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(5);

  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL;
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;

  const currentQuestion = testData.questions[currentIndex];

  // Get next phase duration
  const getNextPhaseDuration = () => {
    switch (phase) {
      case "intro":
        return 3; // 3 seconds for intro
      case "question":
        return 7; // 7 seconds for each question
      case "answer":
        return 3; // 3 seconds for answer
      case "outro":
        return 2; // 2 seconds for outro (test ends after this)
      default:
        return 5;
    }
  };

  // Advance to next phase
  const advancePhase = () => {
    switch (phase) {
      case "intro":
        setPhase("question");
        setCurrentIndex(0);
        break;
      case "question":
        setPhase("answer");
        break;
      case "answer":
        if (currentIndex + 1 < testData.questions.length) {
          setCurrentIndex(currentIndex + 1);
          setPhase("question");
        } else {
          setPhase("outro");
        }
        break;
      case "outro":
        // Do not restart test - stay on outro screen
        break;
    }
  };

  // Timer effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          advancePhase();
          return getNextPhaseDuration();
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex, isPaused]);

  // Reset timer when phase changes
  useEffect(() => {
    setTimer(getNextPhaseDuration());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Track when question index changes (for bounce animation)
  useEffect(() => {
    if (phase === "question" && currentIndex !== previousIndex) {
      setPreviousIndex(currentIndex);
    }
  }, [phase, currentIndex, previousIndex]);

  // Determine which animation to apply based on context
  const getQuestionBlockAnimation = () => {
    // For answer phase: no animation on wrapper
    if (phase === "answer") {
      return "";
    }
    // For first question: use fade-in
    if (phase === "question" && currentIndex === 0) {
      return "animate-fade-in";
    }
    // For new questions (after first): use bounce-in
    if (phase === "question" && currentIndex > previousIndex) {
      return "animate-bounce-in";
    }
    // Default to fade-in
    return "animate-fade-in";
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start pt-4 px-8 pb-8"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      {/* Logo - Always Visible */}
      <div className="w-full flex justify-center py-3 mb-8 mt-16">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-indigo-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white tracking-tight -mb-1">
                MCQ<span className="text-indigo-400">Hub</span>
              </span>
              <span className="text-[12px] font-medium text-gray-400 tracking-wider">
                TECH SKILLS
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Intro Phase */}
      {phase === "intro" && (
        <div className="text-center max-w-2xl animate-fade-in">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {testData.subjectName}
            </h1>
            <p className="text-2xl text-gray-300">{testData.topicName}</p>
            <p className="text-xl text-gray-400">{testData.subtopicName}</p>
            <p className="text-lg text-indigo-400 font-semibold">
              {testData.testName}
            </p>
            {/* <p className="text-gray-500">{testData.questionCount} Questions</p> */}
          </div>
          {/* <div className="mt-8 text-3xl font-bold text-indigo-400">{timer}</div> */}
        </div>
      )}

      {/* Question / Answer Phase - Unified Block */}
      {(phase === "question" || phase === "answer") && currentQuestion && (
        <div className={`w-full max-w-4xl ${getQuestionBlockAnimation()}`}>
          {/* Question Card */}
          <div className="bg-white p-8 rounded-lg shadow-2xl mb-6">
            {/* Question Number */}
            <div className="text-sm font-medium text-gray-500 mb-3">
              <strong>#{currentIndex + 1}</strong>
            </div>

            {/* Question Text */}
            <div className="text-2xl font-bold mb-6 text-gray-800">
              <MDEditorRenderer value={currentQuestion.question} />
            </div>

            {/* Options */}
            <div className="space-y-4 mb-6">
              {currentQuestion.options.map((option: string, idx: number) => {
                const isCorrect = idx === currentQuestion.correct_answer;
                const showAnswer = phase === "answer";

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 transition-all duration-300
                             ${
                               showAnswer && isCorrect
                                 ? "border-green-500 bg-green-50 ring-4 ring-green-200 animate-fade-correct"
                                 : "border-gray-200 bg-gray-50"
                             }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`font-semibold text-lg ${
                          showAnswer && isCorrect
                            ? "text-green-700"
                            : "text-gray-700"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)})
                      </span>
                      <div className="flex-1">
                        <MDEditorRenderer value={option} />
                      </div>
                      {showAnswer && isCorrect && (
                        <span className="text-green-600 text-2xl">✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {/* {currentQuestion.explanation && (
              <div className="p-6 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <div className="font-semibold text-indigo-700 mb-2 text-lg">
                  Explanation:
                </div>
                <div className="text-gray-700">
                  <MDEditorRenderer value={currentQuestion.explanation} />
                </div>
              </div>
            )} */}
          </div>
        </div>
      )}

      {/* Outro Phase */}
      {phase === "outro" && (
        <div className="text-center max-w-2xl animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-18">
            Thank You for Watching! 🎉
          </h2>

          {/* Download the App Heading */}
          <h3 className="text-xl font-semibold text-white mb-4">
            Download the App
          </h3>

          {/* App Store Links */}
          <div className="flex flex-col items-center justify-center gap-6 mb-8">
            {playStoreUrl && (
              <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/play-store.png"
                    alt="Google Play Store"
                    height={70}
                    width={228}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </a>
            )}
            {appStoreUrl && (
              <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/app-store.png"
                    alt="Apple App Store"
                    height={70}
                    width={228}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </a>
            )}
          </div>

          {/* Follow us for more Heading */}
          <h3 className="text-xl font-semibold text-white mt-16 mb-4">
            Follow us for more
          </h3>

          {/* Social Media Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500"
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 "
              >
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            )}
          </div>
          <div className="mt-16">
            <p className="text-xl text-indigo-400 ">{baseUrl}</p>
          </div>

          {/* <div className="text-3xl font-bold text-indigo-400">{timer}</div> */}
        </div>
      )}

      {/* Play/Pause Control */}
      {/* <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-8 py-4 rounded-full font-semibold text-white text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
        >
          {isPaused ? "▶️ Play" : "⏸️ Pause"}
        </button>
      </div> */}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-correct {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-correct {
          animation: fade-correct 0.8s ease-in-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
