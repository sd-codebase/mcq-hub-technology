import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SocialMediaPublishing from "@/models/SocialMediaPublishing";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  await dbConnect();
  const { testId } = await params;

  try {
    let data = await SocialMediaPublishing.findOne({ testId });

    // If no data exists, create empty record
    if (!data) {
      data = await SocialMediaPublishing.create({
        testId,
        socialMediaData: { fb: "", ig: "", yt: "", li: "", wa: "" },
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching social media publishing data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  await dbConnect();
  const { testId } = await params;

  try {
    const body = await request.json();
    const { socialMediaData } = body;

    // Upsert: update if exists, create if doesn't
    const data = await SocialMediaPublishing.findOneAndUpdate(
      { testId },
      { socialMediaData },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error updating social media publishing data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update data" },
      { status: 500 }
    );
  }
}
