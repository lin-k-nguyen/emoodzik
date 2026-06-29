'use client'

import { useEffect, useRef } from 'react'

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const s = document.createElement('script')
    s.src = 'https://subscribe-forms.beehiiv.com/v3/loader.js'
    s.async = true
    s.setAttribute('data-beehiiv-form', 'af08fb5c-a935-474a-98c7-2dd2f6754c59')
    ref.current.appendChild(s)
    return () => s.remove()
  }, [])

  return (
    <section style={{ padding: 0 }}>
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        backgroundImage: 'linear-gradient(rgba(8,7,6,.78),rgba(8,7,6,.86)),url(/assets/subscribe-bg.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '88px 24px', textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{ maxWidth: 576 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px,5vw,38px)', fontWeight: 700, letterSpacing: '-.01em', color: '#fbf7f0' }}>
              Nhận bài viết mới qua email
            </h2>
            <p style={{ margin: '14px 0 0', lineHeight: 1.6, color: 'rgba(251,247,240,.78)' }}>
              Đăng ký newsletter của EmoodziK để nhận những bài viết chọn lọc về âm nhạc, gear và nghệ thuật lắng nghe. Không spam, huỷ bất cứ lúc nào.
            </p>
          </div>
          <div ref={ref} style={{ width: '100%', maxWidth: 448 }} />
        </div>
      </div>
    </section>
  )
}
