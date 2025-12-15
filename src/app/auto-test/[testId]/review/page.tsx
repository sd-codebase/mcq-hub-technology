import { Metadata } from "next";
import AdminReviewTestContent from "@/components/AdminReviewTestContent";
import { RestrictedAccess } from "@/components/RestrictedAccess";

export const metadata: Metadata = {
  title: "Review Test - Quizzy Dock",
  description:
    "Review all test questions and answers before starting the auto test",
};

async function fetchTestData(testId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;

  try {
    const response = await fetch(`${baseUrl}/api/tests/${testId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch test data");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching test:", error);
    return null;
  }
}

export default async function ReviewTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  if (process.env.NEXT_PUBLIC_ACTOR_MODE !== "ADMIN") {
    return <RestrictedAccess />;
  }
  const { testId } = await params;
  const testData = await fetchTestData(testId);

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Test Not Found</h1>
          <p className="text-gray-400">
            Unable to load test data. Please check the test ID and try again.
          </p>
        </div>
      </div>
    );
  }

  return <AdminReviewTestContent testData={testData} />;
}
