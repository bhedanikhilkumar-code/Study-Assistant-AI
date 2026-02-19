import { SETTINGS_SCHEMA_VERSION, type AppDataset, type AppSettings } from "../domain/types";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function hasStringId(value: unknown): value is { id: string } {
  return isObject(value) && isString(value.id);
}

function isSettings(value: unknown): value is AppSettings {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.version === "number" &&
    value.version <= SETTINGS_SCHEMA_VERSION + 5 &&
    isObject(value.ai) &&
    isObject(value.ui) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
}

export function isAppDataset(value: unknown): value is AppDataset {
  if (!isObject(value)) {
    return false;
  }

  const collections = [
    "users",
    "subjects",
    "notes",
    "tasks",
    "studySessions",
    "chatThreads",
    "chatMessages",
    "analyticsSnapshots",
  ] as const;

  for (const key of collections) {
    const row = value[key];
    if (!isArray(row) || !row.every(hasStringId)) {
      return false;
    }
  }

  return isSettings(value.settings);
}

export function assertValidImportPayload(value: unknown): asserts value is AppDataset {
  if (!isAppDataset(value)) {
    throw new Error("Malformed import payload");
  }
}
