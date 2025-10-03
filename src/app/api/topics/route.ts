import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || "";
    const subject = process.env.NEXT_PUBLIC_SUBJECT;
    // const url = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
    // Always fetch topics.json for the subject
    const apiUrl = `${baseUrl}/data/${subject}/topics.json`;
    const resp = await fetch(apiUrl);
    if (!resp.ok) throw new Error("Failed to fetch topics file");
    const data = await resp.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to load topics" },
      { status: 500 }
    );
  }
}
