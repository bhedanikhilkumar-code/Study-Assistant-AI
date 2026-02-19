import { QuizSection } from '@/sections/quiz/QuizSection'

export function QuizPage({ aiKey }: { aiKey?: string }) {
  return <QuizSection aiKey={aiKey} />
}
