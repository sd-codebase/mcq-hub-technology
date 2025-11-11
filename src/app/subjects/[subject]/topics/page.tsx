import TopicsList from "@/components/TopicsList";
import {
  generatePageMetadata,
  formatSubjectName,
  generateBreadcrumbSchema,
  generateCourseSchema,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const formattedSubject = formatSubjectName(subject);

  return generatePageMetadata({
    title: `${formattedSubject} Quiz Topics - Practice Questions & Tests`,
    description: `Explore ${formattedSubject} quiz topics. Practice MCQ, code output, and interview questions. Master ${formattedSubject} with comprehensive assessments and real-world coding challenges.`,
    path: `/subjects/${subject}/topics`,
    keywords: [
      `${formattedSubject} quiz`,
      `${formattedSubject} test`,
      `${formattedSubject} MCQ`,
      `${formattedSubject} interview questions`,
      `${formattedSubject} practice`,
      "coding quiz",
      "programming test",
    ],
  });
}

export default async function Topics({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-3xl mx-auto">
      <TopicsList subject={subject} />
    </div>
  );
}
