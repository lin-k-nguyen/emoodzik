'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'

interface SearchDialogProps {
  onClose: () => void
}

export default function SearchDialog({ onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [allPosts, setAllPosts] = useState<any[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage,
      category->{title, slug},
      author->{name},
      artists[]->{name}
    }`).then(setAllPosts)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allPosts.filter(p => {
      const artists = p.artists?.map((a: any) => a.name).join(' ') ?? ''
      return [p.title, p.excerpt, p.category?.title, p.author?.name, artists]
        .join(' ').toLowerCase().includes(q)
    })
  }, [query, allPosts])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onClose()
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const q = query.trim()

  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'color-mix(in oklab,var(--fg) 40%,transparent)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'relative', marginTop: '8vh', width: '100%', maxWidth: 576, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg)', boxShadow: '0 30px 60px rgba(0,0,0,.35)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border)', padding: '0 16px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none', color: 'var(--muted-fg)' }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm bài viết, nghệ sĩ, chuyên mục..."
            style={{ height: 56, width: '100%', background: 'transparent', border: 'none', fontSize: 16, color: 'var(--fg)', outline: 'none', fontFamily: 'inherit' }}
          />
          <button type="button" onClick={onClose} aria-label="Đóng" style={{ display: 'flex', width: 32, height: 32, flex: 'none', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </form>

        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: 8 }}>
          {results.length > 0 ? (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {results.slice(0, 6).map(p => (
                <li key={p._id}>
                  <Link href={`/posts/${p.slug.current}`} onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 14px', textDecoration: 'none' }}>
                    <div style={{ position: 'relative', width: 56, height: 56, flex: 'none', overflow: 'hidden', background: 'var(--secondary)' }}>
                      {p.mainImage && <Image src={urlFor(p.mainImage).width(112).height(112).url()} alt={p.title} fill style={{ objectFit: 'cover' }} />}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--brand)' }}>{p.category?.title}</p>
                      <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                      <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.excerpt}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : q ? (
            <p style={{ padding: '40px 16px', textAlign: 'center', fontSize: 14, color: 'var(--muted-fg)' }}>
              Không tìm thấy bài viết nào cho &ldquo;{query}&rdquo;
            </p>
          ) : null}
        </div>

        {results.length > 6 && (
          <Link href={`/tim-kiem?q=${encodeURIComponent(q)}`} onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderTop: '1px solid var(--border)', padding: 16, fontSize: 14, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
            Xem tất cả {results.length} kết quả
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        )}
      </div>
    </div>
  )
}