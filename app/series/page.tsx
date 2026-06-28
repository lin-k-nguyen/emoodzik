import { redirect } from 'next/navigation'
import { SERIES } from '@/lib/data'

export default function SeriesIndexPage() {
  redirect(`/series/${SERIES[0].slug}`)
}