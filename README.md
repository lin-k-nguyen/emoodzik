# EmoodziK

A Vietnamese music blog. Built with Next.js and Sanity.

## Stack

- **Next.js 16** — App Router, React 19
- **Sanity v6** — CMS and embedded Studio at `/studio`
- **TypeScript**

## Getting started

```bash
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
```

```bash
npm run dev
```

## Content management

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio) when running locally.

Content types: **post**, **author**, **artist**, **category**, **series**.

Posts support a cover image in two ways — a Sanity asset (`mainImage`) or a raw Wix CDN URL (`mainImageUrl`) as a fallback during migration.

## Build

```bash
npm run build
npm run start
```
