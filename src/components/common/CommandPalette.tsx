import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type CommandAction = {
  label: string
  route?: string
}

const commands: CommandAction[] = [
  { label: 'New Chat Thread' },
  { label: 'New Note' },
  { label: 'New Task' },
  { label: 'Start Pomodoro' },

  { label: 'Go to Chat', route: '/' },
  { label: 'Go to Planner', route: '/planner' },
  { label: 'Go to Notes', route: '/notes' },
  { label: 'Go to Flashcards', route: '/flashcards' },
  { label: 'Go to Quiz', route: '/quiz' },
  { label: 'Go to Analytics', route: '/analytics' },
  { label: 'Go to Settings', route: '/settings' },
  { label: 'Go to Admin', route: '/admin' },

  { label: 'Export Data' },
  { label: 'Import Data' },
]

export function CommandPalette({
  open,
  onClose,
  onAction,
}: {
  open: boolean
  onClose: () => void
  onAction: (action: string) => void
}) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4" onClick={onClose}>
      <div
        className="mx-auto max-w-xl rounded-lg border bg-background p-4 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          className="mb-3 w-full rounded-md border bg-background px-3 py-2"
          placeholder="Type a command..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />

        <div className="space-y-1">
          {filtered.map((cmd) => (
            <Button
              key={cmd.label}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (cmd.route) navigate(cmd.route)
                onAction(cmd.label)
                onClose()
              }}
            >
              {cmd.label}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-3 text-sm text-muted-foreground">No commands found.</div>
        ) : null}
      </div>
    </div>
  )
}
