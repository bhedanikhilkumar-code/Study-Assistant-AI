export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString();
}

export function nowISO(): string {
  return new Date().toISOString();
}
