import Link from 'next/link'

export default function NotFound() {
  return (
    <section style={{ margin: '0 auto', maxWidth: 768, padding: '120px 24px', textAlign: 'center', minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: 'clamp(72px,18vw,120px)', fontWeight: 600, lineHeight: 1, letterSpacing: '-.03em', color: 'var(--brand)' }}>404</p>
      <h1 style={{ margin: '24px 0 0', fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 600, letterSpacing: '-.02em', color: 'var(--fg)' }}>Lạc nhịp mất rồi</h1>
      <p style={{ margin: '14px 0 0', maxWidth: 440, fontSize: 17, lineHeight: 1.6, color: 'var(--muted-fg)' }}>
        Trang bạn tìm không tồn tại hoặc đã được dọn đi. Có lẽ kim đĩa vừa nhảy khỏi rãnh — quay lại trang chủ và nghe tiếp nhé.
      </p>
      <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary)', padding: '12px 22px', fontSize: 14, fontWeight: 500, color: 'var(--primary-fg)', textDecoration: 'none', borderRadius: '9999px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Về trang chủ
        </Link>
        <Link href="/the-loai/all" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid var(--border)', padding: '12px 22px', fontSize: 14, fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', borderRadius: '9999px' }}>
          Xem tất cả bài viết
        </Link>
      </div>
    </section>
  )
}
