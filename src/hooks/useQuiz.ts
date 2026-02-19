import { useState } from 'react'
import { generateQuiz, type QuizQuestion } from '@/lib/quiz/generator'

export function useQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})

  async function generate(content: string, key?: string) {
    const data = await generateQuiz(content, key)
    setQuestions(data)
    setAnswers({})
  }

  const score = questions.reduce((sum, q) => sum + (q.type === 'short' ? 0 : answers[q.id]?.toLowerCase() === q.answer.toLowerCase() ? 1 : 0), 0)
  return { questions, answers, setAnswers, generate, score }
}
