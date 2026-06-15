import { createClient } from "@/lib/supabase-server";
import HoursEditor from "./HoursEditor";

export default async function HoursPage() {
  const supabase = await createClient();
  const clientId = process.env.CLIENT_ID;
  const { data: hours } = await supabase
    .from("hours")
    .select("id, days, open, close, sort_order")
    .eq("client_id", clientId)
    .order("sort_order");

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        Opening Hours
      </h1>
      <HoursEditor initialHours={hours ?? []} clientId={clientId!} />
    </div>
  );
}
