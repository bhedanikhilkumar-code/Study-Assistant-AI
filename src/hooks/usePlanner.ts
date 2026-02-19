import { useState } from 'react';
import type { PlannerTask } from '../types';
import { nowISO } from '../lib/utils/dates';

export function usePlanner() {
  const [tasks, setTasks] = useState<PlannerTask[]>([]);

  const addTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, completed: false, createdAt: nowISO() },
    ]);
  };

  return { tasks, addTask };
}
