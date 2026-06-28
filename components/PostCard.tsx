'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Post, Author } from '@/types'
import { fmtDate } from '@/lib/data'

interface PostCardProps {
  post: Post
  author: Author
}

export default function PostCard({ post, author }: PostCardProps) {
  const meta = `${fmtDate(post.date)} · ${post.readingTime}`

  return (
    <article style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)' }}>
      <Link href={`/posts/${post.slug}`} style={{ display: 'block' }}>
        <div style={{ position: 'relative', aspectRatio: '3/2', width: '100%', overflow: 'hidden', background: 'var(--muted)' }}>
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          )}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '44px 14px 13px',
            background: 'linear-gradient(to top,rgba(6,5,4,.96),rgba(6,5,4,.55) 55%,rgba(6,5,4,0))',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--brand)' }}>
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div style={{ marginTop: 16, display: 'flex', flex: 1, flexDirection: 'column' }}>
        <h2 style={{
          marginTop: 0,
          fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 600,
          lineHeight: 1.28, letterSpacing: '-.01em', color: 'var(--fg)',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2,
          overflow: 'hidden', minHeight: '2.56em',
        }}>
          <Link href={`/posts/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {post.title}
          </Link>
        </h2>

        <p style={{
          marginTop: 6, fontSize: 14, lineHeight: 1.6, color: 'var(--muted-fg)',
          display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3,
          overflow: 'hidden', height: '4.8em',
        }}>
          {post.excerpt}
        </p>

        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
          {author.avatar && (
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              style={{ borderRadius: '9999px', objectFit: 'cover', flex: 'none', clipPath: 'circle(50%)' }}
            />
          )}
          <div style={{ fontSize: 12, lineHeight: 1.4 }}>
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)' }}>{author.name}</p>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-fg)' }}>{meta}</p>
          </div>
        </div>
      </div>
    </article>
  )
}