import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  const raw = readFileSync(join(process.cwd(), "content/about.md"), "utf-8");
  const paragraphs = raw
    .replace(/^#.*\n/, "")
    .trim()
    .split(/\n\n+/);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-10 text-[var(--color-brand-dark)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        About us
      </h1>
      <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
