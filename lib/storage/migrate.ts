import { SETTINGS_SCHEMA_VERSION, defaultSettings, type AppDataset, type AppSettings } from "../domain/types";

export function migrateSettings(settings: Partial<AppSettings> | null | undefined, now = new Date().toISOString()): AppSettings {
  if (!settings) {
    return defaultSettings(now);
  }

  const base = {
    ...defaultSettings(now),
    ...settings,
    ai: {
      ...defaultSettings(now).ai,
      ...(settings.ai ?? {}),
    },
    ui: {
      ...defaultSettings(now).ui,
      ...(settings.ui ?? {}),
    },
  } as AppSettings;

  if ((settings.version ?? 0) < SETTINGS_SCHEMA_VERSION) {
    base.version = SETTINGS_SCHEMA_VERSION;
    base.updatedAt = now;
  }

  return base;
}

export function migrateDataset(dataset: Partial<AppDataset> | null | undefined, now = new Date().toISOString()): AppDataset {
  return {
    users: dataset?.users ?? [],
    subjects: dataset?.subjects ?? [],
    notes: dataset?.notes ?? [],
    tasks: dataset?.tasks ?? [],
    studySessions: dataset?.studySessions ?? [],
    chatThreads: dataset?.chatThreads ?? [],
    chatMessages: dataset?.chatMessages ?? [],
    analyticsSnapshots: dataset?.analyticsSnapshots ?? [],
    settings: migrateSettings(dataset?.settings, now),
  };
}
