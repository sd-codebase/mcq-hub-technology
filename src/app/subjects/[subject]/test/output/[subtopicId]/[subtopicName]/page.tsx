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
    title: `${decodedSubtopicName} Output Quiz - ${formattedSubject} Code Output Questions`,
    description: `Master ${formattedSubject} with ${decodedSubtopicName} code output questions. Predict program outputs and understand code execution flow. Perfect for ${formattedSubject} interview preparation.`,
    path: `/subjects/${subject}/test/output/${params}/${subtopicName}`,
    keywords: [
      `${formattedSubject} output questions`,
      `${decodedSubtopicName} quiz`,
      `${formattedSubject} code output`,
      `${formattedSubject} execution`,
      "code output quiz",
      "programming output test",
    ],
  });
}

export default async function OutputTestPage({
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
