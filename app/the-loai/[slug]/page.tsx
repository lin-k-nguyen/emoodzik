import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import CategoryClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'all') {
    return {
      title: 'Tất tần tật',
      openGraph: {
        title: 'Tất tần tật | EmoodziK',
        images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
      },
    }
  }
  const cat = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0] { title, description }`,
    { slug }
  )
  const title = cat?.title ?? slug
  const description = cat?.description ?? `Bài viết chuyên mục ${title} trên EmoodziK.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | EmoodziK`,
      description,
      images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
    },
  }
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryClient params={params} />
}
