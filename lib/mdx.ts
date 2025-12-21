import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export type Frontmatter = {
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
};

export function parseFrontmatter(source: string): {
  meta: Frontmatter;
  content: string;
} {
  // Minimal frontmatter parser (no extra dependency)
  // Expects:
  // ---
  // title: ...
  // date: 2025-12-19
  // summary: ...
  // tags: [Tech, Data]
  // ---
  const trimmed = source.trimStart();

  if (!trimmed.startsWith("---")) {
    throw new Error("Missing frontmatter. Add --- at the top of the MDX file.");
  }

  const end = trimmed.indexOf("\n---", 3);
  if (end === -1) {
    throw new Error("Frontmatter not closed. Add --- to close it.");
  }

  const fmBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 4).trimStart(); // after "\n---"

  const lines = fmBlock
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const obj: Record<string, string> = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    obj[key] = value;
  }

  const title = (obj.title || "").replace(/^"|"$/g, "").trim();
  const date = (obj.date || "").replace(/^"|"$/g, "").trim();
  const summary = (obj.summary || "").replace(/^"|"$/g, "").trim();

  let tags: string[] = [];
  const tagsRaw = (obj.tags || "").trim();

  // tags: [A, B, C]
  if (tagsRaw.startsWith("[") && tagsRaw.endsWith("]")) {
    tags = tagsRaw
      .slice(1, -1)
      .split(",")
      .map((t) => t.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
  } else if (tagsRaw) {
    // tags: A,B,C
    tags = tagsRaw
      .split(",")
      .map((t) => t.trim().replace(/^"|"$/g, ""))
      .filter(Boolean);
  }

  if (!title || !date || !summary) {
    throw new Error(
      "Frontmatter must include title, date, summary (and optionally tags)."
    );
  }

  return {
    meta: { title, date, summary, tags },
    content: body,
  };
}

export async function compileMdx(source: string) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: process.env.NODE_ENV === "development",
  });

  const code = String(compiled);

  // Turn compiled function-body into a usable component
  const fn = new Function(String(code));
  const MDXContent = fn({ ...runtime }).default;
  return MDXContent as React.ComponentType;
}
