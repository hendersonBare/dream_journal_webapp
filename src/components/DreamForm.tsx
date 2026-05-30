"use client";

import { useState } from "react";
import type { DreamEntry } from "@/lib/types";
import { today } from "@/lib/utils";
import TagInput from "./TagInput";

interface DreamFormProps {
  initialValues?: Partial<DreamEntry>;
  onSubmit: (data: Omit<DreamEntry, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  submitLabel?: string;
}

export default function DreamForm({
  initialValues,
  onSubmit,
  submitLabel = "Save Dream",
}: DreamFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [date, setDate] = useState(initialValues?.date ?? today());
  const [body, setBody] = useState(initialValues?.body ?? "");
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    try {
      await onSubmit({ title: title.trim(), date, body: body.trim(), tags });
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted outline-none focus:border-accent-purple transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Leave blank to auto-name…"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="px-4 py-3 rounded-lg bg-surface border border-border text-foreground outline-none focus:border-accent-purple transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Dream</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Describe your dream in as much detail as you can remember…"
          required
          rows={12}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted outline-none focus:border-accent-purple transition-colors font-serif text-sm leading-relaxed resize-y"
        />
      </div>

      <div>
        <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Tags</label>
        <TagInput tags={tags} onChange={setTags} />
      </div>

      <button
        type="submit"
        disabled={saving || !body.trim()}
        className="w-full py-3 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {saving ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
