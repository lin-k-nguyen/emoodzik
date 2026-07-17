tsimport { NextResponse } from 'next/server'

export function middleware() {
  return new Response('Site đang bảo trì', { status: 503 })
}

export const config = {
  matcher: '/((?!_next|favicon.ico).*)',
}