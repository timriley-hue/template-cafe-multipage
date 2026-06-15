import type { Metadata } from "next";
import Link from "next/link";
import site from "@/content/site.json";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = { title: `News — ${site.name}` };

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        News
      </h1>

      {posts.length === 0 && <p className="text-gray-500">Nothing here yet.</p>}

      <ul className="space-y-10">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-gray-100 pb-10 last:border-0">
            <time className="text-xs text-gray-400 uppercase tracking-widest">
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <h2 className="text-2xl font-bold mt-2 mb-3 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              <Link href={`/blog/${post.slug}`} className="hover:text-[var(--color-brand)]">{post.title}</Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
              Read more →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
