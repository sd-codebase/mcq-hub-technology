import TestContent from "./TestContent";
import {
  generatePageMetadata,
  formatSubjectName,
  generateQuizSchema,
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
    title: `${decodedSubtopicName} Interview Questions - ${formattedSubject} Interview Prep`,
    description: `Prepare for ${formattedSubject} interviews with ${decodedSubtopicName} questions. Practice common interview scenarios and deep technical questions. Ace your ${formattedSubject} coding interviews.`,
    path: `/subjects/${subject}/test/interview/${params}/${subtopicName}`,
    keywords: [
      `${formattedSubject} interview questions`,
      `${decodedSubtopicName} interview`,
      `${formattedSubject} interview prep`,
      `${formattedSubject} coding interview`,
      "technical interview",
      "interview preparation",
    ],
  });
}

export default async function InterviewTestPage({
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
