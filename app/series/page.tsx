import { client } from '@/lib/sanity'
import { redirect } from 'next/navigation'

export default async function SeriesIndexPage() {
  const first = await client.fetch(`*[_type == "series"] | order(sortOrder asc, title asc)[0] { slug }`)
  if (first?.slug?.current) {
    redirect(`/series/${first.slug.current}`)
  }
  redirect('/music-blog')
}
