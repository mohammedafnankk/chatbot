import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { transport } from "@/config/mail.config";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        if (!user || user === undefined) {
            // For security reasons, don't reveal if the user exists or not
            return NextResponse.json({ success: false, message: "Account not found" });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        // Store the token in the database
        // verificationTokens uses identifier and token as compound key
        await db.insert(verificationTokens).values({
            identifier: email,
            token: token,
            expires: expires,
        });

        const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset Request - Xenbot AI",
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your Xenbot AI account. Click the button below to reset it:</p>
                    <div style="margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; rounded: 5px; font-weight: bold;">Reset Password</a>
                    </div>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #666;">${resetLink}</p>
                    <p>This link will expire in 1 hour.</p>
                    <p>If you didn't request a password reset, you can safely ignore this email.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #999;">Xenbot AI - Your Intelligent Conversation Partner</p>
                </div>
            `,
        };

        // Send email
        await transport.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "If an account exists with that email, a reset link has been sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
