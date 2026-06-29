# EmoodziK UI Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix thumbnails, content display, routing, mobile layouts, and UX across all pages of the EmoodziK music blog.

**Architecture:** The app uses Next.js 16 App Router with Sanity CMS. Most pages are client components that fetch from Sanity via GROQ. `PostCard` is the central card component used on every listing page — many fixes flow through it. The URL path change (`/posts/` → `/post/`) is handled by adding a new route and a redirect; all internal links are updated.

**Tech Stack:** Next.js 16, Sanity v6, TypeScript, CSS variables (no Tailwind), inline styles throughout.

---

## Files Modified
- `components/Footer.tsx` — tagline text
- `components/NewsletterSection.tsx` — subscribe button color
- `components/Header.tsx` — mobile nav height, remove Subscribe, light mode toggle
- `components/PostCard.tsx` — mainImageUrl fallback, remove excerpt → first para
- `components/SearchDialog.tsx` — dark overlay, mainImageUrl thumbnails, diacritic search
- `app/globals.css` — auth-grid mobile fix (3 cols), light mode body background
- `app/layout.tsx` — pass theme + toggle to Header
- `app/page.tsx` — homepage banner fade, mobile "Xem chuyên đề" CTA at end
- `app/music-blog/page.tsx` — correct banner image, updated GROQ, mobile Xem thêm
- `app/posts/[slug]/page.tsx` — becomes redirect to /post/[slug]
- `app/series/page.tsx` — redirect to first Sanity series (not static data)
- `app/series/[slug]/page.tsx` — correct banner, updated GROQ, mobile Xem thêm
- `app/the-loai/[slug]/page.tsx` — updated GROQ, mobile Xem thêm
- `app/tim-kiem/client.tsx` — new-search bug fix, diacritic, Xem thêm, first para
- `app/nghe-si/page.tsx` — mobile: all groups scrollable, artist link → /nghe-si/[slug]
- `app/bon-nay/page.tsx` — settings fetch for intro text
- `app/bon-nay/[slug]/page.tsx` — layout fix, thumbnail fix, mobile button label, links /post/
- `next.config.js` — redirect /posts/:slug → /post/:slug
- `sanity/schemas/series.ts` — add sortOrder field
- `sanity/schemas/siteSettings.ts` (new) — site settings document
- `sanity.config.ts` — register siteSettings schema
- `lib/sanity.ts` — add firstPara projection helper, update relevant queries

## Files Created
- `app/post/[slug]/page.tsx` — canonical post URL (copy of posts/[slug] with fixes)
- `app/nghe-si/[slug]/page.tsx` — artist detail page
- `sanity/schemas/siteSettings.ts` — site settings with bonNayIntro field

---

## Task 1: Footer tagline + Subscribe button color

**Files:**
- Modify: `components/Footer.tsx:13`
- Modify: `components/NewsletterSection.tsx:45-47`

- [ ] **Step 1: Update Footer tagline**

In `components/Footer.tsx`, replace line 13:
```tsx
Blog âm nhạc về đĩa, gear và nghệ thuật lắng nghe.
```
with:
```tsx
Thảo luận âm nhạc quốc tế.
```

- [ ] **Step 2: Make subscribe button red when email is filled**

In `components/NewsletterSection.tsx`, update the `<button>` style to be conditional on `email.trim()`:
```tsx
<button type="submit" style={{
  height: 48, flex: 'none', border: 'none',
  background: email.trim() ? '#ff2e2e' : '#fbf7f0',
  padding: '0 24px', fontSize: 14, fontWeight: 600,
  color: email.trim() ? '#fff' : '#1a1614',
  cursor: 'pointer', fontFamily: 'inherit',
  textTransform: 'uppercase', letterSpacing: '.05em',
  transition: 'background .15s, color .15s',
}}>
  Subscribe
</button>
```

- [ ] **Step 3: Verify in browser**

`npm run dev` → check footer text and subscribe form at bottom of homepage.

- [ ] **Step 4: Commit**
```bash
git add components/Footer.tsx components/NewsletterSection.tsx
git commit -m "fix footer tagline, subscribe button active state"
```

---

## Task 2: Homepage banner — fade, remove bottom border

**Files:**
- Modify: `app/page.tsx:39-42`

- [ ] **Step 1: Remove bottom border and add bottom fade on homepage banner**

In `app/page.tsx`, replace the banner `<section>` (lines ~39-43):
```tsx
<section style={{ padding: 0 }}>
  <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,28vw,400px)', overflow: 'hidden', background: 'var(--secondary)' }}>
    <Image src="/assets/banner.png" alt="EmoodziK Music Blog" fill style={{ objectFit: 'cover', objectPosition: 'left bottom', transform: 'scale(1.38)', transformOrigin: 'left bottom' }} priority />
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
  </div>
</section>
```
(Remove `borderBottom: '1px solid var(--border)'` and add the gradient overlay div.)

