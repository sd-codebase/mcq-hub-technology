import TestContent from "./TestContent";
import {
  generatePageMetadata,
  formatSubjectName,
  generateQuizSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string; subtopicId: string; subtopicName: string }>;
}): Promise<Metadata> {
  const { subject, subtopicName } = await params;
  const formattedSubject = formatSubjectName(subject);
  const decodedSubtopicName = decodeURIComponent(subtopicName);

  return generatePageMetadata({
    title: `${decodedSubtopicName} MCQ Quiz - ${formattedSubject} Multiple Choice Questions`,
    description: `Test your ${formattedSubject} knowledge with ${decodedSubtopicName} multiple choice questions. Practice MCQ to master ${formattedSubject} concepts and prepare for coding interviews.`,
    path: `/subjects/${subject}/test/mcq/${params}/${subtopicName}`,
    keywords: [
      `${formattedSubject} MCQ`,
      `${decodedSubtopicName} quiz`,
      `${formattedSubject} multiple choice`,
      `${formattedSubject} test`,
      "coding quiz",
      "programming MCQ",
    ],
  });
}

export default async function McqTestPage({
  params,
}: {
  params: Promise<{ subject: string; subtopicId: string; subtopicName: string }>;
}) {
  const { subject, subtopicId, subtopicName } = await params;
  return (
    <TestContent
      subject={subject}
      subtopicId={subtopicId}
      subtopicName={decodeURIComponent(subtopicName)}
    />
  );
}
