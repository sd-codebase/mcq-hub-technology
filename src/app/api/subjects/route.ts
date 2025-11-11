import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SubjectMetadata from "@/models/SubjectMetadata";
import Subject from "@/models/Subject";
import { v4 as uuidv4 } from "uuid";

// GET endpoint to fetch all subject metadata sorted by order
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all metadata sorted by order
    const metadataList = await SubjectMetadata.find().sort({ order: 1 });

    return NextResponse.json({
      success: true,
      count: metadataList.length,
      data: metadataList,
    });
  } catch (error: any) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects", details: error.message },
      { status: 500 }
    );
  }
}

// POST endpoint to save subject
export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.subject || !body.topics) {
      return NextResponse.json(
        { error: "Missing required fields: subject and topics" },
        { status: 400 }
      );
    }

    const { subject, topics } = body;

    // Create shortName (lowercase version of subject name)
    const shortName = subject.toLowerCase().replace(/\s+/g, "-");

    // Transform topics data and generate UUIDs for subtopics
    const transformedTopics = topics.map((topic: any) => ({
      name: topic.topic,
      subtopics: topic.subtopics.map((subtopic: any) => ({
        id: uuidv4(),
        name: subtopic.name,
      })),
    }));

    // Calculate total number of subtopics for questions count
    const totalSubtopics = transformedTopics.reduce(
      (acc: number, topic: any) => acc + topic.subtopics.length,
      0
    );

    // Auto-calculate order field
    const maxOrderDoc = await SubjectMetadata.findOne().sort({ order: -1 }).limit(1);
    const nextOrder = maxOrderDoc ? maxOrderDoc.order + 1 : 1;

    // Create metadata entry
    const metadataData = {
      name: subject,
      shortName: shortName,
      questions: "0", // Default to "0", can be updated later
      order: nextOrder,
    };

    // Create subject entry
    const subjectData = {
      name: subject,
      topics: transformedTopics,
    };

    // Save to database using upsert (update if exists, insert if not)
    const metadata = await SubjectMetadata.findOneAndUpdate(
      { name: subject },
      metadataData,
      { upsert: true, new: true }
    );

    const subjectDoc = await Subject.findOneAndUpdate(
      { name: subject },
      subjectData,
      { upsert: true, new: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Subject saved successfully",
        data: {
          metadata: {
            id: metadata._id,
            name: metadata.name,
            shortName: metadata.shortName,
            questions: metadata.questions,
            order: metadata.order,
          },
          subject: {
            id: subjectDoc._id,
            name: subjectDoc.name,
            topicsCount: subjectDoc.topics.length,
            subtopicsCount: totalSubtopics,
          },
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saving subject:", error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Subject with this name already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save subject", details: error.message },
      { status: 500 }
    );
  }
}
