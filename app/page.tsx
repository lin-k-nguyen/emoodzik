import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllSeries, urlFor } from '@/lib/sanity'
import PostCard from '@/components/PostCard'
import NewsletterSection from '@/components/NewsletterSection'
import { fmtDate } from '@/lib/data'

export const revalidate = 60

function cleanWixUrl(url: string): string {
  return url.replace(/~mv2\.(jpg|jpeg|png|webp)~mv2\.\w+/gi, '~mv2.$1')
}

function getSeriesThumb(p: any): string | null {
  if (p.mainImage) return urlFor(p.mainImage).width(168).height(128).url()
  if (p.mainImageUrl) return cleanWixUrl(p.mainImageUrl)
  return null
}

export default async function HomePage() {
  const [posts, seriesList] = await Promise.all([
    getAllPosts(),
    getAllSeries(),
  ])

  const latestPosts = posts.slice(0, 6)

  const homeSeries = await Promise.all(
    seriesList.map(async (s: any) => {
      const { getPostsBySeries } = await import('@/lib/sanity')
      const seriesPosts = await getPostsBySeries(s.slug.current)
      return { ...s, posts: seriesPosts.slice(0, 7) }
    })
  )

  return (
    <>
      {/* Banner */}
      <section style={{ padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: 'clamp(200px,28vw,400px)', overflow: 'hidden', background: 'var(--secondary)' }}>
          <Image src="/assets/banner.png" alt="EmoodziK Music Blog" fill style={{ objectFit: 'cover', objectPosition: 'left bottom', transform: 'scale(1.38)', transformOrigin: 'left bottom' }} priority />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />
        </div>
      </section>

      <section style={{ padding: '72px 24px' }}>
        <div style={{ margin: '0 auto', maxWidth: 1280 }}>

          {/* Desktop */}
          <div className="desk" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>Hàng Mới Ra</h2>
                <Link href="/music-blog" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                  Xem tất cả <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div className="grid-2" style={{ paddingTop: 40 }}>
                {latestPosts.map((p: any) => <PostCard key={p._id} post={p} author={p.author} sanity />)}
              </div>
            </div>

            <aside style={{ borderLeft: '1px solid var(--border)', paddingLeft: 40, display: 'flex', flexDirection: 'column' }}>
              {homeSeries.map((s: any, i: number) => (
                <section key={s._id} style={i > 0 ? { marginTop: 48, paddingTop: 48, borderTop: '1px solid var(--border)' } : {}}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                    <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>{s.title}</h2>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {s.posts.map((p: any) => {
                      const src = getSeriesThumb(p)
                      return (
                        <Link key={p._id} href={`/post/${p.slug.current}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ position: 'relative', flex: '0 0 84px', width: 84, height: 64, background: 'var(--muted)', overflow: 'hidden' }}>
                            {src && <Image src={src} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized={!p.mainImage} />}
                          </div>
                          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                            <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>{p.title}</h3>
                            <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--muted-fg)' }}>{fmtDate(p.publishedAt)}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <Link href={`/series/${s.slug.current}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                    Xem chuyên đề <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </section>
              ))}
            </aside>
          </div>

          {/* Mobile */}
          <div className="mob" style={{ flexDirection: 'column' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>Hàng Mới Ra</h2>
                <Link href="/music-blog" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                  Xem tất cả <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 32 }}>
                {latestPosts.map((p: any) => <PostCard key={p._id} post={p} author={p.author} sanity />)}
              </div>
            </div>

            {homeSeries.map((s: any) => (
              <section key={s._id} style={{ marginTop: 48, paddingTop: 48, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg)' }}>{s.title}</h2>
                  <Link href={`/series/${s.slug.current}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Xem chuyên đề <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {s.posts.map((p: any) => {
                    const src = getSeriesThumb(p)
                    return (
                      <Link key={p._id} href={`/post/${p.slug.current}`} style={{ display: 'flex', gap: 14, padding: '16px 0', borderTop: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ position: 'relative', flex: '0 0 84px', width: 84, height: 64, background: 'var(--muted)', overflow: 'hidden' }}>
                          {src && <Image src={src} alt={p.title} fill style={{ objectFit: 'cover' }} unoptimized={!p.mainImage} />}
                        </div>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                          <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: 'var(--fg)', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden' }}>{p.title}</h3>
                          <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--muted-fg)' }}>{fmtDate(p.publishedAt)}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                <Link href={`/series/${s.slug.current}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                  Xem chuyên đề <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </section>
            ))}
          </div>

        </div>
      </section>

      <NewsletterSection />
    </>
  )
}