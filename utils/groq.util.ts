import "dotenv/config";
import axios from "axios";

const GROQ_API_URL = process.env.GROQ_API_URL as string;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function askGROQAI(messages: ChatMessage[]) {
  const body = {
    messages,
    model: "openai/gpt-oss-120b",
    temperature: 1,
    max_completion_tokens: 8192,
    top_p: 1,
    reasoning_effort: "medium",
    stop: null,
  };
  try {
    const response = await axios.post(GROQ_API_URL, body, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.choices[0].message.content as string;
  } catch (err: any) {
    console.error("GROQ AI ERROR:", err.response?.data || err.message);
    throw new Error("Failed to get AI response");
  }
}

