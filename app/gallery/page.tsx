import type { Metadata } from "next";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `Gallery — ${site.name}` };

export default function GalleryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-10 text-[var(--color-brand-dark)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Gallery
      </h1>
      {/* Drop client images into public/gallery/ and list them here */}
      <p className="text-gray-500">Photos coming soon.</p>
    </div>
  );
}
