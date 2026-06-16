# template-cafe-multipage

PageNest multi-page cafe website template — the full offering. Separate pages for menu, about, gallery, blog, and contact. Includes Google Reviews, optional Google Maps embed, and an optional Supabase-backed admin panel so clients can self-edit their content.

---

## Overview

This template gives you a complete multi-page cafe site with:
- Home page with hero, hours, Google Reviews, and FAQ
- Dedicated Menu, About, Gallery, Blog/News, and Contact pages
- Google Maps embed on the Contact page (optional)
- Client self-editing admin panel via Supabase (optional, Tier 2 upsell)

Everything a client needs to fill in is in the `content/` folder. Per-client connections (contact form, analytics, Google Reviews API key, Supabase) are added when setting up their specific site — not in the template itself.

---

## Step 1 — Create the client repo

1. Go to [github.com/timriley-hue/template-cafe-multipage](https://github.com/timriley-hue/template-cafe-multipage)
2. Click **Use this template → Create a new repository**
3. Name it `cafe-[client-slug]` — e.g. `cafe-brunch-and-brew`
4. Set it to **Private**
5. Clone it to your machine:

```bash
git clone https://github.com/timriley-hue/cafe-[client-slug].git
cd cafe-[client-slug]
npm install
```

---

## Step 2 — Start the dev server

```bash
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001). You'll see the template with placeholder content — this is your working preview as you customise.

---

## Step 3 — Extract the client's brand

If the client has an existing website, run:

```bash
npm run extract-brand https://theircurrentwebsite.co.uk
```

This fetches their site, identifies their colours and fonts, and walks you through mapping them to the theme. It writes `content/theme.json` automatically and shows you the logo URL so you can download it manually.

If they have no existing website, edit `content/theme.json` directly:

```json
{
  "colorBrand": "#2c5f2e",
  "colorAccent": "#f5e6c8",
  "colorBrandDark": "#1a3d1b",
  "colorBrandText": "#ffffff",
  "fontHeadingFamily": "Playfair Display",
  "fontBodyFamily": "Inter"
}
```

- `colorBrand` — main brand colour (header, buttons, accents)
- `colorAccent` — light background tint used in section backgrounds
- `colorBrandDark` — darker shade used on hover and headings
- `colorBrandText` — text colour on top of the brand colour (usually white)
- `fontHeadingFamily` / `fontBodyFamily` — any Google Fonts family name

---

## Step 4 — Fill in the client's details

**`content/site.json`** — the basics:

```json
{
  "name": "The Coffee House",
  "tagline": "Great coffee, good people.",
  "address": "1 High Street, Tenterden, Kent TN30 6AA",
  "phone": "01580 000000",
  "email": "hello@thecoffeehouse.co.uk",
  "googlePlaceId": "",
  "social": {
    "instagram": "https://instagram.com/...",
    "facebook": "https://facebook.com/..."
  }
}
```

Leave `googlePlaceId` and `fhrsId` empty for now — you'll fill them in at Steps 6 and 7.

**`content/hours.json`** — opening times:

```json
{
  "hours": [
    { "days": "Monday–Friday", "open": "8:00", "close": "17:00" },
    { "days": "Saturday", "open": "8:30", "close": "17:00" },
    { "days": "Sunday", "open": "9:00", "close": "16:00" }
  ],
  "notes": "Closed bank holidays"
}
```

**`content/menu.json`** — full menu. Each item can have dietary tags: `vegan`, `vegetarian`, `gluten-free`:

```json
{
  "categories": [
    {
      "name": "Hot Drinks",
      "items": [
        { "name": "Flat White", "price": "3.20", "dietary": [] },
        { "name": "Oat Latte", "price": "3.70", "dietary": ["vegan"] }
      ]
    }
  ]
}
```

**`content/about.md`** — the about page copy. Plain text, paragraphs separated by a blank line. The `# heading` line at the top is ignored:

```markdown
# About

We opened in 2018 with one goal: make Tenterden's best flat white.

We source our beans from small farms and roast in-house every week.
```

**`content/home.json`** — homepage hero text and FAQ:

```json
{
  "hero": {
    "headline": "Good coffee. No fuss.",
    "subheading": "Open seven days a week in the heart of Tenterden."
  },
  "faq": [
    { "question": "Where can I park?", "answer": "Free car park on Recreation Ground Road, two minutes away." },
    { "question": "Do you have Wi-Fi?", "answer": "Yes — ask at the counter for the password." }
  ]
}
```

**`content/blog/`** — one Markdown file per news post, named `YYYY-MM-DD-slug.md`:

```markdown
---
title: We're extending our Sunday hours
date: 2025-06-01
---

Starting this Sunday we'll be open until 5pm...
```

---

## Step 5 — Add photos

**Hero image** — drop a file named `hero.jpg` (or `.webp` / `.png`) into `public/`. The site automatically uses it as a full-bleed hero with a dark overlay. If no image is present, the hero falls back to a solid accent colour — both look intentional.

**Gallery photos** — drop any number of `.jpg`, `.webp`, or `.png` files into `public/gallery/`. They appear in a grid on the Gallery page automatically. If the folder is empty and gallery is enabled, a placeholder grid is shown.

---

## Step 6 — Set up Google Reviews

Find the client's Google Place ID by searching for their business name:

```bash
curl -s "https://places.googleapis.com/v1/places:searchText" \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: YOUR_GOOGLE_API_KEY" \
  -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress" \
  -d '{"textQuery": "The Coffee House Tenterden"}'
```

Copy the `id` value from the response (starts with `ChIJ...`) and paste it into `content/site.json` as `googlePlaceId`.

Create a `.env.local` file in the project root:

```
GOOGLE_PLACES_API_KEY=your_key_here
```

> **Note:** This API key and Place ID are specific to this client's deployment. Add the same key to Vercel environment variables when deploying (Step 10). Reviews only show on the live site and locally when `.env.local` is present.

Reviews below 4 stars are automatically filtered out.

---

## Step 7 — Set up the Food Hygiene Rating badge

The footer automatically shows the client's live Food Hygiene Rating, pulled directly from the Food Standards Agency. It updates automatically whenever their rating changes — no manual work needed.

Find their FHRS ID:
1. Go to [ratings.food.gov.uk](https://ratings.food.gov.uk)
2. Search for the business by name and town
3. Open their listing — copy the number from the URL (e.g. `ratings.food.gov.uk/business/en-GB/123456` → ID is `123456`)

Add it to `content/site.json`:

```json
"fhrsId": "123456"
```

Leave it empty (`""`) to hide the badge.

---

## Step 8 — Choose which sections to show

Edit `content/modules.json`:

```json
{
  "googleReviews": true,
  "blog": true,
  "gallery": true,
  "googleMap": true,
  "tableBooking": false,
  "orderOnline": false,
  "clientEditing": false
}
```

| Setting | What it does |
|---|---|
| `googleReviews` | Show live Google reviews on the homepage |
| `blog` | Show the News page and nav link |
| `gallery` | Show the Gallery page and nav link |
| `googleMap` | Show a Google Maps embed on the Contact page (no API key needed) |
| `tableBooking` | Enable a table booking embed — add the embed code when switching on |
| `orderOnline` | Show an Order Online button in the nav — add the URL when switching on |
| `clientEditing` | Enable Supabase-backed admin panel for client self-editing (see Step 9) |

---

## Step 9 — Wire up the contact form

The contact form HTML is ready on the Contact page. You need to connect it to a form handling service per client. Recommended options:

- **Formspree** — free tier, no code needed, just set the form `action` attribute to your Formspree endpoint
- **Cloudflare Turnstile** — adds spam protection, configure per client

This is done when setting up the live site, not in the template.

---

## Step 10 — Client self-editing (optional, Tier 2 upsell)

Skip this step if you are managing content for the client yourself.

This gives the client a password-protected admin panel at `yourdomain.com/admin` where they can edit their menu, hours, blog posts, and FAQ without touching any files.

**First time only** — run the Supabase schema against the shared PageNest Supabase project:
1. Open your Supabase project → SQL editor
2. Paste and run the contents of `supabase/schema.sql`

**Per client** — run the setup script:

```bash
npm run setup-client
```

This prompts you for the client name, slug, and admin login credentials. It creates their records in Supabase, seeds the content from the files in `content/`, and outputs the environment variables you need.

Add the output env vars to `.env.local` and to Vercel, then:
1. Set `"clientEditing": true` in `content/modules.json`
2. Redeploy

The client can now log in at `yourdomain.com/admin` to manage their content.

| Admin section | What the client can edit |
|---|---|
| Hours | Opening times, add or remove rows |
| Menu | Categories, items, prices, dietary tags |
| Blog | Write, edit, and delete news posts |
| FAQ | Questions and answers on the homepage |

---

## Step 11 — Set up analytics

Add analytics when deploying — not in the template. Recommended:

- **Plausible** or **Umami** — privacy-friendly, GDPR-compliant, lightweight
- Add the tracking snippet to `app/layout.tsx` when the live site is ready

---

## Step 12 — Review everything locally

Go through every page on both desktop and mobile before deploying:

- [ ] Home page — hero, hours strip, reviews, FAQ
- [ ] Menu page — all categories, items, prices, dietary tags correct
- [ ] About page — copy reads well
- [ ] Gallery page — photos loading (or placeholder is clean)
- [ ] Blog/News page — posts showing if blog is enabled
- [ ] Contact page — address, phone, email correct; map showing correct location
- [ ] Nav links all work; correct pages shown/hidden per modules.json
- [ ] Footer — address, hours, social links correct
- [ ] Social links go to the right profiles

---

## Step 13 — Deploy to Vercel

1. Push the client repo to GitHub if not already
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import the repo
3. Select the **PageNest's projects** team
4. Add environment variables:
   - `GOOGLE_PLACES_API_KEY` — if Google Reviews is enabled
   - Supabase keys — if client self-editing is enabled
5. Click **Deploy**

Vercel gives you a preview URL immediately. Share with the client for sign-off before pointing their domain.

---

## Step 14 — Connect the client's domain

1. In Vercel, go to the project → **Domains** → add their domain
2. In their domain registrar (or Cloudflare), add the DNS records Vercel shows you
3. SSL is automatic — wait for it to activate (usually under 5 minutes)
4. Confirm the live URL is working before handing over

---

## Step 15 — Pre-launch checklist

- [ ] All pages reviewed on mobile and desktop
- [ ] Nav links working; correct pages shown per modules
- [ ] Contact form tested and submitting
- [ ] Google Reviews showing (if enabled, shows only 4 stars and above)
- [ ] Google Maps showing correct location (if enabled)
- [ ] Hero image sharp and well-cropped on mobile
- [ ] SSL active on the live domain
- [ ] Google Business Profile set up or verified (important for local SEO)
- [ ] Analytics installed and receiving data
- [ ] Client login tested (if Tier 2 self-editing is enabled)
- [ ] `llms.txt` correct at `yourdomain.com/llms.txt`
- [ ] Client has been walked through what they can and can't change

---

## Content files quick reference

| File | What it controls |
|---|---|
| `content/site.json` | Name, tagline, address, phone, email, social links, Google Place ID |
| `content/theme.json` | Brand colours and fonts |
| `content/modules.json` | Which pages and sections appear |
| `content/hours.json` | Opening hours |
| `content/menu.json` | Menu categories, items, prices, dietary tags |
| `content/about.md` | About page copy |
| `content/home.json` | Hero headline, subheading, FAQ items |
| `content/blog/` | Blog posts — one Markdown file per post |
| `public/hero.jpg` | Hero background image (optional) |
| `public/gallery/` | Gallery photos (optional) |
