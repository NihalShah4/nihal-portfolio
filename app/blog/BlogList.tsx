"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type PostItem = {
  slug: string;
  meta?: {
    title?: string;
    date?: string; // YYYY-MM-DD recommended
    summary?: string;
    tags?: string[];
  };
};

type Props = {
  items: PostItem[];
  allowedTags?: string[];
};

const ALL_TAG = "All";

function formatDate(iso?: string) {
  if (!iso) return "";
  // If iso is YYYY-MM-DD, force local safe parsing
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function safeDateKey(iso?: string) {
  // For sorting newest first. Empty dates go last.
  return iso && typeof iso === "string" ? iso : "";
}

export default function BlogList({ items, allowedTags }: Props) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>(ALL_TAG);

  const tagOptions = useMemo(() => {
    const fromItems = new Set<string>();
    for (const p of items || []) {
      for (const t of p?.meta?.tags ?? []) fromItems.add(t);
    }

    const merged = new Set<string>([
      ...(allowedTags ?? []),
      ...Array.from(fromItems),
    ]);

    // Remove empties
    const finalTags = Array.from(merged)
      .map((t) => (t || "").trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    return [ALL_TAG, ...finalTags];
  }, [items, allowedTags]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return (items || [])
      // Drop broken items early
      .filter((p) => !!p && !!p.slug && !!p.meta?.title)
      .filter((p) => {
        const tagsArr = p.meta?.tags ?? [];
        const matchesTag =
          tag === ALL_TAG ? true : tagsArr.some((t) => t === tag);

        if (!matchesTag) return false;
        if (!query) return true;

        const hay = [
          p.meta?.title ?? "",
          p.meta?.summary ?? "",
          tagsArr.join(" "),
        ]
          .join(" ")
          .toLowerCase();

        return hay.includes(query);
      })
      // Newest first; missing dates go last
      .sort((a, b) => safeDateKey(b.meta?.date).localeCompare(safeDateKey(a.meta?.date)));
  }, [items, q, tag]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-xl">
          <label className="sr-only" htmlFor="blog-search">
            Search posts
          </label>
          <input
            id="blog-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts (fraud, FastAPI, Next.js, NLP...)"
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20 focus:bg-white/10"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tagOptions.map((t) => {
            const active = t === tag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={[
                  "rounded-full px-3 py-1 text-xs transition",
                  "border border-white/10",
                  active
                    ? "bg-white/15 text-white"
                    : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No posts found.
          </div>
        ) : (
          filtered.map((p) => {
            const meta = p.meta ?? {};
            const tagsArr = meta.tags ?? [];

            return (
              <article
                key={p.slug}
                className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white">
                      <Link className="hover:underline" href={`/blog/${p.slug}`}>
                        {meta.title}
                      </Link>
                    </h3>

                    {(meta.date || tagsArr.length > 0) && (
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/60">
                        {meta.date ? <span>{formatDate(meta.date)}</span> : null}
                        {tagsArr.length > 0 ? (
                          <span className="truncate">
                            {tagsArr.slice(0, 4).join(" · ")}
                          </span>
                        ) : null}
                      </div>
                    )}

                    {meta.summary ? (
                      <p className="mt-3 text-sm text-white/75">
                        {meta.summary}
                      </p>
                    ) : null}
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
