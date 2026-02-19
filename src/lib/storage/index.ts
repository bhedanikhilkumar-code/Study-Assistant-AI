const VERSION = 1
const VERSION_KEY = 'study-assistant:version'

export function migrateStorage() {
  const current = Number(localStorage.getItem(VERSION_KEY) ?? 0)
  if (current < VERSION) {
    localStorage.setItem(VERSION_KEY, String(VERSION))
  }
}

export function readStorage<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function estimateStorageSize() {
  let bytes = 0
  for (const [k, v] of Object.entries(localStorage)) {
    bytes += (k.length + v.length) * 2
  }
  return Math.round(bytes / 1024)
}
