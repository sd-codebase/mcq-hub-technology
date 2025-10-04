import { Header } from "@/components/header";
import { Zap } from "@/components/zap";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// --- Icon Imports (Using lucide-react approximations) ---
const Code = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ClipboardList = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <path d="M12 11h4"></path>
    <path d="M12 15h4"></path>
    <path d="M8 11h.01"></path>
    <path d="M8 15h.01"></path>
  </svg>
);
const MessageCircleQuestion = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7.9 20.9c-2.8-.8-5-2.9-6.3-5.5C.5 13.5 1 11.2 2 9.2a9.7 9.7 0 0 1 6.5-5.9c.7-.2 1.5-.3 2.3-.3h.4c3 0 5.8 1.4 7.6 3.9 1.8 2.5 2 5.7.5 8.4-1 1.9-2.6 3.4-4.5 4.5-.8.5-1.7.9-2.7 1.1h-.1c-1.1.2-2.3.2-3.4 0"></path>
    <path d="M9.5 14.5c.6.6 1.4.9 2.5.9h.4c1.1 0 1.9-.3 2.5-.9 1.1-1.1 1.4-2.7.9-3.9-.5-1.2-1.7-1.9-3.1-1.9h-.6c-1.4 0-2.6.7-3.1 1.9-.5 1.2-.2 2.8.9 3.9"></path>
    <path d="M12 18v.01"></path>
  </svg>
);

// Mock data for Subjects (replace with actual image URLs or SVG components later)
const subjects = [
  {
    name: "JavaScript",
    icon: "/images/javascript.png",
    link: "subjects/javascript/topics",
    questions: "20,000",
  },
  {
    name: "TypeScript",
    icon: "/images/typescript.png",
    link: "subjects/typescript/topics",
    questions: "20,000",
  },
  {
    name: "Node.js",
    icon: "/images/javascript.png",
    link: "subjects/javascript/topics",
    questions: "20,000",
  },
  // {
  //   name: "Python",
  //   icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.5 15h-5v-5h-3V9.5h3v-3h2v3h2v2h-2v5z",
  // },
  // {
  //   name: "React",
  //   icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.8 14.4l-4.2-2.4 4.2-2.4 4.2 2.4-4.2 2.4z",
  // },
  // {
  //   name: "SQL",
  //   icon: "M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm2.5 0c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8-8 3.59-8 8zm4 0a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0z",
  // },
];

