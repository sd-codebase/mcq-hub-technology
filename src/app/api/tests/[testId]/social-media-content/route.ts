import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Test from "@/models/Test";
import { validateSocialMediaContent } from "@/utils/validateSocialMediaContent";

export async function GET(
  request: NextRequest,
  { params }: { params: { testId: string } }
) {
  try {
    const testId = params.testId;

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
  { params }: { params: { testId: string } }
) {
  try {
    const testId = params.testId;
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

    // Convert to JSON string for validation
    const jsonString = JSON.stringify(socialMediaContent);
    const validation = validateSocialMediaContent(jsonString);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid social media content",
          errors: validation.errors,
          missingFields: validation.missingFields,
        },
        { status: 400 }
      );
    }

    // Update test with socialMediaContent using native MongoDB driver
    const db = mongoose.connection.db;
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
