import TopicsList from "../components/TopicsList";

export default function Home() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-3xl mx-auto p-4">
      <TopicsList />
    </div>
  );
}
