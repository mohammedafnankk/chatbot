import "dotenv/config";
import axios from "axios";


const GROQ_API_URL = process.env.GROQ_API_URL as string;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function askGROQAI(data:any) {
  try {
    const response = await axios.post(GROQ_API_URL, data, {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err:any) {
    console.error("GROQ AI ERROR:", err.response?.data || err.message)
  }
}
