import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function BlogAdminPage() {
  const supabase = await createClient();
  const clientId = process.env.CLIENT_ID;
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, published_at")
    .eq("client_id", clientId)
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Blog</h1>
        <Link
          href="/admin/blog/new"
          className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          New post
        </Link>
      </div>

      {(!posts || posts.length === 0) && <p className="text-gray-400 text-sm">No posts yet.</p>}

      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <Link
              href={`/admin/blog/${post.slug}`}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-4 hover:border-[var(--color-brand)] transition-colors"
            >
              <span className="font-medium text-sm">{post.title}</span>
              <span className="text-xs text-gray-400">
                {new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
