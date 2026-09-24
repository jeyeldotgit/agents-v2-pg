import "dotenv/config";
import { generateText, stepCountIs, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";

import { SYSTEM_PROMPT } from "./system/prompt.ts";

import type { AgentCallbacks } from "../types.ts";

import { tools } from "./tools/index.ts";
import { getToolCallsFromSteps } from "../utils/tool-calls-result.ts";

import { getTracer, Laminar } from "@lmnr-ai/lmnr";
import { filterCompatibleMessages } from "./system/filterMessages.ts";

Laminar.initialize({
  projectApiKey: process.env.LMNR_PROJECT_API_KEY,
});
const MODEL = "gpt-5-mini";

export async function runAgent(
  userMessage: string,
  conversationHistory?: ModelMessage[],
  callbacks?: AgentCallbacks,
): Promise<any> {
  const output = await generateText({
    model: openai(MODEL),
    messages: [],
    system: SYSTEM_PROMPT,
    tools,
    stopWhen: stepCountIs(3),
    experimental_telemetry: {
      isEnabled: true,
      tracer: getTracer(),
    },
  });
}
