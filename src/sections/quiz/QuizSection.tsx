import { useState } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export function QuizSection({ aiKey }: { aiKey?: string }) {
  const { questions, answers, setAnswers, generate, score } = useQuiz()
  const [sourceText, setSourceText] = useState('')

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="font-semibold">Generate quiz</h3>
        <Textarea value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Paste notes, subject context, or prompt..." />
        <Button className="mt-2" onClick={() => generate(sourceText, aiKey)}>Generate</Button>
      </Card>
      <Card>
        <h3 className="font-semibold">Questions ({questions.length})</h3>
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="rounded border p-2">
              <p>{q.prompt}</p>
              {q.options ? q.options.map((opt) => <Button key={opt} variant="ghost" onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}>{opt}</Button>) : null}
              <input className="mt-2 w-full rounded border p-1" placeholder="Answer" value={answers[q.id] ?? ''} onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))} />
              <p className="text-xs text-muted-foreground">Correct: {q.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm">Score: {score}</p>
      </Card>
    </div>
  )
}
