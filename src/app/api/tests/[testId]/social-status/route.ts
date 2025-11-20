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

    // First, check if the test exists
    const existingTest = await Test.findById(testId);

    if (!existingTest) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    // Use native MongoDB to bypass Mongoose schema caching
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection not available");
    }

    const testsCollection = db.collection("tests");

    // Update using MongoDB
    const updateResult = await testsCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(testId) },
      { $set: { socialMediaStatus: "published" } }
    );

    // Fetch the updated document directly from MongoDB
    const updatedDoc = await testsCollection.findOne({
      _id: new mongoose.Types.ObjectId(testId),
    });

    // Return updated test data
    return NextResponse.json(
      {
        success: true,
        data: {
          _id: updatedDoc?._id,
          testName: updatedDoc?.testName,
          subjectName: updatedDoc?.subjectName,
          topicName: updatedDoc?.topicName,
          subtopicName: updatedDoc?.subtopicName,
          questionType: updatedDoc?.questionType,
          socialMediaStatus: updatedDoc?.socialMediaStatus,
          updatedAt: updatedDoc?.updatedAt,
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
