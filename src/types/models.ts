export type RouteKey = 'chat' | 'planner' | 'notes' | 'analytics' | 'settings' | 'admin' | 'flashcards' | 'quiz'

export type Note = { id: string; title: string; content: string; source?: string; createdAt: string }
export type Task = { id: string; title: string; dueDate: string; completed: boolean }
export type Reminder = { id: string; message: string; at: string; read: boolean }
export type Settings = {
  theme: 'light' | 'dark'
  aiProvider: string
  aiKey: string
  aiModel: string
  aiBaseUrl: string
  citationsMode: boolean
}
