import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music Blog',
  description: 'Tất cả bài viết âm nhạc — reviews, features, và phỏng vấn.',
  openGraph: {
    title: 'Music Blog | EmoodziK',
    images: ['/assets/music-blog-banner.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
