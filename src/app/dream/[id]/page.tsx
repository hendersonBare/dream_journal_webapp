"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DreamEntry } from "@/lib/types";
import { LocalStorageAdapter } from "@/lib/storage/localStorage";
import { formatDate, formatDateTime } from "@/lib/utils";
import DreamForm from "@/components/DreamForm";

// TODO: Replace LocalStorageAdapter with DatabaseAdapter
const storage = new LocalStorageAdapter();

export default function DreamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [dream, setDream] = useState<DreamEntry | null>(null);
  const [editing, setEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // TODO: Add auth check here

  useEffect(() => {
    storage.getDream(id).then((entry) => {
      setDream(entry);
      setLoaded(true);
    });
  }, [id]);

  const handleEdit = async (data: Omit<DreamEntry, "id" | "createdAt" | "updatedAt">) => {
    if (!dream) return;
    const updated: DreamEntry = {
      ...dream,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    await storage.saveDream(updated);
    setDream(updated);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!dream) return;
    if (!confirm(`Delete "${dream.title}"? This cannot be undone.`)) return;
    await storage.deleteDream(dream.id);
    router.push("/");
  };

  if (!loaded) {
    return (
      <div className="flex justify-center py-20">
        <span className="text-muted text-sm">Loading…</span>
      </div>
    );
  }

  if (!dream) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-muted text-sm mb-4">Dream not found.</p>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-accent-lavender hover:underline"
        >
          Back to journal
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-foreground">Edit Dream</h1>
          <button
            onClick={() => setEditing(false)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Cancel
          </button>
        </div>
        <DreamForm initialValues={dream} onSubmit={handleEdit} submitLabel="Save Changes" />
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground mb-1">{dream.title}</h1>
          <time className="text-sm text-muted">{formatDate(dream.date)}</time>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="px-4 py-2 rounded-lg text-sm border border-border text-muted hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg text-sm border border-red-900/50 text-red-400 hover:bg-red-900/20 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-surface/80 backdrop-blur-sm mb-5">
        <p className="font-serif text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {dream.body}
        </p>
      </div>

      {dream.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {dream.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs bg-accent-purple/20 text-accent-lavender border border-accent-purple/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-muted/60">Updated {formatDateTime(dream.updatedAt)}</p>
    </article>
  );
}
