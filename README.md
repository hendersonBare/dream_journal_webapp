# Insomnia — Dream Journal

A personal dream journal web app built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Record dreams with title, date, body, and tags
- Browse entries on a dashboard
- Full-text search across title, body, and tags
- Inline editing and deletion
- Auto-names untitled dreams (dream1, dream2, …)

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Storage:** localStorage (v1) via a `StorageAdapter` interface — designed to swap in a database later

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
