"use client";

import { useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  defaultValue = "",
  onSearch,
  placeholder = "Search dreams…",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted outline-none focus:border-accent-purple transition-colors text-sm"
      />
      <button
        type="submit"
        className="px-5 py-2.5 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
