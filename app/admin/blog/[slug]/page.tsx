import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import PostEditor from "../PostEditor";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const clientId = process.env.CLIENT_ID!;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, published_at")
    .eq("client_id", clientId)
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        Edit post
      </h1>
      <PostEditor post={{ ...post, published_at: post.published_at }} clientId={clientId} isNew={false} />
    </div>
  );
}
