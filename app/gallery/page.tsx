import type { Metadata } from "next";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import Image from "next/image";
import site from "@/content/site.json";

export const metadata: Metadata = { title: `Gallery — ${site.name}` };

export default function GalleryPage() {
  const galleryDir = join(process.cwd(), "public/gallery");
  const images = existsSync(galleryDir)
    ? readdirSync(galleryDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    : [];

  return (
    <>
      <div className="bg-[var(--color-accent)]/30 border-b border-[var(--color-accent)]">
        <div className="max-w-5xl mx-auto px-4 py-14">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-2">Photos</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Gallery
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img} className="aspect-square relative rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={`/gallery/${img}`}
                  alt=""
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          /* Placeholder grid — looks intentional, not broken */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-[var(--color-accent)]/40 flex items-center justify-center"
              >
                <svg className="w-8 h-8 text-[var(--color-brand)]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-6">
          {images.length === 0
            ? "Drop client photos into public/gallery/ — they will appear here automatically."
            : `${images.length} photo${images.length !== 1 ? "s" : ""}`}
        </p>
      </div>
    </>
  );
}
