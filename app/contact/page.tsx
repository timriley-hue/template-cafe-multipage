import site from "@/content/site.json";
import hours from "@/content/hours.json";

export default function ContactPage() {
  return (
    <main>
      <h1>Find Us</h1>

      <section>
        <h2>Address</h2>
        <address>{site.address}</address>
        <p><a href={`tel:${site.phone}`}>{site.phone}</a></p>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </section>

      <section>
        <h2>Opening Hours</h2>
        <table>
          <tbody>
            {hours.hours.map((row) => (
              <tr key={row.days}>
                <td>{row.days}</td>
                <td>{row.open} – {row.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hours.notes && <p>{hours.notes}</p>}
      </section>

      <section>
        <h2>Send us a message</h2>
        {/* Contact form with Cloudflare Turnstile — to build */}
      </section>
    </main>
  );
}
