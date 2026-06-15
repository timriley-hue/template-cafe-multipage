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

## Environment variables

```
GOOGLE_PLACES_API_KEY=your_key_here
```

Add to `.env.local` locally, and to Vercel environment variables when deploying.
