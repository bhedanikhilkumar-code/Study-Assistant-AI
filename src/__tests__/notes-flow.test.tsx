import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { NotesPage } from '@/pages/NotesPage'

describe('Notes flow', () => {
  test('creates note', () => {
    const notes: { id: string; title: string; content: string; createdAt: string }[] = []
    const setNotes = (updater: (items: typeof notes) => typeof notes) => updater(notes)
    render(<NotesPage notes={notes} setNotes={setNotes as never} />)
    fireEvent.change(screen.getByPlaceholderText('Note title'), { target: { value: 'Test' } })
    fireEvent.change(screen.getByPlaceholderText('Write your note'), { target: { value: 'Body' } })
    fireEvent.click(screen.getByText('Create note'))
    expect(notes.length).toBe(1)
  })
})
