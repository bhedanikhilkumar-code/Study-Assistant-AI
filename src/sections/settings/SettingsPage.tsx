import type { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { exportAsJson, importJsonFile } from '@/lib/exportImport'
import type { Note, Settings, Task } from '@/types/models'

export function SettingsPage({
  settings,
  setSettings,
  notes,
  tasks,
  onImportData,
  inAppMessages,
  onRequestNotifications,
}: {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  notes: Note[]
  tasks: Task[]
  onImportData: (payload: { notes?: Note[]; tasks?: Task[]; settings?: Settings }) => void
  inAppMessages: string[]
  onRequestNotifications: () => void
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>

      <section className="grid gap-2 rounded-lg border p-4 md:grid-cols-2">
        <Input placeholder="AI provider" value={settings.aiProvider} onChange={(event) => setSettings((prev) => ({ ...prev, aiProvider: event.target.value }))} />
        <Input placeholder="AI key" value={settings.aiKey} onChange={(event) => setSettings((prev) => ({ ...prev, aiKey: event.target.value }))} />
        <Input placeholder="AI model" value={settings.aiModel} onChange={(event) => setSettings((prev) => ({ ...prev, aiModel: event.target.value }))} />
        <Input placeholder="AI base URL" value={settings.aiBaseUrl} onChange={(event) => setSettings((prev) => ({ ...prev, aiBaseUrl: event.target.value }))} />
      </section>

      <section className="rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span>Citations Mode</span>
          <Switch checked={settings.citationsMode} onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, citationsMode: checked }))} />
        </div>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <p className="font-medium">Notifications</p>
        <Button onClick={onRequestNotifications}>Request browser permission</Button>
        {inAppMessages.map((message) => (
          <p key={message} className="text-sm text-muted-foreground">• {message}</p>
        ))}
      </section>

      <section className="rounded-lg border p-4 flex flex-wrap gap-2">
        <Button onClick={() => exportAsJson('study-assistant-data.json', { notes, tasks, settings })}>Export JSON</Button>
        <label>
          <input
            type="file"
            className="hidden"
            accept="application/json"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              void importJsonFile<{ notes?: Note[]; tasks?: Task[]; settings?: Settings }>(file).then(onImportData)
            }}
          />
          <Button type="button" variant="secondary">Import JSON</Button>
        </label>
      </section>
    </div>
  )
}
