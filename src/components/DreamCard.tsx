import Link from "next/link";
import type { DreamEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface DreamCardProps {
  dream: DreamEntry;
}

export default function DreamCard({ dream }: DreamCardProps) {
  return (
    <Link href={`/dream/${dream.id}`}>
      <article className="group p-5 rounded-xl border border-border bg-surface/80 backdrop-blur-sm hover:border-accent-purple/50 hover:bg-surface transition-all duration-200 cursor-pointer h-full">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-foreground group-hover:text-accent-lavender transition-colors line-clamp-1">
            {dream.title}
          </h2>
          <time className="text-xs text-muted shrink-0">{formatDate(dream.date)}</time>
        </div>
        <p className="text-sm text-muted line-clamp-3 font-serif leading-relaxed mb-3">
          {dream.body}
        </p>
        {dream.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {dream.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs bg-accent-purple/20 text-accent-lavender border border-accent-purple/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
