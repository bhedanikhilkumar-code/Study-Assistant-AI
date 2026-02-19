import { useMemo } from 'react';
import type { AnalyticsPoint } from '../types';

export function useAnalytics() {
  return useMemo<AnalyticsPoint[]>(
    () => [
      { label: 'Study Streak', value: 5 },
      { label: 'Tasks Completed', value: 12 },
      { label: 'Notes Created', value: 8 },
    ],
    [],
  );
}
