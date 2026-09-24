export function getToolCallsFromSteps(steps: any) {
  const toolCalls: { toolName: string; input: Record<string, unknown> }[] = [];
  const toolResults: { toolName: string; output: unknown }[] = [];
  for (const step of steps) {
    for (const toolCall of step.toolCalls) {
      toolCalls.push({
        toolName: toolCall.toolName,
        input: toolCall.input,
      });
    }

    if (step.toolResults.length > 0) {
      for (const toolResult of step.toolResults) {
        toolResults.push({
          toolName: toolResult.toolName,
          output: toolResult.output,
        });
      }
    }
  }
  return { toolCalls, toolResults };
}
