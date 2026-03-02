import { db } from "@/db";
import { message } from "@/db/schema";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { eq, asc } from "drizzle-orm";

export async function POST(req: Request) {
    try {
        const { conversationId, content, role } = await req.json();
        if (!conversationId || !content || !role) {
            return NextResponse.json(
                { success: false, error: "conversationId, content, and role are required" },
                { status: 400 }
            );
        }
        const id = randomUUID();
        await db.insert(message).values({
            id,
            conversationId,
            content,
            role,
        });
        const [savedMessage] = await db
            .select()
            .from(message)
            .where(eq(message.id, id));
        return NextResponse.json({ success: true, data: savedMessage });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: `Failed to save message: ${error}` },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get("conversationId");
        if (!conversationId) {
            return NextResponse.json(
                { success: false, error: "conversationId is required" },
                { status: 400 }
            );
        }
        const messages = await db
            .select()
            .from(message)
            .where(eq(message.conversationId, conversationId))
            .orderBy(asc(message.createdAt));
        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: `Failed to fetch messages: ${error}` },
            { status: 500 }
        );
    }
}
