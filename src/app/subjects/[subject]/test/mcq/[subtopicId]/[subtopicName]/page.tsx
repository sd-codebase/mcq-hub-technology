import TestContent from "./TestContent";

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
