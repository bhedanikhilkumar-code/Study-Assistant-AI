import type { AppDataset } from "../domain/types";
import type { StorageApi } from "../storage/index";
import { migrateDataset } from "../storage/migrate";
import { assertValidImportPayload } from "./validators";

export async function exportDataset(storage: StorageApi): Promise<string> {
  const dataset = await storage.getDataset();
  return JSON.stringify(dataset, null, 2);
}

export async function importDataset(storage: StorageApi, rawJson: string): Promise<AppDataset> {
  const parsed = JSON.parse(rawJson) as unknown;
  assertValidImportPayload(parsed);
  const migrated = migrateDataset(parsed);
  await storage.replaceDataset(migrated);
  return migrated;
}

export async function clearAndReseed(storage: StorageApi): Promise<void> {
  await storage.clearAll();
  await storage.seedDemoData(true);
}
