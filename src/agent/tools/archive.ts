import { tool } from "ai";
import z from "zod";

// Web search tool for the agent
export const webSearch = tool({
  description:
    "Search the web for information on current events and general knowledge.",
  inputSchema: z.object({
    query: z.string().describe("The search query to look up."),
  }),
  execute: async ({ query }: any) => {
    const apiKey = process.env.TAVILY_API_KEY;

    if (!apiKey) {
      throw new Error(
        "TAVILY_API_KEY is not set in the environment variables. Please set it to use the webSearch tool.",
      );
    }
    const res = await fetch(`https://api.tavily.com/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, query }),
    });

    return await res.json();
  },
});
