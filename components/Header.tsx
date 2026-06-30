'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CATEGORIES, SERIES } from '@/lib/data'

interface HeaderProps {
  onSearchOpen: () => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export default function Header({ onSearchOpen, theme, onThemeToggle }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <div aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'env(safe-area-inset-top, 0px)',
        background: 'var(--bg)',
        zIndex: 51,
      }} />
      <header className="site-header" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'color-mix(in oklab,var(--bg) 80%,transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        minHeight: 64,
      }}>
        <div className="header-inner" style={{
          margin: '0 auto', maxWidth: 1280,
          display: 'flex', height: '100%',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '0 24px',
        }}>
          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--fg)', textDecoration: 'none' }}>
            Emoodzi<span style={{ color: 'var(--brand)' }}>K</span>
          </Link>

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
            <button
              type="button"
              onClick={onThemeToggle}
              aria-label="Chuyển theme"
              style={{ display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer' }}
            >
              {theme === 'dark'
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
          </nav>

          <div className="mob" style={{ alignItems: 'center', gap: 4 }}>
            <button type="button" onClick={onSearchOpen} aria-label="Tìm kiếm" style={iconBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button type="button" onClick={onThemeToggle} aria-label="Chuyển theme" style={{ display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--muted-fg)', cursor: 'pointer' }}>
              {theme === 'dark'
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              }
            </button>
            <button type="button" onClick={() => setMenuOpen(v => !v)} aria-label="Menu" style={iconBtn}>
              {menuOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M4 6h16M4 18h16" /></svg>
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — fullscreen overlay, dvh handles Safari address bar */}
      {menuOpen && (
        <div className="mob mobile-menu-overlay" style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
          height: '100dvh',
          background: 'var(--bg)',
          flexDirection: 'column',
          overflowY: 'auto',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}>
          <div style={{
            display: 'flex', height: 64, alignItems: 'center',
            justifyContent: 'space-between', padding: '0 24px',
            borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}>
            <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 600, color: 'var(--fg)', textDecoration: 'none' }}>
              Emoodzi<span style={{ color: 'var(--brand)' }}>K</span>
            </Link>
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Đóng menu" style={iconBtn}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <nav style={{ flex: 1, padding: '24px 24px 40px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Music Blog</p>
            {CATEGORIES.map(cat => (
              <Link key={cat.slug} href={cat.slug === 'all' ? '/music-blog' : `/the-loai/${cat.slug}`} onClick={() => setMenuOpen(false)}
                style={{ padding: '12px 0', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                {cat.label}
              </Link>
            ))}

            <p style={{ margin: '24px 0 8px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Series</p>
            {SERIES.map(s => (
              <Link key={s.slug} href={`/series/${s.slug}`} onClick={() => setMenuOpen(false)}
                style={{ padding: '12px 0', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                {s.label}
              </Link>
            ))}

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <Link href="/nghe-si" onClick={() => setMenuOpen(false)}
                style={{ padding: '12px 0', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                Nghệ Sĩ
              </Link>
              <Link href="/bon-nay" onClick={() => setMenuOpen(false)}
                style={{ padding: '12px 0', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
                Bọn Này
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
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