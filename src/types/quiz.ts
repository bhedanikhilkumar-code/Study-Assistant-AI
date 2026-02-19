export type QuizQuestionType = 'mcq' | 'true-false' | 'short'

export type QuizQuestion = {
  id: string
  type: QuizQuestionType
  prompt: string
  choices?: string[]
  answer: string
}
