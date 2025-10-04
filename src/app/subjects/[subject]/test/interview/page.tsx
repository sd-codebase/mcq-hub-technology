import TestContent from "./TestContent";

export default async function InterviewTestPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <TestContent subject={subject} />;
}
