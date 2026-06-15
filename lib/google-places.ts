export type PlaceReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

export type PlaceData = {
  rating: number;
  totalRatings: number;
  reviews: PlaceReview[];
};

let cache: { data: PlaceData; fetchedAt: number } | null = null;
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export async function getPlaceData(placeId: string): Promise<PlaceData | null> {
  if (!process.env.GOOGLE_PLACES_API_KEY || placeId === "REPLACE_WITH_GOOGLE_PLACE_ID") {
    return null;
  }

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
    return cache.data;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,reviews&languageCode=en`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 21600 }, // 6 hours in Next.js cache
    });

    if (!res.ok) return null;

    const json = await res.json();

    const data: PlaceData = {
      rating: json.rating ?? 0,
      totalRatings: json.userRatingCount ?? 0,
      reviews: (json.reviews ?? []).slice(0, 5).map((r: any) => ({
        authorName: r.authorAttribution?.displayName ?? "Anonymous",
        rating: r.rating ?? 5,
        text: r.text?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
      })),
    };

    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch {
    return null;
  }
}
