import { NextResponse } from "next/server";
import { askGROQAI } from "@/utils/groq.util";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: "messages array is required" },
        { status: 400 }
      );
    }
    const response = await askGROQAI(messages);
    return NextResponse.json({ success: true, message: response });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Chat error: ${error}` },
      { status: 500 }
    );
  }
}

