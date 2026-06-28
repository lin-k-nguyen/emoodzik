'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getAuthor, SERIES } from '@/lib/data'
import PostCard from '@/components/PostCard'

const PER_PAGE = 28

export default function SeriesPage({ params }: { params: { slug: string } }) {
  const validSeries = SERIES.find(s => s.slug === params.slug)

  const [activeTab, setActiveTab] = useState(params.slug)
  const [page, setPage] = useState(1)

  if (!validSeries) {
    return (
      <section style={{ margin: '0 auto', maxWidth: 768, padding: '120px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 80, fontWeight: 700, color: 'var(--brand)', margin: 0 }}>404</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--fg)' }}>Series không tồn tại</h1>
        <Link href="/" style={{ color: 'var(--brand)' }}>Về trang chủ</Link>
      </section>
    )
  }

  const allPosts = getAllPosts()
  const posts = allPosts.filter(p => p.series === activeTab)
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  return (
    <>
      {/* Banner */}
      <section style={{ padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,28vw,400px)', overflow: 'hidden', borderBottom: '1px solid var(--border)', background: '#000' }}>
          <Image src="/assets/banner.png" alt="Series" fill style={{ objectFit: 'cover', objectPosition: 'center 50%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(8,7,6,0) 35%,rgba(8,7,6,.55) 70%,rgba(8,7,6,.9))' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxWidth: 1280, margin: '0 auto', padding: '0 24px 28px', textAlign: 'right' }}>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(38px,8vw,76px)', fontWeight: 700, color: '#ff2e2e', textTransform: 'uppercase', textShadow: '0 2px 16px rgba(0,0,0,.85)' }}>
              Series
            </h1>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div style={{ position: 'sticky', top: 64, zIndex: 40, marginTop: 24, background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <nav style={{ margin: '0 auto', maxWidth: 1280, padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {SERIES.map(s => {
            const active = s.slug === activeTab
            return (
              <button key={s.slug} onClick={() => { setActiveTab(s.slug); setPage(1) }} style={{
                flex: '0 0 auto', appearance: 'none', cursor: 'pointer', border: 'none',
                borderBottom: `2px solid ${active ? '#ff2e2e' : 'var(--border)'}`,
                background: active ? '#ff2e2e' : 'transparent',
                color: active ? '#fff' : 'var(--fg)',
                fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: active ? 600 : 500,
                textTransform: 'uppercase', letterSpacing: '.02em', padding: '16px 18px', whiteSpace: 'nowrap',
              }}>
                {s.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Posts */}
      <section style={{ margin: '0 auto', maxWidth: 1280, padding: '28px 24px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 20 }}>
          <span style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--muted-fg)' }}>{posts.length} bài viết</span>
        </div>
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--muted-fg)', paddingTop: 40 }}>Chưa có bài viết nào trong series này.</p>
        ) : (
          <div className="grid-4">
            {pagePosts.map(p => <PostCard key={p.slug} post={p} author={getAuthor(p.author)!} />)}
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