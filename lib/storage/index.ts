import {
  ENTITY_STORE_NAMES,
  defaultSettings,
  type AppDataset,
  type AppSettings,
  type EntityStoreMap,
  type EntityStoreName,
  type User,
} from "../domain/types";
import { indexedDbDriver } from "./idb";
import { migrateDataset, migrateSettings } from "./migrate";

const STORAGE_PREFIX = "study-assistant:";
const FIRST_RUN_FLAG = `${STORAGE_PREFIX}first-run-complete`;

const localStorageAvailable = () => typeof localStorage !== "undefined";

function localStorageKey(store: EntityStoreName | "settings"): string {
  return `${STORAGE_PREFIX}${store}`;
}

function readLocal<T>(key: string, fallback: T): T {
  if (!localStorageAvailable()) {
    return fallback;
  }

  const raw = localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T): void {
  if (!localStorageAvailable()) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

export interface StorageApi {
  list<K extends EntityStoreName>(storeName: K): Promise<EntityStoreMap[K]>;
  getById<K extends EntityStoreName>(storeName: K, id: string): Promise<EntityStoreMap[K][number] | null>;
  upsert<K extends EntityStoreName>(storeName: K, value: EntityStoreMap[K][number]): Promise<void>;
  deleteById(storeName: EntityStoreName, id: string): Promise<void>;
  getSettings(): Promise<AppSettings>;
  setSettings(settings: AppSettings): Promise<void>;
  getDataset(): Promise<AppDataset>;
  replaceDataset(dataset: AppDataset): Promise<void>;
  clearAll(): Promise<void>;
  seedDemoData(force?: boolean): Promise<void>;
}

class LocalStorageDriver {
  async list<K extends EntityStoreName>(storeName: K): Promise<EntityStoreMap[K]> {
    return readLocal(localStorageKey(storeName), []) as EntityStoreMap[K];
  }

  async getById<K extends EntityStoreName>(storeName: K, id: string): Promise<EntityStoreMap[K][number] | null> {
    const entities = (await this.list(storeName)) as Array<EntityStoreMap[K][number]>;
    return (entities.find((entity) => entity.id === id) as EntityStoreMap[K][number]) ?? null;
  }

  async upsert<K extends EntityStoreName>(storeName: K, value: EntityStoreMap[K][number]): Promise<void> {
    const entities = (await this.list(storeName)) as Array<EntityStoreMap[K][number]>;
    const index = entities.findIndex((entity) => entity.id === value.id);

    if (index >= 0) {
      entities[index] = value;
    } else {
      entities.push(value);
    }

    writeLocal(localStorageKey(storeName), entities);
  }

  async deleteById(storeName: EntityStoreName, id: string): Promise<void> {
    const entities = (await this.list(storeName)) as Array<EntityStoreMap[typeof storeName][number]>;
    writeLocal(
      localStorageKey(storeName),
      entities.filter((entity) => entity.id !== id),
    );
  }

  async clearStore(storeName: EntityStoreName): Promise<void> {
    writeLocal(localStorageKey(storeName), []);
  }

  async getSettings(): Promise<AppSettings | null> {
    return readLocal(localStorageKey("settings"), null);
  }

  async setSettings(settings: AppSettings): Promise<void> {
    writeLocal(localStorageKey("settings"), settings);
  }

  async clearAll(): Promise<void> {
    for (const store of ENTITY_STORE_NAMES) {
      await this.clearStore(store);
    }
    writeLocal(localStorageKey("settings"), null);
  }
}

const localStorageDriver = new LocalStorageDriver();

function createDemoData(now = new Date().toISOString()): AppDataset {
  const user: User = {
    id: "demo-user-1",
    name: "Alex Student",
    email: "alex@example.com",
    createdAt: now,
    updatedAt: now,
  };

  return {
    users: [user],
    subjects: [
      {
        id: "subject-1",
        userId: user.id,
        title: "Biology",
        color: "#22c55e",
        description: "Cell structure and genetics",
        createdAt: now,
        updatedAt: now,
      },
    ],
    notes: [
      {
        id: "note-1",
        userId: user.id,
        subjectId: "subject-1",
        title: "DNA Replication",
        body: "DNA replication is semi-conservative and occurs during S phase.",
        tags: ["genetics", "exam-1"],
        createdAt: now,
        updatedAt: now,
      },
    ],
    tasks: [
      {
        id: "task-1",
        userId: user.id,
        subjectId: "subject-1",
        title: "Summarize chapter 4",
        status: "todo",
        priority: 3,
        createdAt: now,
        updatedAt: now,
      },
    ],
    studySessions: [
      {
        id: "session-1",
        userId: user.id,
        subjectId: "subject-1",
        startedAt: now,
        endedAt: now,
        durationMinutes: 45,
        focusScore: 82,
        notes: "Pomodoro x2",
        createdAt: now,
        updatedAt: now,
      },
    ],
    chatThreads: [
      {
        id: "thread-1",
        userId: user.id,
        title: "Biology revision",
        subjectId: "subject-1",
        createdAt: now,
        updatedAt: now,
      },
    ],
    chatMessages: [
      {
        id: "msg-1",
        threadId: "thread-1",
        role: "user",
        content: "Can you quiz me on DNA replication?",
        createdAt: now,
      },
      {
        id: "msg-2",
        threadId: "thread-1",
        role: "assistant",
        content: "Sure — first question: What enzyme unwinds the DNA double helix?",
        createdAt: now,
      },
    ],
    analyticsSnapshots: [
      {
        id: "snapshot-1",
        userId: user.id,
        capturedAt: now,
        totalStudyMinutes: 45,
        sessionsCompleted: 1,
        tasksCompleted: 0,
        notesCreated: 1,
        streakDays: 1,
      },
    ],
    settings: {
      ...defaultSettings(now),
      activeUserId: user.id,
    },
  };
}

async function getBestDriver() {
  try {
    if (await indexedDbDriver.isSupported()) {
      return indexedDbDriver;
    }
  } catch {
    // fallback below
  }
  return localStorageDriver;
}

export async function createStorageApi(): Promise<StorageApi> {
  const driver = await getBestDriver();

  const api: StorageApi = {
    async list(storeName) {
      return driver.list(storeName);
    },
    async getById(storeName, id) {
      return driver.getById(storeName, id);
    },
    async upsert(storeName, value) {
      await driver.upsert(storeName, value);
    },
    async deleteById(storeName, id) {
      await driver.deleteById(storeName, id);
    },
    async getSettings() {
      return migrateSettings(await driver.getSettings());
    },
    async setSettings(settings) {
      await driver.setSettings(migrateSettings(settings));
    },
    async getDataset() {
      const data: Partial<AppDataset> = {};
      for (const store of ENTITY_STORE_NAMES) {
        data[store] = (await driver.list(store)) as never;
      }
      data.settings = await api.getSettings();
      return migrateDataset(data);
    },
    async replaceDataset(dataset) {
      const migrated = migrateDataset(dataset);
      await api.clearAll();
      for (const store of ENTITY_STORE_NAMES) {
        for (const row of migrated[store]) {
          await driver.upsert(store, row as never);
        }
      }
      await driver.setSettings(migrated.settings);
      if (localStorageAvailable()) {
        localStorage.setItem(FIRST_RUN_FLAG, "1");
      }
    },
    async clearAll() {
      await driver.clearAll();
      if (localStorageAvailable()) {
        localStorage.removeItem(FIRST_RUN_FLAG);
      }
    },
    async seedDemoData(force = false) {
      if (localStorageAvailable() && !force && localStorage.getItem(FIRST_RUN_FLAG) === "1") {
        return;
      }
      const hasUsers = (await driver.list("users")).length > 0;
      if (!force && hasUsers) {
        if (localStorageAvailable()) {
          localStorage.setItem(FIRST_RUN_FLAG, "1");
        }
        return;
      }

      await api.replaceDataset(createDemoData());
      if (localStorageAvailable()) {
        localStorage.setItem(FIRST_RUN_FLAG, "1");
      }
    },
  };

  await api.seedDemoData(false);
  return api;
}
