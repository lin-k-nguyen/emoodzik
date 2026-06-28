'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'

export default function BonNayPage() {
  const [authors, setAuthors] = useState<any[]>([])
  const [contactSent, setContactSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    client.fetch(`*[_type == "author"] { _id, name, slug, avatar, about }`).then(setAuthors)
  }, [])

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.name.trim() && form.email.trim() && form.message.trim()) setContactSent(true)
  }

  return (
    <section style={{ margin: '0 auto', maxWidth: 1280, padding: '64px 24px 80px' }}>
      <div className="split">
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>Every Thursday &amp; Sunday</p>
          <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px,6.5vw,48px)', fontWeight: 600, color: 'var(--fg)' }}>Bọn Này</h1>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ margin: 0, fontSize: 19, lineHeight: 1.7, color: 'var(--fg)' }}>Bọn này là những thằng quen và chơi với nhau từ rất nhiều năm vì cùng chia sẻ một sở thích: nghe nhạc. Lớn lên trong những năm 90 ở Hà Nội hồi đó, có lẽ đa số những thứ đi đến được đôi tai đều có nguồn gốc từ đĩa CD Tàu.</p>
            <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--muted-fg)' }}>Bọn này viết lách tào lao trên trang này với mục đích thuần túy chia sẻ sở thích nghe nhạc và mấy thứ lượm lặt chỗ này chỗ kia với mọi người. Bọn này chỉ kể chuyện thôi nhé, đừng quan trọng đúng hay sai.</p>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted-fg)' }}>Topic thường được bốt vào thứ 5 và Chúa nhật.</p>
          </div>
        </div>

        <div className="team-col" style={{ marginTop: 104 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--muted-fg)' }}>Team EmoodziK</p>
          <div className="auth-grid" style={{ marginTop: 20 }}>
            {authors.map(a => (
              <Link key={a._id} href={`/bon-nay/${a.slug?.current}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1', background: 'var(--muted)', overflow: 'hidden' }}>
                  {a.avatar && <Image src={urlFor(a.avatar).width(200).height(200).url()} alt={a.name} fill style={{ objectFit: 'cover' }} />}
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--fg)' }}>{a.name}</span>
              </Link>
            ))}
          </div>
          <p style={{ margin: '18px 0 0', fontSize: 13, color: 'var(--muted-fg)' }}>Artwork by Thủy Torchy</p>
        </div>
      </div>

      <div style={{ marginTop: 72, borderTop: '1px solid var(--border)', paddingTop: 56, textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600, color: 'var(--fg)' }}>Liên hệ</h2>
        <p style={{ margin: '10px auto 0', maxWidth: 560, lineHeight: 1.65, color: 'var(--muted-fg)' }}>Có bài nhạc muốn bọn này kể, một góp ý, hay chỉ là muốn chào một câu — để lại vài dòng chia sẻ nhé.</p>
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
            <button type="submit" style={{ alignSelf: 'center', height: 48, border: 'none', background: 'var(--primary)', padding: '0 28px', fontSize: 15, fontWeight: 500, color: 'var(--primary-fg)', cursor: 'pointer', fontFamily: 'inherit' }}>Gửi lời nhắn</button>
          </form>
        )}
      </div>
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1, minWidth: 200, height: 48,
  border: '1px solid var(--border)', background: 'var(--bg)',
  padding: '0 16px', fontSize: 15, color: 'var(--fg)',
  outline: 'none', fontFamily: 'inherit',
}