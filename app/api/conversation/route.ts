import { db } from "@/db";
import { conversation } from "@/db/schema";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId, title } = await req.json();
    if (!userId && !title) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    await db.insert(conversation).values({
      id: randomUUID(),
      userId,
      title,
    });
    return NextResponse.json({ message: "Conversation created successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to create conversation ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }
    const conversations = await db
      .select()
      .from(conversation)
      .where(eq(conversation.userId, userId));
    return NextResponse.json({ success: true, data: { conversations } });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to create conversation ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "Conversation ID is required" },
        { status: 400 }
      );
    }
    await db.delete(conversation).where(eq(conversation.id, conversationId));
    return NextResponse.json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: `Failed to delete conversation ${error}` },
      { status: 500 }
    );
  }
}
