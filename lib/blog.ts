import fs from "node:fs/promises";
import path from "node:path";

export type BlogMeta = {
  title: string;
  date: string; // YYYY-MM-DD
  tags?: string[];
  description?: string;
};

export type BlogPost = {
  slug: string;
  meta: BlogMeta;
  content?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { meta: Partial<BlogMeta>; body: string } {
  const trimmed = raw.trimStart();

  // No frontmatter
  if (!trimmed.startsWith("---")) {
    return { meta: {}, body: raw };
  }

  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, body: raw };
  }

  const fmBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + "\n---".length).trimStart();

  const meta: Record<string, any> = {};
  for (const line of fmBlock.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // Remove surrounding quotes if any
    value = value.replace(/^["']|["']$/g, "");

    // Handle simple arrays: [a, b, c]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1).trim();
      meta[key] = inner
        ? inner.split(",").map((x) => x.trim().replace(/^["']|["']$/g, ""))
        : [];
    } else {
      meta[key] = value;
    }
  }

  return { meta, body };
}

function toArrayTags(tags: any): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(String);
  if (typeof tags === "string") {
    // allow "A, B, C" style too
    if (tags.includes(",")) return tags.split(",").map((t) => t.trim()).filter(Boolean);
    return [tags];
  }
  return [];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = [];

  for (const filename of mdxFiles) {
    const full = path.join(BLOG_DIR, filename);
    const raw = await fs.readFile(full, "utf8");

    const { meta } = parseFrontmatter(raw);

    const slug = filename.replace(/\.mdx$/, "");

    const normalized: BlogMeta = {
      title: String(meta.title ?? slug),
      date: String(meta.date ?? "1970-01-01"),
      tags: toArrayTags(meta.tags),
      description: meta.description ? String(meta.description) : undefined,
    };

    posts.push({ slug, meta: normalized });
  }

  // newest first
  posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<{ slug: string; meta: BlogMeta; content: string } | null> {
  const full = path.join(BLOG_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(full, "utf8");
    const { meta, body } = parseFrontmatter(raw);

    const normalized: BlogMeta = {
      title: String(meta.title ?? slug),
      date: String(meta.date ?? "1970-01-01"),
      tags: toArrayTags(meta.tags),
      description: meta.description ? String(meta.description) : undefined,
    };

    return { slug, meta: normalized, content: body };
  } catch {
    return null;
  }
}
