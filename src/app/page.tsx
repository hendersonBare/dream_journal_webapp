"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DreamEntry } from "@/lib/types";
import { LocalStorageAdapter } from "@/lib/storage/localStorage";
import DreamCard from "@/components/DreamCard";

// TODO: Replace LocalStorageAdapter with DatabaseAdapter
const storage = new LocalStorageAdapter();

export default function Dashboard() {
  const [dreams, setDreams] = useState<DreamEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    storage.getAllDreams().then((data) => {
      setDreams(data);
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Your Journal</h1>
          {loaded && (
            <p className="text-xs text-muted mt-1">
              {dreams.length} {dreams.length === 1 ? "dream" : "dreams"} recorded
            </p>
          )}
        </div>
        <Link
          href="/new"
          className="px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors"
        >
          + New Dream
        </Link>
      </div>

      {!loaded ? (
        <div className="flex justify-center py-20">
          <span className="text-muted text-sm">Loading…</span>
        </div>
      ) : dreams.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4 select-none">🌙</div>
          <h2 className="text-base font-medium text-foreground mb-2">No dreams yet</h2>
          <p className="text-sm text-muted mb-6">
            Start recording your dreams before they fade.
          </p>
          <Link
            href="/new"
            className="px-5 py-2.5 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors"
          >
            Record your first dream
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {dreams.map((dream) => (
            <DreamCard key={dream.id} dream={dream} />
          ))}
        </div>
      )}
    </div>
  );
}
