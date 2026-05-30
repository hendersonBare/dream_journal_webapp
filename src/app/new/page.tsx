"use client";

import { useRouter } from "next/navigation";
import type { DreamEntry } from "@/lib/types";
import { LocalStorageAdapter } from "@/lib/storage/localStorage";
import { generateId, nextDreamTitle } from "@/lib/utils";
import DreamForm from "@/components/DreamForm";

// TODO: Replace LocalStorageAdapter with DatabaseAdapter
const storage = new LocalStorageAdapter();

export default function NewDreamPage() {
  const router = useRouter();

  // TODO: Add auth check here

  const handleSubmit = async (data: Omit<DreamEntry, "id" | "createdAt" | "updatedAt">) => {
    let title = data.title;
    if (!title) {
      const all = await storage.getAllDreams();
      title = nextDreamTitle(all.map((d) => d.title));
    }
    const now = new Date().toISOString();
    const entry: DreamEntry = {
      ...data,
      title,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    await storage.saveDream(entry);
    // TODO: Add theme analysis trigger after save
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-foreground mb-8">New Dream</h1>
      <DreamForm onSubmit={handleSubmit} />
    </div>
  );
}
