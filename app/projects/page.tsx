"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Github,
  Sparkles,
  Shield,
  Globe,
  Newspaper,
  Route,
} from "lucide-react";

// Use RELATIVE import to avoid alias issues
import { projects } from "../../content/projects";

const buildTags = (items: typeof projects) => {
  const set = new Set<string>();
  items.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return ["All", ...Array.from(set).sort()];
};

function pickCover(p: (typeof projects)[number]) {
  // Supports either of these patterns in your data:
  // 1) p.image: "/projects/....png"  (you can add later)
  // 2) p.screenshots: ["..."]        (you can add later)
  const anyP = p as any;
  if (typeof anyP.image === "string" && anyP.image.trim()) return anyP.image;
  if (Array.isArray(p.screenshots) && p.screenshots.length > 0)
    return p.screenshots[0];
  return null;
}

function getProjectIcon(p: (typeof projects)[number]) {
  const tags = p.tags.map((t) => t.toLowerCase());
  const tech = p.tech.map((t) => t.toLowerCase());

  if (tags.includes("fraud") || tags.includes("risk")) return Shield;
  if (p.slug.includes("travel") || tags.includes("maps")) return Route;
  if (p.slug.includes("global-pr") || tags.includes("product")) return Globe;
  if (p.slug.includes("ai-news") || tags.includes("search")) return Newspaper;
  if (tech.includes("fastapi") || tech.includes("api")) return Sparkles;

  return Sparkles;
}

function CoverPlaceholder({ slug }: { slug: string }) {
  // Stable visual placeholder (no broken images)
  // Different gradients based on slug so cards don’t look identical
  const variant = slug.length % 4;

  const gradients = [
    "radial-gradient(650px 260px at 20% 15%, rgba(var(--primary), 0.22), transparent 60%), radial-gradient(620px 260px at 75% 25%, rgba(var(--primary), 0.14), transparent 55%)",
    "radial-gradient(700px 260px at 35% 20%, rgba(var(--primary), 0.20), transparent 60%), radial-gradient(620px 260px at 85% 15%, rgba(var(--primary), 0.12), transparent 55%)",
    "radial-gradient(680px 260px at 25% 10%, rgba(var(--primary), 0.18), transparent 60%), radial-gradient(640px 260px at 80% 30%, rgba(var(--primary), 0.16), transparent 55%)",
    "radial-gradient(720px 260px at 30% 25%, rgba(var(--primary), 0.16), transparent 60%), radial-gradient(610px 260px at 78% 18%, rgba(var(--primary), 0.18), transparent 55%)",
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        background: gradients[variant],
      }}
    />
  );
}

export default function ProjectsPage() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => buildTags(projects), []);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesTag = tag === "All" ? true : p.tags.includes(tag);
      if (!matchesTag) return false;

      if (!query) return true;

      const hay = [
        p.title,
        p.outcome,
        p.tags.join(" "),
        p.tech.join(" "),
        p.highlights.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(query);
    });
  }, [q, tag]);

  return (
    <div className="container-page pt-10 sm:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Projects
        </h1>
        <p className="muted mt-3 leading-relaxed">
          Fraud and risk analytics, full-stack data apps, and AI workflows. Filter
          and search to explore quickly.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mt-8 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div
          className="card-surface flex items-center gap-2 px-4 py-3 w-full lg:max-w-xl"
          style={{ background: "rgba(var(--card), 0.9)" }}
        >
          <Search size={18} className="opacity-70" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects (fraud, FastAPI, Next.js, NLP...)"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => {
            const active = t === tag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className="rounded-full px-3 py-2 text-sm border transition hover:opacity-90"
                style={{
                  borderColor: "rgb(var(--border))",
                  background: active ? "rgba(var(--primary), 0.14)" : "transparent",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p, idx) => {
          const cover = pickCover(p);
          const Icon = getProjectIcon(p);

          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="group card-surface overflow-hidden"
              style={{
                transform: "translateZ(0)",
              }}
            >
              {/* Thumbnail */}
              <div
                className="relative aspect-[16/9] border-b max-h-52"
                style={{
                  borderColor: "rgb(var(--border))",
                  background: "rgba(var(--card), 0.65)",
                }}
              >
                {!cover && <CoverPlaceholder slug={p.slug} />}

                {cover && (
                  <Image
                    src={cover}
                    alt={`${p.title} cover`}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                  />
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                {/* Icon badge */}
                <div
                  className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs"
                  style={{
                    borderColor: "rgb(var(--border))",
                    background: "rgba(var(--card), 0.85)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Icon size={14} />
                  <span className="muted">Project</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {p.title}
                    </h2>

                    <p className="muted mt-2 leading-relaxed line-clamp-3">
                      {p.outcome}
                    </p>
                  </div>

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-xl border p-2 transition hover:opacity-90"
                    style={{
                      borderColor: "rgb(var(--border))",
                      background: "rgba(var(--card), 0.7)",
                    }}
                    aria-label={`Open GitHub for ${p.title}`}
                    title="GitHub"
                  >
                    <Github size={18} />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs border"
                      style={{
                        borderColor: "rgb(var(--border))",
                        background: "rgba(var(--primary), 0.08)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 text-xs border opacity-90"
                      style={{ borderColor: "rgb(var(--border))" }}
                    >
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 6 && (
                    <span
                      className="rounded-full px-3 py-1 text-xs border muted"
                      style={{ borderColor: "rgb(var(--border))" }}
                    >
                      +{p.tech.length - 6} more
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                  >
                    View details <ArrowRight size={16} />
                  </Link>

                  <span className="muted text-xs">
                    {p.highlights.length} highlights
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 card-surface p-8 text-center">
          <p className="muted">
            No projects match your search. Try a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}
