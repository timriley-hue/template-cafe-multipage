import homeContent from "@/content/home.json";
import site from "@/content/site.json";

export default function HomePage() {
  const { hero, faq } = homeContent;
  return (
    <main>
      <section>
        <h1>{hero.headline}</h1>
        <p>{hero.subheading}</p>
        <a href={hero.cta.href}>{hero.cta.label}</a>
      </section>

      <section>
        <h2>Opening Hours</h2>
        {/* Hours rendered from content/hours.json — see HoursTable component (to build) */}
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
