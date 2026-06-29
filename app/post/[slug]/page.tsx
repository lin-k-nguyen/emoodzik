import type { Metadata } from 'next'
import { client, urlFor } from '@/lib/sanity'
import PostDetail from './PostDetail'

function firstParaText(body: any[]): string {
  return body?.find((b: any) => b._type === 'block')
    ?.children?.map((c: any) => c.text).join('') ?? ''
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title, seoTitle, seoDescription, excerpt, mainImage, mainImageUrl,
      "body": body[_type == "block" && style == "normal"][0...1]{ children[]{ text } }
    }`,
    { slug }
  )
  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || firstParaText(post.body)
  const image = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : post.mainImageUrl ?? undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: image ? [{ url: image, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  return <PostDetail slug={slug} />
}
