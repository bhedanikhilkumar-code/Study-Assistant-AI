import { useState } from 'react'
import { useQuiz } from '@/hooks/useQuiz'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LoadingState } from '@/components/common/LoadingState'
import { EmptyState } from '@/components/common/EmptyState'

export function QuizPage({ aiKey }: { aiKey?: string }) {
  const [sourceText, setSourceText] = useState('')
  const { questions, answers, setAnswers, isLoading, generate, score } = useQuiz()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quiz</h1>
      <section className="rounded-lg border p-4 space-y-2">
        <Textarea value={sourceText} onChange={(e) => setSourceText(e.target.value)} placeholder="Paste note text or custom prompt" />
        <Button onClick={() => void generate(sourceText, aiKey)}>Generate Quiz</Button>
      </section>

      {isLoading ? <LoadingState message="Generating quiz..." /> : null}
      {!isLoading && questions.length === 0 ? <EmptyState title="No quiz yet" description="Generate a quiz from notes or custom text." /> : null}

      {questions.map((question) => (
        <section key={question.id} className="rounded-lg border p-4 space-y-2">
          <p className="font-medium">{question.prompt}</p>
          {question.choices ? (
            <div className="flex flex-wrap gap-2">
              {question.choices.map((choice) => (
                <Button key={choice} variant="secondary" onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: choice }))}>
                  {choice}
                </Button>
              ))}
            </div>
          ) : null}
          <Textarea value={answers[question.id] ?? ''} onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))} />
          <p className="text-xs text-muted-foreground">Reference answer: {question.answer}</p>
        </section>
      ))}

      <p className="text-sm">Score: {score}</p>
    </div>
  )
}
