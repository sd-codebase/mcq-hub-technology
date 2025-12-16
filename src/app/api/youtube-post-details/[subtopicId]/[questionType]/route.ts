import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import YoutubePostDetails from "@/models/YoutubePostDetails";

// GET: Fetch existing YouTube post details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ subtopicId: string; questionType: string }> }
) {
  await connectDB();
  const { subtopicId, questionType } = await params;

  try {
    // Validate questionType
    const validTypes = ["mcq", "output", "interview"];
    if (!validTypes.includes(questionType)) {
      return NextResponse.json(
        { success: false, error: "Invalid question type" },
        { status: 400 }
      );
    }

    // Find existing record
    let data = await YoutubePostDetails.findOne({ subtopicId, questionType });

    // If no data exists, return empty structure (don't create yet)
    if (!data) {
      return NextResponse.json({
        success: true,
        data: {
          subtopicId,
          questionType,
          title: "",
          description: "",
          tags: [],
          pinned_comment: "",
          playlist_name: "",
        },
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching YouTube post details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// PUT: Save/update YouTube post details (upsert)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ subtopicId: string; questionType: string }> }
) {
  await connectDB();
  const { subtopicId, questionType } = await params;

  try {
    const body = await request.json();
    const { title, description, tags, pinned_comment, playlist_name } = body;

    // Validate questionType
    const validTypes = ["mcq", "output", "interview"];
    if (!validTypes.includes(questionType)) {
      return NextResponse.json(
        { success: false, error: "Invalid question type" },
        { status: 400 }
      );
    }

    // Validate tags is array if provided
    if (tags && !Array.isArray(tags)) {
      return NextResponse.json(
        { success: false, error: "Tags must be an array" },
        { status: 400 }
      );
    }

    // Upsert: update if exists, create if doesn't
    const data = await YoutubePostDetails.findOneAndUpdate(
      { subtopicId, questionType },
      {
        title: title || "",
        description: description || "",
        tags: tags || [],
        pinned_comment: pinned_comment || "",
        playlist_name: playlist_name || "",
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "YouTube post details saved successfully",
      data,
    });
  } catch (error) {
    console.error("Error saving YouTube post details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    );
  }
}
