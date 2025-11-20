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

    console.log(`Attempting to update test ID: ${testId}`);

    // First, check if the test exists
    const existingTest = await Test.findById(testId);
    console.log(`Found existing test:`, existingTest ? "Yes" : "No");
    console.log(`Existing test data:`, {
      id: existingTest?._id,
      name: existingTest?.testName,
      currentStatus: existingTest?.socialMediaStatus,
    });

    if (!existingTest) {
      console.log(`Test not found for ID: ${testId}`);
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

    console.log(`Update completed`, {
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
    });

    // Fetch the updated document directly from MongoDB
    const updatedDoc = await testsCollection.findOne({
      _id: new mongoose.Types.ObjectId(testId),
    });

    console.log(`Updated document from DB:`, {
      id: updatedDoc?._id,
      name: updatedDoc?.testName,
      status: updatedDoc?.socialMediaStatus,
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
