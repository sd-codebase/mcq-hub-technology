"use client";
import React from "react";
import Link from "next/link";

export default function SubtopicActions({
  subtopic,
  subject,
}: {
  subtopic: any;
  subject: string;
}) {
  const encoded = encodeURIComponent(subtopic.id);
  const encodedName = encodeURIComponent(subtopic.name);
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      <Link
        href={{
          pathname: `/subjects/${subject}/test/mcq`,
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold text-white
                   bg-gradient-to-r from-indigo-600 to-purple-600 
                   hover:from-indigo-700 hover:to-purple-700
                   transition-all duration-300 shadow-lg shadow-indigo-500/20
                   transform hover:scale-105"
      >
        Multiple Choice Questions
      </Link>
      <Link
        href={{
          pathname: `/subjects/${subject}/test/output`,
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold text-white
                   bg-gradient-to-r from-teal-500 to-green-500 
                   hover:from-teal-600 hover:to-green-600
                   transition-all duration-300 shadow-lg shadow-teal-500/20
                   transform hover:scale-105"
      >
        Output Questions
      </Link>
      <Link
        href={{
          pathname: `/subjects/${subject}/test/interview`,
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-4 py-2 rounded-full text-sm font-semibold text-white
                   bg-gradient-to-r from-pink-500 to-purple-500
                   hover:from-pink-600 hover:to-purple-600
                   transition-all duration-300 shadow-lg shadow-purple-500/20
                   transform hover:scale-105"
      >
        Interview Questions
      </Link>
    </div>
  );
}
