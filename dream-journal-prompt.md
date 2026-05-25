# Claude Code Prompt: Dream Journal Web App

## Project Overview

Build a dream journal web application called "Insomnia" where users can record, save, browse, and search their dreams. Use a stack that starts simple and free to host but supports adding authentication, a database, and AI features later.

## Architecture

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Data persistence (v1):** localStorage via a `StorageAdapter` interface. All reads/writes go through this adapter so I can swap in a real database later without changing component code.
- **Hosting target:** Vercel free tier (works out of the box with Next.js)

### StorageAdapter interface

Define a TypeScript interface like this and implement a `LocalStorageAdapter` class:

```typescript
interface DreamEntry {
  id: string;           // uuid
  title: string;
  body: string;
  date: string;         // ISO 8601 date (YYYY-MM-DD)
  tags: string[];
  createdAt: string;    // ISO 8601 datetime
  updatedAt: string;    // ISO 8601 datetime
}

interface StorageAdapter {
  saveDream(entry: DreamEntry): Promise<void>;
  getDream(id: string): Promise<DreamEntry | null>;
  getAllDreams(): Promise<DreamEntry[]>;
  deleteDream(id: string): Promise<void>;
  searchDreams(query: string): Promise<DreamEntry[]>;
}
```

The `searchDreams` method in v1 should do basic substring matching on title, body, and tags. This will be replaced with vector/semantic search later.

## Pages & Features

### 1. `/` — Dashboard
- Show a calendar-style or chronological list of recent dream entries
- Display total dream count
- Quick-add button that navigates to the new entry page

### 2. `/new` — New Dream Entry
- Form fields: title, date (default to today), body (multiline textarea), tags (comma-separated input that renders as pills)
- Save button that writes through the StorageAdapter
- After save, redirect to the dashboard

### 3. `/dream/[id]` — View Single Dream
- Display the full dream entry
- Edit and delete buttons
- Edit mode: inline editing of all fields, save/cancel

### 4. `/search` — Search Dreams
- Single search input
- Results displayed as cards below
- Uses `StorageAdapter.searchDreams()`

## Design Direction

- Dark theme by default. Use deep navy/charcoal backgrounds (#0a0e1a or similar) with muted purple and blue accent tones. The vibe is nighttime, not neon.
- Typography: use a serif or semi-serif font for dream body text to feel like a journal. Use a clean sans-serif for UI elements.
- Minimal animations. Subtle fade-ins on page transitions are acceptable. No bouncing, no parallax.
- Cards for dream entries should have a slight frosted-glass effect (backdrop-blur + semi-transparent background).
- Mobile-first responsive layout.

## File Structure

```
src/
  app/
    layout.tsx
    page.tsx           # dashboard
    new/page.tsx       # new entry
    dream/[id]/page.tsx # view/edit single dream
    search/page.tsx    # search
  lib/
    types.ts           # DreamEntry, StorageAdapter interface
    storage/
      adapter.ts       # StorageAdapter interface export
      localStorage.ts  # LocalStorageAdapter implementation
    utils.ts           # id generation, date formatting helpers
  components/
    DreamCard.tsx       # card component used on dashboard and search results
    DreamForm.tsx       # reusable form for create/edit
    TagInput.tsx        # tag pill input component
    SearchBar.tsx       # search input component
    Header.tsx          # site header/nav
```

## Constraints

- No backend API routes in v1. Everything client-side.
- Mark all page components that use localStorage or React state as `"use client"`.
- Do not install a database, ORM, or auth library yet. The StorageAdapter pattern is the preparation for that.
- Use `crypto.randomUUID()` for generating entry IDs.
- Keep total dependencies minimal: just Next.js, React, Tailwind, and TypeScript.

## What NOT to build yet

- User authentication (will add later via NextAuth or Clerk)
- Server-side database (will add later via Supabase or PlanetScale + Prisma)
- Semantic/vector search (will add later via OpenAI embeddings + Pinecone or pg_vector)
- Theme analysis (will add later via LLM API calls)

Leave TODO comments in the code at the points where these features will plug in:
- `// TODO: Replace LocalStorageAdapter with DatabaseAdapter`
- `// TODO: Add auth check here`
- `// TODO: Replace substring search with vector similarity search`
- `// TODO: Add theme analysis trigger after save`
