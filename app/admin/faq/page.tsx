import { createClient } from "@/lib/supabase-server";
import FaqEditor from "./FaqEditor";

export default async function FaqAdminPage() {
  const supabase = await createClient();
  const clientId = process.env.CLIENT_ID!;
  const { data: items } = await supabase
    .from("faq_items")
    .select("id, question, answer, sort_order")
    .eq("client_id", clientId)
    .order("sort_order");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        FAQ
      </h1>
      <FaqEditor initialItems={items ?? []} clientId={clientId} />
    </div>
  );
}
