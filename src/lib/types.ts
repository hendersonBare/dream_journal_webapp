export interface DreamEntry {
  id: string;
  title: string;
  body: string;
  date: string;      // YYYY-MM-DD
  tags: string[];
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface StorageAdapter {
  saveDream(entry: DreamEntry): Promise<void>;
  getDream(id: string): Promise<DreamEntry | null>;
  getAllDreams(): Promise<DreamEntry[]>;
  deleteDream(id: string): Promise<void>;
  searchDreams(query: string): Promise<DreamEntry[]>;
}
