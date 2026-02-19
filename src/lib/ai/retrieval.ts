import type { Note } from '@/types/models'

export type CitationSnippet = {
  title: string
  snippet: string
}

export function retrieveInternalSources(notes: Note[], query: string): CitationSnippet[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean)

  return notes
    .map((note) => ({
      note,
      score: tokens.reduce(
        (total, token) => total + Number(note.content.toLowerCase().includes(token)),
        0,
      ),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ note }) => ({
      title: note.title,
      snippet: note.content.slice(0, 180),
    }))
}
