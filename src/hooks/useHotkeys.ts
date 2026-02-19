import { useEffect } from 'react'

type Handlers = {
  onCommandPalette: () => void
  onShortcutHelp: () => void
  onSlashFocus?: () => void
}

export function useHotkeys(handlers: Handlers) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        handlers.onCommandPalette()
      }

      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault()
        handlers.onShortcutHelp()
      }

      if (event.key === '/' && !event.metaKey && !event.ctrlKey && handlers.onSlashFocus) {
        const target = event.target as HTMLElement | null
        const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'
        if (!isTyping) {
          event.preventDefault()
          handlers.onSlashFocus()
        }
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [handlers])
}
