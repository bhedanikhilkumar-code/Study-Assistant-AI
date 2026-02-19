import { getEvents } from '@/lib/telemetry'

export function AdminPage() {
  const events = getEvents()
  return (
    <div>
      <h1 className="text-xl font-semibold">Admin telemetry</h1>
      <ul className="mt-3 space-y-1 text-sm">{events.length === 0 ? <li>No events yet.</li> : events.map((e) => <li key={e.id}>{e.at} - {e.name} {e.detail ? `(${e.detail})` : ''}</li>)}</ul>
    </div>
  )
}
