"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { firstName, lastName, email, message } = formData;

        if (!firstName.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`.trim(),
                    email,
                    subject: `New contact message from ${firstName}`,
                    message,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            toast.success("Message sent successfully! We'll get back to you soon.");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to send message.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="space-y-2">
                    <label
                        htmlFor="firstName"
                        className="text-sm font-medium text-foreground"
                    >
                        First Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-background/50 border-white/10"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="lastName"
                        className="text-sm font-medium text-foreground"
                    >
                        Last Name
                    </label>
                    <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-background/50 border-white/10"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                >
                    Email Address <span className="text-red-400">*</span>
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background/50 border-white/10"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                >
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="message"
                    rows={4}
                    className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-white/10"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                />
            </div>

            <Magnetic>
                <Button
                    type="submit"
                    variant="gradient"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            Sending...
                            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </Magnetic>
        </form>
    );
}
