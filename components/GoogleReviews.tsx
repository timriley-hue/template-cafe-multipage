import { getPlaceData } from "@/lib/google-places";
import site from "@/content/site.json";

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? "text-yellow-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default async function GoogleReviews() {
  const data = await getPlaceData(site.googlePlaceId);

  if (!data) return null;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2
            className="text-3xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What people say
          </h2>
          {/* Required Google attribution */}
          <a
            href={`https://search.google.com/local/reviews?placeid=${site.googlePlaceId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl font-bold text-gray-800">{data.rating.toFixed(1)}</span>
            <div>
              <Stars rating={Math.round(data.rating)} />
              <p className="text-xs text-gray-400">{data.totalRatings.toLocaleString()} reviews on Google</p>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.filter((r) => r.rating >= 4).map((review, i) => (
            <div key={i} className="bg-[var(--color-accent)]/20 rounded-xl p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-sm">{review.authorName}</p>
                  <p className="text-xs text-gray-400">{review.relativeTime}</p>
                </div>
                <Stars rating={review.rating} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{review.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-300 mt-6 text-center">Reviews sourced from Google</p>
      </div>
    </section>
  );
}
