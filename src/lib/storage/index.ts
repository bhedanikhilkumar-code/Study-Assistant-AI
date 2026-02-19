import { idbStorage } from './idb';
import { runStorageMigrations } from './migrate';

runStorageMigrations();

export const storage = {
  getJSON: idbStorage.get,
  setJSON: idbStorage.set,
  remove: idbStorage.remove,
};
