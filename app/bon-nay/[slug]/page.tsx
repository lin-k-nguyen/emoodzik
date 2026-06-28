'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

export default function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [author, setAuthor] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    client.fetch(`*[_type == "author" && slug.current == $slug][0] { _id, name, slug, avatar, about }`, { slug }).then(setAuthor)
    client.fetch(`*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category->{title,slug}, author->{name,slug,avatar} }`, { slug }).then(setPosts)
  }, [slug])

  if (!author) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>

  return (
    <>
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 48px' }}>
          <Link href="/bon-nay" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Bọn Này
          </Link>
          <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' }}>
            <div style={{ position: 'relative', width: 128, height: 128, flex: 'none', background: 'var(--muted)', overflow: 'hidden' }}>
              {author.avatar && <Image src={urlFor(author.avatar).width(256).height(256).url()} alt={author.name} fill style={{ objectFit: 'cover' }} />}
            </div>
            <div>
              <h1 style={{ margin: '8px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>{author.name}</h1>
              {author.about && <p style={{ margin: '16px 0 0', maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: 'var(--muted-fg)' }}>{author.about}</p>}
              <p style={{ margin: '16px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài viết trên EmoodziK</p>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ margin: '0 auto', maxWidth: 1280 }}>
          <h2 style={{ margin: 0, borderBottom: '1px solid var(--border)', paddingBottom: 16, fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--fg)' }}>Bài viết của {author.name}</h2>
          <div className="grid-3" style={{ paddingTop: 40 }}>
            {posts.map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
          </div>
        </div>
      </section>
    </>
  )
}