'use client'

import { useState } from 'react'

export default function MessengerWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 56, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14 }}>
      {open && (
        <div style={{ width: 328, maxWidth: 'calc(100vw - 48px)', overflow: 'hidden', background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: '0 24px 60px rgba(0,0,0,.32)' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'linear-gradient(135deg,#0a7cff,#a033ff)' }}>
            <span style={{ display: 'flex', width: 40, height: 40, flex: 'none', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', background: 'rgba(255,255,255,.18)' }}>
              <MessengerIcon size={24} color="#fff" />
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#fff' }}>EmoodziK</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(255,255,255,.85)' }}>Thường trả lời trong vài giờ</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Đóng" style={{ display: 'flex', width: 30, height: 30, flex: 'none', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '9999px', background: 'rgba(255,255,255,.18)', color: '#fff', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Message bubble */}
          <div style={{ padding: '20px 16px', background: 'var(--secondary)' }}>
            <div style={{ maxWidth: 240, padding: '12px 14px', borderRadius: '4px 16px 16px 16px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--fg)' }}>
                Chào bạn! 👋 Bọn mình có thể giúp gì cho bạn về âm nhạc, bài viết hay gear không?
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
            <a
              href="https://m.me/emoodzik"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, height: 46, borderRadius: '9999px', background: '#0a7cff', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
            >
              <MessengerIcon size={20} color="#fff" />
              Tiếp tục trên Messenger
            </a>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-label="Mở chat Messenger"
        className="fab"
        style={{ display: 'flex', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '9999px', background: '#0084ff', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,.25)' }}
      >
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M18 6 6 18M6 6l12 12" /></svg>
          : <MessengerIcon size={30} color="#fff" />
        }
      </button>
    </div>
  )
}

function MessengerIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.5 2 2 6.13 2 11.2c0 2.9 1.43 5.48 3.67 7.17V22l3.35-1.84c.89.25 1.84.38 2.98.38 5.5 0 10-4.13 10-9.2S17.5 2 12 2Zm1.02 12.38-2.55-2.72-4.97 2.72 5.47-5.8 2.61 2.72 4.91-2.72-5.47 5.8Z" />
    </svg>
  )
}
