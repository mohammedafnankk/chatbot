// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const handler = auth.handler;

export {
  handler as GET,
  handler as POST,
  handler as OPTIONS, //  REQUIRED FOR PRODUCTION
};
