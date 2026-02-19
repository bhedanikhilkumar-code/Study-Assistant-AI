import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function InstallPWA() {
  const [promptEvent, setPromptEvent] = useState<Event | null>(null)

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!promptEvent) return null

  return <Button onClick={() => void (promptEvent as { prompt: () => Promise<void> }).prompt()}>Install app</Button>
}
