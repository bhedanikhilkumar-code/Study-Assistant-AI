import type { Flashcard, FlashcardDeck } from '@/types/flashcards'

type Props = {
  decks: FlashcardDeck[]
  cards: Flashcard[]
}

export function DeckList({ decks, cards }: Props) {
  if (decks.length === 0) {
    return <div className="rounded-lg border p-4 text-sm text-muted-foreground">No decks yet. Create one to begin.</div>
  }

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-3 font-semibold">Decks</h2>
      <ul className="space-y-2">
        {decks.map((deck) => (
          <li key={deck.id} className="rounded border p-2 text-sm">
            <p className="font-medium">{deck.name}</p>
            <p className="text-muted-foreground">Subject: {deck.subject}</p>
            <p className="text-muted-foreground">Cards: {cards.filter((card) => card.deckId === deck.id).length}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
