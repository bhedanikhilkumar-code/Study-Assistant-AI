import { useMemo, useState } from 'react'
import { retrieveNoteSnippets } from '@/lib/ai/retrieval'
import type { Note } from '@/types/models'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function ChatPage({ notes, citationsMode }: { notes: Note[]; citationsMode: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const sources = useMemo(() => retrieveNoteSnippets(notes, prompt), [notes, prompt])

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">AI Chat</h1>
      <Textarea id="chat-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask anything about your study materials" />
      <Button
        onClick={() => {
          const base = `Key points:\n- ${prompt || 'Ask a question'}\n- Structured learning steps\n`
          const sourceText = citationsMode
            ? sources.length
              ? `\nSources:\n${sources.map((s) => `- ${s.title}: ${s.snippet}`).join('\n')}`
              : '\nSources:\n- No internal sources found'
            : ''
          setResponse(base + sourceText)
        }}
      >
        Generate answer
      </Button>
      <pre className="whitespace-pre-wrap rounded border p-3 text-sm">{response || 'No answer yet.'}</pre>
    </div>
  )
}
