import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Test from "@/models/Test";
import MCQQuestion from "@/models/MCQQuestion";
import OutputQuestion from "@/models/OutputQuestion";
import InterviewQuestion from "@/models/InterviewQuestion";
import mongoose from "mongoose";

export async function GET(
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

    // Fetch test document
    const test = await Test.findById(testId);

    if (!test) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    // Fetch all questions using the questionIds array based on question type
    let questions: any[];

    switch (test.questionType) {
      case "mcq":
        questions = await MCQQuestion.find({
          _id: { $in: test.questionIds },
        });
        break;
      case "output":
        questions = await OutputQuestion.find({
          _id: { $in: test.questionIds },
        });
        break;
      case "interview":
        questions = await InterviewQuestion.find({
          _id: { $in: test.questionIds },
        });
        break;
      default:
        return NextResponse.json(
          { success: false, message: "Invalid question type in test" },
          { status: 500 }
        );
    }

    // Create a map for quick lookup and maintain order
    const questionMap = new Map();
    questions.forEach((q) => {
      questionMap.set(q._id.toString(), q);
    });

    // Maintain the order from questionIds array
    const orderedQuestions = test.questionIds
      .map((id) => questionMap.get(id.toString()))
      .filter((q) => q !== undefined); // Filter out any deleted questions

    // Prepare response
    const response = {
      _id: test._id,
      subjectName: test.subjectName,
      topicName: test.topicName,
      subtopicName: test.subtopicName,
      subtopicId: test.subtopicId,
      questionType: test.questionType,
      testName: test.testName,
      createdAt: test.createdAt,
      socialMediaContent: test.socialMediaContent || null,
      questions: orderedQuestions,
      questionCount: orderedQuestions.length,
    };

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching test details:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch test details" },
      { status: 500 }
    );
  }
}
