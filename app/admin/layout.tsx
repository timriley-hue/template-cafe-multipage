import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import site from "@/content/site.json";

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Hours", href: "/admin/hours" },
  { label: "Menu", href: "/admin/menu" },
  { label: "Blog", href: "/admin/blog" },
  { label: "FAQ", href: "/admin/faq" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[var(--color-brand-dark)] text-[var(--color-brand-text)] flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>{site.name}</p>
          <p className="text-xs opacity-50 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10">
          <Link href="/" className="text-xs opacity-50 hover:opacity-100">← Back to site</Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
