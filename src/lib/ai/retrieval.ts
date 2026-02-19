import type { Note } from '@/types/models'

export function retrieveNoteSnippets(notes: Note[], query: string) {
  const tokens = query.toLowerCase().split(/\s+/)
  return notes
    .map((note) => {
      const rank = tokens.reduce((sum, token) => sum + (note.content.toLowerCase().includes(token) ? 1 : 0), 0)
      return { note, rank }
    })
    .filter((x) => x.rank > 0)
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 3)
    .map((x) => ({ title: x.note.title, snippet: x.note.content.slice(0, 160) }))
}
