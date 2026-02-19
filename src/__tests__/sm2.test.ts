import { describe, expect, test } from 'vitest'
import { isCardDue, reviewWithSm2 } from '@/lib/spacedRepetition/sm2'

describe('SM2', () => {
  test('marks cards as due when next review is in the past', () => {
    expect(isCardDue({ nextReviewDate: new Date(Date.now() - 1_000).toISOString() } as never)).toBe(true)
  })

  test('increases repetition for high quality review', () => {
    const reviewed = reviewWithSm2(
      {
        id: '1',
        deckId: 'd1',
        front: 'Q',
        back: 'A',
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewDate: new Date().toISOString(),
      },
      5,
      new Date('2026-01-01T00:00:00.000Z'),
    )

    expect(reviewed.repetitions).toBe(1)
    expect(reviewed.interval).toBeGreaterThanOrEqual(1)
  })
})
