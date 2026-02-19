import type { StorageApi } from "../storage/index";
import { clearAndReseed, exportDataset, importDataset } from "../utils/exportImport";

export interface AdminSettingsActions {
  exportJson(): Promise<string>;
  importJson(rawJson: string): Promise<void>;
  clearAll(): Promise<void>;
  seedDemo(force?: boolean): Promise<void>;
}

export function createAdminSettingsActions(storage: StorageApi): AdminSettingsActions {
  return {
    async exportJson() {
      return exportDataset(storage);
    },
    async importJson(rawJson: string) {
      await importDataset(storage, rawJson);
    },
    async clearAll() {
      await storage.clearAll();
    },
    async seedDemo(force = true) {
      if (force) {
        await clearAndReseed(storage);
        return;
      }
      await storage.seedDemoData(false);
    },
  };
}

export function wireAdminSettingsUi(
  storage: StorageApi,
  elements: {
    exportButton?: HTMLButtonElement | null;
    importButton?: HTMLButtonElement | null;
    importInput?: HTMLTextAreaElement | null;
    clearButton?: HTMLButtonElement | null;
    seedButton?: HTMLButtonElement | null;
    onMessage?: (message: string, kind: "success" | "error") => void;
  },
): void {
  const actions = createAdminSettingsActions(storage);

  elements.exportButton?.addEventListener("click", async () => {
    try {
      const json = await actions.exportJson();
      navigator.clipboard?.writeText(json);
      elements.onMessage?.("Data exported to clipboard.", "success");
    } catch (error) {
      elements.onMessage?.((error as Error).message, "error");
    }
  });

  elements.importButton?.addEventListener("click", async () => {
    try {
      const value = elements.importInput?.value ?? "";
      await actions.importJson(value);
      elements.onMessage?.("Data imported successfully.", "success");
    } catch (error) {
      elements.onMessage?.((error as Error).message, "error");
    }
  });

  elements.clearButton?.addEventListener("click", async () => {
    try {
      await actions.clearAll();
      elements.onMessage?.("All stored data cleared.", "success");
    } catch (error) {
      elements.onMessage?.((error as Error).message, "error");
    }
  });

  elements.seedButton?.addEventListener("click", async () => {
    try {
      await actions.seedDemo(true);
      elements.onMessage?.("Demo dataset seeded.", "success");
    } catch (error) {
      elements.onMessage?.((error as Error).message, "error");
    }
  });
}
