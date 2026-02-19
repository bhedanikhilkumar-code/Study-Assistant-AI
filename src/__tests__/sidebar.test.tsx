import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { describe, expect, test } from 'vitest'

describe('Sidebar', () => {
  test('renders nav items', () => {
    render(<MemoryRouter><Sidebar /></MemoryRouter>)
    expect(screen.getByText('Flashcards')).toBeInTheDocument()
  })
})
