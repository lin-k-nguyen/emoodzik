import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAuthor, SERIES, fmtDate } from '@/lib/data'
import PostCard from '@/components/PostCard'
import NewsletterSection from '@/components/NewsletterSection'

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6)
  const homeSeries = SERIES.map(s => ({
    ...s,
    posts: getAllPosts().filter(p => p.series === s.slug).slice(0, 5),
  }))

  return (
    <>
      {/* Banner */}
      <section style={{ padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,28vw,400px)', overflow: 'hidden', borderBottom: '1px solid var(--border)', background: 'var(--secondary)' }}>
          <Image src="/assets/banner.png" alt="EmoodziK Music Blog" fill style={{ objectFit: 'cover', objectPosition: 'left bottom', transform: 'scale(1.38)', transformOrigin: 'left bottom' }} priority />
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '72px 24px' }}>
        <div className="split" style={{ margin: '0 auto', maxWidth: 1280 }}>
          {/* Latest posts */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
              <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>Hàng Mới Ra</h2>
              <Link href="/the-loai/all" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                Xem tất cả
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
            <div className="grid-2" style={{ paddingTop: 40 }}>
              {latestPosts.map(p => {
                const author = getAuthor(p.author)!
                return <PostCard key={p.slug} post={p} author={author} />
              })}
            </div>
          </div>

          {/* Series sidebar */}
          <aside style={{ borderLeft: '1px solid var(--border)', paddingLeft: 40, display: 'flex', flexDirection: 'column' }}>
            {homeSeries.map((s, i) => (
              <section key={s.slug} style={i > 0 ? { marginTop: 48, paddingTop: 48, borderTop: '1px solid var(--border)' } : {}}>
                <Link href={`/series/${s.slug}`} style={{ display: 'inline-block', textDecoration: 'none' }}>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--fg)' }}>{s.label}</h2>
                </Link>
                <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column' }}>
                  {s.posts.map(p => {
                    const author = getAuthor(p.author)!
                    return (
                      <Link key={p.slug} href={`/posts/${p.slug}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ position: 'relative', flex: '0 0 84px', width: 84, height: 64, background: 'var(--muted)', overflow: 'hidden' }}>
                          <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                          <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>
                            {p.title}
                          </h3>
                          <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--muted-fg)' }}>{fmtDate(p.date)} · {p.readingTime}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <Link href={`/series/${s.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                  Xem chuyên đề
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </section>
            ))}
          </aside>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}
