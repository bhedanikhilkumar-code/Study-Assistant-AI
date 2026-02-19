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

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4" onClick={onClose}>
      <div className="mx-auto max-w-xl rounded-lg border bg-background p-4" onClick={(event) => event.stopPropagation()}>
        <input
          className="mb-3 w-full rounded-md border bg-background px-3 py-2"
          placeholder="Type a command..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="space-y-1">
          {filtered.map((command) => (
            <Button
              key={command.label}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (command.route) navigate(command.route)
                onAction(command.label)
                onClose()
              }}
            >
              {command.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
