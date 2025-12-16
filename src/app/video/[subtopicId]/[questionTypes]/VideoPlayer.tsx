"use client";

import { useState, useEffect, useRef } from "react";
import MDEditorRenderer from "@/components/MDEditorRenderer";

type Phase = "thumbnail" | "question" | "answer" | "cta" | "completed";

interface Question {
  _id: string;
  question: string;
  explanation: string;
  options?: string[];
  correct_answer?: number;
  output?: string;
  answer?: string;
}

interface YoutubePostDetails {
  title: string;
  description: string;
  tags: string[];
  pinned_comment: string;
  playlist_name: string;
}

interface VideoPlayerProps {
  questions: Question[];
  metadata: {
    subjectName: string;
    topicName: string;
    subtopicName: string;
    topicIndex: number;
    subtopicIndex: number;
  };
  questionType: string;
  subtopicId: string;
  youtubePostDetails: YoutubePostDetails | null;
}

export default function VideoPlayer({
  questions,
  metadata,
  questionType,
  subtopicId,
  youtubePostDetails,
}: VideoPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("thumbnail");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const [thumbnailImage, setThumbnailImage] = useState(
    "/yt-thumb/yt-thumb-1.PNG"
  );
  const [isMounted, setIsMounted] = useState(false);
  const [showSubscribeAppeal, setShowSubscribeAppeal] = useState(false);
  const [showEngagementAppeal, setShowEngagementAppeal] = useState(false);
  const [showCopyButtons, setShowCopyButtons] = useState(false);

  const currentQuestion = questions[currentIndex];

  // Select random thumbnail image on mount (client-side only)
  useEffect(() => {
    setIsMounted(true);
    const randomIndex = Math.floor(Math.random() * 4) + 1;
    setThumbnailImage(`/yt-thumb/yt-thumb-${randomIndex}.PNG`);
  }, []);

  // Get timing based on question type and phase
  const getPhaseTime = () => {
    if (phase === "thumbnail") return 3; // 3s for thumbnail
    if (phase === "cta") return 5; // 5s for thank you screen at end
    if (phase === "question") {
      return questionType === "interview" ? 7 : 10; // 7s for interview, 10s for mcq/output
    }
    // Answer phase timing
    if (questionType === "mcq") return 10;
    if (questionType === "output") return 10;
    if (questionType === "interview") return 10;
    return 10;
  };

  // Get total time for progress calculation
  const getTotalPhaseTime = () => {
    return getPhaseTime();
  };

  // Calculate progress percentage (0-100)
  // Returns percentage of time remaining (100% = full, 0% = empty)
  const getProgressPercentage = () => {
    const total = getTotalPhaseTime();
    return (timer / total) * 100;
  };

  // Initialize timer when phase changes
  useEffect(() => {
    setTimer(getPhaseTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentIndex]);

  // Scroll to top when question phase starts
  useEffect(() => {
    if (phase === "question" && containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [phase, currentIndex]);

  // Show subscribe appeal for 5 seconds on questions 10 and 20
  useEffect(() => {
    if (phase === "question" && (currentIndex === 9 || currentIndex === 19)) {
      setShowSubscribeAppeal(true);
      const timeout = setTimeout(() => {
        setShowSubscribeAppeal(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timeout);
    } else {
      setShowSubscribeAppeal(false);
    }
  }, [phase, currentIndex]);

  // Show engagement appeal (like, comment, share) for 5 seconds on questions 5 and 15
  useEffect(() => {
    if (phase === "question" && (currentIndex === 4 || currentIndex === 14)) {
      setShowEngagementAppeal(true);
      const timeout = setTimeout(() => {
        setShowEngagementAppeal(false);
      }, 5000); // Hide after 5 seconds

      return () => clearTimeout(timeout);
    } else {
      setShowEngagementAppeal(false);
    }
  }, [phase, currentIndex]);

  // Show copy buttons 5 seconds after thank you screen (CTA phase) appears
  useEffect(() => {
    if (phase === "cta") {
      const timeout = setTimeout(() => {
        setShowCopyButtons(true);
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timeout);
    } else {
      setShowCopyButtons(false);
    }
  }, [phase]);

  // Auto-scroll during answer phase
  useEffect(() => {
    if (phase === "answer" && containerRef.current) {
      const timeouts: NodeJS.Timeout[] = [];

      if (questionType === "mcq" && explanationRef.current) {
        // MCQ: Two-stage scrolling
        // Stage 1: After 3 seconds, scroll to middle of explanation block
        const firstScrollTimeout = setTimeout(() => {
          if (containerRef.current && explanationRef.current) {
            const explanationTop = explanationRef.current.offsetTop;
            const explanationHeight = explanationRef.current.offsetHeight;
            const scrollToPosition = explanationTop + explanationHeight / 2;

            containerRef.current.scrollTo({
              top: scrollToPosition,
              behavior: "smooth",
            });
          }
        }, 3000); // 3 seconds
        timeouts.push(firstScrollTimeout);

        // Stage 2: After 8 seconds total, scroll to bottom
        const secondScrollTimeout = setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 8000); // 3 + 5 = 8 seconds
        timeouts.push(secondScrollTimeout);
      } else if (questionType === "interview" || questionType === "output") {
        // Interview/Output: Single scroll to bottom after 5 seconds
        const scrollTimeout = setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 5000); // 5 seconds
        timeouts.push(scrollTimeout);
      }

      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [phase, questionType, currentIndex]);

  // Countdown timer
  useEffect(() => {
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
  }, [phase, currentIndex]);

  // Phase advancement
  const advancePhase = () => {
    if (phase === "thumbnail") {
      // After thumbnail, go to first question
      setPhase("question");
      return;
    }

    if (phase === "question") {
      setPhase("answer");
      return;
    }

    if (phase === "answer") {
      if (currentIndex + 1 < questions.length) {
        // Go to next question
        setCurrentIndex(currentIndex + 1);
        setPhase("question");
      } else {
        // After last question, show thank you screen (CTA)
        setPhase("cta");
      }
      return;
    }

    // At CTA phase, stay forever
    if (phase === "cta") {
      return;
    }
  };

  // Copy to clipboard handler
  const handleCopy = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Convert subtopic name to filename format (hyphen-separated, no special chars)
  const getFilename = () => {
    const formattedName = metadata.subtopicName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen

    return `${metadata.topicIndex}.${metadata.subtopicIndex}-${formattedName}`;
  };

  // Render answer box based on question type
  const renderAnswerBox = () => {
    switch (questionType) {
      case "mcq":
        // No separate answer box needed - answer is highlighted in question block
        return null;

      case "output":
        return (
          <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-400">
            <div className="text-purple-900 font-semibold text-2xl mb-3">
              Expected Output:
            </div>
            <div className="text-gray-900 font-mono">
              <MDEditorRenderer
                value={currentQuestion.output!}
                dataColorMode="light"
                style={{ fontSize: "1.25rem" }}
              />
            </div>
          </div>
        );

      case "interview":
        return (
          <div className="bg-indigo-50 p-6 rounded-lg border-2 border-indigo-400">
            <div className="text-indigo-900 font-semibold text-2xl mb-3">
              Answer:
            </div>
            <div className="text-gray-800">
              <MDEditorRenderer
                value={currentQuestion.answer!}
                dataColorMode="light"
                style={{ fontSize: "1.25rem" }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bellRing {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-15deg); }
          20%, 40%, 60%, 80% { transform: rotate(15deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.6); }
        }
      `}</style>
      <div
        className="h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)" }}
      >
      {/* Copy Buttons - Top Right (only show after 5s on thank you screen) */}
      {youtubePostDetails && showCopyButtons && phase === "cta" && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {/* Title Button */}
          {youtubePostDetails.title && (
            <button
              onClick={() => handleCopy(youtubePostDetails.title, "title")}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg text-sm"
            >
              {copiedField === "title" ? "✓ Copied!" : "📋 Copy Title"}
            </button>
          )}

          {/* Description Button */}
          {youtubePostDetails.description && (
            <button
              onClick={() => handleCopy(youtubePostDetails.description, "description")}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg text-sm"
            >
              {copiedField === "description" ? "✓ Copied!" : "📝 Copy Description"}
            </button>
          )}

          {/* Tags Button */}
          {youtubePostDetails.tags && youtubePostDetails.tags.length > 0 && (
            <button
              onClick={() => handleCopy(youtubePostDetails.tags.join(", "), "tags")}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg text-sm"
            >
              {copiedField === "tags" ? "✓ Copied!" : "🏷️ Copy Tags"}
            </button>
          )}

          {/* Pinned Comment Button */}
          {youtubePostDetails.pinned_comment && (
            <button
              onClick={() => handleCopy(youtubePostDetails.pinned_comment, "pinned_comment")}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg text-sm"
            >
              {copiedField === "pinned_comment" ? "✓ Copied!" : "📌 Copy Pinned Comment"}
            </button>
          )}

          {/* Playlist Name Button */}
          {youtubePostDetails.playlist_name && (
            <button
              onClick={() => handleCopy(youtubePostDetails.playlist_name, "playlist_name")}
              className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg text-sm"
            >
              {copiedField === "playlist_name" ? "✓ Copied!" : "📚 Copy Playlist"}
            </button>
          )}

          {/* Filename Button */}
          <button
            onClick={() => handleCopy(getFilename(), "filename")}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-lg text-sm"
          >
            {copiedField === "filename" ? "✓ Copied!" : "📄 Copy Filename"}
          </button>
        </div>
      )}

      {/* Thumbnail Phase */}
      {phase === "thumbnail" && (
        <div className="h-full w-full flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: "1627px",
              height: "915px",
              backgroundImage: `url('${thumbnailImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Channel Logo - Top Right */}
            <div className="absolute top-8 right-8 z-10">
              <img
                src="/icon.png"
                alt="Channel Logo"
                className="w-40 h-40 rounded-full shadow-lg"
              />
            </div>

            <div className="absolute inset-0 p-12 flex items-end justify-between">
              {/* Left Column - Subject, Topic, Subtopic */}
              <div className="flex flex-col items-start mr-8">
                <h2 className="text-9xl font-bold text-white mb-3 leading-tight" style={{
                  display: 'inline',
                  background: 'black',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone'
                }}>
                  {metadata.subjectName.toUpperCase()}
                </h2>
                <div className="text-4xl font-semibold text-black leading-tight" style={{
                  display: 'inline',
                  background: '#F4D03F',
                  padding: '0.75rem 1.5rem',
                  borderTopLeftRadius: '0.5rem',
                  borderTopRightRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone'
                }}>
                  {(() => {
                    const prefix = `${metadata.topicIndex}. `;
                    const topicText = `${prefix}${metadata.topicName.toUpperCase()}`;
                    const words = topicText.split(' ');
                    const midPoint = Math.ceil(words.length / 2);
                    const line1 = words.slice(0, midPoint).join(' ');
                    const line2 = words.slice(midPoint).join(' ');
                    return (
                      <>
                        {line1}
                        <br />
                        <span style={{ paddingLeft: `${prefix.length * 0.4}em` }}>{line2}</span>
                      </>
                    );
                  })()}
                </div>
                <div className="text-3xl font-semibold text-black leading-tight" style={{
                  display: 'inline',
                  background: '#fef08a',
                  padding: '0.75rem 1.5rem',
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone'
                }}>
                  {(() => {
                    const prefix = `${metadata.subtopicIndex}. `;
                    const subtopicText = `${prefix}${metadata.subtopicName.toUpperCase()}`;
                    const words = subtopicText.split(' ');
                    const midPoint = Math.ceil(words.length / 2);
                    const line1 = words.slice(0, midPoint).join(' ');
                    const line2 = words.slice(midPoint).join(' ');
                    return (
                      <>
                        {line1}
                        <br />
                        <span style={{ paddingLeft: `${prefix.length * 0.4}em` }}>{line2}</span>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Right Column - Clock and Question Info */}
              <div className="relative flex items-end self-end mt-16">
                {/* Question Info Box */}
                <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-10 py-8 rounded-2xl shadow-2xl">
                  <div className="text-[9rem] font-bold text-center leading-none mb-1">
                    {questions.length}
                  </div>
                  <div className="text-7xl font-bold text-center leading-tight mb-1">
                    {questionType.toUpperCase()}
                  </div>
                  <div className="text-4xl font-bold text-center leading-tight">
                    QUESTIONS
                  </div>
                </div>

                {/* Clock Icon - Overlapping top-left */}
                <div className="absolute -top-20 -left-20 z-10">
                  <svg className="w-42 h-42" viewBox="0 0 100 100" fill="none">
                    {/* Outer ring */}
                    <circle cx="50" cy="50" r="45" fill="#C44536" />
                    <circle cx="50" cy="50" r="38" fill="#F5E6D3" />

                    {/* Clock marks */}
                    <line
                      x1="50"
                      y1="15"
                      x2="50"
                      y2="20"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="50"
                      y1="80"
                      x2="50"
                      y2="85"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="15"
                      y1="50"
                      x2="20"
                      y2="50"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="80"
                      y1="50"
                      x2="85"
                      y2="50"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    <line
                      x1="27"
                      y1="27"
                      x2="31"
                      y2="31"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="73"
                      y1="27"
                      x2="69"
                      y2="31"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="27"
                      y1="73"
                      x2="31"
                      y2="69"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <line
                      x1="73"
                      y1="73"
                      x2="69"
                      y2="69"
                      stroke="#C44536"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Clock hands */}
                    <line
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="30"
                      stroke="#C44536"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <line
                      x1="50"
                      y1="50"
                      x2="65"
                      y2="58"
                      stroke="#C44536"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />

                    {/* Center dot */}
                    <circle cx="50" cy="50" r="3" fill="#C44536" />

                    {/* Top ring */}
                    <ellipse cx="50" cy="8" rx="8" ry="4" fill="#C44536" />
                    <rect x="42" y="8" width="16" height="8" fill="#C44536" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call-to-Action Screen */}
      {phase === "cta" && (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
          <div className="text-center space-y-8 max-w-6xl">
            {/* Main Heading */}
            <div className="animate-[fadeInUp_0.6s_ease-out_0s_both]">
              <h1 className="text-6xl font-black text-white mb-3 drop-shadow-2xl">
                Thank You for Watching!
              </h1>
              <p className="text-3xl text-white font-semibold drop-shadow-lg">
                Help us grow by taking a moment to:
              </p>
            </div>

            {/* CTA Grid */}
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Like */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border-4 border-white/30 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                <div className="flex justify-center mb-3">
                  <svg className="w-20 h-20 animate-[bounce_0.8s_ease-in-out_0.8s_both]" viewBox="0 0 24 24" fill="white">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">LIKE</h3>
                <p className="text-xl text-white/90">Show your support</p>
              </div>

              {/* Comment */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border-4 border-white/30 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
                <div className="flex justify-center mb-3">
                  <svg className="w-20 h-20 animate-[bounce_0.8s_ease-in-out_1s_both]" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">COMMENT</h3>
                <p className="text-xl text-white/90">Share your thoughts</p>
              </div>

              {/* Share */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border-4 border-white/30 animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
                <div className="flex justify-center mb-3">
                  <svg className="w-20 h-20 animate-[bounce_0.8s_ease-in-out_1.2s_both]" viewBox="0 0 24 24" fill="white">
                    <path d="M15 5.63L20.66 12L15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1L15 9.87V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">SHARE</h3>
                <p className="text-xl text-white/90">Spread the knowledge</p>
              </div>

              {/* Subscribe */}
              <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border-4 border-white/30 animate-[fadeInUp_0.6s_ease-out_0.8s_both]">
                <div className="flex justify-center mb-3">
                  <svg className="w-20 h-20 animate-[bounce_0.8s_ease-in-out_1.4s_both]" viewBox="0 0 24 24" fill="white">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  SUBSCRIBE
                </h3>
                <p className="text-xl text-white/90">Never miss an update</p>
              </div>
            </div>

            {/* Channel Logo */}
            <div className="flex items-center justify-center gap-4 pt-4 animate-[fadeInUp_0.6s_ease-out_1s_both]">
              <img
                src="/icon.png"
                alt="Channel Logo"
                className="w-24 h-24 rounded-full shadow-2xl border-4 border-white"
              />
              <div className="text-left">
                <p className="text-3xl font-black text-white drop-shadow-lg">
                  @quizzydockofficial
                </p>
                <p className="text-2xl text-white/90">
                  The Ultimate Coding Quiz Hub
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question/Answer/Completed Phases */}
      {phase !== "thumbnail" && phase !== "cta" && (
        <div className="max-w-[1550px] mx-auto h-full p-8">
          {/* Channel Logo - Top Right */}
          <div className="absolute bottom-16 right-30 z-20">
            <img
              src="/icon.png"
              alt="Channel Logo"
              className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500"
            />
          </div>

          {/* Subscribe & Bell Animation - Bottom Center */}
          {showSubscribeAppeal && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-[slideInFromBottom_0.8s_ease-out_1s_both]">
              <div className="flex items-center gap-4 bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 rounded-full shadow-2xl animate-[glow_2s_ease-in-out_infinite]">
                {/* Subscribe Text */}
                <div className="text-white font-black text-4xl tracking-wide">
                  SUBSCRIBE
                </div>

                {/* Bell Icon */}
                <div className="animate-[bellRing_2s_ease-in-out_2s_infinite]">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="white">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                  </svg>
                </div>
              </div>

              {/* Arrow pointing up */}
              <div className="flex justify-center mt-2 animate-[pulse_1.5s_ease-in-out_infinite]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#ef4444">
                  <path d="M7 14l5-5 5 5H7z"/>
                </svg>
              </div>
            </div>
          )}

          {/* Engagement Appeal (Like, Comment, Share) - Bottom Center */}
          {showEngagementAppeal && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-[slideInFromBottom_0.8s_ease-out_1s_both]">
              <div className="flex items-center gap-6 bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 rounded-full shadow-2xl animate-[glow_2s_ease-in-out_infinite]">
                {/* Like */}
                <div className="flex items-center gap-2 animate-[pulse_1.5s_ease-in-out_0s_infinite]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                  </svg>
                  <span className="text-white font-black text-3xl">LIKE</span>
                </div>

                {/* Divider */}
                <div className="w-0.5 h-10 bg-white/30"></div>

                {/* Comment */}
                <div className="flex items-center gap-2 animate-[pulse_1.5s_ease-in-out_0.5s_infinite]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <span className="text-white font-black text-3xl">COMMENT</span>
                </div>

                {/* Divider */}
                <div className="w-0.5 h-10 bg-white/30"></div>

                {/* Share */}
                <div className="flex items-center gap-2 animate-[pulse_1.5s_ease-in-out_1s_infinite]">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white">
                    <path d="M15 5.63L20.66 12L15 18.37V14h-1c-3.96 0-7.14 1-9.75 3.09 1.84-4.07 5.11-6.4 9.89-7.1L15 9.87V5.63M14 3v6C6.22 10.13 3.11 15.33 2 21c2.78-3.97 6.44-6 12-6v6l8-9-8-9z"/>
                  </svg>
                  <span className="text-white font-black text-3xl">SHARE</span>
                </div>
              </div>

              {/* Arrow pointing up */}
              <div className="flex justify-center mt-2 animate-[pulse_1.5s_ease-in-out_infinite]">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#ef4444">
                  <path d="M7 14l5-5 5 5H7z"/>
                </svg>
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className="flex flex-col gap-8 h-full overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            <div className="space-y-6">
              {/* Question Block */}
              <div className="bg-white p-8 rounded-lg border-2 border-gray-300 shadow-md">
                {/* Topic and Subtopic Name with Question Counter and Timer */}
                <div className="sticky top-0 z-10 bg-white -mt-8 -mx-8 px-8 pt-8 pb-6 flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {metadata.subtopicName}
                    </h1>
                    <p className="text-gray-600 text-xl mt-1">
                      {metadata.subjectName} › {metadata.topicName} ›{" "}
                      {questionType.toUpperCase()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Question Counter with Background */}
                    <div className="bg-indigo-100 px-4 py-2 rounded-lg">
                      <span className="text-indigo-600 font-bold text-3xl">
                        {currentIndex + 1} of {questions.length}
                      </span>
                    </div>
                    {/* Circular Progress Bar */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#e5e7eb"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={phase === "answer" ? "#22c55e" : "#6366f1"}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${
                            2 *
                            Math.PI *
                            28 *
                            (1 - getProgressPercentage() / 100)
                          }`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`text-2xl font-bold ${
                            phase === "answer"
                              ? "text-green-500"
                              : "text-indigo-600"
                          }`}
                        >
                          {timer}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-900 mb-6">
                  <MDEditorRenderer
                    value={currentQuestion.question}
                    dataColorMode="light"
                    style={{ fontSize: "2.5rem" }}
                  />
                </div>

                {/* Show options for MCQ */}
                {questionType === "mcq" && currentQuestion.options && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, idx) => {
                      const isCorrect = idx === currentQuestion.correct_answer;
                      const showAnswer = phase === "answer";

                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-lg border-2 transition-all duration-500 ${
                            showAnswer && isCorrect
                              ? "bg-green-50 border-green-500 shadow-lg"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`flex-1 ${
                                showAnswer && isCorrect
                                  ? "text-green-900 font-semibold"
                                  : "text-gray-800"
                              }`}
                            >
                              <MDEditorRenderer
                                value={option}
                                dataColorMode="light"
                                style={{ fontSize: "1.75rem" }}
                              />
                            </div>
                            {showAnswer && isCorrect && (
                              <span className="text-green-600 font-bold text-5xl flex-shrink-0">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Answer Box - All types */}
              {phase === "answer" && <div>{renderAnswerBox()}</div>}

              {/* Explanation Box */}
              {phase === "answer" && (
                <div
                  ref={explanationRef}
                  className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300"
                >
                  <div className="text-blue-900 font-semibold text-2xl mb-3">
                    Explanation:
                  </div>
                  <div className="text-gray-800">
                    <MDEditorRenderer
                      value={currentQuestion.explanation}
                      dataColorMode="light"
                      style={{ fontSize: "1.25rem" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
