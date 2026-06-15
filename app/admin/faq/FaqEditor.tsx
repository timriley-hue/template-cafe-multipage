"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

type FaqItem = { id: string; question: string; answer: string; sort_order: number };

export default function FaqEditor({ initialItems, clientId }: { initialItems: FaqItem[]; clientId: string }) {
  const [items, setItems] = useState(initialItems);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(id: string, field: "question" | "answer", value: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const supabase = createClient();
    for (const item of items) {
      await supabase.from("faq_items").update({ question: item.question, answer: item.answer }).eq("id", item.id);
    }
    setSaving(false);
    setSaved(true);
  }

  async function addItem() {
    const supabase = createClient();
    const { data } = await supabase
      .from("faq_items")
      .insert({ client_id: clientId, question: "", answer: "", sort_order: items.length })
      .select().single();
    if (data) setItems((prev) => [...prev, data]);
  }

  async function removeItem(id: string) {
    const supabase = createClient();
    await supabase.from("faq_items").delete().eq("id", id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-5 space-y-3">
          <div className="flex gap-3 items-start">
            <div className="flex-1 space-y-3">
              <input
                value={item.question}
                onChange={(e) => update(item.id, "question", e.target.value)}
                placeholder="Question"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
              <textarea
                value={item.answer}
                onChange={(e) => update(item.id, "answer", e.target.value)}
                placeholder="Answer"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
            </div>
            <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 text-lg leading-none mt-1">×</button>
          </div>
        </div>
      ))}

      <button onClick={addItem} className="text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]">
        + Add question
      </button>

      <div className="pt-4 flex items-center gap-4">
        <button onClick={save} disabled={saving}
          className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50">
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved</span>}
      </div>
    </div>
  );
}
