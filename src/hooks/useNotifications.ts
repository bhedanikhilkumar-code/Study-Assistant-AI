import { useState } from 'react'
import { requestNotificationPermission, showNotification } from '@/lib/notifications'

export function useNotifications() {
  const [inAppMessages, setInAppMessages] = useState<string[]>([])

  const notify = (title: string, body: string) => {
    showNotification(title, body, (message) => setInAppMessages((prev) => [message, ...prev].slice(0, 8)))
  }

  return {
    inAppMessages,
    requestPermission: requestNotificationPermission,
    notify,
    clearMessages: () => setInAppMessages([]),
  }
}
