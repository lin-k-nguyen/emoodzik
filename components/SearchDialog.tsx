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
            <ul