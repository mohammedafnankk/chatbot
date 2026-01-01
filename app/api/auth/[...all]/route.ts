// app/api/auth/[...all]/route.ts
export const runtime = 'nodejs';
import { auth } from "@/lib/auth";

// Better Auth handler is already a unified function
const handler = auth.handler;

export async function GET(request: Request) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}

export async function POST(request: Request) {
  const response = await handler(request);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}