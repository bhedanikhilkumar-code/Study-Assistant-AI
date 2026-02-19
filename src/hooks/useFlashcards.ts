import { useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { applySM2, isDue } from '@/lib/spacedRepetition/sm2'
import type { Card, Deck } from '@/types/flashcards'

export function useFlashcards() {
  const [decks, setDecks] = useLocalStorage<Deck[]>('study-assistant:decks', [])
  const [cards, setCards] = useLocalStorage<Card[]>('study-assistant:cards', [])

  const dueCards = useMemo(() => cards.filter((card) => isDue(card)), [cards])

  const addDeck = (name: string, subject: string) => setDecks((d) => [...d, { id: crypto.randomUUID(), name, subject, createdAt: new Date().toISOString() }])
  const addCard = (deckId: string, front: string, back: string) =>
    setCards((c) => [...c, { id: crypto.randomUUID(), deckId, front, back, easeFactor: 2.5, interval: 0, repetitions: 0, nextReviewDate: new Date().toISOString() }])
  const reviewCard = (cardId: string, quality: number) => setCards((list) => list.map((card) => (card.id === cardId ? applySM2(card, quality) : card)))

  return { decks, cards, dueCards, addDeck, addCard, reviewCard }
}
