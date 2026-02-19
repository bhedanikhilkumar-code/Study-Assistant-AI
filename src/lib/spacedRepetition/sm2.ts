import type { Card } from '@/types/flashcards'

export function applySM2(card: Card, quality: number): Card {
  const q = Math.min(5, Math.max(0, quality))
  const updated = { ...card }

  if (q < 3) {
    updated.repetitions = 0
    updated.interval = 1
  } else {
    updated.repetitions += 1
    if (updated.repetitions === 1) updated.interval = 1
    else if (updated.repetitions === 2) updated.interval = 6
    else updated.interval = Math.round(updated.interval * updated.easeFactor)
  }

  updated.easeFactor = Math.max(1.3, updated.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const next = new Date()
  next.setDate(next.getDate() + updated.interval)
  updated.nextReviewDate = next.toISOString()
  return updated
}

export function isDue(card: Card, now = new Date()) {
  return new Date(card.nextReviewDate) <= now
}
