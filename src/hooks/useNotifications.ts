import { useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { requestNotificationPermission, showNotification } from '@/lib/notifications'
import type { Reminder } from '@/types/models'

export function useNotifications() {
  const [inAppMessages, setInAppMessages] = useState<string[]>([])
  const [reminders, setReminders] = useLocalStorage<Reminder[]>('study-assistant:reminders', [])

  const addReminder = (message: string, at: string) => {
    setReminders((prev) => [...prev, { id: crypto.randomUUID(), message, at, read: false }])
  }

  const notify = (title: string, body: string) => {
    showNotification(title, body, (message) => setInAppMessages((prev) => [message, ...prev].slice(0, 8)))
  }

  return {
    // in-app fallback messages
    inAppMessages,
    clearMessages: () => setInAppMessages([]),

    // reminders storage
    reminders,
    addReminder,

    // notifications
    requestPermission: requestNotificationPermission,
    notify,
  }
}
