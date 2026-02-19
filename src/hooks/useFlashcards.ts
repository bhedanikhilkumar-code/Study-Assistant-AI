import { useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { isCardDue, reviewWithSm2 } from '@/lib/spacedRepetition/sm2'
import type { Flashcard, FlashcardDeck } from '@/types/flashcards'

const DECKS_KEY = 'study-assistant:flashcard-decks'
const CARDS_KEY = 'study-assistant:flashcard-cards'

export function useFlashcards() {
  const [decks, setDecks] = useLocalStorage<FlashcardDeck[]>(DECKS_KEY, [])
  const [cards, setCards] = useLocalStorage<Flashcard[]>(CARDS_KEY, [])

  const dueCards = useMemo(() => cards.filter((card) => isCardDue(card)), [cards])

  const createDeck = (name: string, subject: string) => {
    setDecks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, subject, createdAt: new Date().toISOString() },
    ])
  }

  const createCard = (deckId: string, front: string, back: string) => {
    setCards((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        deckId,
        front,
        back,
        easeFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: new Date().toISOString(),
      },
    ])
  }

  const reviewCard = (cardId: string, quality: number) => {
    setCards((prev) => prev.map((card) => (card.id === cardId ? reviewWithSm2(card, quality) : card)))
  }

  return { decks, cards, dueCards, createDeck, createCard, reviewCard }
}
