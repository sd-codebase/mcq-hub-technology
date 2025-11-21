import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/Test";
import { validateSocialMediaContent } from "@/utils/validateSocialMediaContent";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;

    // Validate testId format
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return NextResponse.json(
        { success: false, message: "Invalid test ID" },
        { status: 400 }
      );
    }

    // Fetch test with socialMediaContent
    const test = await Test.findById(testId).select(
      "-questionIds"
    );

    if (!test) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: test._id,
          socialMediaContent: test.socialMediaContent || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching social media content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch social media content" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const { testId } = await params;
    const body = await request.json();
    const { socialMediaContent } = body;

    // Validate testId format
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return NextResponse.json(
        { success: false, message: "Invalid test ID" },
        { status: 400 }
      );
    }

    // Validate socialMediaContent is provided
    if (!socialMediaContent) {
      return NextResponse.json(
        { success: false, message: "socialMediaContent is required" },
        { status: 400 }
      );
    }

    // Note: Validation is done on the client side before API call
    // The fields thumbnail_text, hooks, and cta_pack are converted from arrays to strings
    // on the client, so we skip array validation here

    // Update test with socialMediaContent using native MongoDB driver
    const db = mongoose.connection.db;
    if (!db) {
      return NextResponse.json(
        { success: false, message: "Database connection failed" },
        { status: 500 }
      );
    }
    const testsCollection = db.collection("tests");

    const updateResult = await testsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(testId) },
      { $set: { socialMediaContent } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    // Fetch the updated document
    const updatedDoc = await testsCollection.findOne({
      _id: new mongoose.Types.ObjectId(testId),
    });

    if (!updatedDoc) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch updated document" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Social media content updated successfully",
        data: {
          _id: updatedDoc._id,
          socialMediaContent: updatedDoc.socialMediaContent,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating social media content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update social media content" },
      { status: 500 }
    );
  }
}
