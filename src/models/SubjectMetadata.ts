import mongoose, { Schema, Model } from "mongoose";

export interface ISubjectMetadata {
  name: string;
  shortName: string;
  questions: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubjectMetadataSchema = new Schema<ISubjectMetadata>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },
    questions: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubjectMetadata: Model<ISubjectMetadata> =
  mongoose.models.SubjectMetadata ||
  mongoose.model<ISubjectMetadata>("SubjectMetadata", SubjectMetadataSchema);

export default SubjectMetadata;