- [ ] **Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "homepage banner: fade into content, remove bottom border"
```

---

## Task 3: Music Blog + Series banners — use correct images

**Files:**
- Modify: `app/music-blog/page.tsx:42`
- Modify: `app/series/[slug]/page.tsx:34`

- [ ] **Step 1: Fix Music Blog banner**

In `app/music-blog/page.tsx` line 42, change:
```tsx
<Image src="/assets/banner.png" alt="Music Blog" fill ...
```
to:
```tsx
<Image src="/assets/music-blog-banner.jpg" alt="Music Blog" fill ...
```

- [ ] **Step 2: Fix Series banner**

In `app/series/[slug]/page.tsx` line 34, change:
```tsx
<Image src="/assets/banner.png" alt="Series" fill ...
```
to:
```tsx
<Image src="/assets/series-banner.jpg" alt="Series" fill ...
```

- [ ] **Step 3: Commit**
```bash
git add app/music-blog/page.tsx app/series/\[slug\]/page.tsx
git commit -m "fix music-blog and series banner images"
```

---

## Task 4: Mobile nav — increase height for notch, remove Subscribe

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Remove Subscribe link from mobile menu**

In `components/Header.tsx`, remove the entire Subscribe `<Link>` (lines ~127-130):
```tsx
// DELETE these lines:
<Link href="/newsletter" onClick={() => setMenuOpen(false)}
  style={{ marginTop: 32, background: 'var(--primary)', padding: '14px 16px', textAlign: 'center', fontSize: 15, fontWeight: 600, color: 'var(--primary-fg)', textDecoration: 'none', borderRadius: '9999px' }}>
  Subscribe
</Link>
```

- [ ] **Step 2: Expand mobile header height to cover notch**

In `app/globals.css`, the safe-area rule already handles `padding-top` for the header. But the header's static height is 64px. On mobile, we need it taller. Update the `@supports` rule:
```css
@supports (padding-top: env(safe-area-inset-top)) {
  header {
    padding-top: env(safe-area-inset-top) !important;
    height: calc(64px + env(safe-area-inset-top)) !important;
  }
  .mobile-menu-overlay {
    padding-top: env(safe-area-inset-top) !important;
  }
}
```

Also ensure the header inner div fills the height properly. In `components/Header.tsx`, the inner `<div>` with `height: 64` needs to adapt. Change `height: 64` to `height: '100%'` on the inner content div, and keep the outer header height via CSS:
```tsx
<header style={{
  position: 'sticky', top: 0, zIndex: 50,
  borderBottom: '1px solid var(--border)',
  background: 'color-mix(in oklab,var(--bg) 80%,transparent)',
  backdropFilter: 'blur(12px)',
  minHeight: 64,
}}>
  <div style={{
    margin: '0 auto', maxWidth: 1280,
    display: 'flex', minHeight: 64, height: '100%',
    alignItems: 'center', justifyContent: 'space-between',
    gap: 16, padding: '0 24px',
  }}>
```

- [ ] **Step 3: Commit**
```bash
git add components/Header.tsx app/globals.css
git commit -m "mobile nav: remove subscribe, expand height for notch"
```

---

## Task 5: Light mode toggle in Header

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/Header.tsx`

- [ ] **Step 1: Add theme props to Header**

In `components/Header.tsx`, update the `HeaderProps` interface and add a toggle button in the desktop nav:
```tsx
interface HeaderProps {
  onSearchOpen: () => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function Header({ onSearchOpen, theme, onThemeToggle }: HeaderProps) {
```

Add this button inside the desktop `<nav className="desk" ...>`, after the search button:
```tsx
<button
  type="button"
  onClick={onThemeToggle}
  aria-label="Chuyển theme"
  style={{ display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer' }}
>
  {theme === 'dark'
    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  }
</button>
```

Also add the toggle button to the mobile controls div:
```tsx
{/* Mobile controls */}
<div className="mob" style={{ alignItems: 'center', gap: 4 }}>
  <button type="button" onClick={onThemeToggle} aria-label="Chuyển theme" style={iconBtn}>
    {theme === 'dark'
      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    }
  </button>
  <button type="button" onClick={onSearchOpen} ... />
  <button type="button" onClick={() => setMenuOpen(v => !v)} ... />
</div>
```

- [ ] **Step 2: Pass theme props from layout**

In `app/layout.tsx`, update the `<Header>` call:
```tsx
<Header
  onSearchOpen={() => setSearchOpen(true)}
  theme={theme}
  onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
/>
```

- [ ] **Step 3: Verify**

Check header on desktop and mobile — sun/moon icon appears and toggles theme.

- [ ] **Step 4: Commit**
```bash
git add components/Header.tsx app/layout.tsx
git commit -m "add light/dark mode toggle to header"
```

---

## Task 6: PostCard — fix thumbnails and replace excerpt with first paragraph

**Files:**
- Modify: `components/PostCard.tsx`

This is the central fix that flows to all listing pages.

- [ ] **Step 1: Update PostCard**

