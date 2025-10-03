"use client";
import React from "react";
import Link from "next/link";

export default function SubtopicActions({ subtopic }: { subtopic: any }) {
  const encoded = encodeURIComponent(subtopic.id);
  const encodedName = encodeURIComponent(subtopic.name);
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Link
        href={{
          pathname: "/test/mcq",
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-2 py-1 rounded text-xs bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
        style={{ background: "var(--color-primary)" }}
      >
        Multiple Choice Questions
      </Link>
      <Link
        href={{
          pathname: "/test/output",
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-2 py-1 rounded text-xs bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
        style={{ background: "var(--color-secondary)" }}
      >
        Output Questions
      </Link>
      <Link
        href={{
          pathname: "/test/interview",
          query: { subtopic: encoded, subtopicName: encodedName },
        }}
        className="px-2 py-1 rounded text-xs bg-purple-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
      >
        Interview Questions
      </Link>
    </div>
  );
}
