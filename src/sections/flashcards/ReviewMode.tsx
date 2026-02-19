import { Button } from '@/components/ui/button'
import type { Flashcard } from '@/types/flashcards'

type Props = {
  dueCards: Flashcard[]
  onReview: (cardId: string, quality: number) => void
}

export function ReviewMode({ dueCards, onReview }: Props) {
  const current = dueCards[0]

  return (
    <section className="rounded-lg border p-4">
      <h2 className="mb-3 font-semibold">Review Mode</h2>
      {!current ? (
        <p className="text-sm text-muted-foreground">No cards due right now.</p>
      ) : (
        <div className="space-y-3">
          <p className="font-medium">{current.front}</p>
          <p className="text-sm text-muted-foreground">Answer: {current.back}</p>
          <div className="flex flex-wrap gap-2">
            {[2, 3, 4, 5].map((quality) => (
              <Button key={quality} onClick={() => onReview(current.id, quality)}>
                Rate {quality}
              </Button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
