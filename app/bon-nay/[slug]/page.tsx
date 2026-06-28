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
      {/* Header */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '64px 24px 48px' }}>
        <div style={{ margin: '0 auto', maxWidth: 1280 }}>
          <Link href="/bon-nay" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Bọn Này
          </Link>

          {/* 3 cột: ava+tên | bio | bài viết */}
          <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '160px 1fr 380px', gap: 48, alignItems: 'start' }}>

            {/* Cột 1: Avatar + tên */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <div style={{ position: 'relative', width: 160, height: 160, background: 'var(--muted)', overflow: 'hidden' }}>
                {author.avatar && <Image src={urlFor(author.avatar).width(320).height(320).url()} alt={author.name} fill style={{ objectFit: 'cover' }} />}
              </div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--fg)', textAlign: 'center' }}>{author.name}</h1>
            </div>

            {/* Cột 2: Bio */}
            <div style={{ paddingLeft: 8 }}>
              {author.about && (
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: 'var(--muted-fg)' }}>{author.about}</p>
              )}
            </div>

            {/* Cột 3: Bài viết sidebar */}
            <aside style={{ borderLeft: '1px solid var(--border)', paddingLeft: 40 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--fg)' }}>Bài viết</h2>
                <span style={{ fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {posts.slice(0, 5).map(p => (
                  <Link key={p._id} href={`/posts/${p.slug.current}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', flex: '0 0 84px', width: 84, height: 64, background: 'var(--muted)', overflow: 'hidden' }}>
                      {p.mainImage && <Image src={urlFor(p.mainImage).width(168).height(128).url()} alt={p.title} fill style={{ objectFit: 'cover' }} />}
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
                        {p.title}
                      </h3>
                      <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--muted-fg)' }}>{p.category?.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {posts.length > 5 && (
                <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted-fg)' }}>và {posts.length - 5} bài viết khác</p>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* All posts grid */}
      {posts.length > 0 && (
        <section style={{ padding: '48px 24px 80px' }}>
          <div style={{ margin: '0 auto', maxWidth: 1280 }}>
            <h2 style={{ margin: '0 0 40px', borderBottom: '1px solid var(--border)', paddingBottom: 16, fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--fg)' }}>
              Tất cả bài viết của {author.name}
            </h2>
            <div className="grid-3">
              {posts.map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
            </div>
          </div>
        </section>
      )}
    </>
  )
}