import mongoose, { Schema, Model } from "mongoose";

export interface ISubjectMetadata {
  name: string;
  shortName: string;
  questions: string;
  order: number;
  status?: "active" | "inactive";
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
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
