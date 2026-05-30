export function generateId(): string {
  return crypto.randomUUID();
}

export function today(): string {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

export function formatDate(dateString: string): string {
  // Append T00:00:00 to parse as local time, not UTC
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function nextDreamTitle(existingTitles: string[]): string {
  const lower = new Set(existingTitles.map((t) => t.toLowerCase()));
  let n = 1;
  while (lower.has(`dream${n}`)) n++;
  return `dream${n}`;
}

export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
