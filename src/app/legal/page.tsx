import React from "react";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { TermsOfService } from "@/components/legal/TermsOfService";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "Legal - Privacy Policy & Terms of Service",
  description:
    "Read Quizzy Dock's privacy policy and terms of service. Learn about how we protect your data and our platform usage terms.",
  path: "/legal",
  keywords: ["privacy policy", "terms of service", "legal", "Quizzy Dock terms"],
  noIndex: true,
});

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-4">
            Legal Information
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our commitment to privacy and terms of service
          </p>
        </div>

        <div className="space-y-16">
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-indigo-700/30 shadow-xl">
            <PrivacyPolicy />
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-gray-950 p-8 rounded-2xl border border-indigo-700/30 shadow-xl">
            <TermsOfService />
          </div>
        </div>
      </div>
    </div>
  );
}
