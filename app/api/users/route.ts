import { db } from "@/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";

export async function GET() {
    const allUsers = await db.select().from(usersTable);
    return NextResponse.json(allUsers)
}

export async function POST(req:Request) {
    const body = await req.json();

    const created = await db.insert(usersTable).values({
        googleId:body.googleId,
        name:body.name,
        email:body.email,
        age:body.age,
    }).returning();
    return NextResponse.json(created[0]);
}