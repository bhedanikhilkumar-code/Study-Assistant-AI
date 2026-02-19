import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { retrieveInternalSources } from '@/lib/ai/retrieval'
import type { Note } from '@/types/models'

export function ChatPage({
  notes,
  citationsMode,
}: {
  notes: Note[]
  citationsMode: boolean
}) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const citations = useMemo(
    () => retrieveInternalSources(notes, prompt),
    [notes, prompt],
  )

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">AI Chat</h1>

      <Textarea
        id="chat-input"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Ask a study question..."
      />

      <Button
        onClick={() => {
          const base = `Key points:\n- ${prompt || 'No prompt provided'}\n- Build concepts step-by-step\n`

          if (!citationsMode) {
            setResponse(base)
            return
          }

          const sourceText =
            citations.length > 0
              ? `\nSources:\n${citations
                  .map((item) => `- ${item.title}: ${item.snippet}`)
                  .join('\n')}`
              : `\nSources:\n- No internal sources found`

          setResponse(base + sourceText)
        }}
      >
        Generate Answer
      </Button>

      <pre className="whitespace-pre-wrap rounded-lg border p-3 text-sm">
        {response || 'No answer yet.'}
      </pre>
    </div>
  )
}
