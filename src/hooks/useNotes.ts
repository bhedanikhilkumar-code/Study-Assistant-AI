import { useState } from 'react';
import type { Note } from '../types';
import { nowISO } from '../lib/utils/dates';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (title: string, content: string) => {
    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, content, tags: [], updatedAt: nowISO() },
    ]);
  };

  return { notes, addNote };
}
