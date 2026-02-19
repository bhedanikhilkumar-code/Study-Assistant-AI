import { useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { CommandPalette } from '@/components/common/CommandPalette'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { InstallPWA } from '@/components/common/InstallPWA'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNotifications } from '@/hooks/useNotifications'
import { useHotkeys } from '@/hooks/useHotkeys'
import type { Note, Settings, Task } from '@/types/models'
import { ChatPage } from '@/pages/ChatPage'
import { PlannerPage } from '@/pages/PlannerPage'
import { NotesPage } from '@/pages/NotesPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { AdminPage } from '@/pages/AdminPage'
import { NotFound } from '@/pages/NotFound'
import { FlashcardsPage } from '@/sections/flashcards/FlashcardsPage'
import { QuizPage } from '@/sections/quiz/QuizPage'
import { SettingsPage } from '@/sections/settings/SettingsPage'
import { retrieveInternalSources } from '@/lib/ai/retrieval'

const defaultSettings: Settings = {
  theme: 'light',
  aiProvider: 'openai-compatible',
  aiKey: '',
  aiModel: 'gpt-4o-mini',
  aiBaseUrl: '',
  citationsMode: true,
}

function AppShell() {
  const location = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [notes, setNotes] = useLocalStorage<Note[]>('study-assistant:notes', [])
  const [tasks, setTasks] = useLocalStorage<Task[]>('study-assistant:tasks', [])
  const [settings, setSettings] = useLocalStorage<Settings>('study-assistant:settings', defaultSettings)
  const { inAppMessages, requestPermission, notify } = useNotifications()

  useHotkeys({
    onCommandPalette: () => setPaletteOpen((prev) => !prev),
    onShortcutHelp: () => setShowShortcuts((prev) => !prev),
    onSlashFocus: location.pathname === '/' ? () => document.getElementById('chat-input')?.focus() : undefined,
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 space-y-4 p-4">
        <div className="flex items-center justify-between">
          <InstallPWA />
          <span className="text-xs text-muted-foreground">Press Cmd/Ctrl+K for command palette</span>
        </div>

        {showShortcuts ? (
          <div className="rounded-lg border p-3 text-sm">
            Shortcuts: Cmd/Ctrl+K (palette), Cmd/Ctrl+/ (help), / (chat focus)
          </div>
        ) : null}

        <Routes>
          <Route path="/" element={<ChatPage notes={notes} citationsMode={settings.citationsMode} />} />
          <Route path="/planner" element={<PlannerPage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/notes" element={<NotesPage notes={notes} setNotes={setNotes} />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/quiz" element={<QuizPage aiKey={settings.aiKey} />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route
            path="/settings"
            element={
              <SettingsPage
                settings={settings}
                setSettings={setSettings}
                notes={notes}
                tasks={tasks}
                inAppMessages={inAppMessages}
                onRequestNotifications={() => {
                  void requestPermission().then((result) => {
                    if (result === 'denied') notify('Notifications', 'Permission denied. Using in-app fallback.')
                  })
                }}
                onImportData={(payload) => {
                  if (payload.notes) setNotes(payload.notes)
                  if (payload.tasks) setTasks(payload.tasks)
                  if (payload.settings) setSettings(payload.settings)
                }}
              />
            }
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onAction={(action) => {
          if (action === 'Start Pomodoro') notify('Pomodoro', 'Focus session started.')
          if (action === 'New Chat Thread' && settings.citationsMode) {
            const refs = retrieveInternalSources(notes, 'study')
            if (refs.length === 0) notify('Citations', 'No internal sources found.')
          }
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
