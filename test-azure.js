import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_KEY,
  baseURL: process.env.AZURE_OPENAI_ENDPOINT + "/openai/deployments/gpt-4o",
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_KEY
  }
});

async function run() {
  try {
    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: "Hello from Azure!" }]
    });

    console.log("Azure response:", response.choices[0].message);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();