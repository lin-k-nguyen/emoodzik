'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAuthor, getCategoryByLabel, getAllPosts, fmtDate, POSTS } from '@/lib/data'
import PostCard from '@/components/PostCard'

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const author = getAuthor(post.author)!
  const cat = getCategoryByLabel(post.category)
  const related = getAllPosts().filter(p => p.slug !== post.slug && p.category === post.category)

  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const copyLink = () => {
    try { navigator.clipboard.writeText(window.location.href) } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareHref = (platform: string) => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')
    const text = encodeURIComponent(post.title)
    if (platform === 'x') return `https://x.com/intent/tweet?text=${text}&url=${url}`
    if (platform === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    if (platform === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${url}`
    return '#'
  }

  return (
    <>
      <article style={{ margin: '0 auto', maxWidth: 768, padding: '64px 24px 0' }}>
        <Link href="/music-blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Music Blog
        </Link>

        <header style={{ marginTop: 40 }}>
          {cat && (
            <Link href={`/the-loai/${cat.slug}`} style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)', textDecoration: 'none' }}>
              {post.category}
            </Link>
          )}
          <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,6.5vw,46px)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em', color: 'var(--fg)' }}>
            {post.title}
          </h1>
          <p style={{ margin: '24px 0 0', fontSize: 18, lineHeight: 1.6, color: 'var(--muted-fg)' }}>{post.excerpt}</p>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
            <Link href={`/bon-nay/${author.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              <Image src={author.avatar} alt={author.name} width={44} height={44} style={{ borderRadius: '9999px', objectFit: 'cover', flex: 'none' }} />
              <div style={{ fontSize: 14, lineHeight: 1.3 }}>
                <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)' }}>{author.name}</p>
                <p style={{ margin: 0, color: 'var(--muted-fg)' }}>{fmtDate(post.date)} · {post.readingTime}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Cover image */}
        <div style={{ position: 'relative', marginTop: 40, width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--muted)' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} />
        </div>

        {/* Body */}
        <div style={{ marginTop: 48 }}>
          {post.body.map((para, i) => (
            <p key={i} className={i === 0 ? 'dropcap' : ''} style={{ margin: '0 0 24px', fontSize: 18, lineHeight: 1.8, color: 'color-mix(in oklab,var(--fg) 90%,transparent)' }}>
              {para}
            </p>
          ))}
        </div>

        {/* Artists */}
        {post.artists.length > 0 && (
          <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: 'var(--muted-fg)' }}>Nghệ sĩ nhắc tới</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {post.artists.map(a => (
                <Link key={a} href={`/tim-kiem?q=${encodeURIComponent(a)}`} style={{ border: '1px solid var(--border)', padding: '6px 12px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', borderRadius: '9999px' }}>
                  {a}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted-fg)' }}>Chia sẻ</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[
              { key: 'x', icon: <path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.5-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.3H4.3L17.6 20.7Z" />, fill: true },
              { key: 'linkedin', icon: <path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.4V9h3.7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V1.7c0-1-.8-1.7-1.8-1.7Z" />, fill: true },
              { key: 'facebook', icon: <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" />, fill: true },
            ].map(({ key, icon, fill }) => (
              <a key={key} href={shareHref(key)} target="_blank" rel="noreferrer" style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--muted-fg)', textDecoration: 'none', borderRadius: '9999px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke={fill ? undefined : 'currentColor'} strokeWidth="2">{icon}</svg>
              </a>
            ))}
            <button onClick={copyLink} style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--muted-fg)', cursor: 'pointer', background: 'none', borderRadius: '9999px' }}>
              {copied
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
              }
            </button>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ margin: '96px auto 0', maxWidth: 1280, padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>Đọc tiếp</h2>
            {cat && (
              <Link href={`/the-loai/${cat.slug}`} style={{ fontSize: 13, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--brand)', textDecoration: 'none' }}>
                {post.category}
              </Link>
            )}
          </div>
          <div className="grid-4" style={{ paddingTop: 40 }}>
            {related.map(p => <PostCard key={p.slug} post={p} author={getAuthor(p.author)!} />)}
          </div>
        </section>
      )}

      {/* Back to top */}
      {scrolled && (
        <div style={{ position: 'fixed', right: 24, bottom: 96, zIndex: 55, width: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fab" aria-label="Lên đầu trang" style={{ display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.18)', borderRadius: '9999px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
          </button>
        </div>
      )}
    </>
  )
}
