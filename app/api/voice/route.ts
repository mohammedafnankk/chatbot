import { NextResponse } from "next/server";
import { askGROQVoice } from "@/utils/groq.util";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const transcription = await askGROQVoice(file);

    return NextResponse.json({ success: true, transcription });
  } catch (error) {
    console.error("Voice API Error:", error);
    return NextResponse.json(
      { success: false, error: `Voice error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}