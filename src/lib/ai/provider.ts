import type { ChatMessage } from '../../types';

export interface AIProvider {
  complete(messages: ChatMessage[]): Promise<string>;
}
