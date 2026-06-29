import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bọn Này',
  description: 'Những người viết âm nhạc đằng sau EmoodziK.',
  openGraph: { title: 'Bọn Này | EmoodziK' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
