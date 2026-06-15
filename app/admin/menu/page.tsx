import { createClient } from "@/lib/supabase-server";
import MenuEditor from "./MenuEditor";

export default async function MenuPage() {
  const supabase = await createClient();
  const clientId = process.env.CLIENT_ID;

  const { data: cats } = await supabase
    .from("menu_categories")
    .select("id, name, sort_order")
    .eq("client_id", clientId)
    .order("sort_order");

  const { data: items } = await supabase
    .from("menu_items")
    .select("id, category_id, name, price, dietary, sort_order")
    .eq("client_id", clientId)
    .order("sort_order");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        Menu
      </h1>
      <MenuEditor initialCategories={cats ?? []} initialItems={items ?? []} clientId={clientId!} />
    </div>
  );
}
