import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  onCreateDeck: (name: string, subject: string) => void
  onCreateCard: (deckId: string, front: string, back: string) => void
  deckOptions: Array<{ id: string; name: string }>
}

export function DeckEditor({ onCreateDeck, onCreateCard, deckOptions }: Props) {
  const [deckName, setDeckName] = useState('')
  const [subject, setSubject] = useState('')
  const [deckId, setDeckId] = useState('')
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  return (
    <section className="space-y-3 rounded-lg border p-4">
      <h2 className="font-semibold">Deck Editor</h2>
      <div className="grid gap-2 md:grid-cols-3">
        <Input placeholder="Deck name" value={deckName} onChange={(e) => setDeckName(e.target.value)} />
        <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <Button onClick={() => deckName && subject && onCreateDeck(deckName, subject)}>Create Deck</Button>
      </div>

      <div className="grid gap-2 md:grid-cols-4">
        <select className="rounded-md border bg-background px-3 py-2 text-sm" value={deckId} onChange={(e) => setDeckId(e.target.value)}>
          <option value="">Select deck</option>
          {deckOptions.map((deck) => (
            <option key={deck.id} value={deck.id}>{deck.name}</option>
          ))}
        </select>
        <Input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)} />
        <Input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)} />
        <Button onClick={() => deckId && front && back && onCreateCard(deckId, front, back)}>Add Card</Button>
      </div>
    </section>
  )
}
