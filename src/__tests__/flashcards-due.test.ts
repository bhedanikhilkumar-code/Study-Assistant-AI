import { describe, expect, test } from 'vitest'
import { isDue } from '@/lib/spacedRepetition/sm2'

describe('flashcard due logic', () => {
  test('marks past card as due', () => {
    expect(isDue({ nextReviewDate: new Date(Date.now() - 1000).toISOString() } as never)).toBe(true)
  })
})
