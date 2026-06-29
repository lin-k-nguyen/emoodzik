import type { Metadata } from 'next'
import NgheSiClient from './client'

export const metadata: Metadata = {
  title: 'Nghệ Sĩ',
  description: 'Khám phá các nghệ sĩ được giới thiệu trên EmoodziK.',
  openGraph: {
    title: 'Nghệ Sĩ | EmoodziK',
    description: 'Khám phá các nghệ sĩ được giới thiệu trên EmoodziK.',
    images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
  },
}

export default function NgheSiPage() {
  return <NgheSiClient />
}
