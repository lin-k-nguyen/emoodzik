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
