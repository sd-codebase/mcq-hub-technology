import TopicsList from "@/components/TopicsList";

export default async function Topics({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-3xl mx-auto p-4">
      <TopicsList subject={subject} />
    </div>
  );
}
