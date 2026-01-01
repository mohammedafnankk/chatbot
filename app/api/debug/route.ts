import "dotenv/config";
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    DB: process.env.DATABASE_URL,
    BAC: process.env.BETTER_AUTH_SECRET,
    BAU: process.env.BETTER_AUTH_URL,
    G: process.env.GOOGLE_CLIENT_ID,
    GS: process.env.GOOGLE_CLIENT_SECRET,
    GAK: process.env.GROQ_API_KEY,
    GAU: process.env.GROQ_API_URL,
    N: process.env.NEXT_PUBLIC_APP_URL,
    NO: process.env.NODE_ENV,
  });
}