Replace the entire `components/PostCard.tsx` with:
```tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface PostCardProps {
  post: any
  author: any
  sanity?: boolean
}

function cleanWixUrl(url: string): string {
  return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
}

function getFirstParaText(body: any[]): string {
  if (!Array.isArray(body)) return ''
  const block = body.find((b: any) => b._type === 'block' && b.style === 'normal')
  return block?.children?.map((c: any) => c.text).join('') ?? ''
}

export default function PostCard({ post, author, sanity }: PostCardProps) {
  const href = sanity ? `/post/${post.slug.current}` : `/post/${post.slug}`
  const title = post.title
  const category = sanity ? post.category?.title : post.category
  const date = sanity ? post.publishedAt : post.date
  const authorName = author?.name
  const authorAvatar = sanity
    ? (author?.avatar ? urlFor(author.avatar).width(64).height(64).url() : null)
    : author?.avatar

  const firstPara = getFirstParaText(post.body)

  const imageUrl = sanity
    ? (post.mainImage
        ? urlFor(post.mainImage).width(600).height(400).url()
        : post.mainImageUrl ? cleanWixUrl(post.mainImageUrl) : null)
    : post.image

  const fmtDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) }
    catch { return d }
  }

  return (
    <article style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      <Link href={href} style={{ display: 'block' }}>
        <div style={{ position: 'relative', aspectRatio: '3/2', width: '100%', overflow: 'hidden', background: 'var(--muted)' }}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              loading="lazy"
              unoptimized={!post.mainImage}
            />
          )}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '44px 14px 13px', background: 'linear-gradient(to top,rgba(6,5,4,.96),rgba(6,5,4,.55) 55%,rgba(6,5,4,0))' }}>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--brand)' }}>
              {category}
            </span>
          </div>
        </div>
      </Link>

      <div style={{ marginTop: 16, display: 'flex', flex: 1, flexDirection: 'column' }}>
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 600, lineHeight: 1.28, letterSpacing: '-.01em', color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden', minHeight: '2.56em' }}>
          <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{title}</Link>
        </h2>
        {firstPara && (
          <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: 'var(--muted-fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden', height: '4.8em' }}>
            {firstPara}
          </p>
        )}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          {authorAvatar && (
            <Image src={authorAvatar} alt={authorName ?? ''} width={32} height={32} style={{ borderRadius: '9999px', objectFit: 'cover', flex: 'none' }} />
          )}
          <div style={{ fontSize: 12, lineHeight: 1.4 }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)' }}>{authorName}</p>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-fg)' }}>{fmtDate(date)}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
```

- [ ] **Step 2: Commit**
```bash
git add components/PostCard.tsx
git commit -m "PostCard: mainImageUrl fallback, first paragraph instead of excerpt"
```

---

## Task 7: Update GROQ queries — add mainImageUrl + body slice to all listing pages

All listing queries need `mainImageUrl` and `"body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}` so PostCard can show the first paragraph and correct thumbnails.

**Files:**
- Modify: `app/music-blog/page.tsx:24-25`
- Modify: `app/the-loai/[slug]/page.tsx:19,23`
- Modify: `app/series/[slug]/page.tsx:22`
- Modify: `app/tim-kiem/client.tsx:16`
- Modify: `app/bon-nay/[slug]/page.tsx:16`

The body projection to add to every query:
```
"body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}
```

- [ ] **Step 1: Update Music Blog query**

In `app/music-blog/page.tsx`, update both queries (lines 24 and 25) to include `mainImageUrl` and `body`:
```tsx
const query = activeCat === 'all'
  ? `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title, slug}, author->{name, slug, avatar} }`
  : `*[_type == "post" && category->slug.current == $cat] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title, slug}, author->{name, slug, avatar} }`
```

- [ ] **Step 2: Update Category page queries**

In `app/the-loai/[slug]/page.tsx`, update both fetch calls (lines ~19 and ~23):
```tsx
client.fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title,slug}, author->{name,slug,avatar} }`)

client.fetch(`*[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title,slug}, author->{name,slug,avatar} }`, { slug })
```

- [ ] **Step 3: Update Series page query**

In `app/series/[slug]/page.tsx` line 22:
```tsx
client.fetch(`*[_type == "post" && series->slug.current == $slug] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, series->{title,slug}, author->{name,slug,avatar} }`, { slug: activeTab })
```

- [ ] **Step 4: Update Search page query**

In `app/tim-kiem/client.tsx` line 16:
```tsx
client.fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title,slug}, author->{name,slug,avatar}, artists[]->{name} }`)
  .then(setAllPosts)
```

- [ ] **Step 5: Update Author page query**

In `app/bon-nay/[slug]/page.tsx` line 16:
```tsx
client.fetch(`*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title,slug} }`, { slug }).then(setPosts)
```

- [ ] **Step 6: Commit**
```bash
git add app/music-blog/page.tsx app/the-loai/\[slug\]/page.tsx app/series/\[slug\]/page.tsx app/tim-kiem/client.tsx app/bon-nay/\[slug\]/page.tsx
git commit -m "update GROQ queries: add mainImageUrl and body firstPara projection"
```

---

## Task 8: URL routing — /posts/[slug] → /post/[slug]

**Files:**
- Create: `app/post/[slug]/page.tsx`
- Modify: `app/posts/[slug]/page.tsx` (→ redirect page)
- Modify: `next.config.js`
- Modify: `components/SearchDialog.tsx` (link update)
- Modify: `app/bon-nay/[slug]/page.tsx` (link update, already done partially in Task 7)

- [ ] **Step 1: Create canonical /post/[slug] route**

Create `app/post/[slug]/page.tsx` as a copy of `app/posts/[slug]/page.tsx` but:
- Remove `'use client'` from top consideration (keep it since it uses useEffect)
- Update all internal `/posts/` links to `/post/` within the file
- Fix the related posts sidebar bug (use `series._id` not `series._ref` — see Task 10)

Copy the full file from `app/posts/[slug]/page.tsx` to `app/post/[slug]/page.tsx`, then in Task 10 apply the full post page fixes to `app/post/[slug]/page.tsx`.

- [ ] **Step 2: Make app/posts/[slug] redirect**

Replace `app/posts/[slug]/page.tsx` entirely with:
```tsx
import { redirect } from 'next/navigation'

export default function OldPostPage({ params }: { params: { slug: string } }) {
  redirect(`/post/${params.slug}`)
}
```

- [ ] **Step 3: Add redirect rule in next.config.js**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/posts/:slug',
        destination: '/post/:slug',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
    ],
  },
}

