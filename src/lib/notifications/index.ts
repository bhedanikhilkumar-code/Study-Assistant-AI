export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported'
  return Notification.requestPermission()
}

export function showNotification(
  title: string,
  body: string,
  onFallback: (message: string) => void,
) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body })
    return
  }

  // Fallback to in-app message
  onFallback(`${title}: ${body}`)
}
