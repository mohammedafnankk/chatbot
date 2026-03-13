import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { token, email, password } = await req.json();

        if (!token || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Find the token in the database
        const storedToken = await db.query.verificationTokens.findFirst({
            where: and(
                eq(verificationTokens.identifier, email),
                eq(verificationTokens.token, token)
            ),
        });

        if (!storedToken) {
            return NextResponse.json(
                { error: "Invalid or expired reset link" },
                { status: 400 }
            );
        }

        // Check if token has expired
        if (new Date() > storedToken.expires) {
            // Delete expired token
            await db.delete(verificationTokens).where(
                and(
                    eq(verificationTokens.identifier, email),
                    eq(verificationTokens.token, token)
                )
            );
            return NextResponse.json(
                { error: "Reset link has expired" },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await db.update(users)
            .set({ password: hashedPassword })
            .where(eq(users.email, email));

        // Delete the used token
        await db.delete(verificationTokens).where(
            and(
                eq(verificationTokens.identifier, email),
                eq(verificationTokens.token, token)
            )
        );

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
