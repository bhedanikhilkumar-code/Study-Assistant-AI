import { NavLink } from 'react-router-dom'

const items = [
  ['/', 'Chat'],
  ['/planner', 'Planner'],
  ['/notes', 'Notes'],
  ['/flashcards', 'Flashcards'],
  ['/quiz', 'Quiz'],
  ['/analytics', 'Analytics'],
  ['/settings', 'Settings'],
  ['/admin', 'Admin'],
]

export function Sidebar() {
  return (
    <aside className="w-56 border-r p-3" aria-label="Sidebar navigation">
      <h2 className="mb-3 text-sm font-semibold">Study Assistant AI</h2>
      <nav className="space-y-1">
        {items.map(([to, label]) => (
          <NavLink key={to} to={to} className="block rounded px-2 py-1 text-sm hover:bg-accent">
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