module.exports = nextConfig
```

- [ ] **Step 4: Update SearchDialog links**

In `components/SearchDialog.tsx` line 81, change:
```tsx
<Link href={`/posts/${p.slug.current}`} onClick={onClose} ...>
```
to:
```tsx
<Link href={`/post/${p.slug.current}`} onClick={onClose} ...>
```

Also line 102:
```tsx
<Link href={`/tim-kiem?q=${encodeURIComponent(q)}`} onClick={onClose} ...>
```
(this one stays — it goes to search, not a post)

- [ ] **Step 5: Update bon-nay/[slug] links**

In `app/bon-nay/[slug]/page.tsx`, lines 59 and 83, change both `/posts/${p.slug.current}` to `/post/${p.slug.current}`.

- [ ] **Step 6: Commit**
```bash
git add app/post app/posts/\[slug\]/page.tsx next.config.js components/SearchDialog.tsx app/bon-nay/\[slug\]/page.tsx
git commit -m "routing: /posts/[slug] → /post/[slug], add permanent redirect"
```

---

## Task 9: Post detail page — remove brief, fix related sidebar, fix artists

**Files:**
- Modify: `app/post/[slug]/page.tsx`

The related sidebar bug: the GROQ fetch uses `series->{_ref, title, slug}` but `_ref` on a dereferenced doc returns `_id` (or null). Fix by using `_id` consistently.

- [ ] **Step 1: Remove excerpt/brief from display**

In `app/post/[slug]/page.tsx`, remove the `displayExcerpt` paragraph from the header section:
```tsx
// DELETE these lines:
{displayExcerpt && (
  <p style={{ margin: '24px 0 0', fontSize: 18, lineHeight: 1.6, color: 'var(--muted-fg)' }}>{displayExcerpt}</p>
)}
```
Also remove the `getFirstParaText` function and `displayExcerpt` variable from the component (they're no longer needed for display).

- [ ] **Step 2: Fix the GROQ query — use _id instead of _ref**

In the `useEffect` fetch, update the post query projection:
```tsx
client.fetch(`*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, publishedAt, mainImage, mainImageUrl, body,
  category->{_id, title, slug},
  series->{_id, title, slug},
  author->{name, slug, avatar, about},
  artists[]->{name, slug},
  seoTitle, seoDescription
}`, { slug })
```

- [ ] **Step 3: Fix related posts fetch — use _id**

Change the related fetches to use `_id` instead of `_ref`:
```tsx
if (data.series?._id) {
  rel = await client.fetch(`*[_type == "post" && slug.current != $slug && series->._id == $seriesId] | order(publishedAt desc)[0...5] {
    _id, title, slug, publishedAt, mainImage, mainImageUrl, category->{title, slug}
  }`, { slug, seriesId: data.series._id })
  if (rel.length > 0) setRelatedLabel(data.series.title)
}
if (rel.length === 0 && data.category?._id) {
  rel = await client.fetch(`*[_type == "post" && slug.current != $slug && category->._id == $catId] | order(publishedAt desc)[0...5] {
    _id, title, slug, publishedAt, mainImage, mainImageUrl, category->{title, slug}
  }`, { slug, catId: data.category._id })
  if (rel.length > 0) setRelatedLabel(data.category.title)
}
```

- [ ] **Step 4: Fix related sidebar thumbnails**

The related sidebar already has thumbnail logic but uses only `mainImage`. Update the `relSrc` computation in the aside:
```tsx
const relSrc = p.mainImage
  ? urlFor(p.mainImage).width(160).height(120).url()
  : p.mainImageUrl ? cleanWixUrl(p.mainImageUrl) : null
