"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

type HoursRow = { id: string; days: string; open: string; close: string; sort_order: number };

export default function HoursEditor({ initialHours, clientId }: { initialHours: HoursRow[]; clientId: string }) {
  const [hours, setHours] = useState(initialHours);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(id: string, field: keyof HoursRow, value: string) {
    setHours((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const supabase = createClient();
    for (const row of hours) {
      await supabase.from("hours").update({ days: row.days, open: row.open, close: row.close }).eq("id", row.id);
    }
    setSaving(false);
    setSaved(true);
  }

  async function addRow() {
    const supabase = createClient();
    const { data } = await supabase
      .from("hours")
      .insert({ client_id: clientId, days: "", open: "", close: "", sort_order: hours.length })
      .select()
      .single();
    if (data) setHours((prev) => [...prev, data]);
  }

  async function removeRow(id: string) {
    const supabase = createClient();
    await supabase.from("hours").delete().eq("id", id);
    setHours((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-3">
      {hours.map((row) => (
        <div key={row.id} className="flex gap-3 items-center">
          <input
            value={row.days}
            onChange={(e) => update(row.id, "days", e.target.value)}
            placeholder="e.g. Monday – Friday"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
          <input
            value={row.open}
            onChange={(e) => update(row.id, "open", e.target.value)}
            placeholder="08:00"
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
          <input
            value={row.close}
            onChange={(e) => update(row.id, "close", e.target.value)}
            placeholder="17:00"
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
          <button onClick={() => removeRow(row.id)} className="text-gray-300 hover:text-red-400 text-lg leading-none">×</button>
        </div>
      ))}

      <button onClick={addRow} className="text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] mt-2">
        + Add row
      </button>

      <div className="pt-4 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-brand-dark)] transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-green-600">Saved</span>}
      </div>
    </div>
  );
}
