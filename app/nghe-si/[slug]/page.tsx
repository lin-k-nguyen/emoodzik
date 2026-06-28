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