```
(This code already exists — verify it's present and `cleanWixUrl` is defined in the file. It should be since it was in the original posts/[slug]/page.tsx.)

- [ ] **Step 5: Fix artists display**

The artists section already exists in the JSX. Verify it reads `post.artists?.length > 0` and renders links. If artists are still missing, check that `artists[]->{name, slug}` is in the GROQ query (added in Step 2 above). The link should go to `/nghe-si/${a.slug?.current}` (updated after Task 13 creates that page). For now, leave as `/tim-kiem?q=...` and update in Task 13.

- [ ] **Step 6: Commit**
```bash
git add app/post/\[slug\]/page.tsx
git commit -m "post detail: remove brief, fix related sidebar (_id bug), fix artists"
```

---

## Task 10: Mobile pagination — Xem thêm on Music Blog, Category, Series

On mobile (≤840px), replace numbered pagination with a "Xem thêm" button that loads 28 more items at a time.

**Files:**
- Modify: `app/music-blog/page.tsx`
- Modify: `app/the-loai/[slug]/page.tsx`
- Modify: `app/series/[slug]/page.tsx`

Pattern for each page — add `visibleCount` state and conditionally render:

- [ ] **Step 1: Update Music Blog page pagination**

In `app/music-blog/page.tsx`, add `visibleCount` state:
```tsx
const [visibleCount, setVisibleCount] = useState(PER_PAGE)
```

Replace the grid + pagination section with:
```tsx
{loading ? (
  <p style={{ textAlign: 'center', color: 'var(--muted-fg)', padding: 40 }}>Đang tải...</p>
) : (
  <>
    {/* Desktop: numbered pagination */}
    <div className="desk" style={{ display: 'block' }}>
      <div className="grid-4">
        {pagePosts.map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
      </div>
      {totalPages > 1 && (
        <nav style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          {currentPage > 1 && <button onClick={() => setPage(p => p - 1)} style={pgBtn(false)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg></button>}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)} style={pgBtn(n === currentPage)}>{n}</button>
          ))}
          {currentPage < totalPages && <button onClick={() => setPage(p => p + 1)} style={pgBtn(false)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg></button>}
        </nav>
      )}
    </div>

    {/* Mobile: Xem thêm */}
    <div className="mob" style={{ flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {posts.slice(0, visibleCount).map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
      </div>
      {visibleCount < posts.length && (
        <button onClick={() => setVisibleCount(v => v + PER_PAGE)} style={{ marginTop: 32, width: '100%', height: 52, border: '1px solid var(--border)', background: 'none', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500 }}>
          Xem thêm
        </button>
      )}
    </div>
  </>
)}
```

Also reset `visibleCount` when category changes:
```tsx
useEffect(() => {
  setLoading(true)
  setVisibleCount(PER_PAGE)
  // ... existing fetch
}, [activeCat])
```

- [ ] **Step 2: Apply same pattern to Category page**

In `app/the-loai/[slug]/page.tsx`, add `const [visibleCount, setVisibleCount] = useState(PER_PAGE)` and apply the same desktop/mobile split pattern.

Also reset on slug change:
```tsx
useEffect(() => {
  setVisibleCount(PER_PAGE)
  // ... existing fetch
}, [slug])
```

- [ ] **Step 3: Apply same pattern to Series page**

Same pattern in `app/series/[slug]/page.tsx`. Also reset on tab change:
```tsx
useEffect(() => {
  setVisibleCount(PER_PAGE)
  // ... existing fetch
}, [activeTab])
```

- [ ] **Step 4: Commit**
```bash
git add app/music-blog/page.tsx app/the-loai/\[slug\]/page.tsx app/series/\[slug\]/page.tsx
git commit -m "mobile pagination: replace numbered pages with Xem thêm button"
```

---

## Task 11: Homepage — mobile "Xem chuyên đề" at end of each series group

**Files:**
- Modify: `app/page.tsx`

Currently on mobile the series sections don't have the "Xem chuyên đề" link at the end. The desktop version has it after the post list.

- [ ] **Step 1: Add "Xem chuyên đề" link at bottom of each mobile series section**

In `app/page.tsx`, in the mobile section (`<div className="mob" ...>`), add the link at the end of each series group, after the `s.posts.map(...)` block:
```tsx
{homeSeries.map((s: any) => (
  <section key={s._id} style={{ marginTop: 48, paddingTop: 48, borderTop: '1px solid var(--border)' }}>
    {/* ... existing header and posts ... */}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {s.posts.map((p: any) => {
        // ... existing post rows
      })}
    </div>
    {/* ADD THIS: */}
    <Link href={`/series/${s.slug.current}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
      Xem chuyên đề <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </Link>
  </section>
))}
```

- [ ] **Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "homepage mobile: add Xem chuyên đề CTA at end of each series group"
```

---

## Task 12: Series — fix ordering (Ẩn sau giàn trống first)

**Files:**
- Modify: `sanity/schemas/series.ts`
- Modify: `sanity.config.ts` (no change needed — schema already registered)
- Modify: `app/series/page.tsx`
- Modify: `app/series/[slug]/page.tsx`

- [ ] **Step 1: Add sortOrder field to series schema**

In `sanity/schemas/series.ts`:
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number appears first. Set 1 for Ẩn Sau Giàn Trống, 2 for Tản Mạn.',
      initialValue: 99,
    }),
  ],
  preview: { select: { title: 'title' } },
})
```

- [ ] **Step 2: Update series fetch to order by sortOrder**

In `app/series/[slug]/page.tsx`, change the series list fetch:
```tsx
client.fetch(`*[_type == "series"] | order(sortOrder asc, title asc) { _id, title, slug }`).then(setSeriesList)
```

- [ ] **Step 3: Fix series/page.tsx to use Sanity first series**

Replace `app/series/page.tsx` to redirect to the first series from Sanity:
```tsx
import { client } from '@/lib/sanity'
import { redirect } from 'next/navigation'

export default async function SeriesIndexPage() {
  const first = await client.fetch(`*[_type == "series"] | order(sortOrder asc, title asc)[0] { slug }`)
  if (first?.slug?.current) {
    redirect(`/series/${first.slug.current}`)
  }
  redirect('/music-blog')
}
```

- [ ] **Step 4: Go to Sanity Studio and set sortOrder**

In Studio at `/studio`, set `sortOrder = 1` for "Ẩn Sau Giàn Trống" and `sortOrder = 2` for "Tản Mạn".

- [ ] **Step 5: Commit**
```bash
git add sanity/schemas/series.ts app/series/page.tsx app/series/\[slug\]/page.tsx
git commit -m "series: add sortOrder field, fix tab order (Ẩn sau giàn trống first)"
```

---

## Task 13: Search — dark overlay, diacritic search, thumbnails, new-search bug, pagination

**Files:**
- Modify: `components/SearchDialog.tsx`
- Modify: `app/tim-kiem/client.tsx`

- [ ] **Step 1: Fix SearchDialog — dark overlay + thumbnails + diacritic**

In `components/SearchDialog.tsx`:

1. Darker overlay (line 57): Change from `color-mix(in oklab,var(--fg) 40%,transparent)` to `rgba(0,0,0,0.75)` and reduce blur:
```tsx
<div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(2px)' }} />
```

2. Add `norm` function and diacritic search:
```tsx
function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/gi, 'd')
}
```

3. Update the `results` filter to use `norm`:
```tsx
const results = useMemo(() => {
  const q = norm(query.trim())
  if (!q) return []
  return allPosts.filter(p => {
    const artists = p.artists?.map((a: any) => a.name).join(' ') ?? ''
    return norm([p.title, p.excerpt, p.category?.title, p.author?.name, artists].join(' ')).includes(q)
  })
}, [query, allPosts])
```

4. Add `mainImageUrl` to the fetch and fix thumbnail:
```tsx
client.fetch(`*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, mainImage, mainImageUrl,
  category->{title, slug}, author->{name}, artists[]->{name}
}`).then(setAllPosts)
```

5. Fix thumbnail in results list — use `cleanWixUrl` fallback:
```tsx
function cleanWixUrl(url: string): string {
  return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
}
// In result item:
const thumbSrc = p.mainImage
  ? urlFor(p.mainImage).width(112).height(112).url()
  : p.mainImageUrl ? cleanWixUrl(p.mainImageUrl) : null
// then:
{thumbSrc && <Image src={thumbSrc} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized={!p.mainImage} />}
```

- [ ] **Step 2: Fix TimKiemClient — new-search bug, diacritic, Xem thêm**

The bug: `query` state is initialized from `searchParams.get('q')` only once. When the URL changes (user does a new search), the state doesn't update.

In `app/tim-kiem/client.tsx`, add a `useEffect` that syncs query with searchParams:
```tsx
const searchParams = useSearchParams()
const initial = searchParams.get('q') ?? ''
const [query, setQuery] = useState(initial)

// Sync query when URL search param changes
useEffect(() => {
  const q = searchParams.get('q') ?? ''
  setQuery(q)
}, [searchParams])
```

Add `norm` function and diacritic search to the filter:
```tsx
function norm(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/đ/gi, 'd')
}

const results = useMemo(() => {
  const q = norm(query.trim())
  if (!q) return []
  return allPosts.filter(p => {
    const artistNames = p.artists?.map((a: any) => a.name).join(' ') ?? ''
    return norm([p.title, p.category?.title, p.author?.name, artistNames].join(' ')).includes(q)
  })
}, [query, allPosts])
```

Add pagination state and Xem thêm:
```tsx
const [visibleCount, setVisibleCount] = useState(PER_PAGE)
const PER_PAGE = 28

// Reset when query changes
useEffect(() => { setVisibleCount(PER_PAGE) }, [query])
```

Replace the results grid:
```tsx
{results.length > 0 ? (
  <>
    <div className="grid-4" style={{ paddingTop: 40 }}>
      {results.slice(0, visibleCount).map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
    </div>
    {visibleCount < results.length && (
      <button onClick={() => setVisibleCount(v => v + PER_PAGE)} style={{ marginTop: 32, width: '100%', height: 52, border: '1px solid var(--border)', background: 'none', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500 }}>
        Xem thêm
      </button>
    )}
  </>
) : query.trim() ? (
  <p style={{ marginTop: 64, textAlign: 'center', fontSize: 15, color: 'var(--muted-fg)' }}>Không tìm thấy kết quả cho &ldquo;{query}&rdquo;.</p>
) : null}
```

- [ ] **Step 3: Commit**
```bash
git add components/SearchDialog.tsx app/tim-kiem/client.tsx
git commit -m "search: dark overlay, diacritic support, thumbnail fix, new-search bug, Xem thêm"
```

---

## Task 14: Nghệ Sĩ — mobile scroll view + create artist detail page

**Files:**
- Modify: `app/nghe-si/page.tsx`
- Create: `app/nghe-si/[slug]/page.tsx`

- [ ] **Step 1: Update Nghệ Sĩ page — mobile shows all groups scrollable**

In `app/nghe-si/page.tsx`, change the letter filter + single active letter section to always show all letters and their artists on mobile. Use `className="desk"` on the letter bar and active-letter filtered section, and `className="mob"` on a full scrollable list:

```tsx
{letters.length > 0 ? (
  <>
    {/* Desktop: letter filter */}
    <div className="desk" style={{ flexDirection: 'column' }}>
      <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 2, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        {letters.map(L => {
          const active = L === activeLetter
          return (
            <button key={L} onClick={() => setSelectedLetter(L)} style={{ display: 'flex', width: 42, height: 42, alignItems: 'center', justifyContent: 'center', border: 'none', background: active ? '#ff2e2e' : 'transparent', fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: active ? '#fff' : 'var(--muted-fg)', cursor: 'pointer' }}>
              {L}
            </button>
          )
        })}
      </div>
      {activeLetter && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6vw,44px)', fontWeight: 700, lineHeight: 1, color: 'var(--brand)' }}>{activeLetter}</h2>
          <ul className="art-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {(byLetter.get(activeLetter) ?? []).map((a: any) => (
              <li key={a._id} style={{ padding: '0 0 12px' }}>
                <Link href={`/nghe-si/${a.slug?.current}`} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Mobile: all letters grouped, scrollable */}
    <div className="mob" style={{ flexDirection: 'column', marginTop: 32 }}>
      {letters.map(L => (
        <div key={L} style={{ marginBottom: 32 }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, lineHeight: 1, color: 'var(--brand)' }}>{L}</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(byLetter.get(L) ?? []).map((a: any) => (
              <li key={a._id}>
                <Link href={`/nghe-si/${a.slug?.current}`} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: 17 }}>{a.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
) : (
  <p style={{ marginTop: 48, textAlign: 'center', fontSize: 14, color: 'var(--muted-fg)' }}>Không tìm thấy nghệ sĩ nào cho &ldquo;{query}&rdquo;</p>
)}
```

- [ ] **Step 2: Create artist detail page**

Create `app/nghe-si/[slug]/page.tsx`:
```tsx
'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

export default function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [artist, setArtist] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [visibleCount, setVisibleCount] = useState(28)

  useEffect(() => {
    client.fetch(`*[_type == "artist" && slug.current == $slug][0] { _id, name, slug }`, { slug })
      .then(setArtist)
    client.fetch(
      `*[_type == "post" && $slug in artists[]->slug.current] | order(publishedAt desc) { _id, title, slug, publishedAt, mainImage, mainImageUrl, "body": body[_type == "block" && style == "normal"][0...1]{_type, style, children[]{text}}, category->{title,slug}, author->{name,slug,avatar} }`,
      { slug }
    ).then(setPosts)
  }, [slug])

  if (!artist) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <Link href="/nghe-si" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Nghệ Sĩ
      </Link>

      <div style={{ marginTop: 32 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Nghệ sĩ</p>
        <h1 style={{ margin: '8px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px,7vw,56px)', fontWeight: 700, color: 'var(--fg)' }}>{artist.name}</h1>
        <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài viết</p>
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid-4" style={{ marginTop: 48 }}>
            {posts.slice(0, visibleCount).map(p => (
              <PostCard key={p._id} post={p} author={p.author} sanity />
            ))}
          </div>
          {visibleCount < posts.length && (
            <button onClick={() => setVisibleCount(v => v + 28)} style={{ marginTop: 32, width: '100%', height: 52, border: '1px solid var(--border)', background: 'none', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer', fontWeight: 500 }}>
              Xem thêm
            </button>
          )}
        </>
      ) : (
        <p style={{ marginTop: 48, color: 'var(--muted-fg)' }}>Chưa có bài viết nào cho nghệ sĩ này.</p>
      )}
    </section>
  )
}
```

- [ ] **Step 3: Update artist links in post detail**

In `app/post/[slug]/page.tsx`, the artists section currently links to `/tim-kiem?q=...`. Update to link to `/nghe-si/${a.slug?.current}` instead:
```tsx
{post.artists.map((a: any) => (
  <Link key={a.slug?.current} href={`/nghe-si/${a.slug?.current}`} style={{ border: '1px solid var(--border)', padding: '6px 12px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', borderRadius: '9999px' }}>
    {a.name}
  </Link>
))}
```

- [ ] **Step 4: Commit**
```bash
git add app/nghe-si/page.tsx app/nghe-si/\[slug\]/page.tsx app/post/\[slug\]/page.tsx
git commit -m "nghe-si: mobile scroll layout, artist detail page, update artist links"
```

---

## Task 15: Bọn Này — team grid, author detail layout, settings schema

**Files:**
- Modify: `app/globals.css` — fix auth-grid mobile (3 cols not 4)
- Modify: `app/bon-nay/page.tsx` — fetch intro from Sanity settings
- Modify: `app/bon-nay/[slug]/page.tsx` — layout, thumbnail fix, mobile label
- Create: `sanity/schemas/siteSettings.ts`
- Modify: `sanity.config.ts`

- [ ] **Step 1: Fix auth-grid mobile — 3 columns for 3+2 layout**

In `app/globals.css`, the media query at line ~99 sets `auth-grid` to 4 columns on ≤880px. Change to 3:
```css
@media (max-width: 880px)  {
  .auth-grid { grid-template-columns: repeat(3, 1fr); }
  .team-col  { margin-top: 0 !important; }
  .home-aside { border-left: none !important; padding-left: 0 !important; border-top: 1px solid var(--border); padding-top: 36px; }
}
```
With 5 authors in a 3-column grid, CSS grid auto-places them: 3 in row 1, 2 in row 2.

- [ ] **Step 2: Create siteSettings Sanity schema**

Create `sanity/schemas/siteSettings.ts`:
```ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'bonNayIntro',
      title: 'Bọn Này — Intro paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph in the Bọn Này page intro.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
```

- [ ] **Step 3: Register siteSettings in sanity.config.ts**

In `sanity.config.ts`:
```ts
import siteSettings from './sanity/schemas/siteSettings'

export default defineConfig({
  // ...
  schema: {
    types: [post, author, artist, series, category, siteSettings],
  },
})
```

- [ ] **Step 4: Fetch settings in bon-nay page**

In `app/bon-nay/page.tsx`, add settings fetch and use `settings.bonNayIntro` for intro paragraphs:
```tsx
const [settings, setSettings] = useState<any>(null)

useEffect(() => {
  client.fetch(`*[_type == "author"] { _id, name, slug, avatar, about }`).then(setAuthors)
  client.fetch(`*[_type == "siteSettings"][0] { bonNayIntro }`).then(setSettings)
}, [])
```

Replace the hardcoded intro paragraphs with:
```tsx
{settings?.bonNayIntro?.length > 0 ? (
  settings.bonNayIntro.map((para: string, i: number) => (
    <p key={i} style={{ margin: 0, fontSize: 19, lineHeight: 1.7, color: i === 0 ? 'var(--fg)' : 'var(--muted-fg)' }}>{para}</p>
  ))
) : (
  // Fallback to hardcoded text while settings not set
  <>
    <p style={{ margin: 0, fontSize: 19, lineHeight: 1.7, color: 'var(--fg)' }}>Bọn này là những thằng quen và chơi với nhau từ rất nhiều năm vì cùng chia sẻ một sở thích: nghe nhạc.</p>
    <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--muted-fg)' }}>Bọn này viết lách tào lao trên trang này với mục đích thuần túy chia sẻ sở thích nghe nhạc và mấy thứ lượm lặt chỗ này chỗ kia với mọi người. Bọn này chỉ kể chuyện thôi nhé, đừng quan trọng đúng hay sai.</p>
  </>
)}
```

After deploying, go to Studio → Site Settings, create a document and fill in the paragraphs.

- [ ] **Step 5: Fix author detail — left-align photo+name, expand bio, fix sidebar**

In `app/bon-nay/[slug]/page.tsx`, replace the main grid layout:

Change from `repeat(auto-fit, minmax(280px, 1fr))` to a fixed layout: `280px 1fr 360px` on desktop, stacked on mobile.

```tsx
{/* Desktop: 3-col layout with explicit widths */}
<div className="desk" style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '260px 1fr 360px', gap: 48, alignItems: 'start' }}>

  {/* Col 1: Avatar + name — left aligned */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
    <div style={{ position: 'relative', width: 200, height: 200, background: 'var(--muted)', overflow: 'hidden' }}>
      {author.avatar && <Image src={urlFor(author.avatar).width(400).height(400).url()} alt={author.name} fill style={{ objectFit: 'cover' }} />}
    </div>
    <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--fg)' }}>{author.name}</h1>
  </div>

  {/* Col 2: Bio — full width */}
  <div>
    {author.about && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {author.about.split('\n\n').map((para: string, i: number) => (
          <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: 'var(--muted-fg)' }}>{para}</p>
        ))}
      </div>
    )}
  </div>

  {/* Col 3: Sidebar posts */}
  <aside style={{ borderLeft: '1px solid var(--border)', paddingLeft: 32 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
      <span style={{ fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài</span>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--fg)' }}>Bài viết</h2>
    </div>
    <div style={{ maxHeight: 900, overflowY: 'auto', scrollbarWidth: 'none' }}>
      {posts.map(p => {
        const src = p.mainImage
          ? urlFor(p.mainImage).width(160).height(120).url()
          : p.mainImageUrl ? cleanWixUrl(p.mainImageUrl) : null
        return (
          <Link key={p._id} href={`/post/${p.slug.current}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ position: 'relative', flex: '0 0 80px', width: 80, height: 60, background: 'var(--muted)', overflow: 'hidden' }}>
              {src && <Image src={src} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized={!p.mainImage} />}
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
                {p.title}
              </h3>
              <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--muted-fg)' }}>{p.category?.title}</p>
            </div>
          </Link>
        )
      })}
    </div>
  </aside>
