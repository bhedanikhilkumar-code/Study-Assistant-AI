import type { Flashcard } from '@/types/flashcards'

export function reviewWithSm2(card: Flashcard, quality: number, now = new Date()): Flashcard {
  const q = Math.max(0, Math.min(5, quality))
  const next = { ...card }

  if (q < 3) {
    next.repetitions = 0
    next.interval = 1
  } else {
    next.repetitions += 1
    if (next.repetitions === 1) next.interval = 1
    else if (next.repetitions === 2) next.interval = 6
    else next.interval = Math.max(1, Math.round(next.interval * next.easeFactor))
  }

  next.easeFactor = Math.max(1.3, next.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const reviewDate = new Date(now)
  reviewDate.setDate(reviewDate.getDate() + next.interval)
  next.nextReviewDate = reviewDate.toISOString()

  return next
}

export function isCardDue(card: Flashcard, now = new Date()) {
  return new Date(card.nextReviewDate) <= now
}
