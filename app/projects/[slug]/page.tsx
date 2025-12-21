"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Image as ImageIcon } from "lucide-react";
import { projects } from "@/content/projects";

type Props = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <div className="container-page pt-10 sm:pt-14">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition hover:opacity-90"
            style={{ borderColor: "rgb(var(--border))" }}
          >
            <Github size={16} />
            GitHub
            <ExternalLink size={14} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-8"
      >
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="muted mt-3 leading-relaxed max-w-3xl">{project.outcome}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
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
      </motion.div>

      {/* Content grid */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main: screenshots + highlights */}
        <div className="lg:col-span-2 space-y-4">
          {/* Screenshots */}
          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg sm:text-xl font-semibold">Screenshots</h2>
              <span className="muted text-xs">
                {project.screenshots.length > 0
                  ? `${project.screenshots.length} image(s)`
                  : "Add images to show UI and results"}
              </span>
            </div>

            {project.screenshots.length === 0 ? (
              <div
                className="mt-4 rounded-2xl border p-8 flex items-center justify-center gap-3 muted"
                style={{ borderColor: "rgb(var(--border))" }}
              >
                <ImageIcon size={18} />
                <span className="text-sm">
                  No screenshots yet. Add files to{" "}
                  <code className="px-1 py-0.5 rounded border" style={{ borderColor: "rgb(var(--border))" }}>
                    public/projects/{project.slug}/
                  </code>{" "}
                  and list them in{" "}
                  <code className="px-1 py-0.5 rounded border" style={{ borderColor: "rgb(var(--border))" }}>
                    content/projects.ts
                  </code>
                  .
                </span>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.screenshots.map((src) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-2xl border"
                    style={{ borderColor: "rgb(var(--border))" }}
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        priority={false}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Highlights */}
          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold">Highlights</h2>
            <ul className="mt-4 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="muted leading-relaxed">
                  • {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar: tech stack */}
        <div className="space-y-4">
          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 text-xs border"
                  style={{ borderColor: "rgb(var(--border))" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold">Links</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition hover:opacity-90"
                style={{ borderColor: "rgb(var(--border))" }}
              >
                <span className="inline-flex items-center gap-2">
                  <Github size={16} /> GitHub repository
                </span>
                <ExternalLink size={16} className="opacity-70" />
              </a>
            </div>

            <p className="muted text-xs mt-3 leading-relaxed">
              If you have a live demo link later, we’ll add it here and on the Projects grid.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
