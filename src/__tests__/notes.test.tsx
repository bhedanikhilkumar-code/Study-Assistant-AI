import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { NotesPage } from '@/pages/NotesPage'
import type { Note } from '@/types/models'

describe('NotesPage', () => {
  test('creates a note from title/content', () => {
    let notes: Note[] = []
    const setNotes = (updater: (value: Note[]) => Note[]) => {
      notes = updater(notes)
    }

    render(<NotesPage notes={notes} setNotes={setNotes as never} />)

    fireEvent.change(screen.getByPlaceholderText('Note title'), { target: { value: 'Biology' } })
    fireEvent.change(screen.getByPlaceholderText('Write your note'), { target: { value: 'Cell membrane basics' } })
    fireEvent.click(screen.getByText('Create note'))

    expect(notes).toHaveLength(1)
    expect(notes[0].title).toBe('Biology')
  })
})
