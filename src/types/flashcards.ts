export type Deck = { id: string; subject: string; name: string; createdAt: string }
export type Card = {
  id: string
  deckId: string
  front: string
  back: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
}
