import type { DreamEntry } from "../types";
import type { StorageAdapter } from "./adapter";

const STORAGE_KEY = "insomnia_dreams";

export class LocalStorageAdapter implements StorageAdapter {
  private getAll(): DreamEntry[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as DreamEntry[];
    } catch {
      return [];
    }
  }

  private setAll(entries: DreamEntry[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }

  async saveDream(entry: DreamEntry): Promise<void> {
    const entries = this.getAll();
    const idx = entries.findIndex((e) => e.id === entry.id);
    if (idx >= 0) {
      entries[idx] = entry;
    } else {
      entries.push(entry);
    }
    entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    this.setAll(entries);
  }

  async getDream(id: string): Promise<DreamEntry | null> {
    return this.getAll().find((e) => e.id === id) ?? null;
  }

  async getAllDreams(): Promise<DreamEntry[]> {
    return this.getAll().sort((a, b) => b.date.localeCompare(a.date));
  }

  async deleteDream(id: string): Promise<void> {
    this.setAll(this.getAll().filter((e) => e.id !== id));
  }

  // TODO: Replace substring search with vector similarity search
  async searchDreams(query: string): Promise<DreamEntry[]> {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return this.getAll().filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.body.toLowerCase().includes(q) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
}
