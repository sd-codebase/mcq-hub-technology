import mongoose, { Schema, Model } from "mongoose";

export interface IYoutubePostDetails {
  subtopicId: string;
  questionType: "mcq" | "output" | "interview";
  title: string;
  description: string;
  tags: string[];
  pinned_comment: string;
  playlist_name: string;
  createdAt: Date;
  updatedAt: Date;
}

const YoutubePostDetailsSchema = new Schema<IYoutubePostDetails>(
  {
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
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    pinned_comment: {
      type: String,
      default: "",
    },
    playlist_name: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index for subtopicId + questionType combination
YoutubePostDetailsSchema.index(
  { subtopicId: 1, questionType: 1 },
  { unique: true }
);

const YoutubePostDetails: Model<IYoutubePostDetails> =
  mongoose.models.YoutubePostDetails ||
  mongoose.model<IYoutubePostDetails>("YoutubePostDetails", YoutubePostDetailsSchema);

export default YoutubePostDetails;