</div>
```

Also add the `cleanWixUrl` helper at the top of the file:
```tsx
function cleanWixUrl(url: string): string {
  return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
}
```

Keep the existing mobile section but:
- Update links to `/post/` instead of `/posts/`
- Fix thumbnails to include `cleanWixUrl` fallback (same as above)
- Change button label from `Xem thêm (X bài còn lại)` to `Xem thêm`:
```tsx
<button onClick={() => setMobileLimit(l => l + 20)} style={{ marginTop: 24, width: '100%', height: 48, border: '1px solid var(--border)', background: 'none', color: 'var(--fg)', fontSize: 15, fontFamily: 'inherit', cursor: 'pointer' }}>
  Xem thêm
</button>
```

- [ ] **Step 6: Add mobile stacked layout for author detail**

Above the desktop grid, wrap everything in a `<div className="desk" ...>`. Add a separate `<div className="mob" ...>` block for mobile that stacks photo+name, then bio, then the scrollable post list.

```tsx
{/* Mobile author layout */}
<div className="mob" style={{ flexDirection: 'column', marginTop: 40, gap: 32 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <div style={{ position: 'relative', width: 100, height: 100, background: 'var(--muted)', overflow: 'hidden', flexShrink: 0 }}>
      {author.avatar && <Image src={urlFor(author.avatar).width(200).height(200).url()} alt={author.name} fill style={{ objectFit: 'cover' }} />}
    </div>
    <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: 'var(--fg)' }}>{author.name}</h1>
  </div>
  {author.about && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {author.about.split('\n\n').map((para: string, i: number) => (
        <p key={i} style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--muted-fg)' }}>{para}</p>
      ))}
    </div>
  )}
  {/* Mobile post list (already exists below, just wrap it here) */}
