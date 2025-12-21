import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import { compileMdx } from "@/lib/mdx";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const MDX = await compileMdx(post.content);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-6">
        <Link href="/blog" className="text-sm underline opacity-80 hover:opacity-100">
          ← Back to Blog
        </Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{post.meta.title}</h1>
      <div className="mt-2 text-sm opacity-75">
        {post.meta.date}
        {post.meta.tags?.length ? (
          <>
            {" "}
            • {post.meta.tags.join(" • ")}
          </>
        ) : null}
      </div>

      <article className="prose prose-invert mt-8 max-w-none">
        <MDX />
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/blog");
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

