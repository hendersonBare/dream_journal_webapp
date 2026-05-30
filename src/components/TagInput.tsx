"use client";

import { useState } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ tags, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const trimmed = value.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (input.trim()) addTag(input);
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-lg bg-surface border border-border focus-within:border-accent-purple transition-colors min-h-12">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-accent-purple/20 text-accent-lavender border border-accent-purple/30"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-accent-lavender/60 hover:text-accent-lavender transition-colors leading-none"
            aria-label={`Remove tag ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? "Add tags, press comma or Enter…" : ""}
        className="flex-1 min-w-32 bg-transparent outline-none text-sm text-foreground placeholder:text-muted"
      />
    </div>
  );
}
