import { useState } from 'react'
import { useFlashcards } from '@/hooks/useFlashcards'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export function FlashcardsSection() {
  const { decks, cards, dueCards, addDeck, addCard, reviewCard } = useFlashcards()
  const [deckName, setDeckName] = useState('')
  const [subject, setSubject] = useState('')

  const reviewing = dueCards[0]

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">Create deck</h3>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          <Input placeholder="Deck name" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
          <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <Button onClick={() => deckName && subject && addDeck(deckName, subject)}>Add deck</Button>
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Decks ({decks.length})</h3>
        <div className="mt-2 space-y-2">
          {decks.length === 0 ? 'No decks yet.' : decks.map((d) => <DeckRow key={d.id} deckId={d.id} name={d.name} onAdd={addCard} />)}
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold">Review due cards ({dueCards.length})</h3>
        {!reviewing ? (
          <p className="text-sm text-muted-foreground">No cards due right now.</p>
        ) : (
          <div className="space-y-2">
            <p>{reviewing.front}</p>
            <p className="text-sm text-muted-foreground">{reviewing.back}</p>
            <div className="flex gap-2">{[2, 3, 4, 5].map((q) => <Button key={q} onClick={() => reviewCard(reviewing.id, q)}>Rate {q}</Button>)}</div>
          </div>
        )}
      </Card>
      <p className="text-sm text-muted-foreground">Total cards: {cards.length}</p>
    </div>
  )
}

function DeckRow({ deckId, name, onAdd }: { deckId: string; name: string; onAdd: (deckId: string, front: string, back: string) => void }) {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  return (
    <div className="rounded border p-2">
      <p className="mb-2 text-sm font-medium">{name}</p>
      <div className="grid gap-2 md:grid-cols-3">
        <Input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)} />
        <Input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)} />
        <Button onClick={() => front && back && onAdd(deckId, front, back)}>Add card</Button>
      </div>
    </div>
  )
}
