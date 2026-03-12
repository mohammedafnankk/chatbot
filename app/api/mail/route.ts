import { NextResponse } from "next/server";
import { transport } from "@/config/mail.config"; // Try using alias first, if not we will use relative path

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields: name, email, and message are required." },
                { status: 400 }
            );
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send the email to yourself
            replyTo: email,
            subject: subject || `New Botix AI contact message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
        };

        // Send email asynchronously so we don't block the UI response
        transport.sendMail(mailOptions).catch((error) => {
            console.error("Error sending email asynchronously:", error);
        });

        return NextResponse.json(
            { success: true, message: "Email sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
