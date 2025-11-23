"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Zap } from "./zap";
import SocialMediaContentButton from "./SocialMediaContent/SocialMediaContentButton";
import SocialMediaContentEditor from "./SocialMediaContent/SocialMediaContentEditor";
import SocialMediaContentViewer from "./SocialMediaContentViewer";
import { validateSocialMediaPresence } from "@/utils/validateSocialMediaPresence";

const MDEditorRenderer = dynamic(() => import("./MDEditorRenderer"), {
  ssr: false,
});

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

interface AdminReviewTestContentProps {
  testData: TestData;
}

export default function AdminReviewTestContent({
  testData,
}: AdminReviewTestContentProps) {
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set(testData.questions.map((_, index) => index)) // Expand all questions by default
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedFullTest, setCopiedFullTest] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const [showSocialMediaViewer, setShowSocialMediaViewer] = useState(false);

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const copyToClipboard = (questionId: string) => {
    navigator.clipboard.writeText(questionId).then(() => {
      setCopiedId(questionId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const extractTestPart = (): string => {
    // Try to extract part number from testName (e.g., "Part 3" or "JavaScript Part 3")
    const partMatch = testData.testName.match(/Part\s+(\d+)/i);
    if (partMatch) {
      const partNum = partMatch[1];
      return partNum;
    }
    return "1";
  };

  const extractPlainText = (htmlOrMarkdown: string): string => {
    // Remove markdown formatting
    if (!htmlOrMarkdown) return "";
    return htmlOrMarkdown
      .replace(/\*\*(.+?)\*\*/g, "$1") // bold
      .replace(/\*(.+?)\*/g, "$1") // italic
      .replace(/`(.+?)`/g, "$1") // inline code
      .replace(/#+\s+/g, "") // headers
      .trim();
  };

  const getSlugFromText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
  };

  const copyFullTestToClipboard = () => {
    const testPart = extractTestPart();
    const subjectSlug = getSlugFromText(testData.subjectName);
    const topicSlug = getSlugFromText(testData.topicName);
    const subtopicSlug = getSlugFromText(testData.subtopicName);
    const explanationLink = `https://www.quizzydock.com/review/${testData._id}/${subjectSlug}/${topicSlug}/${subtopicSlug}`;

    let fullContent = `For context, rules, validations, please refer the attached "Social Media Growth.md" file in this project. And give exactly same copyable json code block as mentioned in propmt file. Here are the inputs \nSubject: ${
      testData.subjectName
    }\nTopic: ${testData.topicName}\nSubtopic: ${
      testData.subtopicName
    }\nTest Part: ${testPart}\nType (MCQ or Output Prediction): ${testData.questionType.toUpperCase()}\n\nQuestions/Code Snippets:\n\n`;

    // Format all questions
    testData.questions.forEach((question, index) => {
      const questionNum = index + 1;
      const questionText = extractPlainText(question.question);
      fullContent += `Q${questionNum}: ${questionText}\n`;

      // if (question.options && question.options.length > 0) {
      //   // MCQ format
      //   question.options.forEach((option: string, optIdx: number) => {
      //     const letter = String.fromCharCode(65 + optIdx);
      //     const optionText = extractPlainText(option);
      //     fullContent += `${letter}) ${optionText}\n`;
      //   });
      //   const correctLetter = String.fromCharCode(65 + question.correct_answer);
      //   fullContent += `Correct Answer: ${correctLetter}\n\n`;
      // } else if (question.output) {
      //   // Output prediction format
      //   const outputText = extractPlainText(question.output);
      //   fullContent += `Expected Output:\n${outputText}\n\n`;
      // }
    });

    fullContent += `\nExplanation Link: ${explanationLink}\nTotal Tests: ${
      testData.questionType.toUpperCase() === "MCQ" ? "4" : "3"
    }`;

    navigator.clipboard.writeText(fullContent).then(() => {
      setCopiedFullTest(true);
      setTimeout(() => setCopiedFullTest(false), 2000);
    });
  };

  const handleStartAutoTest = () => {
    // Check if socialMediaContent exists
    if (!testData.socialMediaContent) {
      alert(
        "Social media content is required to start the auto test. Please add it first."
      );
      return;
    }

    // Validate required fields (hooks, cta_pack, thumbnail_text)
    const validation = validateSocialMediaPresence(testData.socialMediaContent);
    if (!validation.isValid) {
      alert(
        `Please fill in the following fields: ${validation.missingFields.join(
          ", "
        )}`
      );
      return;
    }

    // All valid, navigate to auto test
    router.push(`/auto-test/${testData._id}`);
  };

  return (
    <div
      className="min-h-screen pb-8 px-4 sm:px-6 lg:px-8 pt-20"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0f0f1e)",
      }}
    >
      {/* Logo */}
      <div className="w-full flex justify-center py-3 mb-8">
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

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {testData.testName}
          </h1>
          <p className="text-gray-400 text-lg">
            {testData.subjectName} → {testData.topicName} →{" "}
            {testData.subtopicName}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-400 text-sm font-semibold">
              {testData.questionCount} Questions
            </span>
            <span className="px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500 text-teal-400 text-sm font-semibold">
              {testData.questionType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-12">
          {testData.questions.map((question, index) => {
            const isExpanded = expandedQuestions.has(index);
            const questionId = question._id || `Q${index + 1}`;
            const isCopied = copiedId === questionId;

            return (
              <div
                key={index}
                className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
              >
                {/* Question Header */}
                <div className="bg-white hover:bg-gray-100 transition-colors duration-200 px-6 py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="font-bold text-indigo-600 text-lg min-w-fit">
                      #{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="text-indigo-600 text-sm font-mono bg-gray-100 px-3 py-1 rounded border border-gray-300">
                        {questionId}
                      </code>
                      <button
                        onClick={() => copyToClipboard(questionId)}
                        className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-300 ${
                          isCopied
                            ? "bg-green-600 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                      >
                        {isCopied ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="text-gray-600 text-2xl min-w-fit"
                  >
                    {isExpanded ? "▼" : "▶"}
                  </button>
                </div>

                {/* Question Content - Expanded */}
                {isExpanded && (
                  <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700 space-y-4">
                    {/* Full Question */}
                    <div>
                      <p className="text-gray-400 text-xs uppercase font-semibold mb-2">
                        Question
                      </p>
                      <div className="text-gray-800 text-base bg-white p-4 rounded-lg">
                        <MDEditorRenderer value={question.question} />
                      </div>
                    </div>

                    {/* MCQ Options */}
                    {question.options && (
                      <div className="pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                          Options
                        </p>
                        <div className="space-y-2">
                          {question.options.map(
                            (option: string, optionIdx: number) => {
                              const isCorrect =
                                optionIdx === question.correct_answer;
                              return (
                                <div
                                  key={optionIdx}
                                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                    isCorrect
                                      ? "bg-green-50 border-green-500"
                                      : "bg-white border-gray-300"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <span
                                      className={`font-bold text-lg min-w-fit ${
                                        isCorrect
                                          ? "text-green-600"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {String.fromCharCode(65 + optionIdx)})
                                    </span>
                                    <div className="flex-1">
                                      <div
                                        className={
                                          isCorrect
                                            ? "text-green-700"
                                            : "text-gray-800"
                                        }
                                      >
                                        <MDEditorRenderer value={option} />
                                      </div>
                                    </div>
                                    {isCorrect && (
                                      <span className="text-green-600 text-lg font-bold">
                                        ✓
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    {/* Output Question Type */}
                    {question.output && !question.options && (
                      <div className="pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                          Expected Output
                        </p>
                        <div className="p-4 rounded-lg bg-white border-2 border-green-500">
                          <div className=" font-mono text-sm whitespace-pre-wrap">
                            <MDEditorRenderer value={question.output} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interview Question Answer */}
                    {question.answer &&
                      !question.options &&
                      !question.output && (
                        <div className="pt-3 border-t border-gray-700">
                          <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                            Answer
                          </p>
                          <div className="p-4 rounded-lg bg-indigo-900/30 border-2 border-indigo-500">
                            <div className="text-indigo-300 text-sm">
                              <MDEditorRenderer value={question.answer} />
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-xs uppercase font-semibold mb-3">
                          Explanation
                        </p>
                        <div className="p-4 rounded-lg bg-white border-l-4 border-amber-500">
                          <div className="text-gray-800 text-sm">
                            <MDEditorRenderer value={question.explanation} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Copy Full Test and Start Auto Test Buttons */}
        <div className="flex justify-center gap-4 pt-8 flex-wrap">
          <button
            onClick={copyFullTestToClipboard}
            className={`px-8 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 shadow-lg transform hover:scale-105 ${
              copiedFullTest
                ? "bg-green-600 shadow-green-500/50"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/50"
            }`}
          >
            {copiedFullTest ? "✓ Copied to Clipboard" : "📋 Copy SM Prompt"}
          </button>
          <SocialMediaContentButton
            onClick={() => setShowSocialMediaModal(true)}
          />
          <button
            onClick={() => setShowSocialMediaViewer(true)}
            className="px-8 py-4 rounded-full font-bold text-white text-lg
                       bg-gradient-to-r from-teal-600 to-cyan-600
                       hover:from-teal-700 hover:to-cyan-700
                       transition-all duration-300 shadow-lg shadow-teal-500/50
                       transform hover:scale-105"
          >
            📱 View SM Content
          </button>

          <button
            onClick={handleStartAutoTest}
            className="px-8 py-4 rounded-full font-bold text-white text-lg
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-700 hover:to-purple-700
                       transition-all duration-300 shadow-lg shadow-indigo-500/50
                       transform hover:scale-105"
          >
            Start Auto Test ▶
          </button>
        </div>

        {/* Social Media Content Viewer Modal */}
        <SocialMediaContentViewer
          isOpen={showSocialMediaViewer}
          onClose={() => setShowSocialMediaViewer(false)}
          socialMediaContent={testData.socialMediaContent}
        />

        {/* Social Media Content Editor Modal */}
        <SocialMediaContentEditor
          isOpen={showSocialMediaModal}
          onClose={() => setShowSocialMediaModal(false)}
          testId={testData._id}
          onSuccess={() => {
            // Optionally refresh data here if needed
          }}
        />
      </div>
    </div>
  );
}
