import TestContent from "./TestContent";

export default async function McqTestPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <TestContent subject={subject} />;
}
