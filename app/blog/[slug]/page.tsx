import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import site from "@/content/site.json";
import { getAllPosts, getPost } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — ${site.name}`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const html = marked(post.content) as string;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <time className="text-xs text-gray-400 uppercase tracking-widest">
        {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </time>
      <h1 className="text-4xl font-bold mt-3 mb-10 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        {post.title}
      </h1>
      <div
        className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-5"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