const Hero = () => (
  <section
    className="relative pt-32 pb-20 overflow-hidden text-center min-h-screen flex items-center justify-center"
    style={{
      background: "radial-gradient(circle at 50% 10%, #0c0926, #0A0A0A 60%)",
    }}
  >
    {/* Subtle gradient effect in the background */}
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at top right, #6366f1 10%, transparent 50%), radial-gradient(circle at bottom left, #9333ea 10%, transparent 50%)",
      }}
    ></div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-indigo-400 font-semibold mb-3 tracking-wider uppercase">
        Master Your Tech Skills
      </p>
      <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-tight mb-6">
        The Ultimate{" "}
        <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Coding Quiz Hub
        </span>
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
        Hundreds of curated, real-world questions across JavaScript, Python,
        Node.js, and more, designed to elevate your career.
      </p>
      <a
        href="#subjects"
        className="inline-block py-3 px-10 text-lg font-bold rounded-full transition duration-300 
                   bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                   text-white shadow-2xl shadow-purple-600/50 transform hover:scale-105"
      >
        Explore Subjects & Start Quiz
      </a>
      <div className="mt-12 flex justify-center space-x-8 text-gray-400">
        <div className="flex items-center text-sm">
          <ClipboardList className="w-5 h-5 mr-2 text-teal-400" />
          <span>3 Test Formats</span>
        </div>
        <div className="flex items-center text-sm">
          <Code className="w-5 h-5 mr-2 text-teal-400" />
          <span>Output Questions</span>
        </div>
        <div className="flex items-center text-sm">
          <MessageCircleQuestion className="w-5 h-5 mr-2 text-teal-400" />
          <span>Interview Prep</span>
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    {
      icon: ClipboardList,
      title: "Multiple Choice Questions (MCQ)",
      description:
        "Quickly test your foundational knowledge and core concepts with thousands of traditional multiple-choice questions.",
      color: "text-indigo-400",
    },
    {
      icon: Code,
      title: "Code Output Quizzes",
      description:
        "Assess your understanding of language nuances and execution flow by predicting the exact output of code snippets.",
      color: "text-teal-400",
    },
    {
      icon: MessageCircleQuestion,
      title: "Interview Scenario Questions",
      description:
        "Prepare for the real world. Practice answering common behavioral, system design, and deep technical interview prompts.",
      color: "text-pink-400",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Three Paths to Mastery
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
          {
            "We don't just test theory. We prepare you for every stage of technical assessment, from quick checks to deep dives."
          }
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-gray-800 rounded-xl shadow-2xl border-t-4 border-indigo-500 hover:shadow-indigo-500/30 transition duration-300"
            >
              <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
              <h3 className="text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubjectsSection = () => (
  <section id="subjects" className="py-20 bg-gray-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-white mb-4">
        Deep Coverage Across Top Technologies
      </h2>
      <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
        Find specialized question sets for the languages and frameworks that
        power the modern web.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Link
            key={index}
            href={subject.link}
            className="transform hover:scale-105 transition duration-300 shadow-xl border  cursor-pointer"
          >
            {/* Logo Placeholder - User mentioned they have the logos */}
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-xl flex flex-col items-center text-center 
                       transform hover:scale-105 transition duration-300 
                       shadow-xl border border-gray-700 cursor-pointer group"
            >
              {/* Logo Placeholder - User mentioned they have the logos */}
              <div className="h-15 mb-4 px-2 flex items-center justify-center bg-white rounded-lg shadow">
                <img src={subject.icon} alt={subject.name} height={100} />
              </div>
              <h4 className="mt-4 text-lg font-medium text-white group-hover:text-indigo-300">
                {subject.name}
              </h4>
              <span className="text-sm text-gray-500 mt-1">
                ({subject.questions}+ Questions)
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section id="start-test" className="py-24 bg-gray-900">
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center p-8 rounded-2xl border border-indigo-700/50"
      style={{
        background: "linear-gradient(135deg, #1c1c3c, #0a0a0a)",
        boxShadow: "0 20px 50px rgba(75, 0, 130, 0.4)",
      }}
    >
      <h2 className="text-4xl font-extrabold text-white mb-4">
        Ready to Level Up Your Skills?
      </h2>
      <p className="text-xl text-gray-300 mb-8">
        Start your journey with thousands of real-world assessment questions
        today. No sign-up required.
      </p>
      <a
        href="#subjects"
        className="inline-block py-4 px-12 text-xl font-bold rounded-full transition duration-300 
                           bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 
                           text-white shadow-xl shadow-teal-500/50 transform hover:scale-105"
      >
        Start My First Quiz Now
      </a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-950 border-t border-gray-800 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <Zap className="h-6 w-6 text-indigo-400 mr-2" />
            <span className="text-xl font-bold text-white">MCQHub</span>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            © {new Date().getFullYear()} MCQHub. All rights reserved.
          </p>
        </div>
        <div className="space-x-6 text-sm">
          <a
            href="#about"
            className="text-gray-400 hover:text-indigo-400 transition duration-150"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-gray-400 hover:text-indigo-400 transition duration-150"
          >
            Contact
          </a>
          <a
            href="#privacy"
            className="text-gray-400 hover:text-indigo-400 transition duration-150"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="text-gray-400 hover:text-indigo-400 transition duration-150"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      <Header hasStartTestButton />
      <main>
        <Hero />
        <Features />
        <SubjectsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
