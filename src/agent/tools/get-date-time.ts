import { tool } from "ai";
import z from "zod";

export const getDateTime = tool({
  description: "Get the current date and time.",
  inputSchema: z.object({}),
  execute: async () => {
    const now = new Date();

    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const timezoneSign = offsetHours >= 0 ? "+" : "";
    return {
      date: now.toISOString().split("T")[0], // YYYY-MM-DD
      time: now.toTimeString().split(" ")[0], // HH:MM:SS
      timezone: `${timezoneSign}${Math.abs(offsetHours).toString().padStart(2, "0")}:00`,
    };
  },
});
