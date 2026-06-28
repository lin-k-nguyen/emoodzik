'use client'

import { useState, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getAllPosts, getAuthor } from '@/lib/data'
import PostCard from '@/components/PostCard'

function norm(s: string) { return s.toLowerCase() }

export default function TimKiemPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initial = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initial)

  const results = useMemo(() => {
    const q = norm(query.trim())
    if (!q) return []
    return getAllPosts().filter(p => {
      const au = getAuthor(p.author)
      return [p.title, p.excerpt, p.category, au?.name ?? '', ...p.artists].join(' ').toLowerCase().includes(q)
    })
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>Kết quả tìm kiếm</p>
      <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,6vw,44px)', fontWeight: 600, color: 'var(--fg)' }}>
        {query.trim() || 'Tìm kiếm'}
      </h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 28, position: 'relative', maxWidth: 560 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text" value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Tìm bài viết, nghệ sĩ, chuyên mục..."
          style={{ height: 52, width: '100%', border: '1px solid var(--border)', background: 'var(--bg)', padding: '0 20px 0 48px', fontSize: 15, color: 'var(--fg)', outline: 'none', fontFamily: 'inherit' }}
        />
      </form>

      <p style={{ margin: '24px 0 0', borderBottom: '1px solid var(--border)', paddingBottom: 16, fontSize: 14, color: 'var(--muted-fg)' }}>
        {query.trim() ? `${results.length} kết quả cho "${query.trim()}"` : ''}
      </p>

      {results.length > 0 ? (
        <div className="grid-4" style={{ paddingTop: 40 }}>
          {results.map(p => <PostCard key={p.slug} post={p} author={getAuthor(p.author)!} />)}
        </div>
      ) : query.trim() ? (
        <p style={{ marginTop: 64, textAlign: 'center', fontSize: 15, color: 'var(--muted-fg)' }}>
          Không tìm thấy bài viết nào cho &ldquo;{query}&rdquo;. Thử từ khoá khác xem sao.
        </p>
      ) : null}
    </section>
  )
}
