import { Metadata } from "next";
import DailyQuizContent from "@/components/DailyQuizContent";

export const metadata: Metadata = {
  title: "Daily Quiz - Quizzy Dock",
  description: "Daily quiz practice with organized tests by topics and subtopics",
};

export default async function DailyQuizPage({
  params,
}: {
  params: Promise<{ shortname: string }>;
}) {
  const { shortname } = await params;

  return <DailyQuizContent shortname={shortname} />;
}
