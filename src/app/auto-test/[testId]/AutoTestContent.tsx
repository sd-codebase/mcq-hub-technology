"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "@/components/zap";
import QuestionNumberAnimation from "@/components/QuestionNumberAnimation";
import InstagramReelDisplay from "@/components/InstagramReelDisplay";

const MDEditorRenderer = dynamic(
  () => import("../../../components/MDEditorRenderer"),
  { ssr: false }
);

type Phase = "intro" | "question" | "answer" | "outro" | "thank-you";

interface TestData {
  _id: string;
  subjectName: string;
  topicName: string;
  subtopicName: string;
  testName: string;
  questionType: string;
  questions: any[];
  questionCount: number;
  socialMediaContent?: {
    thumbnail_text?: string;
    hooks?: string;
    instagram_reel_caption?: string;
    facebook_reel_caption?: string;
    youtube_shorts?: {
      title: string;
      description: string;
      hashtags: string[];
    };
    linkedin_caption?: string;
    whatsapp_channel_post?: string;
    cta_pack?: string;
  };
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
  const [animationKey, setAnimationKey] = useState(0);

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
        return 9; // 9 seconds for intro (7s thumbnail + 2s hook)
      case "question":
        return 5; // 5 seconds for each question
      case "answer":
        return 3; // 3 seconds for answer
      case "outro":
        return 999999; // Stay on outro screen forever
      case "thank-you":
        return 999999; // Stay on thank-you screen forever
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
        // Advance from outro to thank-you after 5 seconds
        setPhase("thank-you");
        break;
      case "thank-you":
        // Stay on thank-you screen forever - do not advance
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

  // Trigger question number animation when question changes
  useEffect(() => {
    if (phase === "question" && currentIndex !== previousIndex) {
      setPreviousIndex(currentIndex);
      // Trigger animation by incrementing key
      setAnimationKey((prev) => prev + 1);
    }
  }, [phase, currentIndex, previousIndex]);

  // Call API to update social media status when thank-you screen appears
  useEffect(() => {
    if (phase === "thank-you") {
      const updateSocialMediaStatus = async () => {
        try {
          const response = await fetch(
            `/api/tests/${testData._id}/social-status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log("Social media status update response:", data);
        } catch (error) {
          // Silently fail - no error handling needed
          console.error("Social media status update error:", error);
        }
      };

      updateSocialMediaStatus();
    }
  }, [phase, testData._id]);

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
      {/* Question Number Animation Overlay */}
      {phase === "question" && (
        <QuestionNumberAnimation
          key={animationKey}
          questionNumber={currentIndex + 1}
        />
      )}

      {/* Logo - Always Visible */}
      <div className="w-full flex justify-center py-3 mb-8 mt-16">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-indigo-400" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white tracking-tight -mb-1">
                Quizzy<span className="text-indigo-400">Dock</span>
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
        <>
          {/* Instagram Reel Display - Show if social media content exists */}
          {testData.socialMediaContent?.thumbnail_text &&
            testData.socialMediaContent?.hooks && (
              <>
                {/* Thumbnail reel: 0-7 seconds (timer: 9->2) */}
                {timer > 2 && (
                  <InstagramReelDisplay
                    text={testData.socialMediaContent.thumbnail_text}
                    type="thumbnail"
                  />
                )}
                {/* Hook reel: 7-9 seconds (timer: 2->0) */}
                {timer <= 2 && timer > 0 && (
                  <InstagramReelDisplay
                    text={testData.socialMediaContent.hooks}
                    type="hook"
                  />
                )}
              </>
            )}

          {/* Fallback to original intro if no social media content */}
          {!testData.socialMediaContent?.thumbnail_text ||
            (!testData.socialMediaContent?.hooks && (
              <div className="text-center max-w-2xl animate-fade-in">
                <div className="space-y-8 text-white">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                    {testData.subjectName}
                  </h1>
                  <p className="text-2xl text-gray-300">{testData.topicName}</p>
                  <p className="text-xl text-gray-400">
                    {testData.subtopicName}
                  </p>
                  <p className="text-lg text-indigo-400 font-semibold">
                    {testData.testName}
                  </p>
                  {/* <p className="text-gray-500">{testData.questionCount} Questions</p> */}
                </div>
                {/* <div className="mt-8 text-3xl font-bold text-indigo-400">{timer}</div> */}
              </div>
            ))}
        </>
      )}

      {/* Question / Answer Phase - Unified Block */}
      {(phase === "question" || phase === "answer") && currentQuestion && (
        <div className={`w-full max-w-4xl ${getQuestionBlockAnimation()}`}>
          {/* Subtopic and Part Info */}
          <div className="mb-4 text-center">
            <p className="text-gray-400 text-md font-medium">
              {testData.subtopicName} • {testData.testName}
            </p>
          </div>

          {/* Question Card */}
          <div className="bg-white p-8 rounded-lg shadow-2xl mb-6">
            {/* Question Number with Timer and Quiz Type */}
            <div className="flex justify-between items-center mb-3 gap-3">
              <div className="text-sm font-medium text-gray-500">
                <strong>#{currentIndex + 1}</strong>
              </div>
              <div className="flex items-center gap-3">
                {/* Reverse Seconds Counter - Hide during answer phase */}
                {phase !== "answer" && (
                  <div className="text-sm font-semibold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    {timer}s
                  </div>
                )}
                {/* Quiz Type Badge */}
                <div
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    testData.questionType === "mcq"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-teal-100 text-teal-700"
                  }`}
                >
                  {testData.questionType === "mcq" ? "MCQ" : "OUTPUT"} QUIZ
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-2xl font-bold mb-6 text-gray-800">
              <MDEditorRenderer value={currentQuestion.question} />
            </div>

            {/* Options (MCQ) */}
            {currentQuestion.options && (
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
            )}

            {/* Output (OUTPUT Question Type) - Only show in answer phase */}
            {currentQuestion.output &&
              !currentQuestion.options &&
              phase === "answer" && (
                <div className="mb-6">
                  <div className="p-4 rounded-lg bg-green-50 border-2 border-green-500 ring-4 ring-green-200 animate-fade-correct">
                    <div className="text-green-700 text-sm font-semibold mb-2 flex items-center gap-2">
                      <span>✓ Expected Output:</span>
                    </div>
                    <div className="text-green-800 font-mono text-lg whitespace-pre-wrap">
                      <MDEditorRenderer value={currentQuestion.output} />
                    </div>
                  </div>
                </div>
              )}

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

      {/* Outro Phase - Show CTA Pack text forever */}
      {phase === "outro" && (
        <div
          className="fixed inset-0 flex items-center justify-center w-full h-full"
          style={{
            backgroundImage:
              "url('/assets/Gemini_Generated_Image_2uzwhf2uzwhf2uzw.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap');

            .cta-text {
              font-family: "Roboto Slab", serif;
              font-optical-sizing: auto;
              font-weight: 700;
              font-style: normal;
              color: #000000;
              background-color: #ffffff;
              padding: 4px;
              margin: 0 40px;
              border-radius: 8px;
              box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
              display: inline-block;
            }
          `}</style>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
          ></div>
          <p className="cta-text text-4xl md:text-5xl lg:text-6xl leading-tight text-center px-6 sm:px-8 md:px-12 max-w-5xl relative z-10">
            {testData.socialMediaContent?.cta_pack || ""}
          </p>
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
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            transform: scale(1);
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
