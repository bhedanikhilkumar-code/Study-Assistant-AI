import type { QuizQuestion } from '@/types/quiz'

function tokenize(input: string) {
  return input.toLowerCase().match(/[a-z]{4,}/g) ?? []
}

export async function generateQuizQuestions(sourceText: string, aiKey?: string): Promise<QuizQuestion[]> {
  const clean = sourceText.trim()
  if (!clean) return []

  if (aiKey) {
    return [
      {
        id: crypto.randomUUID(),
        type: 'short',
        prompt: `Summarize the core idea from: ${clean.slice(0, 80)}...`,
        answer: 'Open-ended answer',
      },
    ]
  }

  const keywords = [...new Set(tokenize(clean))].slice(0, 4)
  return keywords.flatMap((keyword, index) => [
    {
      id: `${index}-mcq`,
      type: 'mcq',
      prompt: 'Which term appears in your study text?',
      choices: [keyword, 'distractor', 'placeholder', 'noise'],
      answer: keyword,
    },
    {
      id: `${index}-tf`,
      type: 'true-false',
      prompt: `${keyword} appears in your notes.`,
      answer: 'true',
    },
  ])
}
