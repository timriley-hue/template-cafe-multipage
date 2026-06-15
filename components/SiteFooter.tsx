import Link from "next/link";
import site from "@/content/site.json";
import hours from "@/content/hours.json";

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-text)] mt-16">
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        <div>
          <p className="font-bold text-base mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            {site.name}
          </p>
          <address className="not-italic leading-relaxed opacity-80">
            {site.address}
          </address>
          <p className="mt-2 opacity-80">
            <a href={`tel:${site.phone}`} className="hover:opacity-100">{site.phone}</a>
          </p>
          <p className="opacity-80">
            <a href={`mailto:${site.email}`} className="hover:opacity-100">{site.email}</a>
          </p>
        </div>

        <div>
          <p className="font-bold mb-2">Opening Hours</p>
          <ul className="space-y-1 opacity-80">
            {hours.hours.map((row) => (
              <li key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span className="whitespace-nowrap">{row.open}–{row.close}</span>
              </li>
            ))}
          </ul>
          {hours.notes && <p className="mt-2 opacity-60 text-xs">{hours.notes}</p>}
        </div>

        <div>
          <p className="font-bold mb-2">Follow us</p>
          <div className="flex gap-4 opacity-80">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                Instagram
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs py-4 opacity-40">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="mt-1">
          <Link href="/privacy" className="hover:opacity-100">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}
