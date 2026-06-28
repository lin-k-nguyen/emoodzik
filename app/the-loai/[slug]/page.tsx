import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getAuthor, CATEGORIES } from '@/lib/data'
import PostCard from '@/components/PostCard'

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }))
}

export default function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams: { page?: string } }) {
  const cat = getCategoryBySlug(params.slug)
  if (!cat) notFound()

  const posts = getPostsByCategory(params.slug)
  const PER_PAGE = 28
  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE))
  const page = Math.min(Math.max(1, parseInt(searchParams.page ?? '1', 10)), totalPages)
  const pagePosts = posts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const base = `/the-loai/${params.slug}`

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <section style={{ margin: '0 auto', maxWidth: 1280, padding: '0 24px' }}>
        <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)' }}>
          <Link href="/music-blog" style={{ textDecoration: 'none', color: 'inherit' }}>Music Blog</Link>
          <span>/</span>
          <span style={{ color: 'var(--fg)' }}>{cat.label}</span>
        </nav>
        <h1 style={{ margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>{cat.label}</h1>
        <p style={{ margin: '12px 0 0', maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: 'var(--muted-fg)' }}>{cat.blurb}</p>
      </section>

      <section style={{ margin: '48px auto 0', maxWidth: 1280, padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
          <span style={{ fontSize: 14, color: 'var(--muted-fg)' }}>{posts.length} bài viết</span>
        </div>
        <div className="grid-4" style={{ paddingTop: 40 }}>
          {pagePosts.map(p => <PostCard key={p.slug} post={p} author={getAuthor(p.author)!} />)}
        </div>

        {totalPages > 1 && (
          <nav style={{ marginTop: 64, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {page > 1 && (
              <Link href={`${base}?page=${page - 1}`} style={pgLink(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <Link key={n} href={`${base}?page=${n}`} style={pgLink(n === page)}>
                {n}
              </Link>
            ))}
            {page < totalPages && (
              <Link href={`${base}?page=${page + 1}`} style={pgLink(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
              </Link>
            )}
          </nav>
        )}
      </section>
    </div>
  )
}

const pgLink = (active: boolean): React.CSSProperties => ({
  display: 'flex', minWidth: 44, height: 44, alignItems: 'center', justifyContent: 'center', padding: '0 8px',
  border: `1px solid ${active ? '#ff2e2e' : 'var(--border)'}`,
  background: active ? '#ff2e2e' : 'transparent',
  color: active ? '#fff' : 'var(--fg)',
  fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 600, textDecoration: 'none',
})
