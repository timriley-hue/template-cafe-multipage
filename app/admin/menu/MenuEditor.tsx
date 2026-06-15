"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

type Category = { id: string; name: string; sort_order: number };
type Item = { id: string; category_id: string; name: string; price: string; dietary: string[]; sort_order: number };

export default function MenuEditor({
  initialCategories, initialItems, clientId,
}: {
  initialCategories: Category[];
  initialItems: Item[];
  clientId: string;
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [items, setItems] = useState(initialItems);

  async function addCategory() {
    const supabase = createClient();
    const { data } = await supabase
      .from("menu_categories")
      .insert({ client_id: clientId, name: "New category", sort_order: categories.length })
      .select().single();
    if (data) setCategories((prev) => [...prev, data]);
  }

  async function updateCategory(id: string, name: string) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
    const supabase = createClient();
    await supabase.from("menu_categories").update({ name }).eq("id", id);
  }

  async function removeCategory(id: string) {
    const supabase = createClient();
    await supabase.from("menu_categories").delete().eq("id", id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setItems((prev) => prev.filter((i) => i.category_id !== id));
  }

  async function addItem(categoryId: string) {
    const supabase = createClient();
    const catItems = items.filter((i) => i.category_id === categoryId);
    const { data } = await supabase
      .from("menu_items")
      .insert({ client_id: clientId, category_id: categoryId, name: "", price: "", dietary: [], sort_order: catItems.length })
      .select().single();
    if (data) setItems((prev) => [...prev, data]);
  }

  async function updateItem(id: string, field: keyof Item, value: string | string[]) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    const supabase = createClient();
    await supabase.from("menu_items").update({ [field]: value }).eq("id", id);
  }

  async function removeItem(id: string) {
    const supabase = createClient();
    await supabase.from("menu_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-5">
            <input
              value={cat.name}
              onChange={(e) => updateCategory(cat.id, e.target.value)}
              className="flex-1 text-lg font-semibold border-b border-gray-200 pb-1 focus:outline-none focus:border-[var(--color-brand)]"
            />
            <button onClick={() => removeCategory(cat.id)} className="text-gray-300 hover:text-red-400 text-sm">Remove section</button>
          </div>

          <div className="space-y-3">
            {items.filter((i) => i.category_id === cat.id).map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <input
                  value={item.name}
                  onChange={(e) => updateItem(item.id, "name", e.target.value)}
                  placeholder="Item name"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                />
                <input
                  value={item.price}
                  onChange={(e) => updateItem(item.id, "price", e.target.value)}
                  placeholder="0.00"
                  className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                />
                <input
                  value={item.dietary.join(", ")}
                  onChange={(e) => updateItem(item.id, "dietary", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                  placeholder="vegan, gf…"
                  className="w-32 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                />
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 text-lg leading-none">×</button>
              </div>
            ))}
          </div>

          <button onClick={() => addItem(cat.id)} className="mt-4 text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
            + Add item
          </button>
        </div>
      ))}

      <button
        onClick={addCategory}
        className="border-2 border-dashed border-gray-200 rounded-xl px-6 py-4 text-sm text-gray-400 hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors w-full"
      >
        + Add section
      </button>
    </div>
  );
}
