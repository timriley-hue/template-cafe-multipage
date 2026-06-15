import { NextResponse } from "next/server";
import site from "@/content/site.json";
import hours from "@/content/hours.json";
import modules from "@/content/modules.json";

export async function GET() {
  const { getMenu, getFaq } = await import("@/lib/content");
  const menu = await getMenu();
  const faq = await getFaq();

  const menuSummary = menu.categories
    .map((cat) => {
      const items = cat.items.map((i) => `  - ${i.name} £${i.price}${i.dietary.length ? ` (${i.dietary.join(", ")})` : ""}`).join("\n");
      return `### ${cat.name}\n${items}`;
    })
    .join("\n\n");

  const hoursSummary = hours.hours
    .map((r) => `- ${r.days}: ${r.open}–${r.close}`)
    .join("\n");

  const faqSummary = faq
    .map((f) => `**${f.question}**\n${f.answer}`)
    .join("\n\n");

  const pages = [
    "- [Home](/): Opening hours, menu highlights, FAQ",
    "- [Menu](/menu): Full menu with prices and dietary information",
    "- [About](/about): About the cafe",
    modules.gallery ? "- [Gallery](/gallery): Photos" : null,
    modules.blog ? "- [News](/blog): Latest news and updates" : null,
    "- [Contact](/contact): Address, opening hours, and contact form",
  ]
    .filter(Boolean)
    .join("\n");

  const text = `# ${site.name}

> ${site.tagline}

${site.name} is an independent cafe located at ${site.address}.

## Contact

- Address: ${site.address}
- Phone: ${site.phone}
- Email: ${site.email}

## Opening Hours

${hoursSummary}
${hours.notes ? `\n${hours.notes}` : ""}

## Pages

${pages}

## Menu

${menuSummary}

## Frequently Asked Questions

${faqSummary}
`;

  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
