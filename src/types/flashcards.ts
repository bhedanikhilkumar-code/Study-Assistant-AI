export type FlashcardDeck = {
  id: string
  name: string
  subject: string
  createdAt: string
}

export type Flashcard = {
  id: string
  deckId: string
  front: string
  back: string
  easeFactor: number
  interval: number
  repetitions: number
  nextReviewDate: string
}
