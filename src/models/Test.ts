import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITest extends Document {
  subjectName: string;
  topicName: string;
  subtopicName: string;
  subtopicId: string;
  questionType: "mcq" | "output" | "interview";
  testName: string;
  questionIds: mongoose.Types.ObjectId[];
  socialMediaStatus?: "published" | "unpublished";
  createdAt: Date;
  updatedAt: Date;
}

const TestSchema = new Schema<ITest>(
  {
    subjectName: {
      type: String,
      required: true,
    },
    topicName: {
      type: String,
      required: true,
    },
    subtopicName: {
      type: String,
      required: true,
    },
    subtopicId: {
      type: String,
      required: true,
      index: true,
    },
    questionType: {
      type: String,
      enum: ["mcq", "output", "interview"],
      required: true,
      index: true,
    },
    testName: {
      type: String,
      required: true,
    },
    questionIds: {
      type: [Schema.Types.ObjectId],
      required: true,
      default: [],
    },
    socialMediaStatus: {
      type: String,
      enum: ["published", "unpublished"],
      default: "unpublished",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries by subtopic and question type
TestSchema.index({ subtopicId: 1, questionType: 1 });

// Ensure socialMediaStatus field is accessible on the schema
TestSchema.set("toJSON", { virtuals: true });
TestSchema.set("toObject", { virtuals: true });

const Test: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);

export default Test;
