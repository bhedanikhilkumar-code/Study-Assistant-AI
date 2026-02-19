import type { QuizQuestion } from '@/types/quiz'

function tokenize(input: string) {
  return input.toLowerCase().match(/[a-z]{4,}/g) ?? []
}

function shuffle<T>(arr: T[]) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export async function generateQuizQuestions(sourceText: string, aiKey?: string): Promise<QuizQuestion[]> {
  const clean = sourceText.trim()
  if (!clean) return []

  // If AI key exists: keep a safe demo response (no backend wiring assumptions)
  if (aiKey) {
    return [
      {
        id: crypto.randomUUID(),
        type: 'short',
        prompt: `Summarize the core idea from: "${clean.slice(0, 120)}"...`,
        answer: 'Open-ended answer',
      },
    ]
  }

  // Offline heuristic quiz generation (keywords)
  const keywords = [...new Set(tokenize(clean))].slice(0, 4)
  const distractorsBase = ['concept', 'method', 'result', 'example', 'system', 'theory', 'model', 'process']

  return keywords.flatMap((keyword, index) => {
    const distractors = distractorsBase.filter((w) => w !== keyword).slice(0, 3)
    const choices = shuffle([keyword, ...distractors])

    return [
      {
        id: `${index}-mcq`,
        type: 'mcq',
        prompt: 'Which term appears in your study text?',
        choices,
        answer: keyword,
      },
      {
        id: `${index}-truefalse`,
        type: 'true-false',
        prompt: `"${keyword}" appears in your notes.`,
        answer: 'true',
      },
      {
        id: `${index}-short`,
        type: 'short',
        prompt: `Explain or define: "${keyword}"`,
        answer: 'Open-ended answer',
      },
    ]
  })
}
