import type { Metadata } from 'next'
import { Suspense } from 'react'
import TimKiemClient from './client'

export const metadata: Metadata = {
  title: 'Tìm Kiếm',
  description: 'Tìm kiếm bài viết, nghệ sĩ, và chuyên mục trên EmoodziK.',
  openGraph: {
    title: 'Tìm Kiếm | EmoodziK',
    description: 'Tìm kiếm bài viết, nghệ sĩ, và chuyên mục trên EmoodziK.',
    images: [{ url: '/assets/banner.png', width: 1200, height: 630 }],
  },
}

export default function TimKiemPage() {
  return (
    <Suspense fallback={<div style={{ padding: 64, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>}>
      <TimKiemClient />
    </Suspense>
  )
}