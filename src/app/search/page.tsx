"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { DreamEntry } from "@/lib/types";
import { LocalStorageAdapter } from "@/lib/storage/localStorage";
import DreamCard from "@/components/DreamCard";
import SearchBar from "@/components/SearchBar";

// TODO: Replace LocalStorageAdapter with DatabaseAdapter
const storage = new LocalStorageAdapter();

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") ?? "";

  const [results, setResults] = useState<DreamEntry[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!q) {
      setResults([]);
      setSearched(false);
      return;
    }
    // TODO: Replace substring search with vector similarity search
    storage.searchDreams(q).then((data) => {
      setResults(data);
      setSearched(true);
    });
  }, [q]);

  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground mb-6">Search Dreams</h1>
      <div className="mb-8">
        <SearchBar key={q} defaultValue={q} onSearch={handleSearch} />
      </div>

      {searched && (
        <div>
          <p className="text-xs text-muted mb-4 uppercase tracking-wider">
            {results.length === 0
              ? `No results for "${q}"`
              : `${results.length} result${results.length === 1 ? "" : "s"}`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((dream) => (
              <DreamCard key={dream.id} dream={dream} />
            ))}
          </div>
        </div>
      )}

      {!searched && !q && (
        <p className="text-sm text-muted text-center py-12">
          Search by title, content, or tag.
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <span className="text-muted text-sm">Loading…</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
