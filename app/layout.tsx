'use client'

import './globals.css'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchDialog from '@/components/SearchDialog'
import MessengerWidget from '@/components/MessengerWidget'

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    <html lang="vi" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header
          onSearchOpen={() => setSearchOpen(true)}
          theme={theme}
          onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
        <MessengerWidget />
      </body>
    </html>
  )
}