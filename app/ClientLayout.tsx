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
