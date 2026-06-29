import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Series',
  description: 'Các chuyên đề âm nhạc của EmoodziK.',
  openGraph: {
    title: 'Series | EmoodziK',
    images: ['/assets/series-banner.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
