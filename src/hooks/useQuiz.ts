import { useMemo, useState } from 'react'
import { generateQuizQuestions } from '@/lib/quiz/generator'
import type { QuizQuestion } from '@/types/quiz'

export function useQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const generate = async (text: string, aiKey?: string) => {
    setIsLoading(true)
    try {
      const data = await generateQuizQuestions(text, aiKey)
      setQuestions(data)
      setAnswers({})
    } finally {
      setIsLoading(false)
    }
  }

  const score = useMemo(() => {
    return questions.reduce((sum, question) => {
      if (question.type === 'short') return sum
      const given = answers[question.id]?.toLowerCase()
      const correct = question.answer.toLowerCase()
      return given === correct ? sum + 1 : sum
    }, 0)
  }, [answers, questions])

  return { questions, answers, setAnswers, isLoading, generate, score }
}
