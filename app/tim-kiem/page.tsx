import { Suspense } from 'react'
import TimKiemClient from './client'

export default function TimKiemPage() {
  return (
    <Suspense fallback={<div style={{ padding: 64, textAlign: 'center', color: 'var(--muted-fg)' }}>Đang tải...</div>}>
      <TimKiemClient />
    </Suspense>
  )
}