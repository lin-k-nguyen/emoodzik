'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, SERIES } from '@/lib/data'

interface HeaderProps {
  onSearchOpen: () => void
}

export default function Header({ onSearchOpen }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid var(--border)',
      background: 'color-mix(in oklab,var(--bg) 80%,transparent)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        margin: '0 auto', maxWidth: 1280,
        display: 'flex', height: 64,
        alignItems: 'center', justifyContent: 'space-between',
        gap: 16, padding: '0 24px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--fg)', textDecoration: 'none' }}>
          Emoodzi<span style={{ color: 'var(--brand)' }}>K</span>
        </Link>

        {/* Desktop nav */}
        <nav className="desk" style={{ alignItems: 'center', gap: 24 }}>
          <Link href="/music-blog" style={navLink}>Music Blog</Link>
          <Link href="/series" style={navLink}>Series</Link>
          <Link href="/nghe-si" style={navLink}>Nghệ Sĩ</Link>
          <Link href="/bon-nay" style={navLink}>Bọn Này</Link>
          <button
            type="button"
            onClick={onSearchOpen}
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-fg)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '7px 12px', textTransform: 'uppercase', letterSpacing: '.05em', fontWeight: 500 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <span>Tìm Kiếm</span>
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="mob" style={{ alignItems: 'center', gap: 4 }}>
          <button type="button" onClick={onSearchOpen} aria-label="Tìm kiếm" style={iconBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <button type="button" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={iconBtn}>
            {menuOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 6h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mob" style={{ flexDirection: 'column', gap: 4, borderTop: '1px solid var(--border)', padding: '16px 24px' }}>
          <p style={{ margin: '8px 0 4px', padding: '0 4px', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Music Blog</p>
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={cat.slug === 'all' ? '/the-loai/all' : `/the-loai/${cat.slug}`} onClick={() => setMenuOpen(false)} style={{ padding: '8px 4px', fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
              {cat.label}
            </Link>
          ))}
          <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />
          <p style={{ margin: '8px 0 4px', padding: '0 4px', fontSize: 12, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Series</p>
          {SERIES.map(s => (
            <Link key={s.slug} href={`/series/${s.slug}`} onClick={() => setMenuOpen(false)} style={{ padding: '8px 4px', fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>
              {s.label}
            </Link>
          ))}
          <div style={{ margin: '8px 0', borderTop: '1px solid var(--border)' }} />
          <Link href="/nghe-si" onClick={() => setMenuOpen(false)} style={{ padding: '8px 4px', fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>Nghệ Sĩ</Link>
          <Link href="/bon-nay" onClick={() => setMenuOpen(false)} style={{ padding: '8px 4px', fontSize: 14, color: 'var(--muted-fg)', textDecoration: 'none' }}>Bọn Này</Link>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ marginTop: 8, background: 'var(--primary)', padding: '10px 16px', textAlign: 'center', fontSize: 14, fontWeight: 500, color: 'var(--primary-fg)', textDecoration: 'none', borderRadius: '9999px' }}>
            Subscribe
          </Link>
        </nav>
      )}
    </header>
  )
}

const navLink: React.CSSProperties = {
  display: 'flex', alignItems: 'center', fontSize: 14,
  color: 'var(--muted-fg)', textDecoration: 'none', padding: '7px 12px',
}

const iconBtn: React.CSSProperties = {
  display: 'flex', width: 36, height: 36,
  alignItems: 'center', justifyContent: 'center',
  background: 'none', border: 'none', color: 'var(--fg)', cursor: 'pointer',
}
