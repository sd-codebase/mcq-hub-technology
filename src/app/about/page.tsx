import React from "react";
import { offerings, technologies } from "../constants/about";
import FollowUsOnSocialMedia from "@/components/FollowUsOnSocialMedia";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
  title: "About Us - Quizzy Dock Mission & Vision",
  description:
    "Learn about Quizzy Dock's mission to empower developers through comprehensive technical assessments and interview preparation. Discover our platform's features and technologies.",
  path: "/about",
  keywords: [
    "about Quizzy Dock",
    "coding platform",
    "developer training",
    "interview preparation platform",
    "technical assessment",
  ],
});

const AboutHero = () => (
  <div className="text-center mb-12">
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-4">
      About Quizzy Dock
    </h1>
    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
      Empowering developers to master technical skills through comprehensive
      assessments
    </p>
  </div>
);

const MissionSection = () => (
  <section className="p-8 rounded-2xl border border-indigo-700/30 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-6">
      Our Mission
    </h2>
    <p className="text-lg text-gray-300 leading-relaxed">
      Quizzy Dock is dedicated to helping developers master technical skills through
      comprehensive assessments and interview preparation materials. We believe
      in practical learning and real-world preparation.
    </p>
  </section>
);

const OfferingsSection = () => (
  <section className="p-8 rounded-2xl border border-indigo-700/30 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-6">
      What We Offer
    </h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {offerings.map((offering, index) => (
        <li key={index} className="flex items-center space-x-3 text-gray-300">
          <span className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            ✓
          </span>
          <div>
            <span className="font-medium">{offering.title}</span>
            <p className="text-sm text-gray-400 mt-1">{offering.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const TechnologiesSection = () => (
  <section className="p-8 rounded-2xl border border-indigo-700/30 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 mb-6">
      Our Technologies
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 text-center"
        >
          <div className="text-2xl mb-2">{tech.icon}</div>
          <div className="font-semibold text-gray-200">{tech.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AboutHero />
        <div className="space-y-12 text-gray-300">
          <MissionSection />
          <OfferingsSection />
          <TechnologiesSection />

          {/* Follow Us Section */}
          <section className="p-8 rounded-2xl border border-indigo-700/30 bg-gradient-to-b from-gray-900 to-gray-950 shadow-xl">
            <FollowUsOnSocialMedia
              title="Stay Connected With Us"
              size="md"
              variant="with-labels"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
