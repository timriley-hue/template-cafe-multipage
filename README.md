# template-cafe-multipage

PageNest multi-page cafe website template.

## Running locally

```bash
npm install
npm run dev -- --port 3001
```

Then open http://localhost:3001

## Per-client setup

1. Click "Use this template" on GitHub to create a new repo for the client
2. Clone the new repo to your machine
3. Run `npm install` in that folder
4. Edit `content/site.json` with the client's details
5. Edit `content/theme.json` with their brand colours and fonts
6. Edit `content/modules.json` to turn features on or off
7. Add a `.env.local` file with the Google Places API key and their Place ID

## Content files (safe to edit, AI-editable)

| File | What it controls |
|---|---|
| `content/site.json` | Business name, address, phone, email, social links, Google Place ID |
| `content/theme.json` | Brand colours and fonts |
| `content/modules.json` | Which sections appear (reviews, blog, gallery, etc.) |
| `content/hours.json` | Opening hours |
| `content/menu.json` | Menu categories, items, prices, dietary tags |
| `content/about.md` | About page copy |
| `content/home.json` | Homepage hero text and FAQ items |
| `content/blog/` | Blog posts — one Markdown file per post |

## Database setup (Tier 2 — client editing)

Content can optionally be moved from files to Supabase, allowing clients to log in and edit their own menu, hours, blog posts, and FAQ via a password-protected `/admin` panel.

All clients share one Supabase project. Each client gets their own rows in shared tables, isolated by row-level security. When you clone this template for a new client, run the setup script to create their records and seed them from the content files:

```bash
npm run setup-client
```

This will prompt for the client name, slug, and admin login credentials, then create everything in Supabase automatically. It also outputs the environment variables you need to add to `.env.local` and Vercel.

Once the script has run, set `clientEditing: true` in `content/modules.json` and the site will read from Supabase instead of files. The `/admin` panel becomes active and the client can log in to manage their content.

**Supabase schema** is in `supabase/schema.sql` — run this once in your shared Supabase project before using the setup script for the first time.

### Admin panel sections

| Section | What the client can edit |
|---|---|
| Hours | Opening times, add or remove rows |
| Menu | Categories, items, prices, dietary tags |
| Blog | Write, edit, and delete news posts |
| FAQ | Questions and answers on the homepage |

## Environment variables

```
GOOGLE_PLACES_API_KEY=your_key_here
```

Add to `.env.local` locally, and to Vercel environment variables when deploying.
