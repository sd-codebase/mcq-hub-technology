import TestContent from "./TestContent";

export default async function OutputTestPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  return <TestContent subject={subject} />;
}
