import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";
import SubjectMetadata from "@/models/SubjectMetadata";

// GET endpoint to fetch subject by shortname
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get shortname from query parameters
    const searchParams = request.nextUrl.searchParams;
    const shortName = searchParams.get("shortname");

    if (!shortName) {
      return NextResponse.json(
        { error: "Missing required query parameter: shortname" },
        { status: 400 }
      );
    }

    // Find metadata by shortName to get the actual subject name
    const metadata = await SubjectMetadata.findOne({ shortName });

    if (!metadata) {
      return NextResponse.json(
        { error: "Subject not found" },
        { status: 404 }
      );
    }

    // Fetch the subject by name
    const subject = await Subject.findOne({ name: metadata.name });

    if (!subject) {
      return NextResponse.json(
        { error: "Subject data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subject,
    });
  } catch (error: any) {
    console.error("Error fetching subject:", error);
    return NextResponse.json(
      { error: "Failed to fetch subject", details: error.message },
      { status: 500 }
    );
  }
}
