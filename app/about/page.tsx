import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function AboutPage() {
  const raw = readFileSync(join(process.cwd(), "content/about.md"), "utf-8");
  const paragraphs = raw.replace(/^#.*\n/, "").trim().split(/\n\n+/);

  return (
    <>
      <div className="bg-[var(--color-accent)]/30 border-b border-[var(--color-accent)]">
        <div className="max-w-2xl mx-auto px-4 py-14">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-2">Our story</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            About us
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-14">
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
}
