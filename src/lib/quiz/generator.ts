export type QuizQuestion = { id: string; type: 'mcq' | 'truefalse' | 'short'; prompt: string; options?: string[]; answer: string }

const words = (text: string) => text.toLowerCase().match(/[a-z]{4,}/g) ?? []

export async function generateQuiz(content: string, providerKey?: string): Promise<QuizQuestion[]> {
  if (providerKey) {
    // Fallback mock AI payload for production-safe no-backend mode.
    return [
      { id: crypto.randomUUID(), type: 'short', prompt: `Summarize: ${content.slice(0, 60)}...`, answer: 'Open response' },
    ]
  }

  const uniq = [...new Set(words(content))].slice(0, 3)
  return uniq.flatMap((word, index) => [
    { id: `${index}-mcq`, type: 'mcq', prompt: `Which term appears in the source text?`, options: [word, 'random', 'noise', 'placeholder'], answer: word },
    { id: `${index}-tf`, type: 'truefalse', prompt: `${word} is a study keyword in your text.`, answer: 'true' },
    { id: `${index}-short`, type: 'short', prompt: `Define or explain: ${word}`, answer: 'Open response' },
  ])
}
