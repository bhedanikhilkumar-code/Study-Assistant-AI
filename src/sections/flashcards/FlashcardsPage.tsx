import { DeckEditor } from '@/sections/flashcards/DeckEditor'
import { DeckList } from '@/sections/flashcards/DeckList'
import { ReviewMode } from '@/sections/flashcards/ReviewMode'
import { useFlashcards } from '@/hooks/useFlashcards'

export function FlashcardsPage() {
  const { decks, cards, dueCards, createDeck, createCard, reviewCard } = useFlashcards()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Flashcards</h1>
      <DeckEditor
        onCreateDeck={createDeck}
        onCreateCard={createCard}
        deckOptions={decks.map((deck) => ({ id: deck.id, name: deck.name }))}
      />
      <DeckList decks={decks} cards={cards} />
      <ReviewMode dueCards={dueCards} onReview={reviewCard} />
    </div>
  )
}
