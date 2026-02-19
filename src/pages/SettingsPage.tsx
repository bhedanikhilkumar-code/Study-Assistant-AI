import type { Dispatch, SetStateAction } from 'react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { estimateStorageSize } from '@/lib/storage'
import type { Settings } from '@/types/models'

export function SettingsPage({ settings, setSettings, onExport, onImport, onReset, onRequestNotifications }: {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  onExport: () => void
  onImport: (file: File) => void
  onReset: () => void
  onRequestNotifications: () => void
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="grid gap-2 md:grid-cols-2">
        <label>Theme<select className="w-full rounded border p-2" value={settings.theme} onChange={(e) => setSettings((s) => ({ ...s, theme: e.target.value as 'light' | 'dark' }))}><option>light</option><option>dark</option></select></label>
        <Input placeholder="AI provider" value={settings.aiProvider} onChange={(e) => setSettings((s) => ({ ...s, aiProvider: e.target.value }))} />
        <Input placeholder="AI key" value={settings.aiKey} onChange={(e) => setSettings((s) => ({ ...s, aiKey: e.target.value }))} />
        <Input placeholder="AI model" value={settings.aiModel} onChange={(e) => setSettings((s) => ({ ...s, aiModel: e.target.value }))} />
        <Input placeholder="AI base URL" value={settings.aiBaseUrl} onChange={(e) => setSettings((s) => ({ ...s, aiBaseUrl: e.target.value }))} />
      </div>
      <div className="flex items-center gap-2"><span>Citations mode</span><Switch checked={settings.citationsMode} onCheckedChange={(v) => setSettings((s) => ({ ...s, citationsMode: v }))} /></div>
      <p className="text-sm text-muted-foreground">Storage estimate: {estimateStorageSize()} KB</p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onExport}>Export data</Button>
        <label><input className="hidden" type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])} /><Button type="button" variant="secondary">Import data</Button></label>
        <Button variant="secondary" onClick={onRequestNotifications}>Notification permission</Button>
        <Button variant="destructive" onClick={() => window.confirm('Reset all data?') && onReset()}>Reset app</Button>
      </div>
    </div>
  )
}