</div>
```

Move the existing `<div className="mob" ...>` post list inside this mobile block.

- [ ] **Step 7: Commit**
```bash
git add app/globals.css app/bon-nay/page.tsx app/bon-nay/\[slug\]/page.tsx sanity/schemas/siteSettings.ts sanity.config.ts
git commit -m "bon-nay: 3+2 team grid, author layout, settings schema, thumbnail fix"
```

---

## Task 16: Final review and verification

- [ ] **Step 1: Run type check**
```bash
npx tsc --noEmit
```
Expected: no errors (or only pre-existing ones).

- [ ] **Step 2: Test in browser at key pages**
- `/` — homepage banner fades, mobile series has "Xem chuyên đề" at end
- `/music-blog` — correct banner, thumbnails showing, first para not excerpt, mobile Xem thêm
- `/post/some-slug` — no brief, related sidebar shows, artists have correct links
- `/posts/some-slug` — redirects to `/post/some-slug`
- `/series/an-sau-gian-trong` — correct banner, correct tab order
- `/nghe-si` — desktop letter filter, mobile all groups scrollable, clicking name → `/nghe-si/[slug]`
- `/bon-nay` — team shows 3+2 on mobile
- `/bon-nay/kink` — left-aligned photo, sidebar has post count on left
- Search modal — dark overlay, thumbnails, Vietnamese diacritic search works

- [ ] **Step 3: Note on author import issue**

The question of posts attributed to Kroon instead of correct authors is a **Sanity data issue** — check in Studio (`/studio`) which posts have `author = Kroon` unexpectedly, and reassign manually.

- [ ] **Step 4: Final commit and push**
```bash
git add -A
git commit -m "final: verify all fixes complete"
git push
```
