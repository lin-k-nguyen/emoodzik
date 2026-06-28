'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AUTHORS, AUTHOR_ORDER, getAllPosts } from '@/lib/data'

export default function BonNayPage() {
  const [modalAuthor, setModalAuthor] = useState<string | null>(null)
  const [contactSent, setContactSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const activeAuthor = modalAuthor ? AUTHORS[modalAuthor] : null
  const authorPostCount = modalAuthor ? getAllPosts().filter(p => p.author === modalAuthor).length : 0

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name.trim() && form.email.trim() && form.message.trim()) setContactSent(true)
  }

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <div className="split">
        {/* Left: About text */}
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>Every Thursday &amp; Sunday</p>
          <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>Bọn Này</h1>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.7, color: 'var(--fg)' }}>
              Bọn này là những thằng quen và chơi với nhau từ rất nhiều năm vì cùng chia sẻ một sở thích: nghe nhạc. Lớn lên trong những năm 90 ở Hà Nội hồi đó, có lẽ đa số những thứ đi đến được đôi tai đều có nguồn gốc từ đĩa CD Tàu.
            </p>
            <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--muted-fg)' }}>
              Là những thanh niên mà thời đó, bọn này thường rất kiêu hãnh vì được nghe âm nhạc thế giới với giá rất rẻ mạt, và vỗ ngực tự hào khi mình là 'fan cuồng' của một thể loại nhạc nào đó.
            </p>
            <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--muted-fg)' }}>
              Bọn này viết lách tào lao trên trang này với mục đích thuần túy chia sẻ sở thích nghe nhạc và mấy thứ lượm lặt chỗ này chỗ kia với mọi người. Bọn này chỉ kể chuyện thôi nhé, đừng quan trọng đúng hay sai.
            </p>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>Topic thường được bốt vào thứ 5 và Chúa nhật.</p>
          </div>
        </div>

        {/* Right: Team grid */}
        <div className="team-col" style={{ marginTop: 104 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Team EmoodziK</p>
          <div className="auth-grid" style={{ marginTop: 20 }}>
            {AUTHOR_ORDER.map(slug => {
              const a = AUTHORS[slug]
              return (
                <button key={slug} type="button" onClick={() => setModalAuthor(slug)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, border: 'none', background: 'none', padding: 0, cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--muted)', overflow: 'hidden' }}>
                    <Image src={a.avatar} alt={a.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>{a.name}</span>
                </button>
              )
            })}
          </div>
          <p style={{ margin: '18px 0 0', fontSize: 13, color: 'var(--muted-fg)' }}>Artwork by Thủy Torchy</p>
        </div>
      </div>

      {/* Contact */}
      <div style={{ marginTop: 72, borderTop: '1px solid var(--border)', paddingTop: 56, textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--fg)' }}>Liên hệ</h2>
        <p style={{ margin: '10px auto 0', maxWidth: 560, lineHeight: 1.65, color: 'var(--muted-fg)' }}>
          Có bài nhạc muốn bọn này kể, một góp ý, hay chỉ là muốn chào một câu — để lại vài dòng chia sẻ nhé.
        </p>
        {contactSent ? (
          <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--border)', background: 'var(--secondary)', padding: '20px 22px', color: 'var(--fg)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
            Cảm ơn bạn! Bọn này đã nhận được lời nhắn rồi.
          </div>
        ) : (
          <form onSubmit={handleContact} style={{ margin: '28px auto 0', maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Tên của bạn" style={inputStyle} />
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email" style={inputStyle} />
            </div>
            <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Vài dòng chia sẻ…" rows={5} style={{ border: '1px solid var(--border)', background: 'var(--bg)', padding: '14px 16px', fontSize: 15, lineHeight: 1.55, color: 'var(--fg)', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }} />
            <button type="submit" style={{ alignSelf: 'center', height: 48, border: 'none', background: 'var(--primary)', padding: '0 28px', fontSize: 15, fontWeight: 500, color: 'var(--primary-fg)', cursor: 'pointer', fontFamily: 'inherit' }}>
              Gửi lời nhắn
            </button>
          </form>
        )}
      </div>

      {/* Author modal */}
      {activeAuthor && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={() => setModalAuthor(null)} style={{ position: 'absolute', inset: 0, background: 'color-mix(in oklab,var(--fg) 45%,transparent)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 560, maxHeight: '84vh', overflowY: 'auto', border: '1px solid var(--border)', background: 'var(--bg)', boxShadow: '0 30px 60px rgba(0,0,0,.45)' }}>
            <button type="button" onClick={() => setModalAuthor(null)} aria-label="Đóng" style={{ position: 'absolute', top: 16, right: 16, display: 'flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--muted-fg)', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px 32px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ position: 'relative', width: 88, height: 88, flex: 'none', background: 'var(--muted)', overflow: 'hidden' }}>
                <Image src={activeAuthor.avatar} alt={activeAuthor.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--accent)' }}>{activeAuthor.role}</p>
                <h3 style={{ margin: '6px 0 0', fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 700, color: 'var(--fg)' }}>{activeAuthor.name}</h3>
              </div>
            </div>
            <div style={{ padding: '24px 32px 28px' }}>
              <div style={{ marginBottom: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                <span style={{ fontSize: 14, color: 'var(--muted-fg)' }}>{authorPostCount} bài viết trên EmoodziK</span>
                <Link href={`/bon-nay/${modalAuthor}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--brand)', textDecoration: 'none' }}>
                  Xem tất cả bài viết
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {activeAuthor.bioParas.map((para, i) => (
                  <p key={i} style={{ margin: 0, lineHeight: 1.7, color: 'var(--muted-fg)', textAlign: 'justify' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1, minWidth: 200, height: 48,
  border: '1px solid var(--border)', background: 'var(--bg)',
  padding: '0 16px', fontSize: 15, color: 'var(--fg)',
  outline: 'none', fontFamily: 'inherit',
}
