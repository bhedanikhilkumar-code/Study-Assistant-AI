import type { ChatMessage } from '../../types';
import type { AIProvider } from './provider';

export class OpenAICompatibleProvider implements AIProvider {
  constructor(private readonly endpoint: string, private readonly apiKey: string) {}

  async complete(messages: ChatMessage[]): Promise<string> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages.map((message) => ({ role: message.role, content: message.content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return data.choices?.[0]?.message?.content ?? 'No content returned.';
  }
}
