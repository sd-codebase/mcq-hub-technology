"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Zap } from "@/components/zap";
import QuestionNumberAnimation from "@/components/QuestionNumberAnimation";
import ThumbnailDisplay from "@/components/ThumbnailDisplay";
import HookDisplay from "@/components/HookDisplay";
import CTAPackDisplay from "@/components/CTAPackDisplay";
import { getRandomBackgroundImage } from "@/constants/backgroundImages";

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
  const [backgroundImage, setBackgroundImage] = useState("");

  // Initialize random background image on mount
  useEffect(() => {
    setBackgroundImage(getRandomBackgroundImage());
  }, []);

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
        // Skip intro if no social media content
        const hasIntroContent =
          testData.socialMediaContent?.thumbnail_text ||
          testData.socialMediaContent?.hooks;
        return hasIntroContent ? 8 : 0; // 8 seconds for intro or 0 to skip
      case "question":
        return 3; // 3 seconds for each question
      case "answer":
        return 2; // 2 seconds for answer
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
          return 0;
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

  // Call API to update social media status when CTA screen appears
  useEffect(() => {
    if (phase === "outro") {
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
      className="min-h-screen flex flex-col items-center justify-start pt-4 px-8 pb-8 relative"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlays for readability */}
      <div
        className="fixed inset-0 bg-black/10 pointer-events-none"
        style={{ zIndex: 1 }}
      ></div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "rgba(0,0,0,0.6)", zIndex: 2 }}
      ></div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 w-full">
        {/* Question Number Animation Overlay */}
        {phase === "question" && (
          <QuestionNumberAnimation
            key={animationKey}
            questionNumber={currentIndex + 1}
          />
        )}

        {/* Logo - Always Visible */}
        <div
          className={`w-full flex justify-center ${
            phase === "question" || phase === "answer" ? "py-6" : "py-3 mb-8"
          } mt-16`}
        >
          <Link href="/">
            <div className="flex items-center gap-2">
              <Zap
                className={`${
                  phase === "question" || phase === "answer"
                    ? "h-10 w-10"
                    : "h-6 w-6"
                } text-indigo-400`}
              />
              <div className="flex flex-col items-center">
                <span
                  className={`${
                    phase === "question" || phase === "answer"
                      ? "text-2xl"
                      : "text-2xl"
                  } font-bold text-white tracking-tight -mb-1`}
                >
                  Quizzy<span className="text-indigo-400">Dock</span>
                </span>
                <span
                  className={`${
                    phase === "question" || phase === "answer"
                      ? "text-sm"
                      : "text-[12px]"
                  } font-medium text-gray-400 tracking-wider`}
                >
                  TECH SKILLS
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Intro Phase */}
        {phase === "intro" && (
          <>
            {/* Thumbnail Display: 0-5 seconds (timer: 8->3) */}
            {testData.socialMediaContent?.thumbnail_text && (
              <ThumbnailDisplay
                text={testData.socialMediaContent.thumbnail_text}
                isVisible={timer > 3}
                testName={testData.testName}
                backgroundImage={backgroundImage}
              />
            )}

            {/* Hook Display: 5-8 seconds (timer: 3->0) */}
            {testData.socialMediaContent?.hooks && (
              <HookDisplay
                text={testData.socialMediaContent.hooks}
                isVisible={timer <= 3 && timer > 0}
                backgroundImage={backgroundImage}
              />
            )}
          </>
        )}

        {/* Question / Answer Phase - Unified Block */}
        {(phase === "question" || phase === "answer") && currentQuestion && (
          <div className={`w-full max-w-4xl ${getQuestionBlockAnimation()}`}>
            {/* Subtopic and Part Info */}
            <div className="mb-4 text-center">
              <p className="text-gray-300 text-md font-medium">
                {testData.subtopicName} • {testData.testName}
              </p>
            </div>

            {/* Question Card */}
            <div
              className="p-4 rounded-2xl backdrop-blur-md mb-6 shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.1) 100%)",
                backdropFilter: "blur(10px)",
                border: "1.5px solid rgba(168, 85, 247, 0.4)",
              }}
            >
              {/* Header with Pause Chip or Quiz Type Badge */}
              {phase === "question" && (
                <div className="flex justify-between items-center mb-3 gap-3 h-12">
                  {/* Quiz Type Badge */}
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-sm backdrop-blur-sm border ${
                      testData.questionType === "mcq"
                        ? "bg-indigo-500/80 text-white border-indigo-400/30"
                        : "bg-teal-500/80 text-white border-teal-400/30"
                    }`}
                  >
                    {testData.questionType === "mcq" ? "MCQ" : "OUTPUT"} QUIZ
                  </div>
                  {/* Pause Chip - Purple to Pink Gradient */}
                  <div className="text-sm font-semibold px-2 py-1 rounded-sm bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white text-sm shadow-lg">
                    {testData.questionType === "mcq"
                      ? "Pause & guess the answer"
                      : "Pause & guess the output"}
                  </div>
                </div>
              )}

              {/* Answer Phase - Only Quiz Type Badge */}
              {phase === "answer" && (
                <div className="flex justify-start items-center mb-3 gap-3 h-12">
                  {/* Quiz Type Badge */}
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-sm backdrop-blur-sm border ${
                      testData.questionType === "mcq"
                        ? "bg-indigo-500/80 text-white border-indigo-400/30"
                        : "bg-teal-500/80 text-white border-teal-400/30"
                    }`}
                  >
                    {testData.questionType === "mcq" ? "MCQ" : "OUTPUT"} QUIZ
                  </div>
                </div>
              )}

              {/* Question Text */}
              <div
                className="text-2xl font-bold mb-6 text-white"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                <MDEditorRenderer
                  value={currentQuestion.question}
                  style={{ color: "#ffffff", fontWeight: "500" }}
                  dataColorMode="dark"
                />
              </div>

              {/* Options (MCQ) */}
              {currentQuestion.options && (
                <div className="space-y-4 mb-6">
                  {currentQuestion.options.map(
                    (option: string, idx: number) => {
                      const isCorrect = idx === currentQuestion.correct_answer;
                      const showAnswer = phase === "answer";

                      return (
                        <div
                          key={idx}
                          style={
                            showAnswer && isCorrect
                              ? {
                                  background: "rgba(34, 197, 94, 0.3)",
                                  border: "2px solid rgba(34, 197, 94, 0.8)",
                                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                                }
                              : {
                                  background:
                                    "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)",
                                  border: "2px solid rgba(168, 85, 247, 0.3)",
                                  backdropFilter: "blur(10px)",
                                  transition: "all 0.3s ease",
                                }
                          }
                          className="p-4 rounded-xl backdrop-blur-sm hover:bg-white/15"
                          onMouseEnter={(e) => {
                            if (!showAnswer || !isCorrect) {
                              e.currentTarget.style.borderColor =
                                "rgba(168, 85, 247, 0.6)";
                              e.currentTarget.style.background =
                                "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.1) 100%)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!showAnswer || !isCorrect) {
                              e.currentTarget.style.borderColor =
                                "rgba(168, 85, 247, 0.3)";
                              e.currentTarget.style.background =
                                "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.05) 100%)";
                            }
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`font-semibold ${
                                showAnswer && isCorrect
                                  ? "text-green-300"
                                  : "text-white"
                              }`}
                              style={{
                                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                              }}
                            >
                              {String.fromCharCode(65 + idx)})
                            </span>
                            <div
                              className="flex-1 text-white"
                              style={{
                                textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                              }}
                            >
                              <MDEditorRenderer
                                value={option}
                                style={{ color: "#ffffff", fontWeight: "500" }}
                                dataColorMode="dark"
                              />
                            </div>
                            {showAnswer && isCorrect && (
                              <span
                                className="text-green-300"
                                style={{
                                  fontSize: "1rem",
                                  fontWeight: "800",
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

              {/* Output (OUTPUT Question Type) - Only show in answer phase */}
              {currentQuestion.output &&
                !currentQuestion.options &&
                phase === "answer" && (
                  <div className="mb-6">
                    <div
                      className="p-4 rounded-xl backdrop-blur-sm animate-fade-correct"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.15) 100%)",
                        border: "2px solid rgba(168, 85, 247, 0.5)",
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.2)",
                      }}
                    >
                      <div
                        className="text-md font-semibold mb-2 flex items-center gap-2"
                        style={{
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                          color: "#d8b4fe",
                        }}
                      >
                        <span>✓ Expected Output:</span>
                      </div>
                      <div
                        className="text-white font-mono text-lg whitespace-pre-wrap"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
                      >
                        <MDEditorRenderer
                          value={currentQuestion.output}
                          style={{ color: "#ffffff", fontWeight: "500" }}
                          dataColorMode="dark"
                        />
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
          <CTAPackDisplay
            text={testData.socialMediaContent?.cta_pack || ""}
            isVisible={true}
            backgroundImage={backgroundImage}
          />
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
    </div>
  );
}
