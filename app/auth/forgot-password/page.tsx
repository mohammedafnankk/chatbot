"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bot, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Magnetic } from "@/components/ui/magnetic";
import { Footer } from "@/components/layout/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      if (res.data.success) {
        setIsSubmitted(true);
        toast.success("Reset link sent if account exists");
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="bg-background flex min-h-[calc(100vh-80px)]">
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold gradient-text">XenbotAI</span>
            </div>

            <div className="glass rounded-2xl p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Forgot password?
              </h2>
              <p className="text-muted-foreground mb-8">
                {isSubmitted
                  ? "Check your email for a link to reset your password. If you don't see it, check your spam folder."
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12"
                      required
                    />
                  </div>

                  <Magnetic>
                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                  </Magnetic>
                </form>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Try another email
                  </Button>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border flex justify-center">
                <Link
                  href="/auth"
                  className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
