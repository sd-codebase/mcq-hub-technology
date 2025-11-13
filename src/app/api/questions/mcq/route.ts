import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import MCQQuestion from "@/models/MCQQuestion";
import Subject from "@/models/Subject";
import Test from "@/models/Test";

// GET endpoint to fetch MCQ questions by topicId
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

    // Fetch all MCQ questions for the topicId
    const questions = await MCQQuestion.find({ topicId });

    return NextResponse.json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    console.error("Error fetching MCQ questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch MCQ questions", details: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint to save MCQ questions
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
      if (
        !question.question ||
        !question.options ||
        !Array.isArray(question.options) ||
        question.correct_answer === undefined ||
        !question.explanation
      ) {
        console.log({ que: question.question });
        return NextResponse.json(
          {
            error:
              "Invalid question format. Each question must have: question, options (array), correct_answer (number), explanation",
          },
          { status: 400 }
        );
      }
    }

    // Prepare questions with topicId
    const questionsToInsert = questions.map((q: any) => ({
      topicId,
      question: q.question,
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
    }));

    // Insert questions (ordered: false to continue on duplicate errors)
    let savedCount = 0;
    let duplicateCount = 0;
    let insertedDocs: any[] = [];
    let duplicateQuestions: string[] = [];

    try {
      const result = await MCQQuestion.insertMany(questionsToInsert, {
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

        // Identify which questions are duplicates
        const savedQuestionTexts = new Set(
          insertedDocs.map((doc: any) => doc.question)
        );
        duplicateQuestions = questionsToInsert
          .filter((q: any) => !savedQuestionTexts.has(q.question))
          .map((q: any) => q.question);
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
          const subtopic = topic.subtopics.find((st: any) => st.id === topicId);
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
          questionType: "mcq",
        });

        // Get question IDs from inserted documents
        const questionIds = insertedDocs.map((doc: any) => doc._id);

        // Group questions into batches of 5
        const batchSize = 5;
        const batches: any[][] = [];
        for (let i = 0; i < questionIds.length; i += batchSize) {
          const batch = questionIds.slice(i, i + batchSize);
          // Create batch regardless of size (even if < 5 questions)
          batches.push(batch);
        }

        // Create test documents for each batch
        const testsToCreate = batches.map((batch, index) => ({
          subjectName,
          topicName,
          subtopicName,
          subtopicId: topicId,
          questionType: "mcq",
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
        duplicateQuestionsList:
          duplicateQuestions.length > 0 ? duplicateQuestions : undefined,
        message: `Successfully saved ${savedCount} MCQ questions${
          duplicateCount > 0 ? `, ${duplicateCount} duplicates skipped` : ""
        }${testsCreated > 0 ? `, ${testsCreated} tests created` : ""}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving MCQ questions:", error);
    return NextResponse.json(
      { error: "Failed to save MCQ questions", details: error.message },
      { status: 500 }
    );
  }
}
