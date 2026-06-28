'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

const PER_PAGE = 28

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [cat, setCat] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (slug === 'all') {
      setCat({ title: 'Tất tần tật', slug: { current: 'all' } })
      client.fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category->{title,slug}, author->{name,slug,avatar} }`)
        .then(setPosts)
    } else {
      client.fetch(`*[_type == "category" && slug.current == $slug][0] { title, slug, description }`, { slug }).then(setCat)
      client.fetch(`*[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) { _id, title, slug, excerpt, publishedAt, mainImage, category->{title,slug}, author->{name,slug,avatar} }`, { slug })
        .then(setPosts)
    }
  }, [slug])

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePosts = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <section style={{ margin: '0 auto', maxWidth: 1280, padding: '0 24px' }}>
        <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)' }}>
          <Link href="/music-blog" style={{ textDecoration: 'none', color: 'inherit' }}>Music Blog</Link>
          <span>/</span>
          <span style={{ color: 'var(--fg)' }}>{cat?.title}</span>
        </nav>
        <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>{cat?.title}</h1>
        {cat?.description && <p style={{ margin: '12px 0 0', maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: 'var(--muted-fg)' }}>{cat.description}</p>}
      </section>

      <section style={{ margin: '48px auto 0', maxWidth: 1280, padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
          <span style={{ fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài viết</span>
        </div>
        <div className="grid-4" style={{ paddingTop: 40 }}>
          {pagePosts.map(p => <PostCard key={p._id} post={p} author={p.author} sanity />)}
        </div>
        {totalPages > 1 && (
          <nav style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {currentPage > 1 && <button onClick={() => setPage(p => p - 1)} style={pgBtn(false)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg></button>}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => <button key={n} onClick={() => setPage(n)} style={pgBtn(n === currentPage)}>{n}</button>)}
            {currentPage < totalPages && <button onClick={() => setPage(p => p + 1)} style={pgBtn(false)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg></button>}
          </nav>
        )}
      </section>
    </div>
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