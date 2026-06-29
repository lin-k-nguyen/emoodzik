'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

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

function cleanWixUrl(url: string): string {
  return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
}

function getImageSrc(value: any, w = 1200, h = 675): string | null {
  if (!value) return null
  const ref = value?.asset?._ref ?? ''
  if (ref.startsWith('image-') && !ref.includes('~mv2') && !ref.includes('.jpg~')) {
    return urlFor(value).width(w).height(h).url()
  }
  if (value?.asset?.url) return cleanWixUrl(value.asset.url)
  if (typeof value === 'string' && value.startsWith('http')) return cleanWixUrl(value)
  return null
}

// Click-to-load YouTube — avoids Vevo/copyright autoblock
function YouTubeEmbed({ url }: { url: string }) {
  const [loaded, setLoaded] = useState(false)
  const videoId = url?.split('v=')[1]?.split('&')[0] ?? url?.split('/').pop()
  if (!videoId) return null

  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  const thumbFallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  if (loaded) {
    return (
      <div style={{ margin: '32px 0', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
          allow="autoplay"
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => setLoaded(true)}
      style={{ margin: '32px 0', position: 'relative', paddingBottom: '56.25%', height: 0, cursor: 'pointer', background: '#000' }}
    >
      <img
        src={thumb}
        onError={e => { (e.target as HTMLImageElement).src = thumbFallback }}
        alt="YouTube video"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
      />
      {/* Play button */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 72, height: 72,
        background: 'rgba(255,0,0,0.9)',
        borderRadius: '9999px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'transform 0.15s',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {/* Watch on YouTube link as fallback */}
      
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,0.7)', color: '#fff',
          fontSize: 12, padding: '4px 10px',
          textDecoration: 'none', borderRadius: '9999px',
        }}
      >
        Xem trên YouTube ↗
      </a>
    </div>
  )
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ margin: '0 0 24px', fontSize: 18, lineHeight: 1.8, color: 'color-mix(in oklab,var(--fg) 90%,transparent)' }}>{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ margin: '48px 0 16px', fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--fg)' }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ margin: '32px 0 12px', fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: 'var(--fg)' }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ margin: '32px 0', borderLeft: '3px solid var(--brand)', paddingLeft: 24, fontStyle: 'italic', color: 'var(--muted-fg)', fontSize: 18 }}>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 700, color: 'var(--fg)' }}>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noreferrer" style={{ color: 'var(--brand)', textDecoration: 'underline' }}>{children}</a>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const src = getImageSrc(value)
      if (!src) return null
      const isSanity = src.includes('cdn.sanity.io')
      return (
        <div style={{ margin: '32px 0', position: 'relative', width: '100%', aspectRatio: '16/9' }}>
          <Image src={src} alt={value.caption ?? ''} fill style={{ objectFit: 'cover' }} unoptimized={!isSanity} />
          {value.caption && <p style={{ marginTop: 8, fontSize: 13, color: 'var(--muted-fg)', textAlign: 'center' }}>{value.caption}</p>}
        </div>
      )
    },
    youtube: ({ value }: any) => <YouTubeEmbed url={value.url} />,
  },
}

export default function PostDetail({ slug }: { slug: string }) {
  const [post, setPost] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, mainImage, mainImageUrl, body,
      category->{_id, title, slug},
      series->{_id, title, slug},
      author->{name, slug, avatar, about},
      artists[]->{name, slug},
      seoTitle, seoDescription
    }`, { slug }).then(async (data: any) => {
      if (!data) { setLoading(false); return }
      setPost(data)

      const rel = await client.fetch(`*[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...10] {
        _id, title, slug, publishedAt, mainImage, mainImageUrl
      }`, { slug })
      setRelated(rel)
      setLoading(false)
    })

    const onScroll = () => setScrolled(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (loading) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>
  if (!post) return <div style={{ padding: 120, textAlign: 'center', color: 'var(--muted-fg)' }}>Không tìm thấy bài viết.</div>

  const readingTime = calcReadingTime(post.body)
  const hasRelated = related.length > 0

  const coverSrc = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(675).url()
    : post.mainImageUrl ? cleanWixUrl(post.mainImageUrl) : null

  const coverBase = coverSrc ? coverSrc.split('~mv2')[0].split('/').pop() ?? '' : ''
  let firstImageSkipped = false
  const bodyFiltered = post.body?.filter((block: any) => {
    if (block._type !== 'image') return true
    if (firstImageSkipped) return true
    const src = getImageSrc(block) ?? ''
    const srcBase = src.split('~mv2')[0].split('/').pop() ?? ''
    if (coverBase && srcBase && srcBase === coverBase) {
      firstImageSkipped = true
      return false
    }
    return true
  }) ?? []

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
      <div className={hasRelated ? 'post-layout' : undefined} style={hasRelated ? undefined : {
        margin: '0 auto',
        maxWidth: 768,
        padding: '64px 24px 96px',
      }}>
        <article>
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
            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <Link href={`/bon-nay/${post.author?.slug?.current}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                {post.author?.avatar && (
                  <div className="fab" style={{ position: 'relative', flex: '0 0 44px', width: 44, height: 44, overflow: 'hidden' }}>
                    <Image src={urlFor(post.author.avatar).width(88).height(88).url()} alt={post.author.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ fontSize: 14, lineHeight: 1.3 }}>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--fg)' }}>{post.author?.name}</p>
                  <p style={{ margin: 0, color: 'var(--muted-fg)' }}>{fmtDate(post.publishedAt)} · {readingTime}</p>
                </div>
              </Link>
            </div>
          </header>

          {coverSrc && (
            <div style={{ marginTop: 40, background: 'var(--muted)' }}>
              <Image src={coverSrc} alt={post.title} width={1200} height={675} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} unoptimized={!post.mainImage} />
            </div>
          )}

          <div style={{ marginTop: 48 }}>
            <PortableText value={bodyFiltered} components={portableTextComponents} />
          </div>

          {post.artists?.length > 0 && (
            <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
              <p style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 500, color: 'var(--muted-fg)' }}>Nghệ sĩ nhắc tới</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {post.artists.map((a: any) => (
                  <Link key={a.slug?.current} href={`/nghe-si/${a.slug?.current}`} style={{ border: '1px solid var(--border)', padding: '6px 12px', fontSize: 14, color: 'var(--fg)', textDecoration: 'none', borderRadius: '9999px' }}>
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

        {hasRelated && (
          <aside style={{ borderLeft: '1px solid var(--border)', paddingLeft: 40, position: 'sticky', top: 88 }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--fg)' }}>Đọc tiếp</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {related.map(p => {
                const relSrc = p.mainImage
                  ? urlFor(p.mainImage).width(160).height(120).url()
                  : p.mainImageUrl ? cleanWixUrl(p.mainImageUrl) : null
                return (
                  <Link key={p._id} href={`/posts/${p.slug.current}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ position: 'relative', flex: '0 0 80px', width: 80, height: 60, background: 'var(--muted)', overflow: 'hidden' }}>
                      {relSrc && <Image src={relSrc} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized={!p.mainImage} />}
                    </div>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden' }}>
                        {p.title}
                      </h3>
                      <p style={{ margin: 'auto 0 0', fontSize: 11, color: 'var(--muted-fg)' }}>{fmtDate(p.publishedAt)}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </aside>
        )}
      </div>

      {scrolled && (
        <div style={{ position: 'fixed', right: 24, bottom: 96, zIndex: 55 }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Lên đầu trang" style={{ display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,.18)', borderRadius: '9999px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6" /></svg>
          </button>
        </div>
      )}
    </>
  )
}