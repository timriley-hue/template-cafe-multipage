"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Post = { id?: string; slug: string; title: string; excerpt: string; content: string; published_at: string };

export default function PostEditor({ post, clientId, isNew }: { post: Post; clientId: string; isNew: boolean }) {
  const router = useRouter();
  const [values, setValues] = useState(post);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof Post, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    const supabase = createClient();

    if (isNew) {
      const { error } = await supabase.from("blog_posts").insert({ ...values, client_id: clientId });
      if (error) { setError(error.message); setSaving(false); return; }
    } else {
      const { error } = await supabase.from("blog_posts").update(values).eq("id", post.id);
      if (error) { setError(error.message); setSaving(false); return; }
    }

    router.push("/admin/blog");
    router.refresh();
  }

  async function deletePost() {
    if (!confirm("Delete this post?")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", post.id);
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input value={values.title} onChange={(e) => set("title", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
        <input value={values.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" value={values.published_at} onChange={(e) => set("published_at", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Short summary (shown on blog index)</label>
        <textarea rows={2} value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Post content</label>
        <textarea rows={16} value={values.content} onChange={(e) => set("content", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]" />
        <p className="text-xs text-gray-400 mt-1">Plain text. Separate paragraphs with a blank line.</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button onClick={save} disabled={saving}
          className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50">
          {saving ? "Saving…" : "Save post"}
        </button>
        {!isNew && (
          <button onClick={deletePost} className="text-sm text-red-400 hover:text-red-600">Delete</button>
        )}
      </div>
    </div>
  );
}
