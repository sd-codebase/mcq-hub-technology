import mongoose, { Schema, Model } from "mongoose";

export interface IOutputQuestion {
  topicId: string;
  question: string;
  output: string;
  explanation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OutputQuestionSchema = new Schema<IOutputQuestion>(
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
    output: {
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
OutputQuestionSchema.index({ question: 1, topicId: 1 }, { unique: true });

const OutputQuestion: Model<IOutputQuestion> =
  mongoose.models.OutputQuestion ||
  mongoose.model<IOutputQuestion>("OutputQuestion", OutputQuestionSchema);

export default OutputQuestion;
