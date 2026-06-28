'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

const PER_PAGE = 28

export default function MusicBlogPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [activeCat, setActiveCat] = useState<string>('all')
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "category"] | order(title asc) { _id, title, slug }`).then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    const query = activeCat === 'all'
      ? `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category->{title, slug}, author->{name, slug, avatar} }`
      : `*[_type == "post" && category->slug.current == $cat] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category->{title, slug}, author->{name, slug, avatar} }`
    client.fetch(query, { cat: activeCat }).then(data => {
      setPosts(data)
      setLoading(false)
    })
  }, [activeCat])

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const allCategories = [{ _id: 'all', title: 'Tất tần tật', slug: { current: 'all' } }, ...categories]

  return (
    <>
      <section style={{ padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,28vw,400px)', overflow: 'hidden', borderBottom: '1px solid var(--border)', background: '#000' }}>
          <Image src="/assets/music-blog-banner.jpg" alt="Music Blog" fill style={{ objectFit: 'cover', objectPosition: 'center 42%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(8,7,6,0) 35%,rgba(8,7,6,.55) 70%,rgba(8,7,6,.9))' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, margin: '0 auto', maxWidth: 1280, padding: '0 24px 28px', textAlign: 'right' }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,8vw,76px)', fontWeight: 700, lineHeight: .95, color: '#ff2e2e', textTransform: 'uppercase', textShadow: '0 2px 16px rgba(0,0,0,.85)' }}>Music Blog</h1>
          </div>
        </div>
      </section>

      <div style={{ position: 'sticky', top: 64, zIndex: 40, marginTop: 24, background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <nav className="scroller" style={{ margin: '0 auto', maxWidth: 1280, padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {allCategories.map(cat => {
            const active = cat.slug.current === activeCat
            return (
              <button key={cat._id} onClick={() => { setActiveCat(cat.slug.current); setPage(1) }} style={{
                flex: '0 0 auto', appearance: 'none', cursor: 'pointer', border: 'none',
                borderBottom: `2px solid ${active ? '#ff2e2e' : 'var(--border)'}`,
                background: active ? '#ff2e2e' : 'transparent',
                color: active ? '#fff' : 'var(--fg)',
                fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: active ? 600 : 500,
                textTransform: 'uppercase', letterSpacing: '.02em', padding: '16px 18px', whiteSpace: 'nowrap',
              }}>
                {cat.title}
              </button>
            )
          })}
        </nav>
      </div>

      <section style={{ margin: '0 auto', maxWidth: 1280, padding: '28px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted-fg)' }}>{posts.length} bài viết</span>
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--muted-fg)', padding: 40 }}>Đang tải...</p>
        ) : (
          <div className="grid-4">
            {pagePosts.map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
          </div>
        )}

        {totalPages > 1 && (
          <nav style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {currentPage > 1 && (
              <button onClick={() => setPage(p => p - 1)} style={pgBtn(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={pgBtn(n === currentPage)}>{n}</button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => setPage(p => p + 1)} style={pgBtn(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            )}
          </nav>
        )}
      </section>
    </>
  )
}

const pgBtn = (active: boolean): React.CSSProperties => ({
  appearance: 'none', cursor: 'pointer', display: 'flex',
  minWidth: 44, height: 44, alignItems: 'center', justifyContent: 'center', padding: '0 8px',
  border: `1px solid ${active ? '#ff2e2e' : 'var(--border)'}`,
  background: active ? '#ff2e2e' : 'transparent',
  color: active ? '#fff' : 'var(--fg)',
  fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600,
})