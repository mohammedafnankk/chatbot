import { NextResponse } from "next/server";
import { askHFAI } from "@/utils/huggingface.util";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const response = await askHFAI(data);
    return NextResponse.json({ success: true, message: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
