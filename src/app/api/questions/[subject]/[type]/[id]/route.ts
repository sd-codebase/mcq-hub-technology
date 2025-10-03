import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subject: string; type: string; id: string }> }
) {
  try {
    const { subject, type, id } = await params;

    // Get the base URL from environment variables or default to localhost
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";

    // Ensure the URL has the correct protocol
    const url = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;

    // Construct the URL to the JSON file
    const fileUrl = `${url}/data/${subject}/${type}/${id}.json`;

    // Fetch the JSON file
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching question data:", error);
    return NextResponse.json(
      { error: "Failed to fetch question data" },
      { status: 404 }
    );
  }
}
