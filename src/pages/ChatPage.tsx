import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { retrieveInternalSources } from '@/lib/ai/retrieval'
import type { Note } from '@/types/models'

export function ChatPage({ notes, citationsMode }: { notes: Note[]; citationsMode: boolean }) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const citations = useMemo(() => retrieveInternalSources(notes, prompt), [notes, prompt])

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Chat</h1>
      <Textarea id="chat-input" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask a study question..." />
      <Button
        onClick={() => {
          const base = `Key points:\n- ${prompt || 'No prompt provided'}\n- Build concepts incrementally`
          if (!citationsMode) {
            setResponse(base)
            return
          }

          const sources = citations.length
            ? citations.map((item) => `- ${item.title}: ${item.snippet}`).join('\n')
            : '- No internal sources found'
          setResponse(`${base}\n\nSources:\n${sources}`)
        }}
      >
        Generate
      </Button>
      <pre className="whitespace-pre-wrap rounded-lg border p-3 text-sm">{response || 'No answer yet.'}</pre>
    </div>
  )
}
