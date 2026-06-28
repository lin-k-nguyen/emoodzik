# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npx tsc --noEmit # type-check (lint script has a Next.js CLI bug — use tsc instead)
```

## Architecture

**EmoodziK** is a Vietnamese music blog. Next.js 16 App Router frontend, Sanity v6 as the CMS, with the Sanity Studio embedded at `/studio`.

### Data layer — two sources

`lib/sanity.ts` is the live data layer. It exports:
- A Sanity client configured from `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and `SANITY_API_TOKEN`
- GROQ query functions: `getAllPosts`, `getPostBySlug`, `getPostsByCategory`, `getPostsBySeries`, `getAllSeries`, `getAllCategories`, `getAllAuthors`, `getAuthorBySlug`, `getPostsByAuthor`
- `urlFor(source)` — builds Sanity image URLs
- `getImageUrl(post, w, h)` — resolves cover image from `mainImage` (Sanity asset) or falls back to `mainImageUrl` (Wix CDN string)

`lib/data.ts` is legacy static data. It still holds hardcoded `POSTS`, `AUTHORS`, `CATEGORIES`, `SERIES` arrays and their helper functions. Some pages and `PostCard` can operate against this static data via the `sanity={false}` prop path — but all active pages use Sanity.

### Image handling (important)

Posts have two image fields:
- `mainImage` — Sanity asset reference; use `urlFor(post.mainImage).width(w).height(h).url()`
- `mainImageUrl` — raw Wix CDN URL (string); must be cleaned before use

Wix CDN URLs have a duplicate-extension bug (`~mv2.jpg~mv2.jpg`). The fix, duplicated in several files, is:
```ts
url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
```

Always pass `unoptimized={!post.mainImage}` to `<Image>` — Wix CDN images can't go through Next.js image optimization. Both `cdn.sanity.io` and `static.wixstatic.com` are allowed in `next.config.js`.

### Routing

| Route | Description |
|---|---|
| `/` | Homepage — latest 6 posts + series sidebar (up to 7 posts each) |
| `/music-blog` | All posts, filterable by category |
| `/posts/[slug]` | Post detail — client component, fetches Sanity directly |
| `/bon-nay` / `/bon-nay/[slug]` | Authors list / profile |
| `/nghe-si` | Artists listing |
| `/series` / `/series/[slug]` | Series list / detail |
| `/the-loai/[slug]` | Posts filtered by category |
| `/tim-kiem` | Search (client component) |
| `/studio` | Embedded Sanity Studio |

### Theming

Dark/light theme is toggled in `app/layout.tsx`, stored in `localStorage` as `ek-theme`, and applied as `data-theme` on `<html>`. All colours use CSS variables (`--bg`, `--fg`, `--border`, `--brand`, `--accent`, `--muted`, `--muted-fg`). Responsive layout uses utility classes `.desk` / `.mob` defined in `globals.css`. Fonts are Oswald (`--font-serif`) and Archivo (`--font-sans`).

### Sanity schemas

Defined in `sanity/schemas/`: `post`, `author`, `artist`, `category`, `series`. The post schema supports Portable Text body with inline images and YouTube embeds. `excerpt` is optional — pages fall back to the first paragraph of `body` when absent.

### Migration scripts

`scraper.js` through `scraper-v6.js` and the `*.ndjson` files are one-off Wix→Sanity migration tools. They are not part of the running app.
