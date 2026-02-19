import type { AISettings } from "../domain/types";

interface ChatCompletionMessage {
  role: "system" | "assistant" | "user";
  content: string;
}

interface OpenAiCompatibleConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  temperature: number;
}

function readEnv(name: string): string | undefined {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env;
  return metaEnv?.[name];
}

export function resolveOpenAiCompatibleConfig(settings: AISettings): OpenAiCompatibleConfig {
  const apiKey = settings.apiKey ?? readEnv("VITE_OPENAI_API_KEY") ?? "";
  const baseUrl = settings.baseUrl ?? readEnv("VITE_OPENAI_BASE_URL") ?? "https://api.openai.com/v1";
  const model = settings.model ?? readEnv("VITE_OPENAI_MODEL") ?? "gpt-4o-mini";
  const temperature = settings.temperature ?? Number(readEnv("VITE_OPENAI_TEMPERATURE") ?? "0.4");

  if (!apiKey) {
    throw new Error("Missing API key for openai-compatible provider");
  }

  return { apiKey, baseUrl, model, temperature };
}

export async function runOpenAiCompatibleChat(
  settings: AISettings,
  messages: ChatCompletionMessage[],
): Promise<string> {
  const config = resolveOpenAiCompatibleConfig(settings);
  const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: config.temperature,
    }),
  });

  if (!response.ok) {
    throw new Error(`openai-compatible request failed (${response.status})`);
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return json.choices?.[0]?.message?.content ?? "";
}
