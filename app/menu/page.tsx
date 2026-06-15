import type { Metadata } from "next";
import site from "@/content/site.json";
import { getMenu } from "@/lib/content";

export const metadata: Metadata = { title: `Menu — ${site.name}` };

const dietaryColours: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-lime-100 text-lime-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

export default async function MenuPage() {
  const menu = await getMenu();

  return (
    <>
      {/* Page header */}
      <div className="bg-[var(--color-accent)]/30 border-b border-[var(--color-accent)]">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-2">What we serve</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Menu
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-sm text-gray-400 mb-14">Prices include VAT. Menu changes seasonally.</p>

        <div className="space-y-16">
          {menu.categories.map((cat) => (
            <section key={cat.name}>
              <h2
                className="text-2xl font-bold pb-3 mb-7 border-b-2 border-[var(--color-brand)] text-[var(--color-brand-dark)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {cat.name}
              </h2>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-4 group">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${dietaryColours[tag] ?? "bg-gray-100 text-gray-600"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-700 font-semibold whitespace-nowrap">£{item.price}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-16 text-sm text-gray-400 border-t border-gray-100 pt-8">
          Please let us know about any allergies before ordering. Full allergen information is available on request.
        </p>
      </div>
    </>
  );
}
