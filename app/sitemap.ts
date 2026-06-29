import type { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://emoodzik.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, series, authors] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc) { slug, publishedAt }`),
    client.fetch(`*[_type == "series"] { slug }`),
    client.fetch(`*[_type == "author"] { slug }`),
  ])

  return [
    { url: BASE, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/music-blog`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/series`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/bon-nay`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/nghe-si`, changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((p: any) => ({
      url: `${BASE}/post/${p.slug.current}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...series.map((s: any) => ({
      url: `${BASE}/series/${s.slug.current}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...authors.map((a: any) => ({
      url: `${BASE}/bon-nay/${a.slug.current}`,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
