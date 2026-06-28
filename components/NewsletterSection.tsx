'use client'

import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

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
          {subscribed ? (
            <p style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontSize: 14, fontWeight: 500, color: '#fbf7f0' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
              Cảm ơn bạn đã đăng ký! Kiểm tra email để xác nhận nhé.
            </p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', maxWidth: 448, gap: 12 }}>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{ height: 48, width: '100%', border: '1px solid #fff', background: '#fff', padding: '0 20px', fontSize: 14, color: '#1a1614', outline: 'none', fontFamily: 'inherit' }}
              />
              <button type="submit" style={{ height: 48, flex: 'none', border: 'none', background: '#fbf7f0', padding: '0 24px', fontSize: 14, fontWeight: 600, color: '#1a1614', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
