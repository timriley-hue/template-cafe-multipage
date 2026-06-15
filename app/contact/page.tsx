import type { Metadata } from "next";
import site from "@/content/site.json";
import hours from "@/content/hours.json";

export const metadata: Metadata = { title: `Contact — ${site.name}` };

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1
        className="text-4xl font-bold mb-12 text-[var(--color-brand-dark)]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Find us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Address</h2>
          <address className="not-italic text-gray-700 leading-relaxed mb-4">{site.address}</address>
          <p className="text-gray-700">
            <a href={`tel:${site.phone}`} className="hover:text-[var(--color-brand)]">{site.phone}</a>
          </p>
          <p className="text-gray-700">
            <a href={`mailto:${site.email}`} className="hover:text-[var(--color-brand)]">{site.email}</a>
          </p>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Opening Hours</h2>
          <table className="w-full text-sm text-gray-700">
            <tbody>
              {hours.hours.map((row) => (
                <tr key={row.days} className="border-b border-gray-100 last:border-0">
                  <td className="py-2 pr-4">{row.days}</td>
                  <td className="py-2 text-right">{row.open}–{row.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {hours.notes && <p className="text-xs text-gray-400 mt-3">{hours.notes}</p>}
        </div>
      </div>

      {/* Contact form */}
      <div className="bg-[var(--color-accent)]/30 rounded-2xl p-8">
        <h2
          className="text-2xl font-bold mb-6 text-[var(--color-brand-dark)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Send us a message
        </h2>
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
          </div>
          {/* Cloudflare Turnstile widget goes here */}
          <button
            type="submit"
            className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors text-sm"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
