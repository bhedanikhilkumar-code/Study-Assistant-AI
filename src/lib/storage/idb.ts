/**
 * IndexedDB placeholder adapter.
 * Replace with Dexie/idb implementation when enabling persistent offline storage.
 */
export const idbStorage = {
  async get<T>(key: string): Promise<T | null> {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  },
  async set<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  },
  async remove(key: string): Promise<void> {
    localStorage.removeItem(key);
  },
};
