import "dotenv/config";
import axios from "axios";

const HF_API = process.env.HF_API as string;
const HF_TOKEN = process.env.HF_TOKEN;

export async function askHFAI(data:any) {
  try {
    const response = await axios.post(HF_API, data, {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err:any) {
    console.error("HF AI ERROR:", err.response?.data || err.message)
  }
}
