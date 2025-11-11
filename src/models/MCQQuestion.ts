import mongoose, { Schema, Model } from "mongoose";

export interface IMCQQuestion {
  topicId: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MCQQuestionSchema = new Schema<IMCQQuestion>(
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
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr: string[]) {
          return arr.length >= 2;
        },
        message: "Options must have at least 2 items",
      },
    },
    correct_answer: {
      type: Number,
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
MCQQuestionSchema.index({ question: 1, topicId: 1 }, { unique: true });

const MCQQuestion: Model<IMCQQuestion> =
  mongoose.models.MCQQuestion ||
  mongoose.model<IMCQQuestion>("MCQQuestion", MCQQuestionSchema);

export default MCQQuestion;
