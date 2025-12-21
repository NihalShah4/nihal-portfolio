import { getAllPosts } from "@/lib/blog";
import BlogList from "./BlogList";

export default async function BlogPage() {
  const items = await getAllPosts();

  const allowedTags = Array.from(
    new Set(items.flatMap((p) => p.meta.tags ?? []))
  ).sort();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 opacity-80">
        Writing about AI, tech, data, career, and practical skills.
      </p>

      <div className="mt-6">
        <BlogList items={items} allowedTags={allowedTags} />
      </div>
    </main>
  );
}
