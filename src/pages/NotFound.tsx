import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="rounded-lg border p-6">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The route you opened does not exist.</p>
      <Link to="/" className="mt-3 inline-block text-sm underline">
        Return to dashboard
      </Link>
    </div>
  )
}
