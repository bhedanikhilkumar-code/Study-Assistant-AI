import type { AISettings } from "../domain/types";
import { createMockResponse, simulateTyping } from "./mock";
import { runOpenAiCompatibleChat } from "./openaiCompatible";

export interface ChatRequest {
  systemPrompt?: string;
  history?: Array<{ role: "assistant" | "user"; content: string }>;
  userMessage: string;
}

export interface AIProvider {
  complete(request: ChatRequest): Promise<string>;
  stream?(request: ChatRequest): AsyncGenerator<string, void, void>;
}

export function getAiProvider(settings: AISettings): AIProvider {
  if (settings.provider === "openai-compatible") {
    return {
      async complete(request) {
        const messages: Array<{ role: "system" | "assistant" | "user"; content: string }> = [];
        if (request.systemPrompt) {
          messages.push({ role: "system", content: request.systemPrompt });
        }
        for (const message of request.history ?? []) {
          messages.push(message);
        }
        messages.push({ role: "user", content: request.userMessage });
        return runOpenAiCompatibleChat(settings, messages);
      },
    };
  }

  return {
    async complete(request) {
      return createMockResponse(request.userMessage);
    },
    async *stream(request) {
      const response = createMockResponse(request.userMessage);
      yield* simulateTyping(response, { typingMsPerChunk: 45 });
    },
  };
}
