import type { ToolSet } from "ai";
import { getDateTime } from "./get-date-time.ts";
import { webSearch } from "./archive.ts";

export const tools: ToolSet = {
  getDateTime,
  webSearch,
};
