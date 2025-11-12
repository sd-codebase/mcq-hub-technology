import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Test from "@/models/Test";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const subtopicId = searchParams.get("subtopicId");
    const questionType = searchParams.get("questionType");

    if (!subtopicId) {
      return NextResponse.json(
        { success: false, message: "subtopicId is required" },
        { status: 400 }
      );
    }

    // Build query - questionType is optional
    const query: any = { subtopicId };

    if (questionType) {
      if (!["mcq", "output", "interview"].includes(questionType)) {
        return NextResponse.json(
          {
            success: false,
            message: "questionType must be mcq, output, or interview",
          },
          { status: 400 }
        );
      }
      query.questionType = questionType;
    }

    const tests = await Test.find(query).sort({
      createdAt: 1,
    });

    const testsData = tests.map((test) => ({
      _id: test._id,
      testName: test.testName,
      subjectName: test.subjectName,
      topicName: test.topicName,
      subtopicName: test.subtopicName,
      questionType: test.questionType,
      questionCount: test.questionIds.length,
      questionIds: test.questionIds,
      createdAt: test.createdAt,
    }));

    return NextResponse.json(
      {
        success: true,
        count: tests.length,
        data: testsData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tests:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}
