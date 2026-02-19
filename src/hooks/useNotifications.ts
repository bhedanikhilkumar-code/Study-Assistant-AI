import { useLocalStorage } from '@/hooks/useLocalStorage'
import { requestNotificationPermission, sendNotification } from '@/lib/notifications'
import type { Reminder } from '@/types/models'

export function useNotifications() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('study-assistant:reminders', [])

  const addReminder = (message: string, at: string) => setReminders((r) => [...r, { id: crypto.randomUUID(), message, at, read: false }])
  const notify = (title: string, body: string, fallback: () => void) => sendNotification(title, body, fallback)

  return { reminders, addReminder, notify, requestPermission: requestNotificationPermission }
}
