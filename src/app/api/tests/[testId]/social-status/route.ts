import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Test from "@/models/Test";
import mongoose from "mongoose";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    await connectDB();

    const { testId } = await params;

    // Validate testId format
    if (!mongoose.Types.ObjectId.isValid(testId)) {
      return NextResponse.json(
        { success: false, message: "Invalid testId format" },
        { status: 400 }
      );
    }

    // Find and update the test
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { socialMediaStatus: "published" },
      { new: true }
    );

    // Check if test exists
    if (!updatedTest) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    // Return updated test data
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updatedTest._id,
          testName: updatedTest.testName,
          subjectName: updatedTest.subjectName,
          topicName: updatedTest.topicName,
          subtopicName: updatedTest.subtopicName,
          questionType: updatedTest.questionType,
          socialMediaStatus: updatedTest.socialMediaStatus,
          updatedAt: updatedTest.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating test social media status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update test" },
      { status: 500 }
    );
  }
}
