import React from "react";
import { VerificationPage } from "@/components/legal/VerificationPage";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Legal Verification - QuizzyDock",
  description:
    "Domain ownership and app legitimacy verification for QuizzyDock.",
  path: "/legal",
  keywords: [
    "QuizzyDock",
    "verification",
    "domain ownership",
    "app legitimacy",
  ],
  noIndex: true,
});

export default function LegalVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-4">
            QuizzyDock Verification
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Domain ownership and app legitimacy verification
          </p>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-indigo-700/30 shadow-xl">
          <VerificationPage />
        </div>
      </div>
    </div>
  );
}
