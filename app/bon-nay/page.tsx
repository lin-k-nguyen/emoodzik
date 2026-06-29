import type { Metadata } from 'next'
import BonNayClient from './client'

export const metadata: Metadata = {
  title: 'Bọn Này',
  description: 'Những thằng quen và chơi với nhau từ rất nhiều năm vì cùng chia sẻ một sở thích: nghe nhạc.',
  openGraph: {
    title: 'Bọn Này | EmoodziK',
    description: 'Những thằng quen và chơi với nhau từ rất nhiều năm vì cùng chia sẻ một sở thích: nghe nhạc.',
    images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
  },
}

export default function BonNayPage() {
  return <BonNayClient />
}
