"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TechLogoGenerator } from "@/components/logo";

interface Subject {
  _id: string;
  name: string;
  shortName: string;
  questions: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface SubjectsResponse {
  success: boolean;
  count: number;
  data: Subject[];
}

export default function SubjectsSection() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await fetch("/api/subjects");
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data: SubjectsResponse = await response.json();
        setSubjects(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchSubjects();
  }, []);

  return (
    <section id="subjects" className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Deep Coverage Across Top Technologies
        </h2>
        <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Find specialized question sets for the languages and frameworks that
          power the modern web.
        </p>

        {loading && (
          <div className="text-center text-gray-400">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="mt-4">Loading subjects...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject._id}
                href={`subjects/${subject.shortName}/topics`}
                className="transform hover:scale-105 transition duration-300 shadow-xl border cursor-pointer"
              >
                <div className="p-6 bg-gray-800 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition duration-300 shadow-xl border border-gray-700 cursor-pointer group">
                  <div>
                    <TechLogoGenerator text={subject.name} />
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
        )}
      </div>
    </section>
  );
}
