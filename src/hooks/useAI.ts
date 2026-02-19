import { useMemo } from 'react';
import { MockAIProvider } from '../lib/ai/mock';

export function useAI() {
  return useMemo(() => new MockAIProvider(), []);
}
