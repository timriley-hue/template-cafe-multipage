import Link from "next/link";
import { existsSync } from "fs";
import { join } from "path";
import homeContent from "@/content/home.json";
import modules from "@/content/modules.json";
import GoogleReviews from "@/components/GoogleReviews";
import { getHours, getFaq } from "@/lib/content";

export default async function HomePage() {
  const { hero, faq } = homeContent;
  const hoursData = await getHours();
  const faqItems = await getFaq();
  const hasHeroImage = existsSync(join(process.cwd(), "public/hero.jpg")) ||
    existsSync(join(process.cwd(), "public/hero.webp")) ||
    existsSync(join(process.cwd(), "public/hero.png"));

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center min-h-[70vh] px-4 text-center"
        style={hasHeroImage ? {
          backgroundImage: "url('/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {}}
      >
        {hasHeroImage && <div className="absolute inset-0 bg-black/50" />}
        {!hasHeroImage && <div className="absolute inset-0 bg-[var(--color-accent)]" />}

        <div className="relative z-10 max-w-2xl mx-auto py-24">
          <h1
            className={`text-4xl md:text-6xl font-bold mb-5 leading-tight ${
              hasHeroImage ? "text-white" : "text-[var(--color-brand-dark)]"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {hero.headline}
          </h1>
          <p className={`text-lg md:text-xl mb-10 ${hasHeroImage ? "text-white/85" : "text-gray-600"}`}>
            {hero.subheading}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={hero.cta.href}
              className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors shadow-md"
            >
              {hero.cta.label}
            </Link>
            <Link
              href="/contact"
              className={`px-8 py-3.5 rounded-full font-medium transition-colors border-2 ${
                hasHeroImage
                  ? "border-white text-white hover:bg-white hover:text-[var(--color-brand-dark)]"
                  : "border-[var(--color-brand)] text-[var(--color-brand)] hover:bg-[var(--color-brand)] hover:text-[var(--color-brand-text)]"
              }`}
            >
              Find us
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${hasHeroImage ? "text-white/50" : "text-gray-400"}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </section>

      {/* Hours strip */}
      <section className="bg-[var(--color-brand)] text-[var(--color-brand-text)] py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-5 text-center font-medium">Opening Hours</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-center">
            {hoursData.hours.map((row) => (
              <div key={row.days} className="bg-white/10 rounded-xl px-4 py-4">
                <p className="font-semibold mb-0.5">{row.days}</p>
                <p className="opacity-75">{row.open}–{row.close}</p>
              </div>
            ))}
          </div>
          {hoursData.notes && (
            <p className="text-center text-xs opacity-40 mt-4">{hoursData.notes}</p>
          )}
        </div>
      </section>

      {/* Menu CTA */}
      <section className="py-24 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-4">What we serve</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-5 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Fresh every morning
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Espresso drinks, filter coffee, loose-leaf tea, and food made here each morning.
            Everything on the menu has a price next to it.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors"
          >
            View full menu
          </Link>
        </div>
      </section>

      {/* Google Reviews */}
      {modules.googleReviews && <GoogleReviews />}

      {/* FAQ */}
      <section className="py-24 px-4 bg-[var(--color-accent)]/25">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-4 text-center">FAQ</p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Good to know
          </h2>
          <dl className="space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <summary className="flex justify-between items-center px-6 py-5 cursor-pointer font-medium list-none text-[var(--color-brand-dark)]">
                  {item.question}
                  <span className="ml-4 text-[var(--color-brand)] text-xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">{item.answer}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
