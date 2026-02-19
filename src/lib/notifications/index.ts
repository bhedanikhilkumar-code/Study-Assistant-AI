export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.requestPermission()
}

export function sendNotification(title: string, body: string, onFallback: () => void) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body })
    return
  }
  onFallback()
}
