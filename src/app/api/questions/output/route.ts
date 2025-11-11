import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OutputQuestion from "@/models/OutputQuestion";
import Subject from "@/models/Subject";
import Test from "@/models/Test";

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
    let insertedDocs: any[] = [];

    try {
      const result = await OutputQuestion.insertMany(questionsToInsert, {
        ordered: false,
      });
      savedCount = result.length;
      insertedDocs = result;
    } catch (error: any) {
      if (error.code === 11000) {
        // Handle duplicate key errors
        insertedDocs = error.insertedDocs || [];
        savedCount = insertedDocs.length;
        duplicateCount = questions.length - savedCount;
      } else {
        throw error;
      }
    }

    // Create tests from inserted questions
    let testsCreated = 0;
    if (savedCount >= 5) {
      try {
        // Extract subject, topic, and subtopic metadata
        let subjectName = "";
        let topicName = "";
        let subtopicName = "";

        for (const topic of subjectExists.topics) {
          const subtopic = topic.subtopics.find(
            (st: any) => st.id === topicId
          );
          if (subtopic) {
            subjectName = subjectExists.name;
            topicName = topic.name;
            subtopicName = subtopic.name;
            break;
          }
        }

        // Get existing test count to determine next test number
        const existingTestCount = await Test.countDocuments({
          subtopicId: topicId,
          questionType: "output",
        });

        // Get question IDs from inserted documents
        const questionIds = insertedDocs.map((doc: any) => doc._id);

        // Group questions into batches of 5
        const batchSize = 5;
        const batches: any[][] = [];
        for (let i = 0; i < questionIds.length; i += batchSize) {
          const batch = questionIds.slice(i, i + batchSize);
          if (batch.length === batchSize) {
            batches.push(batch);
          }
        }

        // Create test documents for each batch
        const testsToCreate = batches.map((batch, index) => ({
          subjectName,
          topicName,
          subtopicName,
          subtopicId: topicId,
          questionType: "output",
          testName: `Part ${existingTestCount + index + 1}`,
          questionIds: batch,
        }));

        if (testsToCreate.length > 0) {
          const createdTests = await Test.insertMany(testsToCreate);
          testsCreated = createdTests.length;
        }
      } catch (testError) {
        console.error("Error creating tests:", testError);
        // Continue even if test creation fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        saved: savedCount,
        duplicates: duplicateCount,
        total: questions.length,
        testsCreated,
        message: `Successfully saved ${savedCount} Output questions${
          duplicateCount > 0 ? `, ${duplicateCount} duplicates skipped` : ""
        }${testsCreated > 0 ? `, ${testsCreated} tests created` : ""}`,
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
