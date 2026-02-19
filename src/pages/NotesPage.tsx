import { useState, type Dispatch, type SetStateAction } from 'react'
import type { Note } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { PdfImportButton } from '@/components/notes/PdfImportButton'

export function NotesPage({ notes, setNotes }: { notes: Note[]; setNotes: Dispatch<SetStateAction<Note[]>> }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const createNote = (nextContent = content, source?: string) => {
    if (!title && !nextContent) return
    setNotes((n) => [{ id: crypto.randomUUID(), title: title || 'Untitled note', content: nextContent, source, createdAt: new Date().toISOString() }, ...n])
    setTitle('')
    setContent('')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Notes</h1>
      <Card>
        <div className="space-y-2">
          <Input placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea placeholder="Write your note" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex gap-2">
            <Button onClick={() => createNote()}>Create note</Button>
            <PdfImportButton onImport={(text) => createNote(text, 'pdf-import')} />
          </div>
        </div>
      </Card>
      <div className="space-y-2">
        {notes.length === 0 ? <p className="text-sm text-muted-foreground">No notes yet.</p> : notes.map((n) => <Card key={n.id}><p className="font-medium">{n.title}</p><p className="text-sm">{n.content}</p></Card>)}
      </div>
    </div>
  )
}
