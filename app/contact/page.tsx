import type { Metadata } from "next";
import site from "@/content/site.json";
import hours from "@/content/hours.json";
import modules from "@/content/modules.json";

export const metadata: Metadata = { title: `Contact — ${site.name}` };

export default function ContactPage() {
  return (
    <>
      <div className="bg-[var(--color-accent)]/30 border-b border-[var(--color-accent)]">
        <div className="max-w-3xl mx-auto px-4 py-14">
          <p className="text-xs uppercase tracking-widest text-[var(--color-brand)] font-medium mb-2">Get in touch</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Find us
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Address</p>
            <address className="not-italic text-gray-700 leading-relaxed mb-5">{site.address}</address>
            <p className="mb-1">
              <a href={`tel:${site.phone}`} className="text-gray-700 hover:text-[var(--color-brand)] transition-colors">{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="text-gray-700 hover:text-[var(--color-brand)] transition-colors">{site.email}</a>
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-4">Opening Hours</p>
            <table className="w-full text-sm text-gray-700">
              <tbody>
                {hours.hours.map((row) => (
                  <tr key={row.days} className="border-b border-gray-100 last:border-0">
                    <td className="py-2.5 pr-4">{row.days}</td>
                    <td className="py-2.5 text-right font-medium">{row.open}–{row.close}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hours.notes && <p className="text-xs text-gray-400 mt-3">{hours.notes}</p>}
          </div>
        </div>

        {/* Google Map */}
        {modules.googleMap && (
          <div className="mb-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72">
            <iframe
              title="Map"
              width="100%"
              height="100%"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            />
          </div>
        )}

        {/* Contact form */}
        <div className="bg-[var(--color-accent)]/25 rounded-3xl p-8 md:p-10">
          <h2
            className="text-2xl font-bold mb-7 text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Send us a message
          </h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  id="name" name="name" type="text" required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                id="message" name="message" rows={5} required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition resize-none"
              />
            </div>
            {/* Cloudflare Turnstile widget goes here */}
            <button
              type="submit"
              className="bg-[var(--color-brand)] text-[var(--color-brand-text)] px-8 py-3.5 rounded-full font-medium hover:bg-[var(--color-brand-dark)] transition-colors text-sm"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
