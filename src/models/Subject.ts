import mongoose, { Schema, Model } from "mongoose";

export interface ISubtopic {
  id: string;
  name: string;
}

export interface ITopic {
  name: string;
  subtopics: ISubtopic[];
}

export interface ISubject {
  name: string;
  topics: ITopic[];
  createdAt?: Date;
  updatedAt?: Date;
}

const SubtopicSchema = new Schema<ISubtopic>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const TopicSchema = new Schema<ITopic>(
  {
    name: {
      type: String,
      required: true,
    },
    subtopics: [SubtopicSchema],
  },
  { _id: false }
);

const SubjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    topics: [TopicSchema],
  },
  {
    timestamps: true,
  }
);

const Subject: Model<ISubject> =
  mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
