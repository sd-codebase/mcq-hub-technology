import mongoose, { Schema, Model } from "mongoose";

export interface ISocialMediaPublishing {
  testId: string;
  socialMediaData: {
    fb?: string;      // Facebook link
    ig?: string;      // Instagram link
    yt?: string;      // YouTube Shorts link
    li?: string;      // LinkedIn link
    wa?: string;      // WhatsApp link
  };
  createdAt: Date;
  updatedAt: Date;
}

const SocialMediaPublishingSchema = new Schema<ISocialMediaPublishing>(
  {
    testId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    socialMediaData: {
      fb: { type: String, default: "" },
      ig: { type: String, default: "" },
      yt: { type: String, default: "" },
      li: { type: String, default: "" },
      wa: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const SocialMediaPublishing: Model<ISocialMediaPublishing> =
  mongoose.models.SocialMediaPublishing ||
  mongoose.model<ISocialMediaPublishing>("SocialMediaPublishing", SocialMediaPublishingSchema);

export default SocialMediaPublishing;
