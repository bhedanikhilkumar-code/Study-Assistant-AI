export interface MockAiResponseOptions {
  typingMsPerChunk?: number;
  maxChunkSize?: number;
}

const cannedResponses = [
  "Let's break this into smaller study steps and prioritize what matters most.",
  "Great question. Start with the core concept, then test yourself with one recall prompt.",
  "A useful approach is active recall: close your notes and explain the idea in your own words.",
];

export function createMockResponse(prompt: string): string {
  if (prompt.toLowerCase().includes("quiz")) {
    return "Sure! Quick quiz: What are the three stages of cellular respiration?";
  }
  return cannedResponses[prompt.length % cannedResponses.length];
}

export async function* simulateTyping(
  content: string,
  options: MockAiResponseOptions = {},
): AsyncGenerator<string, void, void> {
  const size = options.maxChunkSize ?? 20;
  const delay = options.typingMsPerChunk ?? 45;

  for (let i = 0; i < content.length; i += size) {
    const chunk = content.slice(i, i + size);
    yield chunk;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
