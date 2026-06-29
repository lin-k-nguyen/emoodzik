import './globals.css'
import type { Metadata, Viewport } from 'next'
import ClientLayout from './ClientLayout'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emoodzik.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EmoodziK — Thảo luận âm nhạc quốc tế',
    template: '%s | EmoodziK',
  },
  description: 'Blog âm nhạc tiếng Việt — reviews, features, và phỏng vấn về âm nhạc quốc tế.',
  openGraph: {
    type: 'website',
    siteName: 'EmoodziK',
    locale: 'vi_VN',
    images: [{ url: '/assets/banner.png', width: 1200, height: 630, alt: 'EmoodziK' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        {/* Probe env(safe-area-inset-top) before first paint and store as --sat so CSS can use var(--sat) reliably */}
        <script dangerouslySetInnerHTML={{__html:`(function(){try{var d=document.createElement('div');d.style.cssText='position:fixed;top:0;left:0;width:0;padding-top:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none';document.documentElement.appendChild(d);var s=parseInt(getComputedStyle(d).paddingTop)||0;document.documentElement.removeChild(d);if(s>0)document.documentElement.style.setProperty('--sat',s+'px')}catch(e){}})()`}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}')` }} />
          </>
        )}
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
