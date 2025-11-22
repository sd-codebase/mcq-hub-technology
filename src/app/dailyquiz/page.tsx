import { Metadata } from "next";
import DailyQuizSubjects from "@/components/DailyQuizSubjects";

export const metadata: Metadata = {
  title: "Daily Quiz - Choose Your Subject",
  description: "Select a subject and start your daily quiz challenge",
};

export default function DailyQuizPage() {
  return <DailyQuizSubjects />;
}
