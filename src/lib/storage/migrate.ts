export const STORAGE_VERSION = 1;

const VERSION_KEY = 'study-assistant-storage-version';

export function runStorageMigrations(): void {
  const existing = Number(localStorage.getItem(VERSION_KEY) ?? 0);

  if (existing < STORAGE_VERSION) {
    // Keep this switch to add deterministic migrations later.
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
  }
}
