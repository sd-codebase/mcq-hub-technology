import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subject from "@/models/Subject";
import SubjectMetadata from "@/models/SubjectMetadata";
import Test from "@/models/Test";

interface SubtopicGroup {
  [subtopicId: string]: {
    subtopicName: string;
    tests: any[];
  };
}

interface TopicGroup {
  [topicName: string]: {
    name: string;
    subtopics: SubtopicGroup;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortname: string }> }
) {
  try {
    await connectDB();

    const { shortname } = await params;

    if (!shortname) {
      return NextResponse.json(
        { success: false, message: "shortname is required" },
        { status: 400 }
      );
    }

    // Find metadata by shortname to get the actual subject name
    const metadata = await SubjectMetadata.findOne({ shortName: shortname });

    if (!metadata) {
      return NextResponse.json(
        { success: false, message: "Subject not found" },
        { status: 404 }
      );
    }

    // Fetch the subject by name to get topics and subtopics structure
    const subject = await Subject.findOne({ name: metadata.name });

    if (!subject) {
      return NextResponse.json(
        { success: false, message: "Subject data not found" },
        { status: 404 }
      );
    }

    // Fetch all published tests for this subject
    const publishedTests = await Test.find({
      subjectName: metadata.name,
      socialMediaStatus: "published",
    }).sort({ createdAt: 1 });

    // Group tests by topic and subtopic
    const groupedTests: TopicGroup = {};

    // Initialize the structure based on subject topics
    subject.topics.forEach((topic) => {
      groupedTests[topic.name] = {
        name: topic.name,
        subtopics: {},
      };

      topic.subtopics.forEach((subtopic) => {
        groupedTests[topic.name].subtopics[subtopic.id] = {
          subtopicName: subtopic.name,
          tests: [],
        };
      });
    });

    // Add tests to their respective topic and subtopic
    publishedTests.forEach((test) => {
      if (
        groupedTests[test.topicName] &&
        groupedTests[test.topicName].subtopics[test.subtopicId]
      ) {
        groupedTests[test.topicName].subtopics[test.subtopicId].tests.push({
          _id: test._id,
          testName: test.testName,
          questionType: test.questionType,
          subtopicName: test.subtopicName,
          subtopicId: test.subtopicId,
          topicName: test.topicName,
          questionCount: test.questionIds.length,
          createdAt: test.createdAt,
          socialMediaStatus: test.socialMediaStatus,
        });
      }
    });

    // Convert to array format for topics and subtopics
    const responseTopics = subject.topics
      .map((topic) => ({
        name: topic.name,
        subtopics: topic.subtopics
          .map((subtopic) => ({
            id: subtopic.id,
            name: subtopic.name,
            tests: groupedTests[topic.name].subtopics[subtopic.id].tests,
          }))
          .filter((subtopic) => subtopic.tests.length > 0), // Only include subtopics with published tests
      }))
      .filter((topic) => topic.subtopics.length > 0); // Only include topics with published tests

    return NextResponse.json(
      {
        success: true,
        data: {
          name: subject.name,
          topics: responseTopics,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching published tests:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch published tests" },
      { status: 500 }
    );
  }
}
