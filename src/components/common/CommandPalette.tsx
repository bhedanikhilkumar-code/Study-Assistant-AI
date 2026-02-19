import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const actions = [
  { label: 'New Chat Thread' },
  { label: 'New Note' },
  { label: 'New Task' },
  { label: 'Start Pomodoro' },
  { label: 'Go to Chat', path: '/' },
  { label: 'Go to Planner', path: '/planner' },
  { label: 'Go to Notes', path: '/notes' },
  { label: 'Go to Analytics', path: '/analytics' },
  { label: 'Go to Settings', path: '/settings' },
  { label: 'Go to Admin', path: '/admin' },
  { label: 'Go to Flashcards', path: '/flashcards' },
  { label: 'Go to Quiz', path: '/quiz' },
  { label: 'Export Data' },
  { label: 'Import Data' },
]

export function CommandPalette({ open, onClose, onAction }: { open: boolean; onClose: () => void; onAction: (label: string) => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase())), [query])
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4" onClick={onClose}>
      <div className="mx-auto max-w-lg rounded-lg border bg-background p-3" onClick={(e) => e.stopPropagation()}>
        <input className="mb-2 w-full rounded border p-2" placeholder="Type a command..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="space-y-1">
          {filtered.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (action.path) navigate(action.path)
                onAction(action.label)
                onClose()
              }}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
