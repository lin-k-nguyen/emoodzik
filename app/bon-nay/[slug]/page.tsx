import type { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import AuthorClient from './client'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0] { name, about, avatar }`,
    { slug }
  )
  const name = author?.name ?? 'Tác giả'
  const description = author?.about?.split('\n')[0] ?? `Đọc các bài viết của ${name} trên EmoodziK.`
  const image = author?.avatar
    ? urlFor(author.avatar).width(1200).height(630).url()
    : '/assets/banner.png'

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Bọn Này — EmoodziK`,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
    },
  }
}

export default function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  return <AuthorClient params={params} />
}
