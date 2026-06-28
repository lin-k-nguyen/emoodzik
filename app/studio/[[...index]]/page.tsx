'use client'

export const dynamic = 'force-dynamic'

// This will be replaced with the real Sanity Studio once Sanity is set up.
// For now it shows a placeholder.
export default function StudioPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', fontFamily: 'var(--font-sans)', textAlign: 'center', padding: 24 }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--accent)' }}>CMS</p>
      <h1 style={{ margin: '12px 0 0', fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--fg)' }}>Sanity Studio</h1>
      <p style={{ margin: '16px 0 0', maxWidth: 480, fontSize: 16, lineHeight: 1.6, color: 'var(--muted-fg)' }}>
        Sanity chưa được cấu hình. Cài đặt Sanity và thay thế file này bằng NextStudio component.
      </p>
      <pre style={{ marginTop: 24, padding: '16px 24px', background: 'var(--secondary)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--fg)', textAlign: 'left', overflowX: 'auto' }}>
        {`npm install next-sanity @sanity/vision\nnpx sanity init --env`}
      </pre>
    </div>
  )
}
