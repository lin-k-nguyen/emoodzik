import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nghệ Sĩ',
  description: 'Danh sách nghệ sĩ được nhắc đến trên EmoodziK.',
  openGraph: { title: 'Nghệ Sĩ | EmoodziK' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
