import type { ChatMessage } from '../../types';
import type { AIProvider } from './provider';

export class MockAIProvider implements AIProvider {
  async complete(messages: ChatMessage[]): Promise<string> {
    const latest = messages[messages.length - 1]?.content ?? 'your request';
    return `Demo assistant response for: ${latest}`;
  }
}
