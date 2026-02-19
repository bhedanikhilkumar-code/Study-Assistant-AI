export function exportToJSON<T>(payload: T): string {
  return JSON.stringify(payload, null, 2);
}

export function importFromJSON<T>(serialized: string): T {
  return JSON.parse(serialized) as T;
}
