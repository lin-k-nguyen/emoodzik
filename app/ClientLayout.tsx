'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchDialog from '@/components/SearchDialog'
import MessengerWidget from '@/components/MessengerWidget'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    try {
      const t = localStorage.getItem('ek-theme') as 'dark' | 'light'
      if (t) setTheme(t)
    } catch {}
  }, [])

  // Probe env(safe-area-inset-top) after layout and store as --sat.
  // getComputedStyle only returns the real env() value after a layout pass,
  // so this useEffect is more reliable than the head-script probe.
  useEffect(() => {
    try {
      const d = document.createElement('div')
      d.style.cssText = 'position:fixed;top:0;left:0;width:0;padding-top:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none'
      document.documentElement.appendChild(d)
      const s = parseInt(window.getComputedStyle(d).paddingTop) || 0
      document.documentElement.removeChild(d)
      document.documentElement.style.setProperty('--sat', s + 'px')
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('ek-theme', theme) } catch {}
  }, [theme])

  return (
    <>
      <Header
        onSearchOpen={() => setSearchOpen(true)}
        theme={theme}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
      <MessengerWidget />
    </>
  )
}
