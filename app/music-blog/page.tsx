import type { Metadata } from 'next'
import MusicBlogClient from './client'

export const metadata: Metadata = {
  title: 'Music Blog',
  description: 'Tất cả bài viết về âm nhạc — reviews, features, và phỏng vấn.',
  openGraph: {
    title: 'Music Blog | EmoodziK',
    description: 'Tất cả bài viết về âm nhạc — reviews, features, và phỏng vấn.',
    images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
  },
}

export default function MusicBlogPage() {
  return <MusicBlogClient />
}
