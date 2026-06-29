import type { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import SeriesClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const series = await client.fetch(
    `*[_type == "series" && slug.current == $slug][0] { title, description, banner }`,
    { slug }
  )
  const title = series?.title ?? 'Series'
  const description = series?.description ?? `Đọc các bài viết trong series ${title} trên EmoodziK.`
  const image = series?.banner
    ? urlFor(series.banner).width(1200).height(630).url()
    : '/assets/banner.png'

  return {
    title,
    description,
    openGraph: {
      title: `${title} | EmoodziK`,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
  }
}

export default function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  return <SeriesClient params={params} />
}
