// lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!, // Required
  basePath: "/api/auth",
  
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
  
  trustedOrigins: ["https://nexus-ai-agent.vercel.app"],
  
  // Critical for Vercel
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});