import Link from "next/link";
import homeContent from "@/content/home.json";
import modules from "@/content/modules.json";
import GoogleReviews from "@/components/GoogleReviews";
import { getHours, getFaq } from "@/lib/content";

export default async function HomePage() {
  const { hero } = homeContent;
  const hoursData = await getHours();
  const faq = await getFaq();

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-accent)] py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            {hero.headline}
          </h1>
          <p className="text-lg text-gray-700 mb-8">{hero.subheading}</p>
          <Link href={hero.cta.href} className="inline-block bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors">
            {hero.cta.label}
          </Link>
        </div>
      </section>

      {/* Hours strip */}
      <section className="bg-[var(--color-brand)] text-[var(--color-brand-text)] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4 text-center">Opening Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-center">
            {hoursData.hours.map((row) => (
              <div key={row.days} className="bg-white/10 rounded-lg px-4 py-3">
                <p className="font-medium">{row.days}</p>
                <p className="opacity-80">{row.open}–{row.close}</p>
              </div>
            ))}
          </div>
          {hoursData.notes && <p className="text-center text-xs opacity-50 mt-3">{hoursData.notes}</p>}
        </div>
      </section>

      {/* Menu CTA */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            What we serve
          </h2>
          <p className="text-gray-600 mb-8">
            Espresso drinks, filter coffee, loose-leaf tea, and food made fresh each morning. Everything on the menu has a price next to it.
          </p>
          <Link href="/menu" className="inline-block border-2 border-[var(--color-brand)] text-[var(--color-brand)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand)] hover:text-[var(--color-brand-text)] transition-colors">
            View full menu
          </Link>
        </div>
      </section>

      {/* Google Reviews */}
      {modules.googleReviews && <GoogleReviews />}

      {/* FAQ */}
      <section className="py-20 px-4 bg-[var(--color-accent)]/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-[var(--color-brand-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Good to know
          </h2>
          <dl className="space-y-4">
            {faq.map((item) => (
              <details key={item.question} className="group bg-white rounded-xl shadow-sm border border-gray-100">
                <summary className="flex justify-between items-center px-6 py-4 cursor-pointer font-medium list-none">
                  {item.question}
                  <span className="ml-4 text-[var(--color-brand)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 text-sm">{item.answer}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
