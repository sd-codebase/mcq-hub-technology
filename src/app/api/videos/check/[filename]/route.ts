import { NextRequest, NextResponse } from "next/server";
import { existsSync } from "fs";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Construct the path to the video file in public/videos
    const videoPath = join(process.cwd(), "public", "videos", `${filename}.mp4`);

    // Check if the file exists
    const exists = existsSync(videoPath);

    return NextResponse.json({
      success: true,
      exists,
      filename: `${filename}.mp4`,
    });
  } catch (error) {
    console.error("Error checking video file:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check video file",
      },
      { status: 500 }
    );
  }
}
