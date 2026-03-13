"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bot, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Magnetic } from "@/components/ui/magnetic";
import { Footer } from "@/components/layout/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token || !email) {
      toast.error("Invalid reset link. Missing token or email.");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !email) {
      toast.error("Invalid reset link");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        token,
        email,
        password,
      });
      
      if (res.data.success) {
        setIsSuccess(true);
        toast.success("Password reset successful!");
        setTimeout(() => {
          router.push("/auth");
        }, 3000);
      } else {
        toast.error(res.data.error || "Failed to reset password");
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 shadow-card">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Reset password
      </h2>
      <p className="text-muted-foreground mb-8">
        {isSuccess
          ? "Your password has been successfully reset. You will be redirected to the login page shortly."
          : "Enter your new password below to reset your account access."}
      </p>

      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-12"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-12"
              required
            />
          </div>

          <Magnetic>
            <Button
              type="submit"
              variant="gradient"
              className="w-full"
              disabled={isLoading || !token || !email}
            >
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </Magnetic>
        </form>
      ) : (
        <div className="space-y-4">
          <Link href="/auth">
            <Button variant="outline" className="w-full">
              Go to Login
            </Button>
          </Link>
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
  );
}

export default function ResetPasswordPage() {
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
            
            <Suspense fallback={<div className="glass rounded-2xl p-8 shadow-card text-center">Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
