import { readStorage, writeStorage } from '@/lib/storage'

type EventLog = { id: string; name: string; at: string; detail?: string }
const KEY = 'study-assistant:telemetry'

export function logEvent(name: string, detail?: string) {
  const events = readStorage<EventLog[]>(KEY, [])
  events.unshift({ id: crypto.randomUUID(), name, detail, at: new Date().toISOString() })
  writeStorage(KEY, events.slice(0, 200))
}

export function getEvents() {
  return readStorage<EventLog[]>(KEY, [])
}
