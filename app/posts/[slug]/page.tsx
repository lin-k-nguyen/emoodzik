'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { client, urlFor } from '@/lib/sanity'
import PostCard from '@/components/PostCard'

function fmtDate(d: string) {
  try { return new Date(d).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) }
  catch { return d }
}

function calcReadingTime(body: any[]): string {
  if (!body) return '5 phút đọc'
  const text = body.filter((b: any) => b._type === 'block')
    .map((b: any) => b.children?.map((c: any) => c.text).join('') ?? '').join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} phút đọc`
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, publishedAt, mainImage, body,
      category->{title, slug},
      series->{title, slug},
      author->{name, slug, avatar, about},
      artists[]->{name, slug},
      seoTitle, seoDescription
    }`, { slug: params.slug }).then(async (data: any) => {
      if (!data) { setLoading(false); return }
      setPost(data)
      // fetch related
      const rel = await client.fetch(`*[_type == "post" && slug.current != $slug && category._ref == $catRef] | order(publishedAt desc)[0...4] {
        _id, title, slug, excerpt, publishedAt, mainImage, category->{title, slug}, author->{name, slug, avatar}
      }`, { slug: params.slug, catRef: data.category?._ref ?? '' })
      setRelated(rel)
      setLoading(false)
    })

    const onScroll = () => setScrolled(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [params.slug])

  if (loading) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>
  if (!post) return notFound()

  const readingTime = calcReadingTime(post.body)

  const shareHref = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
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
          {post.category && (
            <Link href={`/the-loai/${post.category.slug.current}`} style={{ fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)', textDecoration: 'none' }}>
              {post.category.title}
            </Link>
          )}
          <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px,6.5vw,46px)', fontWeight: 600, lineHeight: 1.1, color: 'var(--fg)' }}>
            {post.title}
          </h1>
          <p style={{ margin: '24px 0 0', fontSize: 18, lineHeight: 1.6, color: 'var(--muted-fg)' }}>{post.excerpt}</p>

          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
            <Link href={`/bon-nay/${post.author?.slug?.current}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
              {post.author?.avatar && (
                <Image src={urlFor(post.author.avatar).width(88).height(88).url()} alt={post.author.name} width={44} height={44} style={{ borderRadius: '9999px', objectFit: 'cover' }} />
              )}
              <div style={{ fontSize: 14, lineHeight: 1.3 }}>
                <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)' }}>{post.author?.name}</p>
                <p style={{ margin: 0, color: 'var(--muted-fg)' }}>{fmtDate(post.publishedAt)} · {readingTime}</p>
              </div>
            </Link>
          </div>
        </header>

        {post.mainImage && (
          <div style={{ position: 'relative', marginTop: 40, width: '100%', aspectRatio: '16/9', overflow: 'hidden', background: 'var(--muted)' }}>
            <Image src={urlFor(post.mainImage).width(1200).height(675).url()} alt={post.title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ marginTop: 48 }}>
          {post.body?.map((block: any, i: number) => {
            if (block._type === 'block') {
              const text = block.children?.map((c: any) => c.text).join('') ?? ''
              return <p key={block._key} className={i === 0 ? 'dropcap' : ''} style={{ margin: '0 0 24px', fontSize: 18, lineHeight: 1.8, color: 'color-mix(in oklab,var(--fg) 90%,transparent)' }}>{text}</p>
            }
            if (block._type === 'image') {
              return (
                <div key={block._key} style={{ margin: '32px 0', position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  <Image src={urlFor(block).width(1200).height(675).url()} alt={block.caption ?? ''} fill style={{ objectFit: 'cover' }} />
                  {block.caption && <p style={{ marginTop: 8, fontSize: 13, color: 'var(--muted-fg)', textAlign: 'center' }}>{block.caption}</p>}
                </div>
              )
            }
            if (block._type === 'youtube') {
              const videoId = block.url?.split('v=')[1]?.split('&')[0] ?? block.url?.split('/').pop()
              return (
                <div key={block._key} style={{ margin: '32px 0', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe src={`https://www.youtube.com/embed/${videoId}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                </div>
              )
            }
            return null
          })}
        </div>

        {post.artists?.length > 0 && (
          <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
            <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: 'var(--muted-fg)' }}>Nghệ sĩ nhắc tới</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {post.artists.map((a: any) => (
                <Link key={a._id} href={`/tim-kiem?q=${encodeURIComponent(a.name)}`} style={{ border: '1px solid var(--border)', padding: '6px 12px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', borderRadius: '9999px' }}>
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted-fg)' }}>Chia sẻ</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {['x', 'linkedin', 'facebook'].map(platform => (
              <a key={platform} href={shareHref(platform)} target="_blank" rel="noreferrer" style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--muted-fg)', textDecoration: 'none', borderRadius: '9999px' }}>
                {platform === 'x' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.2h3.7l-8 9.1 9.4 12.5h-7.4l-5.8-7.6-6.6 7.6H.5l8.5-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.3H4.3L17.6 20.7Z" /></svg>}
                {platform === 'linkedin' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.4V9h3.7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5c0 1 .8 1.8 1.8 1.8h20.4c1 0 1.8-.8 1.8-1.8V1.7c0-1-.8-1.7-1.8-1.7Z" /></svg>}
                {platform === 'facebook' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.4 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12Z" /></svg>}
              </a>
            ))}
            <button onClick={() => { try { navigator.clipboard.writeText(window.location.href) } catch {} setCopied(true); setTimeout(() => setCopied(false), 2000) }} style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', color: 'var(--muted-fg)', cursor: 'pointer', background: 'none', borderRadius: '9999px' }}>
              {copied ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>}
            </button>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ margin: '96px auto 0', maxWidth: 1280, padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>Đọc tiếp</h2>
          </div>
          <div className="grid-4" style={{ paddingTop: 40 }}>
            {related.map((p: any) => <PostCard key={p._id} post={p} author={p.author} sanity />)}
          </div>
        </section>
      )}

      {scrolled && (
        <div style={{ position: 'fixed', right: 24, bottom: 96, zIndex: 55 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fab" aria-label="Lên đầu trang" style={{ display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.18)', borderRadius: '9999px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
          </button>
        </div>
      )}
    </>
  )
}