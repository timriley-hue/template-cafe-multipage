import type { Metadata } from "next";
import menu from "@/content/menu.json";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `Menu — ${site.name}` };

const dietaryColours: Record<string, string> = {
  vegan: "bg-green-100 text-green-800",
  vegetarian: "bg-lime-100 text-lime-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

export default function MenuPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-2 text-[var(--color-brand-dark)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Menu
      </h1>
      <p className="text-gray-500 text-sm mb-12">Prices include VAT. Menu changes seasonally.</p>

      <div className="space-y-14">
        {menu.categories.map((cat) => (
          <section key={cat.name}>
            <h2
              className="text-xl font-bold border-b-2 border-[var(--color-brand)] pb-2 mb-6 text-[var(--color-brand-dark)]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cat.name}
            </h2>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium">{item.name}</span>
                    {item.dietary.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${dietaryColours[tag] ?? "bg-gray-100 text-gray-700"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium whitespace-nowrap">£{item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-16 text-sm text-gray-400">
        Please let us know about any allergies before ordering. Full allergen information is available on request.
      </p>
    </div>
  );
}
