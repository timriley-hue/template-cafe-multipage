import PostEditor from "../PostEditor";

export default function NewPostPage() {
  const clientId = process.env.CLIENT_ID!;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        New post
      </h1>
      <PostEditor
        post={{ slug: "", title: "", excerpt: "", content: "", published_at: today }}
        clientId={clientId}
        isNew={true}
      />
    </div>
  );
}
