import mongoose, { Schema, Model } from "mongoose";

export interface IInterviewQuestion {
  topicId: string;
  question: string;
  answer: string;
  explanation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const InterviewQuestionSchema = new Schema<IInterviewQuestion>(
  {
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate questions within the same topic
InterviewQuestionSchema.index({ question: 1, topicId: 1 }, { unique: true });

const InterviewQuestion: Model<IInterviewQuestion> =
  mongoose.models.InterviewQuestion ||
  mongoose.model<IInterviewQuestion>(
    "InterviewQuestion",
    InterviewQuestionSchema
  );

export default InterviewQuestion;
