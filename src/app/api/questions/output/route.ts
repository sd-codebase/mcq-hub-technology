import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OutputQuestion from "@/models/OutputQuestion";
import Subject from "@/models/Subject";

// GET endpoint to fetch Output questions by topicId
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get topicId from query parameters
    const searchParams = request.nextUrl.searchParams;
    const topicId = searchParams.get("topicId");

    if (!topicId) {
      return NextResponse.json(
        { error: "Missing required query parameter: topicId" },
        { status: 400 }
      );
    }

    // Fetch all Output questions for the topicId
    const questions = await OutputQuestion.find({ topicId });

    return NextResponse.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    console.error("Error fetching Output questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch Output questions", details: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint to save Output questions
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.topicId || !body.questions || !Array.isArray(body.questions)) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: topicId and questions (must be an array)",
        },
        { status: 400 }
      );
    }

    const { topicId, questions } = body;

    // Validate topicId exists in Subject collection
    const subjectExists = await Subject.findOne({
      "topics.subtopics.id": topicId,
    });

    if (!subjectExists) {
      return NextResponse.json(
        { error: "Invalid topicId: Topic not found" },
        { status: 404 }
      );
    }

    // Validate question structure
    for (const question of questions) {
      if (!question.question || !question.output || !question.explanation) {
        return NextResponse.json(
          {
            error:
              "Invalid question format. Each question must have: question, output, explanation",
          },
          { status: 400 }
        );
      }
    }

    // Prepare questions with topicId
    const questionsToInsert = questions.map((q: any) => ({
      topicId,
      question: q.question,
      output: q.output,
      explanation: q.explanation,
    }));

    // Insert questions (ordered: false to continue on duplicate errors)
    let savedCount = 0;
    let duplicateCount = 0;

    try {
      const result = await OutputQuestion.insertMany(questionsToInsert, {
        ordered: false,
      });
      savedCount = result.length;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key errors
        savedCount = error.insertedDocs?.length || 0;
        duplicateCount = questions.length - savedCount;
      } else {
        throw error;
      }
    }

    return NextResponse.json(
      {
        success: true,
        saved: savedCount,
        duplicates: duplicateCount,
        total: questions.length,
        message: `Successfully saved ${savedCount} Output questions${
          duplicateCount > 0 ? `, ${duplicateCount} duplicates skipped` : ""
        }`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving Output questions:", error);
    return NextResponse.json(
      { error: "Failed to save Output questions", details: error.message },
      { status: 500 }
    );
  }
}
