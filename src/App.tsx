import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { CommandPalette } from '@/components/common/CommandPalette'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { InstallPWA } from '@/components/common/InstallPWA'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNotifications } from '@/hooks/useNotifications'
import { migrateStorage } from '@/lib/storage'
import { logEvent } from '@/lib/telemetry'
import type { Note, Settings, Task } from '@/types/models'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { AdminPage } from '@/pages/AdminPage'
import { ChatPage } from '@/pages/ChatPage'
import { FlashcardsPage } from '@/pages/FlashcardsPage'
import { NotesPage } from '@/pages/NotesPage'
import { PlannerPage } from '@/pages/PlannerPage'
import { QuizPage } from '@/pages/QuizPage'
import { SettingsPage } from '@/pages/SettingsPage'

const defaultSettings: Settings = { theme: 'light', aiProvider: 'openai-compatible', aiKey: '', aiModel: 'gpt-4o-mini', aiBaseUrl: '', citationsMode: true }

function AppShell() {
  const location = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [notes, setNotes] = useLocalStorage<Note[]>('study-assistant:notes', [])
  const [tasks, setTasks] = useLocalStorage<Task[]>('study-assistant:tasks', [])
  const [settings, setSettings] = useLocalStorage<Settings>('study-assistant:settings', defaultSettings)
  const { reminders, addReminder, notify, requestPermission } = useNotifications()

  useEffect(() => {
    migrateStorage()
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();setPaletteOpen((v) => !v)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();setShowShortcuts((v) => !v)
      }
      if (e.key === '/' && location.pathname === '/') {
        e.preventDefault();document.getElementById('chat-input')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [location.pathname])

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ notes, tasks, settings, reminders })], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a');a.href = url;a.download = 'study-assistant-export.json';a.click()
    URL.revokeObjectURL(url)
    logEvent('export_data')
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 space-y-3">
        <div className="flex items-center justify-between"><InstallPWA /><span className="text-xs text-muted-foreground">Reminders: {reminders.length}</span></div>
        {showShortcuts ? <div className="rounded border p-2 text-sm">Shortcuts: Cmd/Ctrl+K palette, Cmd/Ctrl+/ help, / focus chat input</div> : null}
        <Routes>
          <Route path="/" element={<ChatPage notes={notes} citationsMode={settings.citationsMode} />} />
          <Route path="/planner" element={<PlannerPage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/notes" element={<NotesPage notes={notes} setNotes={setNotes} />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quiz" element={<QuizPage aiKey={settings.aiKey} />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage settings={settings} setSettings={setSettings} onExport={exportData} onImport={(file) => file.text().then((txt) => {
            try { const parsed = JSON.parse(txt) as { notes?: Note[]; tasks?: Task[]; settings?: Settings }; if (parsed.notes) setNotes(parsed.notes); if (parsed.tasks) setTasks(parsed.tasks); if (parsed.settings) setSettings(parsed.settings) } catch { notify('Import failed', 'Invalid data format', () => alert('Invalid import file')) }
          })} onReset={() => { localStorage.clear(); window.location.reload() }} onRequestNotifications={() => { void requestPermission() }} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<div className="rounded border p-4">Route not found.</div>} />
        </Routes>
      </main>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onAction={(action) => {
          logEvent('command_action', action)
          if (action === 'New Task') addReminder('Task reminder', new Date().toISOString())
          if (action === 'Start Pomodoro') notify('Pomodoro started', 'Focus session has begun.', () => alert('Pomodoro started'))
        }}
      />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
