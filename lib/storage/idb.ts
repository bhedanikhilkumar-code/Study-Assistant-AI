import { DATASET_STORE_NAMES, type AppDataset, type EntityStoreMap, type EntityStoreName } from "../domain/types";

const DB_NAME = "study-assistant-ai";
const DB_VERSION = 1;
const SETTINGS_KEY = "singleton";

export class IndexedDbDriver {
  private dbPromise: Promise<IDBDatabase> | null = null;

  async isSupported(): Promise<boolean> {
    return typeof indexedDB !== "undefined";
  }

  private open(): Promise<IDBDatabase> {
    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        for (const storeName of DATASET_STORE_NAMES) {
          if (!db.objectStoreNames.contains(storeName)) {
            const options = storeName === "settings" ? undefined : { keyPath: "id" };
            db.createObjectStore(storeName, options);
          }
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"));
    });

    return this.dbPromise;
  }

  private async withStore<T>(
    storeName: string,
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> {
    const db = await this.open();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      const request = operation(store);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error(`IndexedDB operation failed (${storeName})`));
    });
  }

  async list<K extends EntityStoreName>(storeName: K): Promise<EntityStoreMap[K]> {
    return (await this.withStore(storeName, "readonly", (store) => store.getAll())) as EntityStoreMap[K];
  }

  async getById<K extends EntityStoreName>(storeName: K, id: string): Promise<EntityStoreMap[K][number] | null> {
    return (await this.withStore(storeName, "readonly", (store) => store.get(id))) ?? null;
  }

  async upsert<K extends EntityStoreName>(storeName: K, value: EntityStoreMap[K][number]): Promise<void> {
    await this.withStore(storeName, "readwrite", (store) => store.put(value));
  }

  async deleteById(storeName: EntityStoreName, id: string): Promise<void> {
    await this.withStore(storeName, "readwrite", (store) => store.delete(id));
  }

  async clearStore(storeName: EntityStoreName): Promise<void> {
    await this.withStore(storeName, "readwrite", (store) => store.clear());
  }

  async getSettings(): Promise<AppDataset["settings"] | null> {
    return (await this.withStore("settings", "readonly", (store) => store.get(SETTINGS_KEY))) ?? null;
  }

  async setSettings(settings: AppDataset["settings"]): Promise<void> {
    await this.withStore("settings", "readwrite", (store) => store.put(settings, SETTINGS_KEY));
  }

  async clearAll(): Promise<void> {
    const db = await this.open();
    await Promise.all(DATASET_STORE_NAMES.filter((store) => store !== "settings").map((store) => this.clearStore(store)));
    await this.withStore("settings", "readwrite", (store) => store.clear());
    db.close();
  }
}

export const indexedDbDriver = new IndexedDbDriver();
