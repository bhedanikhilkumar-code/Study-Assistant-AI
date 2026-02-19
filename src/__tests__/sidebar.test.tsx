import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { Sidebar } from '@/components/layout/Sidebar'

describe('Sidebar', () => {
  test('renders key navigation entries', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    )

    expect(screen.getByText('Flashcards')).toBeInTheDocument()
    expect(screen.getByText('Quiz')).toBeInTheDocument()
  })
})
