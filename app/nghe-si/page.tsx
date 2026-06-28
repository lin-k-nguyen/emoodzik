'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity'

function norm(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd')
}
function artistKey(name: string) {
  return norm(name.replace(/^the\s+/i, '').replace(/^["'.]+/, ''))
}
function artistLetter(name: string) {
  const c = artistKey(name).charAt(0).toUpperCase()
  return /[A-Z]/.test(c) ? c : '#'
}

export default function NgheSiPage() {
  const [artists, setArtists] = useState<any[]>([])
  const [query, setQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)

  useEffect(() => {
    client.fetch(`*[_type == "artist"] | order(name asc) { _id, name, slug }`).then(setArtists)
  }, [])

  const filtered = useMemo(() => {
    const q = norm(query.trim())
    return q ? artists.filter(a => norm(a.name).includes(q)) : artists
  }, [query, artists])

  const byLetter = useMemo(() => {
    const map = new Map<string, any[]>()
    for (const a of filtered) {
      const L = artistLetter(a.name)
      if (!map.has(L)) map.set(L, [])
      map.get(L)!.push(a)
    }
    return map
  }, [filtered])

  const letters = useMemo(() => {
    const ls = Array.from(byLetter.keys()).sort((a, b) => a.localeCompare(b, 'en'))
    const hi = ls.indexOf('#')
    if (hi > -1) { ls.splice(hi, 1); ls.push('#') }
    return ls
  }, [byLetter])

  const activeLetter = selectedLetter && byLetter.has(selectedLetter) ? selectedLetter : letters[0] ?? null
  const activeArtists = activeLetter ? byLetter.get(activeLetter) ?? [] : []

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <div className="split" style={{ alignItems: 'end' }}>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>Danh bạ</p>
          <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>Nghệ Sĩ</h1>
          <p style={{ margin: '12px 0 0', maxWidth: 560, fontSize: 18, lineHeight: 1.5, color: 'var(--muted-fg)' }}>Tất cả nghệ sĩ được nhắc tới trên EmoodziK, xếp theo thứ tự bảng chữ cái.</p>
        </div>
        <div>
          <div style={{ position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-fg)' }}>
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input type="text" value={query} onChange={e => { setQuery(e.target.value); setSelectedLetter(null) }} placeholder="Tìm tên nghệ sĩ..." style={{ height: 48, width: '100%', border: '1px solid var(--border)', background: 'var(--bg)', padding: '0 20px 0 44px', fontSize: 14, color: 'var(--fg)', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <p style={{ margin: '14px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>{filtered.length} nghệ sĩ</p>
        </div>
      </div>

      {letters.length > 0 ? (
        <>
          {/* Desktop: letter filter */}
          <div className="desk" style={{ flexDirection: 'column' }}>
            <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 2, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
              {letters.map(L => {
                const active = L === activeLetter
                return (
                  <button key={L} onClick={() => setSelectedLetter(L)} style={{ display: 'flex', width: 42, height: 42, alignItems: 'center', justifyContent: 'center', border: 'none', background: active ? '#ff2e2e' : 'transparent', fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 700, color: active ? '#fff' : 'var(--muted-fg)', cursor: 'pointer' }}>
                    {L}
                  </button>
                )
              })}
            </div>
            {activeLetter && (
              <div style={{ marginTop: 32 }}>
                <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6vw,44px)', fontWeight: 700, lineHeight: 1, color: 'var(--brand)' }}>{activeLetter}</h2>
                <ul className="art-grid" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {activeArtists.map((a: any) => (
                    <li key={a._id} style={{ padding: '0 0 12px' }}>
                      <Link href={`/nghe-si/${a.slug?.current}`} style={{ color: 'var(--fg)', textDecoration: 'none' }}>{a.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile: all letters grouped, scrollable */}
          <div className="mob" style={{ flexDirection: 'column', marginTop: 32 }}>
            {letters.map(L => (
              <div key={L} style={{ marginBottom: 32 }}>
                <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, lineHeight: 1, color: 'var(--brand)' }}>{L}</h2>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(byLetter.get(L) ?? []).map((a: any) => (
                    <li key={a._id}>
                      <Link href={`/nghe-si/${a.slug?.current}`} style={{ color: 'var(--fg)', textDecoration: 'none', fontSize: 17 }}>{a.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={{ marginTop: 48, textAlign: 'center', fontSize: 14, color: 'var(--muted-fg)' }}>Không tìm thấy nghệ sĩ nào{query ? ` cho "${query}"` : ''}</p>
      )}
    </section>
  )
}