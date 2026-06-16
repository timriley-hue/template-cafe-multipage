# template-cafe-multipage

PageNest multi-page cafe website template.

---

## Setting up a new client site

### Step 1 — Create the repo

1. Go to [github.com/timriley-hue/template-cafe-multipage](https://github.com/timriley-hue/template-cafe-multipage)
2. Click **Use this template → Create a new repository**
3. Name it `cafe-[client-name]` (e.g. `cafe-brunch-and-brew`)
4. Clone it to your machine and run:

```bash
npm install
```

---

### Step 2 — Extract brand colours and fonts

If the client has an existing website, run:

```bash
npm run extract-brand https://theircurrentwebsite.co.uk
```

This fetches their site, finds the most common colours and fonts, and asks you to map them to the theme. It then writes `content/theme.json` automatically. It also outputs the URL of their logo so you can download it manually.

If they have no existing website, edit `content/theme.json` directly with their brand colours (ask them for hex values or pull from their social media profile).

---

### Step 3 — Fill in the client details

Edit `content/site.json`:
- Business name, tagline, address, phone, email
- Social media links
- Google Place ID (see Step 5)

Edit `content/hours.json` with their opening times.

Edit `content/menu.json` with their full menu, prices, and dietary tags.

Edit `content/about.md` with their about page copy.

Edit `content/home.json` with the homepage headline and FAQ items.

---

### Step 4 — Choose which sections to include

Edit `content/modules.json` to turn features on or off:

| Setting | What it does |
|---|---|
| `googleReviews` | Show live Google reviews on the homepage |
| `blog` | Show the News page and nav link |
| `gallery` | Show the Gallery page and nav link |
| `googleMap` | Show a Google Maps embed on the Contact page (no API key needed) |
| `tableBooking` | Enable table booking embed (for brunch/tea room cafes) |
| `orderOnline` | Show an order online link in the nav |
| `clientEditing` | Enable Supabase-backed admin panel for client self-editing (see Step 7) |

---

### Step 5 — Set up Google Reviews

Find the client's Google Place ID:

```bash
# Search by name and town
curl -s "https://places.googleapis.com/v1/places:searchText" \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress" \
  -d '{"textQuery": "Cafe Name Town"}'
```

Copy the `id` value and paste it into `content/site.json` as `googlePlaceId`.

Create a `.env.local` file in the project root:

```
GOOGLE_PLACES_API_KEY=your_key_here
```

Add the same key to Vercel environment variables when deploying.

---

### Step 6 — Run locally and review

```bash
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001) and check every page on both desktop and mobile.

---

### Step 7 — Client self-editing (optional, Tier 2)

Skip this step if you are managing content for the client yourself.

**First time only** — run the Supabase schema against the shared project:
- Open your Supabase project → SQL editor
- Paste and run the contents of `supabase/schema.sql`

**Per client** — run the setup script:

```bash
npm run setup-client
```

This prompts for the client name, slug, and admin login credentials. It creates their records in Supabase, seeds the content from the files, and outputs the environment variables you need.

Then:
1. Add the output env vars to `.env.local` and to Vercel
2. Set `clientEditing: true` in `content/modules.json`
3. Redeploy

The client can now log in at `yourdomain.com/admin` to edit their menu, hours, blog posts, and FAQ.

| Admin section | What the client can edit |
|---|---|
| Hours | Opening times, add or remove rows |
| Menu | Categories, items, prices, dietary tags |
| Blog | Write, edit, and delete news posts |
| FAQ | Questions and answers on the homepage |

---

### Step 8 — Deploy to Vercel

1. Push the repo to GitHub if not already done
2. Go to [vercel.com](https://vercel.com) → Add new project → Import the repo
3. Add environment variables (Google Places API key, Supabase keys if Tier 2)
4. Deploy

---

### Step 9 — Connect the domain

1. In Vercel, go to the project → Domains → Add the client's domain
2. In Cloudflare, point the domain's nameservers to Cloudflare (if not already)
3. Add the Vercel DNS records in Cloudflare
4. SSL is automatic — confirm it's active before handing over

---

### Step 10 — Pre-launch checklist

- [ ] All pages reviewed on mobile and desktop
- [ ] Links working (nav, footer, CTAs)
- [ ] Contact form tested
- [ ] Google Reviews showing (if enabled)
- [ ] SSL active on the live domain
- [ ] Google Business Profile set up or verified (local SEO)
- [ ] Analytics installed (Umami or Plausible)
- [ ] Client login tested (if Tier 2)
- [ ] `llms.txt` correct at `yourdomain.com/llms.txt`

---

## Content files reference

| File | What it controls |
|---|---|
| `content/site.json` | Business name, address, phone, email, social links, Google Place ID |
| `content/theme.json` | Brand colours and fonts |
| `content/modules.json` | Which sections appear |
| `content/hours.json` | Opening hours |
| `content/menu.json` | Menu categories, items, prices, dietary tags |
| `content/about.md` | About page copy |
| `content/home.json` | Homepage hero text and FAQ items |
| `content/blog/` | Blog posts — one Markdown file per post |

---

## Running the template locally (for development)

```bash
npm install
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001)
