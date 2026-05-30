"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          Insomnia
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/" ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            Journal
          </Link>
          <Link
            href="/search"
            className={`text-sm transition-colors ${
              pathname === "/search" ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            Search
          </Link>
          <Link
            href="/new"
            className="px-4 py-2 rounded-lg bg-accent-purple text-white text-sm font-medium hover:bg-accent-purple/80 transition-colors"
          >
            + New Dream
          </Link>
        </nav>
      </div>
    </header>
  );
}
