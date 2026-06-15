import Link from "next/link";

const sections = [
  { label: "Opening Hours", href: "/admin/hours", description: "Edit your opening times" },
  { label: "Menu", href: "/admin/menu", description: "Add, edit, or remove menu items and categories" },
  { label: "Blog", href: "/admin/blog", description: "Write and manage news posts" },
  { label: "FAQ", href: "/admin/faq", description: "Edit the questions on your homepage" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
        What would you like to update?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-xl border border-gray-100 p-6 hover:border-[var(--color-brand)] hover:shadow-sm transition-all"
          >
            <p className="font-semibold text-[var(--color-brand-dark)] mb-1">{s.label}</p>
            <p className="text-sm text-gray-500">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
