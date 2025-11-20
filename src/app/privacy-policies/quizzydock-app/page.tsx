import React from "react";
import { PrivacyPolicyQuizzyDockApp } from "@/components/legal/PrivacyPolicyQuizzyDockApp";
import { generatePageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = generatePageMetadata({
  title: "Privacy Policy - QuizzyDock App",
  description:
    "Privacy policy for the QuizzyDock mobile app. Learn how we collect, use, and protect your data.",
  path: "/privacy-policies/quizzydock-app",
  keywords: ["privacy policy", "QuizzyDock app", "mobile app privacy", "data protection"],
  noIndex: true,
});

export default function QuizzyDockAppPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/legal"
            className="text-indigo-400 hover:text-indigo-300 transition duration-150 text-sm flex items-center gap-2"
          >
            ← Back to Legal
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-4">
            QuizzyDock App Privacy Policy
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our privacy commitment for the QuizzyDock mobile application
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-indigo-700/30 shadow-xl">
          <PrivacyPolicyQuizzyDockApp />
        </div>
      </div>
    </div>
  );
}
